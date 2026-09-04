"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("success");
  };

  return (
    <section className="w-full bg-[#0D1117] border border-white/[0.08] rounded-3xl p-8 md:p-14 relative overflow-hidden my-16">
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#147BFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center space-y-5 relative z-10">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-[#050607] border border-white/[0.08] text-[#147BFF] mb-2">
          <Mail className="h-6 w-6" />
        </div>

        <h2 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] tracking-tight leading-tight">
          Informação relevante, sem o ruído do mercado.
        </h2>

        <p className="text-sm md:text-base text-[#9BA5B3] max-w-lg mx-auto leading-relaxed">
          Receba as principais notícias e análises da HDZ Finance diretamente no seu e-mail.
        </p>

        {status === "idle" ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail profissional"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-[#050607] border border-white/[0.08] text-[#F5F7FA] placeholder-[#9BA5B3]/60 focus:outline-none focus:border-[#147BFF] text-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#147BFF] hover:bg-[#3A91FF] text-white font-outfit font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shrink-0 active:scale-[0.98]"
            >
              <span>Inscrever-se</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-center space-x-2 max-w-md mx-auto animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>
              Cadastro demonstrativo efetuado com sucesso! Em breve enviaremos nossas análises.
            </span>
          </div>
        )}

        <p className="text-[11px] text-[#9BA5B3]/60 pt-2">
          Respeitamos sua privacidade. Cancele sua inscrição a qualquer momento com 1 clique.
        </p>
      </div>
    </section>
  );
}
