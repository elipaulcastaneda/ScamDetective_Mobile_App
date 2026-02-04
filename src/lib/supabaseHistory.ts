import { getSupabaseClient } from "@/lib/supabaseClient";
import { decryptPayload, encryptText } from "@/lib/crypto";
import { getRiskResult, getThreatType, type ScanHistoryItem } from "@/lib/scanHistory";

export type SupabaseScanRow = {
  id: string;
  type: string;
  input: string;
  confidence: number;
  scan_date: string;
  userid: string;
  result: number;
};

export type SupabaseReportRow = {
  id: string;
  userid: string;
  created_at: string;
  type?: string | null;
  content?: string | null;
  description?: string | null;
};

function normalizeType(type: string): ScanHistoryItem["type"] {
  switch (type.toLowerCase()) {
    case "url":
      return "URL";
    case "email":
      return "Email";
    case "phone":
      return "Phone";
    default:
      return "Text";
  }
}

function formatDate(dateString: string): string {
  const parsed = Date.parse(dateString);
  if (Number.isNaN(parsed)) return new Date().toISOString().split("T")[0];
  return new Date(parsed).toISOString().split("T")[0];
}

export async function saveScanToSupabase(params: {
  content: string;
  confidence: number;
  predictedClass: number;
  type?: string;
}): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return false;

  const encrypted = await encryptText(params.content);

  const { error } = await supabase.from("scan_history").insert({
    type: params.type ?? "text",
    input: JSON.stringify(encrypted),
    confidence: params.confidence,
    scan_date: new Date().toISOString(),
    userid: data.user.id,
    result: params.predictedClass,
  });

  if (error) {
    console.warn("Failed to save scan to Supabase", error);
    return false;
  }

  return true;
}

export async function getSupabaseScanHistory(): Promise<ScanHistoryItem[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return null;

  const { data: rows, error } = await supabase
    .from("scan_history")
    .select("id,type,input,confidence,scan_date,userid,result")
    .eq("userid", data.user.id)
    .order("scan_date", { ascending: false });

  if (error || !rows) {
    console.warn("Failed to fetch scan history", error);
    return null;
  }

  const results: ScanHistoryItem[] = [];

  for (const row of rows as SupabaseScanRow[]) {
    const decrypted = await decryptPayload(row.input);
    const fullContent = decrypted ?? "[Encrypted]";
    const preview = fullContent.length > 60 ? `${fullContent.slice(0, 60)}...` : fullContent;

    results.push({
      id: row.id,
      type: normalizeType(row.type ?? "text"),
      content: preview,
      fullContent,
      origin: "Supabase Sync",
      risk: row.confidence,
      date: formatDate(row.scan_date),
      createdAt: Date.parse(row.scan_date),
      result: getRiskResult(row.confidence),
      threatType: getThreatType(fullContent, row.confidence),
    });
  }

  return results;
}

export async function clearSupabaseScanHistory(): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return false;

  const { error } = await supabase.from("scan_history").delete().eq("userid", data.user.id);
  if (error) {
    console.warn("Failed to delete scan history", error);
    return false;
  }

  return true;
}

export async function getSupabaseScanRows(): Promise<SupabaseScanRow[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return null;

  const { data: rows, error } = await supabase
    .from("scan_history")
    .select("id,type,input,confidence,scan_date,userid,result")
    .eq("userid", data.user.id)
    .order("scan_date", { ascending: false });

  if (error || !rows) {
    console.warn("Failed to fetch scan history rows", error);
    return null;
  }

  return rows as SupabaseScanRow[];
}

export async function getSupabaseReportedEmails(): Promise<SupabaseReportRow[] | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return null;

  const { data: rows, error } = await supabase
    .from("reported_emails")
    .select("id,userid,created_at,type,content,description")
    .eq("userid", data.user.id)
    .order("created_at", { ascending: false });

  if (error || !rows) {
    console.warn("Failed to fetch reported emails", error);
    return null;
  }

  return rows as SupabaseReportRow[];
}

export async function clearSupabaseReportedEmails(): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data } = await supabase.auth.getUser();
  if (!data?.user) return false;

  const { error } = await supabase
    .from("reported_emails")
    .delete()
    .eq("userid", data.user.id);

  if (error) {
    console.warn("Failed to delete reported emails", error);
    return false;
  }

  return true;
}
