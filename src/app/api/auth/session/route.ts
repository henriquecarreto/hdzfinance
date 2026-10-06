import { NextResponse } from "next/server";
import { getAdminSessionFromCookie } from "@/lib/security";

export async function GET() {
  try {
    const session = await getAdminSessionFromCookie();

    if (!session.valid) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          email: session.email,
          role: session.role || "admin",
          name: "Henrique Carreto",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
