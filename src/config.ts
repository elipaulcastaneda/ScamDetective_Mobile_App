export const API_CONFIG = {
  timeout: 120000, // 2 minutes
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  // Edge function endpoint (forwarder that proxies to AI server)
  edgeFunctionUrl: process.env.NEXT_PUBLIC_EDGE_FUNCTION_URL || '',
} as const;

// Optional: validation helper
export function validateConfig() {
  const missing: string[] = [];
  
  if (!API_CONFIG.supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!API_CONFIG.supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!API_CONFIG.edgeFunctionUrl) missing.push('NEXT_PUBLIC_EDGE_FUNCTION_URL');
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}