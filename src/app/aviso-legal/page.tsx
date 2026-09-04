import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso Legal | HDZ Finance",
  description:
    "Informações importantes sobre a finalidade informativa e educacional dos conteúdos da HDZ Finance.",
};

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-16 md:py-24 font-sans">
      <div className="w-[calc(100%-48px)] max-w-[900px] mx-auto space-y-10">
        {/* Header Section */}
        <header className="space-y-3 text-left border-b border-white/[0.08] pb-10">
          <span className="text-[12px] md:text-[13px] font-bold text-[#147BFF] uppercase tracking-widest block">
            INFORMAÇÃO E RESPONSABILIDADE
          </span>

          <h1 className="font-outfit font-bold text-[34px] md:text-[48px] text-[#F59A18] tracking-tight leading-[1.15]">
            Aviso Legal
          </h1>

          {/* Short Gold Line (~48px) */}
          <div className="w-12 h-[3px] bg-[#F59A18] rounded-full my-3" />

          <p className="text-[17px] md:text-[19px] text-[#FFFFFF] max-w-[850px] leading-relaxed font-normal">
            Antes de utilizar os conteúdos da HDZ Finance para formar uma opinião ou tomar uma decisão financeira, leia as informações importantes apresentadas nesta página.
          </p>

          <p className="text-[13px] md:text-[14px] text-[#A7AFBA] pt-2 font-medium">
            Última atualização: setembro de 2026
          </p>
        </header>

        {/* Bloco de Aviso Principal em Destaque */}
        <section className="my-9 p-6 md:p-7 bg-[#F59A18]/[0.045] border-l-[3px] border-[#F59A18] rounded-r-xl space-y-3 text-left">
          <h2 className="font-outfit font-bold text-[19px] md:text-[21px] text-[#F59A18] leading-snug">
            Informação importante
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#F5F7FA] font-semibold leading-[1.7]">
            Os conteúdos da HDZ Finance possuem finalidade informativa e educacional. Eles não constituem sinais de investimento, ordens de compra ou venda, recomendações personalizadas, ofertas de valores mobiliários ou garantias de resultado.
          </p>
          <p className="text-[16px] md:text-[18px] text-[#F5F7FA] font-semibold leading-[1.7]">
            Não replique automaticamente uma operação ou tome uma decisão financeira apenas porque determinado ativo, empresa, moeda ou estratégia foi mencionado no site.
          </p>
        </section>

        {/* 13 Seções do Aviso Legal */}
        <div className="divide-y divide-white/[0.08]">
          {/* 01 — FINALIDADE DOS CONTEÚDOS */}
          <article className="py-7 md:py-9 text-left first:pt-0">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              01
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              FINALIDADE DOS CONTEÚDOS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                A HDZ Finance é um portal de conteúdo editorial, informativo e educacional sobre economia, mercados, finanças pessoais, criptoativos e tecnologia.
              </p>
              <p>
                As notícias, matérias, análises gerais, exemplos, simuladores e materiais educacionais têm como objetivo ampliar o conhecimento do leitor e ajudar na compreensão desses assuntos.
              </p>
            </div>
          </article>

          {/* 02 — NÃO PRESTAMOS SERVIÇOS FINANCEIROS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              02
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              NÃO PRESTAMOS SERVIÇOS FINANCEIROS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                A HDZ Finance não atua como instituição financeira, corretora, distribuidora de valores, administradora de carteira ou consultoria personalizada de investimentos.
              </p>
              <p>
                Não recebemos ordens, não executamos operações, não administramos recursos de usuários e não decidimos como o patrimônio de cada pessoa deve ser investido.
              </p>
            </div>
          </article>

          {/* 03 — NÃO SOMOS UM GRUPO DE SINAIS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              03
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              NÃO SOMOS UM GRUPO DE SINAIS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                A HDZ Finance não é um grupo ou serviço de sinais de investimento.
              </p>
              <p>
                Não enviamos calls, indicações de entrada ou saída, preços-alvo, stops, ordens de compra ou venda, operações personalizadas, copy trade ou promessas de rentabilidade.
              </p>
              <p>
                A menção a um ativo não significa indicação para comprar, vender ou manter esse investimento.
              </p>
            </div>
          </article>

          {/* 04 — NÃO REPLIQUE OPERAÇÕES */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              04
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              NÃO REPLIQUE OPERAÇÕES
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Exemplos, opiniões, projeções ou estratégias apresentados nos conteúdos não devem ser automaticamente replicados como instruções de investimento.
              </p>
              <p>
                As informações são gerais e não consideram a situação financeira, os objetivos, o conhecimento ou a tolerância a riscos de cada pessoa.
              </p>
              <p>
                Antes de tomar uma decisão, faça sua própria análise e, quando necessário, procure um profissional devidamente autorizado.
              </p>
            </div>
          </article>

          {/* 05 — RISCOS DOS INVESTIMENTOS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              05
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              RISCOS DOS INVESTIMENTOS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Investimentos envolvem riscos e podem resultar em perda parcial ou total do valor investido.
              </p>
              <p>
                Rentabilidade passada não representa garantia de resultados futuros. Projeções, cenários e simulações são apenas estimativas e podem não se confirmar.
              </p>
              <p>
                Cada usuário deve avaliar se determinado produto ou operação é adequado à sua realidade.
              </p>
            </div>
          </article>

          {/* 06 — COTAÇÕES E DADOS DE MERCADO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              06
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              COTAÇÕES E DADOS DE MERCADO
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                As cotações, índices, gráficos, percentuais e estatísticas exibidos no site podem ser fornecidos por serviços externos.
              </p>
              <p>
                Esses dados podem apresentar atrasos, indisponibilidades, diferenças de atualização ou imprecisões.
              </p>
              <p>
                As informações exibidas no ticker e nas páginas da HDZ Finance não devem ser utilizadas como única referência para executar operações. Antes de negociar, consulte os dados disponibilizados por sua instituição financeira ou por uma fonte oficial apropriada.
              </p>
            </div>
          </article>

          {/* 07 — CONTEÚDOS, SIMULAÇÕES E PROJEÇÕES */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              07
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTEÚDOS, SIMULAÇÕES E PROJEÇÕES
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Exemplos numéricos, cenários hipotéticos, projeções e simuladores possuem finalidade exclusivamente educacional.
              </p>
              <p>
                Os resultados reais podem ser diferentes em razão de mudanças econômicas, tributárias, regulatórias, tecnológicas ou de mercado.
              </p>
              <p>
                Quando um conteúdo utilizar hipóteses ou dados demonstrativos, essa condição deverá ser informada ao leitor.
              </p>
            </div>
          </article>

          {/* 08 — ATUALIZAÇÃO E PRECISÃO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              08
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              ATUALIZAÇÃO E PRECISÃO
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Buscamos apresentar informações claras e baseadas em fontes consideradas confiáveis no momento da publicação.
              </p>
              <p>
                Entretanto, leis, preços, indicadores, regras e condições de mercado podem mudar. Por isso, recomendamos que o leitor verifique a data do conteúdo e consulte fontes atualizadas antes de tomar decisões.
              </p>
              <p>
                Quando identificarmos um erro relevante, poderemos corrigir ou atualizar a publicação.
              </p>
            </div>
          </article>

          {/* 09 — DECISÕES DO USUÁRIO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              09
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              DECISÕES DO USUÁRIO
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                O usuário é responsável por avaliar as informações e tomar suas próprias decisões.
              </p>
              <p>
                A HDZ Finance não se responsabiliza por perdas decorrentes de decisões financeiras tomadas exclusivamente com base em conteúdos gerais, educacionais ou demonstrativos do portal.
              </p>
              <p>
                Essa disposição não exclui ou reduz responsabilidades que não possam ser afastadas pela legislação aplicável.
              </p>
            </div>
          </article>

          {/* 10 — CONTEÚDOS DE TERCEIROS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              10
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTEÚDOS DE TERCEIROS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                O site pode apresentar links, vídeos, notícias, ferramentas ou informações fornecidas por terceiros.
              </p>
              <p>
                A HDZ Finance não controla integralmente a disponibilidade, a precisão ou as práticas desses ambientes externos.
              </p>
              <p>
                Ao acessar um serviço externo, o usuário deverá consultar os termos e as políticas do respectivo responsável, sem prejuízo das responsabilidades previstas em lei.
              </p>
            </div>
          </article>

          {/* 11 — CURSOS E E-BOOKS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              11
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CURSOS E E-BOOKS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Os cursos, e-books e demais produtos da HDZ Finance possuem finalidade educacional.
              </p>
              <p>
                A aquisição de um produto não representa promessa de lucro, retorno financeiro, valorização de ativos ou sucesso em investimentos.
              </p>
              <p>
                As condições de preço, acesso, cancelamento e eventual reembolso serão apresentadas na página do produto ou durante a contratação, respeitando a legislação aplicável.
              </p>
            </div>
          </article>

          {/* 12 — CONSULTE OS DOCUMENTOS DO SITE */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              12
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONSULTE OS DOCUMENTOS DO SITE
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              Este Aviso Legal deve ser lido em conjunto com os{" "}
              <Link
                href="/termos"
                className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium"
              >
                Termos de Uso
              </Link>
              , a{" "}
              <Link
                href="/privacidade"
                className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium"
              >
                Política de Privacidade
              </Link>{" "}
              e a{" "}
              <Link
                href="/politica-editorial"
                className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium"
              >
                Política Editorial
              </Link>{" "}
              da HDZ Finance.
            </p>
          </article>

          {/* 13 — CONTATO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              13
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTATO
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              Caso tenha alguma dúvida sobre este Aviso Legal, entre em contato com a HDZ Finance.
            </p>
            <div className="pt-3">
              <a
                href="mailto:contatohdzfinance@gmail.com"
                className="inline-flex items-center space-x-2 text-[15px] md:text-[16px] text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium break-all"
              >
                <Mail className="h-4 w-4 text-[#F59A18] shrink-0" />
                <span>contatohdzfinance@gmail.com</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
