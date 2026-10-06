import { NextResponse } from "next/server";
import { clearAdminSessionCookie, logSecurityEvent } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    await clearAdminSessionCookie();
    logSecurityEvent("LOGOUT_PERFORMED", { ip });

    return NextResponse.json(
      { success: true, message: "Sessão encerrada com segurança." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao encerrar sessão." },
      { status: 500 }
    );
  }
}
