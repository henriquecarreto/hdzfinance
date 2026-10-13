import { createClient as createSupabaseClient } from "@supabase/supabase-js";

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

export function createAdminClient() {
  const url = normalizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const serviceRoleKey = rawKey.trim().replace(/^["']|["']$/g, "") || "dummy_service_role_key";

  if (!serviceRoleKey || serviceRoleKey === "dummy_service_role_key") {
    console.warn("[HDZ Admin] SUPABASE_SERVICE_ROLE_KEY not configured.");
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
