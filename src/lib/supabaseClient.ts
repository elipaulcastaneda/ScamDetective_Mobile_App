import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { API_CONFIG } from "@/config";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!API_CONFIG.supabaseUrl || !API_CONFIG.supabaseAnonKey) {
    return null;
  }

  if (!client) {
    client = createClient(API_CONFIG.supabaseUrl, API_CONFIG.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }

  return client;
}
