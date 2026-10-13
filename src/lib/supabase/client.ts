import { createBrowserClient } from "@supabase/ssr";

function normalizeUrl(rawUrl?: string): string {
  const fallback = "https://bedkaofiodljlwxwglyq.supabase.co";
  if (!rawUrl || rawUrl.includes("dummy") || rawUrl.includes("hdzfinance.supabase.co")) {
    return fallback;
  }
  let clean = rawUrl.trim();
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "https://" + clean;
  }
  return clean.replace(/\/+$/, "");
}

export function createClient() {
  const url = normalizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const anonKey = rawKey.trim().replace(/^["']|["']$/g, "") || "dummy_key";
  return createBrowserClient(url, anonKey);
}
