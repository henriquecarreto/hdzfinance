"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, Copy, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Dúvida geral",
    message: "",
    hp_field: "", // Honeypot spam protection
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const contactEmail = "contatohdzfinance@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setStatusMessage(null);

    // Basic frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: "error",
        text: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatusMessage({
        type: "error",
        text: "Por favor, informe um endereço de e-mail válido.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar a mensagem.");
      }

      setStatusMessage({
        type: "success",
        text: "Mensagem enviada com sucesso! Responderemos em breve pelo e-mail informado.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "Dúvida geral",
        message: "",
        hp_field: "",
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro ao enviar sua mensagem. Tente novamente.";
      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-12 md:py-20">
      <div className="w-full space-y-10 md:space-y-12">
        {/* Centralized Header */}
        <div className="text-center space-y-3 max-w-[650px] mx-auto px-5">
          <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
            FALE CONOSCO
          </span>
          <h1 className="font-outfit font-bold text-3xl md:text-5xl text-[#FFFFFF] tracking-tight">
            Contato
          </h1>
          <p className="text-[15px] text-[#A7AFBA] leading-relaxed font-normal">
            Tem alguma dúvida, sugestão ou precisa de informações sobre nossos conteúdos e produtos? Entre em contato com a HDZ Finance.
          </p>
        </div>

        {/* Two-Column Contact Layout (Max Width 1120px) */}
        <div className="w-[calc(100%-48px)] max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(300px,0.8fr)_minmax(480px,1.2fr)] gap-7 items-stretch">
          {/* Left Panel: Painel de Contato Oficial */}
          <div className="p-7 md:p-8 rounded-2xl bg-[#080B0F] border border-white/[0.10] flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit font-bold text-xl md:text-2xl text-[#FFFFFF] mb-2">
                  Contato oficial
                </h2>
                <p className="text-[14px] text-[#A7AFBA] leading-relaxed font-normal">
                  Para dúvidas, sugestões, parcerias ou informações sobre nossos produtos, utilize o formulário ou envie um e-mail diretamente.
                </p>
              </div>

              {/* Email Highlight Box */}
              <div className="p-5 rounded-xl bg-[#050607] border border-white/[0.08] space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-[#F59A18] shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59A18]">
                      E-mail
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#0D1117] hover:bg-[#121720] border border-white/[0.08] text-xs font-medium text-[#A7AFBA] hover:text-[#FFFFFF] transition-all"
                    aria-label="Copiar endereço de e-mail"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#147BFF]" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[14px] md:text-[15px] font-semibold text-[#FFFFFF] hover:text-[#147BFF] transition-colors block break-all"
                >
                  {contactEmail}
                </a>

                {/* Copied Feedback Badge */}
                {copied && (
                  <div className="text-[11px] font-medium text-emerald-400 animate-in fade-in duration-200">
                    E-mail copiado para a área de transferência!
                  </div>
                )}
              </div>
            </div>

            {/* Short Note */}
            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <p className="text-[13px] text-[#A7AFBA] leading-relaxed font-normal">
                Responderemos assim que possível pelo endereço informado em sua mensagem.
              </p>
            </div>
          </div>

          {/* Right Panel: Formulário de Contato */}
          <div className="p-7 md:p-8 rounded-2xl bg-[#080B0F] border border-white/[0.10] shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot anti-spam field (hidden) */}
              <input
                type="text"
                name="hp_field"
                value={formData.hp_field}
                onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Status Alert Message */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-xs md:text-sm font-medium border ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Campo Nome */}
              <div className="space-y-2 text-left">
                <label htmlFor="contact-name" className="text-[14px] font-medium text-[#FFFFFF] block">
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite seu nome"
                  className="w-full h-[48px] px-4 rounded-lg bg-[#050607] border border-white/[0.12] text-[#FFFFFF] placeholder-[#828C99] text-[14px] focus:outline-none focus:border-[#147BFF] focus:ring-1 focus:ring-[#147BFF] transition-all"
                />
              </div>

              {/* Campo E-mail */}
              <div className="space-y-2 text-left">
                <label htmlFor="contact-email" className="text-[14px] font-medium text-[#FFFFFF] block">
                  E-mail
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="voce@exemplo.com"
                  className="w-full h-[48px] px-4 rounded-lg bg-[#050607] border border-white/[0.12] text-[#FFFFFF] placeholder-[#828C99] text-[14px] focus:outline-none focus:border-[#147BFF] focus:ring-1 focus:ring-[#147BFF] transition-all"
                />
              </div>

              {/* Campo Assunto */}
              <div className="space-y-2 text-left">
                <label htmlFor="contact-subject" className="text-[14px] font-medium text-[#FFFFFF] block">
                  Assunto
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-lg bg-[#050607] border border-white/[0.12] text-[#FFFFFF] text-[14px] focus:outline-none focus:border-[#147BFF] focus:ring-1 focus:ring-[#147BFF] transition-all cursor-pointer"
                >
                  <option value="Dúvida geral">Dúvida geral</option>
                  <option value="Sugestão de pauta">Sugestão de pauta</option>
                  <option value="Cursos e e-books">Cursos e e-books</option>
                  <option value="Parcerias">Parcerias</option>
                  <option value="Suporte">Suporte</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>

              {/* Campo Mensagem */}
              <div className="space-y-2 text-left">
                <label htmlFor="contact-message" className="text-[14px] font-medium text-[#FFFFFF] block">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva sua mensagem…"
                  className="w-full h-[140px] p-4 rounded-lg bg-[#050607] border border-white/[0.12] text-[#FFFFFF] placeholder-[#828C99] text-[14px] focus:outline-none focus:border-[#147BFF] focus:ring-1 focus:ring-[#147BFF] transition-all resize-none"
                />
              </div>

              {/* Botão Enviar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[48px] rounded-lg bg-[#147BFF] hover:bg-[#3A91FF] text-[#FFFFFF] font-outfit font-bold text-[15px] transition-all flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#147BFF] disabled:opacity-60 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Enviando mensagem..." : "Enviar mensagem"}</span>
              </button>

              {/* Aviso de Privacidade */}
              <p className="text-[12.5px] text-[#A7AFBA] text-center pt-1 leading-relaxed font-normal">
                Ao enviar a mensagem, você concorda com o tratamento dos dados informados conforme nossas{" "}
                <Link
                  href="/diretrizes"
                  className="text-[#147BFF] hover:text-[#3A91FF] underline underline-offset-2 font-medium"
                >
                  Diretrizes
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
