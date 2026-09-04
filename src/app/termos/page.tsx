import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso | HDZ Finance",
  description:
    "Regras e condições para utilização do site, conteúdos e serviços da HDZ Finance.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-16 md:py-24 font-sans">
      <div className="w-[calc(100%-48px)] max-w-[900px] mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-3 text-left border-b border-white/[0.08] pb-10">
          <span className="text-[12px] md:text-[13px] font-bold text-[#147BFF] uppercase tracking-widest block">
            ACESSO E USO RESPONSÁVEL
          </span>

          <h1 className="font-outfit font-bold text-[34px] md:text-[48px] text-[#F59A18] tracking-tight leading-[1.15]">
            Termos de Uso
          </h1>

          {/* Short Gold Line (~48px) */}
          <div className="w-12 h-[3px] bg-[#F59A18] rounded-full my-3" />

          <p className="text-[17px] md:text-[19px] text-[#FFFFFF] max-w-[850px] leading-relaxed font-normal">
            Estes Termos apresentam as regras para utilização do site e dos conteúdos da HDZ Finance. Ao acessar a plataforma, você declara estar ciente destas condições.
          </p>

          <p className="text-[13px] md:text-[14px] text-[#A7AFBA] pt-2 font-medium">
            Última atualização: setembro de 2026
          </p>
        </header>

        {/* 16 Terms Sections List */}
        <div className="divide-y divide-white/[0.08]">
          {/* 01 — ACEITAÇÃO DOS TERMOS */}
          <article className="py-7 md:py-9 text-left first:pt-0">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              01
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              ACEITAÇÃO DOS TERMOS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Ao acessar ou utilizar o site da HDZ Finance, você declara que leu e compreendeu estes Termos de Uso.
              </p>
              <p>
                Caso não concorde com alguma condição, recomendamos que não utilize os recursos ou serviços correspondentes.
              </p>
              <p>
                Na contratação de cursos, e-books ou outros produtos, poderão ser apresentadas condições adicionais no momento da compra.
              </p>
            </div>
          </article>

          {/* 02 — NATUREZA DA HDZ FINANCE */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              02
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              NATUREZA DA HDZ FINANCE
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                A HDZ Finance é um portal de conteúdo informativo e educacional sobre economia, mercados, finanças pessoais, criptoativos e tecnologia.
              </p>
              <p>
                O portal não atua como corretora, administradora de carteira, consultoria de investimentos ou intermediária de operações financeiras.
              </p>
              <p>
                Também não recebe, movimenta ou administra recursos financeiros dos usuários para realização de investimentos.
              </p>
            </div>
          </article>

          {/* 03 — NÃO SOMOS UM GRUPO DE SINAIS (Special Premium Highlight) */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              03
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              NÃO SOMOS UM GRUPO DE SINAIS
            </h2>
            <div className="my-4 p-5 md:p-6 border-l-4 border-[#F59A18] bg-[#F59A18]/[0.045] rounded-r-xl space-y-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p className="font-medium text-[#FFFFFF]">
                A HDZ Finance não é um grupo ou serviço de sinais de investimento.
              </p>
              <p>
                Não enviamos calls, ordens de compra ou venda, pontos de entrada ou saída, preços-alvo, indicações de stop, operações personalizadas, copy trade ou promessas de rentabilidade.
              </p>
              <p>
                Menções a empresas, ativos, índices, moedas ou criptoativos são apresentadas exclusivamente para fins informativos, jornalísticos ou educacionais.
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
                Exemplos, opiniões, notícias, estudos e análises publicados pela HDZ Finance não devem ser interpretados nem automaticamente replicados como instruções para investir.
              </p>
              <p>
                Não compre, venda ou mantenha um ativo apenas porque ele foi mencionado em nossos conteúdos.
              </p>
              <p>
                Antes de tomar qualquer decisão financeira, considere seus objetivos, sua situação pessoal, sua tolerância a riscos e faça uma análise independente. Quando necessário, procure um profissional devidamente autorizado.
              </p>
            </div>
          </article>

          {/* 05 — CONTEÚDO EDUCACIONAL E RISCOS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              05
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTEÚDO EDUCACIONAL E RISCOS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Todo investimento envolve riscos, inclusive a possibilidade de perda parcial ou total do valor investido.
              </p>
              <p>
                Rentabilidade passada não representa garantia de resultados futuros. Exemplos, projeções e simulações podem não se confirmar.
              </p>
              <p>
                Os conteúdos da HDZ Finance não substituem orientação financeira, jurídica, contábil, fiscal ou tributária adequada à situação individual de cada usuário.
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
                As cotações, índices, percentuais e demais dados de mercado exibidos no site podem ser fornecidos por serviços externos e apresentar atrasos, indisponibilidades ou divergências.
              </p>
              <p>
                Essas informações possuem finalidade visual e informativa e não devem ser utilizadas como única fonte para executar operações financeiras.
              </p>
              <p>
                Antes de negociar qualquer ativo, confira os dados diretamente em sua instituição financeira ou em uma fonte oficial apropriada.
              </p>
            </div>
          </article>

          {/* 07 — RESPONSABILIDADE DO USUÁRIO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              07
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              RESPONSABILIDADE DO USUÁRIO
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Cada usuário é responsável por avaliar as informações e decidir como utilizá-las.
              </p>
              <p>
                Decisões financeiras devem ser tomadas de forma consciente e independente, considerando os riscos envolvidos.
              </p>
              <p>
                O usuário não deve apresentar conteúdos da HDZ Finance a terceiros como se fossem sinais, ordens, recomendações personalizadas ou garantias de resultado.
              </p>
            </div>
          </article>

          {/* 08 — USO PERMITIDO DO SITE */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              08
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              USO PERMITIDO DO SITE
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                O site deve ser utilizado de forma legal, responsável e compatível com sua finalidade informativa e educacional.
              </p>
              <p className="font-medium text-[#FFFFFF] pt-1">
                Não é permitido:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E4E8EE]">
                <li>Utilizar o site para praticar atividades ilegais ou fraudulentas.</li>
                <li>Tentar acessar áreas, sistemas ou dados sem autorização.</li>
                <li>Interferir no funcionamento ou na segurança da plataforma.</li>
                <li>Utilizar robôs ou ferramentas automatizadas para copiar conteúdos em massa.</li>
                <li>Apresentar-se falsamente como representante ou parceiro da HDZ Finance.</li>
                <li>Utilizar a marca ou os conteúdos para criar grupos de sinais, serviços de copy trade ou recomendações de investimento.</li>
                <li>Retirar créditos, marcas, avisos ou informações de autoria.</li>
              </ul>
            </div>
          </article>

          {/* 09 — DIREITOS AUTORAIS E REPRODUÇÃO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              09
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              DIREITOS AUTORAIS E REPRODUÇÃO
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Textos, matérias, e-books, cursos, imagens, identidade visual, logotipo, materiais gráficos e demais conteúdos autorais da HDZ Finance são protegidos pela legislação aplicável.
              </p>
              <p>
                O compartilhamento do link original de uma página é permitido.
              </p>
              <p>
                Também são permitidas citações e utilizações de pequenos trechos nos limites previstos em lei, desde que sejam indicados claramente a autoria e o link da fonte original.
              </p>
              <p className="font-medium text-[#FFFFFF] pt-1">
                Dependem de autorização prévia e expressa:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E4E8EE]">
                <li>Reprodução integral de matérias, cursos ou e-books.</li>
                <li>Distribuição, venda ou disponibilização de cópias.</li>
                <li>Uso comercial dos conteúdos.</li>
                <li>Alteração ou remoção de créditos e marcas.</li>
                <li>Criação de materiais derivados que reproduzam substancialmente o conteúdo original.</li>
                <li>Publicação dos materiais em grupos, plataformas, sites ou redes sociais como se fossem próprios.</li>
                <li>Utilização dos conteúdos para alimentar grupos de sinais, robôs, serviços financeiros ou produtos concorrentes.</li>
              </ul>
              <p className="pt-2">
                Pedidos de autorização devem ser enviados para{" "}
                <a
                  href="mailto:contatohdzfinance@gmail.com"
                  className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium break-all"
                >
                  contatohdzfinance@gmail.com
                </a>
                .
              </p>
            </div>
          </article>

          {/* 10 — CURSOS, E-BOOKS E PRODUTOS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              10
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CURSOS, E-BOOKS E PRODUTOS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Cursos, e-books e demais produtos da HDZ Finance possuem finalidade educacional.
              </p>
              <p>
                Informações sobre preço, conteúdo, acesso, duração, cancelamento e eventual reembolso deverão ser apresentadas de forma clara na página de cada produto ou durante a contratação.
              </p>
              <p>
                Nenhuma disposição destes Termos elimina ou reduz direitos assegurados pela legislação brasileira, inclusive os direitos aplicáveis às relações de consumo.
              </p>
              <p>
                Os materiais adquiridos são destinados ao uso pessoal do comprador, salvo quando a licença do produto informar expressamente uma condição diferente.
              </p>
            </div>
          </article>

          {/* 11 — LINKS E SERVIÇOS DE TERCEIROS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              11
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              LINKS E SERVIÇOS DE TERCEIROS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                O site pode apresentar links, vídeos, cotações, ferramentas ou serviços fornecidos por terceiros.
              </p>
              <p>
                Ao acessar um ambiente externo, o usuário também ficará sujeito aos termos e às políticas do respectivo serviço.
              </p>
              <p>
                A HDZ Finance não controla integralmente conteúdos, disponibilidade ou práticas de plataformas externas, sem prejuízo das responsabilidades que não possam ser afastadas pela legislação.
              </p>
            </div>
          </article>

          {/* 12 — DISPONIBILIDADE E ATUALIZAÇÕES */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              12
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              DISPONIBILIDADE E ATUALIZAÇÕES
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Buscamos manter o site disponível e as informações organizadas, mas podem ocorrer interrupções, erros técnicos, atrasos ou períodos de manutenção.
              </p>
              <p>
                Conteúdos podem ser corrigidos, atualizados ou removidos quando necessário.
              </p>
              <p>
                Alterações relevantes nestes Termos serão acompanhadas da nova data de atualização no início da página.
              </p>
            </div>
          </article>

          {/* 13 — LIMITES LEGAIS DE RESPONSABILIDADE */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              13
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              LIMITES LEGAIS DE RESPONSABILIDADE
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                A HDZ Finance não garante resultados financeiros nem se responsabiliza por decisões tomadas exclusivamente com base em conteúdos gerais e educacionais publicados no portal.
              </p>
              <p>
                Isso não exclui responsabilidades que, de acordo com a legislação aplicável, não possam ser limitadas ou afastadas.
              </p>
            </div>
          </article>

          {/* 14 — PRIVACIDADE */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              14
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              PRIVACIDADE
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              O tratamento de dados pessoais relacionado à utilização do site segue as regras apresentadas em nossa{" "}
              <Link
                href="/privacidade"
                className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </article>

          {/* 15 — LEGISLAÇÃO E SOLUÇÃO DE DÚVIDAS */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              15
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              LEGISLAÇÃO E SOLUÇÃO DE DÚVIDAS
            </h2>
            <div className="space-y-3 mt-3 text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal">
              <p>
                Estes Termos são interpretados de acordo com a legislação brasileira.
              </p>
              <p>
                Eventuais questões serão tratadas pelos meios e órgãos competentes definidos na legislação, preservados os direitos aplicáveis ao consumidor.
              </p>
            </div>
          </article>

          {/* 16 — CONTATO */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              16
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              CONTATO
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato com a HDZ Finance.
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
