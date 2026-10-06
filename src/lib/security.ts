import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "hdz_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12; // 12 hours

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || "hdz_finance_production_secure_secret_key_2026_v1";

async function getCryptoKey() {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(email: string, role = "admin"): Promise<string> {
  const payload = {
    email: email.toLowerCase().trim(),
    role,
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };

  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString("base64url");

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(base64Payload)
  );
  const base64Sig = Buffer.from(signatureBuffer).toString("base64url");

  return `${base64Payload}.${base64Sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<{ valid: boolean; email?: string; role?: string }> {
  if (!token) return { valid: false };

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return { valid: false };

    const [base64Payload, base64Sig] = parts;

    const key = await getCryptoKey();
    const sigBuffer = Buffer.from(base64Sig, "base64url");
    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBuffer,
      new TextEncoder().encode(base64Payload)
    );

    if (!isValidSig) return { valid: false };

    const payloadJson = Buffer.from(base64Payload, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, email: payload.email, role: payload.role };
  } catch (err) {
    return { valid: false };
  }
}

export async function setAdminSessionCookie(email: string) {
  const token = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getAdminSessionFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return await verifySessionToken(token);
}

const loginAttemptsMap = new Map<string, { count: number; lockUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; retryAfterSec?: number } {
  const now = Date.now();
  const record = loginAttemptsMap.get(ip);

  if (record && record.lockUntil > now) {
    const retryAfterSec = Math.ceil((record.lockUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSec };
  }

  const attempts = record && record.lockUntil <= now ? 0 : record?.count || 0;
  return { allowed: true, remainingAttempts: Math.max(0, 5 - attempts) };
}

export function registerLoginAttempt(ip: string, success: boolean) {
  const now = Date.now();
  if (success) {
    loginAttemptsMap.delete(ip);
    return;
  }

  const record = loginAttemptsMap.get(ip) || { count: 0, lockUntil: 0 };
  const newCount = record.count + 1;

  if (newCount >= 5) {
    loginAttemptsMap.set(ip, { count: newCount, lockUntil: now + 15 * 60 * 1000 });
  } else {
    loginAttemptsMap.set(ip, { count: newCount, lockUntil: 0 });
  }
}

export function logSecurityEvent(event: string, details: Record<string, unknown>) {
  console.log(`[SECURITY AUDIT LOG] [${new Date().toISOString()}] ${event}:`, JSON.stringify(details));
}
