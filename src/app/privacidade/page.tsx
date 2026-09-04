import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | HDZ Finance",
  description:
    "Informações sobre como a HDZ Finance trata seus dados pessoais, uso de cookies e seus direitos sob a LGPD.",
};

const privacySections = [
  {
    number: "01",
    title: "QUEM CUIDA DOS SEUS DADOS",
    paragraphs: [
      <>
        A HDZ Finance é responsável pelas decisões relacionadas ao uso dos dados pessoais tratados neste site. Dúvidas e solicitações sobre privacidade podem ser enviadas para{" "}
        <a
          href="mailto:contatohdzfinance@gmail.com"
          className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium break-all"
        >
          contatohdzfinance@gmail.com
        </a>
        .
      </>,
    ],
  },
  {
    number: "02",
    title: "QUAIS DADOS PODEMOS UTILIZAR",
    paragraphs: [
      "Quando você envia uma mensagem pelo formulário de contato, recebemos as informações que você decide fornecer, como nome, e-mail, assunto e conteúdo da mensagem.",
      "O site também pode gerar informações técnicas necessárias ao seu funcionamento e à sua segurança, como endereço IP, tipo de navegador, dispositivo utilizado, páginas acessadas, data e horário do acesso.",
      "Não envie dados pessoais sensíveis pelo formulário, a menos que isso seja realmente necessário para o atendimento.",
    ],
  },
  {
    number: "03",
    title: "PARA QUE USAMOS OS DADOS",
    paragraphs: [
      "Os dados podem ser utilizados para responder mensagens, prestar suporte, proteger o funcionamento do site, melhorar a experiência de navegação e cumprir obrigações legais.",
      "De acordo com a finalidade, o tratamento poderá se basear no consentimento, em uma solicitação feita pelo próprio usuário, no legítimo interesse ou no cumprimento de uma obrigação prevista em lei.",
      "Não utilizaremos os dados para finalidades incompatíveis com aquelas informadas nesta política.",
    ],
  },
  {
    number: "04",
    title: "COOKIES E TECNOLOGIAS SEMELHANTES",
    paragraphs: [
      "Cookies são pequenos arquivos utilizados para permitir o funcionamento de determinadas partes do site e lembrar algumas preferências do usuário.",
      "Este site utiliza apenas cookies estritamente necessários para garantir funções essenciais e a segurança da plataforma. Não utilizamos cookies opcionais de análise estatística ou de publicidade sem o seu consentimento prévio.",
    ],
  },
  {
    number: "05",
    title: "COMPARTILHAMENTO DE DADOS",
    paragraphs: [
      "Os dados podem ser compartilhados somente quando isso for necessário para operar o site, processar mensagens, utilizar serviços de hospedagem, proteger a plataforma ou cumprir uma obrigação legal.",
      "Esses serviços devem receber apenas as informações necessárias para a atividade realizada.",
      "A HDZ Finance não vende dados pessoais.",
    ],
  },
  {
    number: "06",
    title: "ARMAZENAMENTO E EXCLUSÃO",
    paragraphs: [
      "Os dados são mantidos somente pelo tempo necessário para atender às finalidades descritas nesta política, cumprir obrigações legais ou proteger direitos.",
      "Quando não houver mais uma finalidade válida para o armazenamento, os dados poderão ser excluídos ou anonimizados, conforme aplicável.",
    ],
  },
  {
    number: "07",
    title: "SEGURANÇA DAS INFORMAÇÕES",
    paragraphs: [
      "Adotamos medidas técnicas e administrativas razoáveis para reduzir riscos de acesso indevido, perda, alteração ou divulgação não autorizada dos dados.",
      "Nenhum sistema digital é totalmente imune a incidentes. Por isso, as medidas de segurança devem ser revisadas e atualizadas sempre que necessário.",
    ],
  },
  {
    number: "08",
    title: "SEUS DIREITOS",
    paragraphs: [
      "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar informações sobre o tratamento dos seus dados.",
      "Conforme o caso, também é possível solicitar acesso, correção, atualização, bloqueio, anonimização, portabilidade ou exclusão dos dados, além de informações sobre compartilhamentos e revogação do consentimento.",
      <>
        Alguns pedidos poderão ser atendidos somente após a confirmação da identidade do solicitante e dentro dos limites estabelecidos pela legislação. Para exercer esses direitos, entre em contato pelo e-mail{" "}
        <a
          href="mailto:contatohdzfinance@gmail.com"
          className="text-[#F59A18] hover:text-[#147BFF] underline underline-offset-2 transition-colors font-medium break-all"
        >
          contatohdzfinance@gmail.com
        </a>
        .
      </>,
    ],
  },
  {
    number: "09",
    title: "LINKS E SERVIÇOS EXTERNOS",
    paragraphs: [
      "O site pode apresentar links para páginas ou serviços de terceiros. Ao acessar esses ambientes, o tratamento dos dados passa a seguir as regras de privacidade do respectivo responsável.",
      "Recomendamos que você consulte a política de privacidade do serviço externo antes de fornecer informações pessoais.",
    ],
  },
  {
    number: "10",
    title: "ALTERAÇÕES DESTA POLÍTICA",
    paragraphs: [
      "Esta política poderá ser atualizada para acompanhar mudanças no site, nos serviços oferecidos ou na legislação.",
      "Quando houver uma alteração relevante, a nova data de atualização será informada no início desta página.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-16 md:py-24 font-sans">
      <div className="w-[calc(100%-48px)] max-w-[900px] mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-3 text-left border-b border-white/[0.08] pb-10">
          <span className="text-[12px] md:text-[13px] font-bold text-[#147BFF] uppercase tracking-widest block">
            PRIVACIDADE E TRANSPARÊNCIA
          </span>

          <h1 className="font-outfit font-bold text-[34px] md:text-[48px] text-[#F59A18] tracking-tight leading-[1.15]">
            Política de Privacidade
          </h1>

          {/* Short Gold Line (~48px) */}
          <div className="w-12 h-[3px] bg-[#F59A18] rounded-full my-3" />

          <p className="text-[17px] md:text-[19px] text-[#FFFFFF] max-w-[850px] leading-relaxed font-normal">
            A sua privacidade importa. Esta política explica, de forma simples, quais dados a HDZ Finance pode utilizar, por que eles são necessários e quais são os seus direitos.
          </p>

          <p className="text-[13px] md:text-[14px] text-[#A7AFBA] pt-2 font-medium">
            Última atualização: setembro de 2026
          </p>
        </header>

        {/* 11 Privacy Sections List */}
        <div className="divide-y divide-white/[0.08]">
          {privacySections.map((section) => (
            <article key={section.number} className="py-7 md:py-9 text-left first:pt-0">
              <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
                {section.number}
              </span>
              <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
                {section.title}
              </h2>
              <div className="space-y-3 mt-3">
                {section.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] font-normal"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {/* Section 11 - Fale Conosco */}
          <article className="py-7 md:py-9 text-left">
            <span className="text-[13px] font-bold text-[#F59A18] tracking-widest block">
              11
            </span>
            <h2 className="font-outfit font-bold text-[20px] md:text-[22px] text-[#F59A18] leading-snug mt-1.5">
              FALE CONOSCO
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E4E8EE] leading-[1.75] md:leading-[1.8] mt-3 font-normal">
              Em caso de dúvidas, solicitações ou questões relacionadas à privacidade, entre em contato com a HDZ Finance.
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
