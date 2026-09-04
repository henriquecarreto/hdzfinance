import { NextResponse } from "next/server";

const VALID_SUBJECTS = [
  "Dúvida geral",
  "Sugestão de pauta",
  "Cursos e e-books",
  "Parcerias",
  "Suporte",
  "Outro assunto",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, hp_field } = body || {};

    // 1. Protection against automated spam bots (Honeypot)
    if (hp_field && hp_field.trim() !== "") {
      return NextResponse.json(
        { success: true, message: "Mensagem enviada com sucesso!" },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Por favor, informe seu nome." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Por favor, informe um endereço de e-mail válido." },
        { status: 400 }
      );
    }

    if (!subject || !VALID_SUBJECTS.includes(subject)) {
      return NextResponse.json(
        { error: "Por favor, selecione um assunto válido." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Por favor, escreva uma mensagem com mais detalhes." },
        { status: 400 }
      );
    }

    // Target recipient address (contatohdzfinance@gmail.com)
    const targetEmail = process.env.CONTACT_DESTINATION_EMAIL || "contatohdzfinance@gmail.com";

    // Log securely server-side
    console.log(`[HDZ Contact Form] New message for ${targetEmail}:`, {
      name: name.trim(),
      email: email.trim(),
      subject,
      messageLength: message.trim().length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sua mensagem foi enviada com sucesso! Responderemos em breve.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[HDZ Contact Form API Error]:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
