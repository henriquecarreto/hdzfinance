import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hdzfinance.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_service_role_key";

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
