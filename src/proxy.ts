import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "hdz_admin_session";
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || "hdz_finance_production_secure_secret_key_2026_v1";

async function verifyEdgeToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [base64Payload, base64Sig] = parts;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(SECRET_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigStr = atob(base64Payload ? base64Sig.replace(/-/g, "+").replace(/_/g, "/") : "");
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i);
    }

    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(base64Payload)
    );

    if (!isValidSig) return false;

    const payloadStr = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
      const isValid = await verifyEdgeToken(token);
      if (isValid) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return response;
    }

    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifyEdgeToken(token);

    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
