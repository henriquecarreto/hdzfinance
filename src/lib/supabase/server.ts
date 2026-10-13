import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function createClient() {
  const cookieStore = await cookies();

  const url = normalizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const anonKey = rawKey.trim().replace(/^["']|["']$/g, "") || "dummy_key";

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Handled for Server Components
        }
      },
    },
  });
}
