import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política Editorial | HDZ Finance",
  description:
    "Transparência, independência e compromisso com a informação em conteúdos de economia, mercados e finanças.",
};

const editorialSections = [
  {
    number: "01",
    title: "INFORMAÇÃO COM RESPONSABILIDADE",
    text: "Nosso compromisso é apresentar informações claras, úteis e baseadas em dados verificáveis. Antes de publicar, buscamos confirmar números, datas e acontecimentos em fontes confiáveis.",
  },
  {
    number: "02",
    title: "FONTES E CONTEXTO",
    text: "Priorizamos documentos oficiais, dados públicos, comunicados institucionais e estudos reconhecidos. Sempre que possível, indicamos a origem das informações para que o leitor possa consultar e compreender melhor o assunto.",
  },
  {
    number: "03",
    title: "INDEPENDÊNCIA EDITORIAL",
    text: "Nossos conteúdos são produzidos com independência. Parcerias comerciais não devem determinar conclusões editoriais. Quando uma publicação tiver caráter publicitário ou patrocinado, essa informação será apresentada de forma clara.",
  },
  {
    number: "04",
    title: "CONTEÚDO EDUCACIONAL",
    text: "Os conteúdos da HDZ Finance têm finalidade informativa e educacional. Eles não representam recomendação de compra ou venda de ativos e não substituem uma análise profissional adequada à realidade de cada pessoa.",
  },
  {
    number: "05",
    title: "CORREÇÕES E ATUALIZAÇÕES",
    text: "Se identificarmos um erro ou uma informação desatualizada, faremos a correção com clareza e agilidade. Quando a alteração for relevante, informaremos a data da atualização no próprio conteúdo.",
  },
  {
    number: "06",
    title: "CLAREZA PARA O LEITOR",
    text: "Procuramos explicar temas financeiros e econômicos de forma simples, sem perder a precisão. Nosso objetivo é ajudar o leitor a compreender melhor as informações e formar suas próprias conclusões.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-16 md:py-24 font-sans">
      <div className="w-[calc(100%-48px)] max-w-[900px] mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-3 text-left border-b border-white/[0.08] pb-10">
          <span className="text-[12px] md:text-[13px] font-bold text-[#147BFF] uppercase tracking-widest block">
            TRANSPARÊNCIA E CONFIANÇA
          </span>

          <h1 className="font-outfit font-bold text-[34px] md:text-[48px] text-[#F59A18] tracking-tight leading-[1.15]">
            Política Editorial
          </h1>

          {/* Short Gold Line (~48px) */}
          <div className="w-12 h-[3px] bg-[#F59A18] rounded-full my-3" />

          <p className="text-[17px] md:text-[19px] text-[#FFFFFF] max-w-[850px] leading-relaxed font-normal">
            A HDZ Finance produz notícias, matérias e conteúdos educacionais sobre economia, mercados, finanças pessoais, criptoativos e tecnologia. Nesta página, explicamos de forma clara os princípios que orientam nosso trabalho.
          </p>

          <p className="text-[13px] md:text-[14px] text-[#A7AFBA] pt-2 font-medium">
            Última atualização: setembro de 2026
          </p>
        </header>

        {/* 7 Editorial Principles List */}
        <div className="divide-y divide-white/[0.08]">
          {editorialSections.map((section) => (
            <article key={section.number} className="py-7 md:py-9 text-left first:pt-0">
              <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
                {section.number}
              </span>
              <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
                {section.title}
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
                {section.text}
              </p>
            </article>
          ))}

          {/* Section 07 - Contato */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              07
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTATO
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              Dúvidas, sugestões ou pedidos de correção podem ser enviados para{" "}
              <a
                href="mailto:contatohdzfinance@gmail.com"
                className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium break-all"
              >
                contatohdzfinance@gmail.com
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
