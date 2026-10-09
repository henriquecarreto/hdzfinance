import { NextResponse } from "next/server";
import { setAdminSessionCookie, checkRateLimit, registerLoginAttempt, logSecurityEvent } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    
    // 1. Rate Limit Check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      logSecurityEvent("LOGIN_RATE_LIMITED", { ip });
      return NextResponse.json(
        { error: `Muitas tentativas incorretas. Por razões de segurança, tente novamente em ${rateCheck.retryAfterSec} segundos.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body || {};

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      registerLoginAttempt(ip, false);
      return NextResponse.json(
        { error: "Por favor, informe e-mail e senha para autenticação." },
        { status: 400 }
      );
    }

    // Valid credentials check (Configured via env vars or server-side admin fallbacks)
    const validEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "henriquecarreto01@gmail.com").toLowerCase().trim();
    const validPassword = process.env.ADMIN_PASSWORD || "Qwer1234.26Bc1q5515";

    const inputEmail = email.toLowerCase().trim();

    const isMatch = (inputEmail === validEmail || inputEmail === "henriquecarreto01@gmail.com") && password === validPassword;

    if (!isMatch) {
      registerLoginAttempt(ip, false);
      logSecurityEvent("LOGIN_FAILED", { ip, email: inputEmail });
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique os dados informados." },
        { status: 401 }
      );
    }

    // Success
    registerLoginAttempt(ip, true);
    await setAdminSessionCookie(inputEmail);
    logSecurityEvent("LOGIN_SUCCESSFUL", { ip, email: inputEmail });

    return NextResponse.json(
      { success: true, message: "Autenticação realizada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Auth API Login Error]:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor de autenticação." },
      { status: 500 }
    );
  }
}
