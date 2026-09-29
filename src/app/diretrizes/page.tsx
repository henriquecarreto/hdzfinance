import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diretrizes | HDZ Finance",
  description:
    "Diretrizes editoriais, termos de uso, responsabilidade sobre investimentos, privacidade e privacidade de dados da HDZ Finance.",
};

export default function DiretrizesPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E5EAF0] py-12 md:py-20 font-sans">
      <div className="w-[calc(100%-48px)] max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-3 text-left border-b border-white/[0.10] pb-8">
          <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
            TERMOS E PRIVACIDADE
          </span>
          <h1 className="font-outfit font-bold text-3xl md:text-5xl text-[#FFFFFF] tracking-tight">
            Diretrizes da HDZ Finance
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#9EAAB8] font-medium pt-1">
            Última atualização: 29 de setembro de 2026
          </p>
        </header>

        {/* Content Body - Single Reading Column */}
        <div className="space-y-10 text-left">
          {/* SEÇÃO 1 */}
          <section className="space-y-3">
            <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] uppercase tracking-wide">
              SEÇÃO 1 — CONTEÚDO E INDEPENDÊNCIA
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              A HDZ Finance publica notícias, comentários editoriais independentes e conteúdo educacional sobre Bitcoin, economia e mercados. As informações e interpretações refletem as fontes disponíveis na data de publicação e podem mudar. Procuramos identificar as fontes relevantes e corrigir erros quando constatados.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              A HDZ Finance não é uma plataforma de negociação, não executa ordens, não administra recursos de visitantes e não oferece sinais de compra ou venda.
            </p>
          </section>

          {/* SEÇÃO 2 */}
          <section className="space-y-3">
            <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] uppercase tracking-wide">
              SEÇÃO 2 — INVESTIMENTOS E RISCOS
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              O conteúdo tem caráter geral e informativo. Não constitui recomendação individual de investimento, consultoria financeira, oferta de ativos ou promessa de resultado. Ele não considera objetivos, situação financeira ou tolerância a risco de cada pessoa.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              Bitcoin e outros ativos podem apresentar fortes variações de preço e perdas, inclusive do capital investido. Cabe ao leitor verificar as informações, avaliar os riscos e tomar suas próprias decisões, buscando orientação profissional habilitada quando necessário.
            </p>
          </section>

          {/* SEÇÃO 3 */}
          <section className="space-y-3">
            <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] uppercase tracking-wide">
              SEÇÃO 3 — PRECISÃO E RESPONSABILIDADE
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              Cotações, dados de mercado e notícias podem sofrer atrasos, revisões ou interrupções. A HDZ Finance não garante atualização contínua nem resultados decorrentes do uso das informações publicadas. Decisões tomadas pelo leitor são de sua responsabilidade. Esta disposição não exclui responsabilidades que a legislação atribua à HDZ Finance.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              Links para plataformas, vídeos e serviços externos levam a ambientes sujeitos às regras e práticas dos respectivos responsáveis.
            </p>
          </section>

          {/* SEÇÃO 4 */}
          <section className="space-y-3">
            <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] uppercase tracking-wide">
              SEÇÃO 4 — PRIVACIDADE
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              A leitura das páginas públicas não exige conta, cadastro, nome ou e-mail. A operação do site e da infraestrutura de hospedagem envolve o tratamento automático de dados técnicos de acesso, como endereço IP, data/horário das requisições e informações do navegador. Mensagens enviadas voluntariamente pelo canal de contato (nome, e-mail, assunto e mensagem) são utilizadas estritamente para responder à solicitação encaminhada.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              O site opera sem a utilização de cookies de rastreamento publicitário, pixels de medição ou scripts de analytics de terceiros. As cotações e dados de mercado exibidos são obtidos por meio de requisições realizadas no servidor (incluindo serviços como Banco Central do Brasil, brapi.dev, AwesomeAPI, Bitstamp e Twelve Data), garantindo que os leitores naveguem sem que seus dados pessoais sejam transmitidos a essas plataformas externas.
            </p>
          </section>

          {/* SEÇÃO 5 */}
          <section className="space-y-3">
            <h2 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] uppercase tracking-wide">
              SEÇÃO 5 — USO DO CONTEÚDO E TREINAMENTOS
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              Textos, identidade visual e materiais próprios da HDZ Finance não podem ser reproduzidos integralmente sem autorização, ressalvados os usos permitidos por lei. Citações devem indicar a fonte e o link correspondente.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed">
              A eventual contratação de cursos ou treinamentos segue as informações e condições específicas apresentadas na respectiva oferta. Estas Diretrizes tratam da navegação e do conteúdo público do site.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#E5EAF0] leading-relaxed pt-2">
              Para dúvidas, correções ou solicitações relacionadas a estas Diretrizes, utilize a página{" "}
              <Link
                href="/contato"
                className="text-[#147BFF] hover:text-[#3A91FF] underline underline-offset-2 transition-colors font-medium"
              >
                Contato
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
