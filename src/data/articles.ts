import { Article, Author } from "@/types";

export const AUTHORS: Record<string, Author> = {
  editoria: {
    id: "auth-1",
    name: "Produção HDZ Finance",
    role: "Análise Econômica & Mercados",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Jornalistas e analistas dedicados ao monitoramento rigoroso do mercado financeiro e indicadores macroeconômicos.",
  },
  lucas: {
    id: "auth-2",
    name: "Lucas Andrade",
    role: "Estrategista de Renda Fixa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Especialista em títulos públicos, política monetária do Banco Central e alocação de ativos defensivos.",
  },
  mariana: {
    id: "auth-3",
    name: "Mariana Costa",
    role: "Analista de Criptoativos e Tecnologia",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Focada em arquitetura blockchain, protocolo Bitcoin e a interseção entre finanças tradicionais e descentralizadas.",
  },
};

export const ARTICLES: Article[] = [
  {
    id: "noticia-petroleo-sobe-e-aie-pede-liberacao-de-estoques-de-diesel",
    type: "noticia",
    slug: "petroleo-sobe-e-aie-pede-liberacao-de-estoques-de-diesel",
    title: "Petróleo sobe e AIE pede liberação de estoques de diesel",
    subtitle:
      "Brent avançava 2% em cotação intradiária. Agência orientou países a acelerar compromissos anteriores e avaliar liberações adicionais de diesel.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-12T15:11:00.000Z",
    updateDate: "2026-10-12T15:11:00.000Z",
    readTimeMinutes: 3,
    coverImage:
      "/images/noticias/petroleo-sobe-e-aie-pede-liberacao-de-estoques-de-diesel/cover.png",
    coverAlt: "Petróleo sobe e AIE pede liberação de estoques de diesel",
    isFeatured: true,
    isMostRead: true,
    tags: ["petroleo", "brent", "aie", "diesel", "energia", "economia"],
    content: `
      <p>O petróleo Brent avançava 2%, a US$ 106,76 por barril, às 12h07 de Brasília desta segunda-feira, 12 de outubro, segundo a Reuters. A alta ocorreu em meio às tensões no Oriente Médio e às preocupações com o abastecimento. O valor corresponde ao pregão em andamento no horário informado.</p>

      <p>A pressão sobre o mercado também levou a Agência Internacional de Energia (AIE) a pedir atenção imediata à oferta de diesel. Em comunicado publicado no domingo, 11 de outubro, seu diretor-executivo, Fatih Birol, mencionou os novos ataques contra instalações civis e energéticas na Arábia Saudita.</p>

      <p>Birol orientou os países membros que ainda não entregaram integralmente os volumes prometidos na ação coletiva de março a avaliar uma aceleração das liberações, dando prioridade ao diesel. A agência informou que alguns integrantes já disponibilizaram quantidades superiores às inicialmente previstas.</p>

      <p>A AIE também recomendou que todos os membros, inclusive os que cumpriram seus compromissos, avaliem a necessidade de liberar volumes adicionais de diesel. Caso decidam fazê-lo, os governos devem indicar a quantidade, o prazo e o caráter complementar dessas medidas. Trata-se de uma orientação para decisões nacionais.</p>

      <p>A ação coordenada anunciada em 11 de março continua em andamento, segundo a agência. Ela foi organizada para responder às interrupções no fluxo de energia pelo Estreito de Ormuz. A reunião do conselho da AIE, marcada para 15 de outubro, deverá avaliar os esforços para apoiar o abastecimento e a estabilidade dos mercados.</p>
    `,
  },
  {
    id: "noticia-robert-hall-e-michael-woodford-vencem-nobel-de-economia-de-2026",
    type: "noticia",
    slug: "robert-hall-e-michael-woodford-vencem-nobel-de-economia-de-2026",
    title: "Robert Hall e Michael Woodford vencem Nobel de Economia de 2026",
    subtitle:
      "Premiação reconhece estudos que ajudam governos e bancos centrais a enfrentar crises, considerando as decisões e expectativas de famílias e empresas.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-12T14:40:00.000Z",
    updateDate: "2026-10-12T14:40:00.000Z",
    readTimeMinutes: 3,
    coverImage:
      "/images/noticias/robert-hall-e-michael-woodford-vencem-nobel-de-economia-de-2026/cover.png",
    coverAlt: "Robert Hall e Michael Woodford vencem Nobel de Economia de 2026",
    isFeatured: true,
    isMostRead: true,
    tags: ["nobel", "economia", "banco-central", "macroeconomia"],
    content: `
      <p>Os economistas Robert E. Hall, da Universidade Stanford, e Michael Woodford, da Universidade Columbia, venceram o Nobel de Economia de 2026, anunciado nesta segunda-feira, 12 de outubro. A Academia Real Sueca de Ciências reconheceu suas contribuições para compreender como as decisões individuais influenciam a estabilidade da economia.</p>

      <p>O trabalho dos dois ajudou a reformular modelos usados por governos e bancos centrais. Em vez de observar apenas relações gerais entre inflação, produção e consumo, esses modelos incorporam o comportamento de famílias e empresas. A proposta é melhorar a compreensão das consequências de decisões de política econômica e de choques inesperados sobre a atividade produtiva e o bem-estar das pessoas.</p>

      <p>A pesquisa de Woodford estabeleceu novas bases para a condução da política monetária moderna, demonstrando a importância das expectativas e da comunicação das autoridades financeiras. Já os estudos de Hall detalharam os mecanismos de transmissão de crises e as fricções no mercado de trabalho, auxiliando no desenho de respostas mais eficazes a recessões globais.</p>
    `,
  },
  {
    id: "noticia-microsoft-anuncia-maia-300-e-amplia-aposta-em-chips-proprios-para-ia",
    type: "noticia",
    slug: "microsoft-anuncia-maia-300-e-amplia-aposta-em-chips-proprios-para-ia",
    title: "Microsoft anuncia Maia 300 e amplia aposta em chips próprios para IA",
    subtitle:
      "Nova geração de aceleradores de inteligência artificial visa reduzir dependência de fornecedores externos e otimizar custos operacionais em data centers do Azure.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-12T13:30:00.000Z",
    updateDate: "2026-10-12T13:30:00.000Z",
    readTimeMinutes: 3,
    coverImage:
      "/images/noticias/microsoft-anuncia-maia-300-e-amplia-aposta-em-chips-proprios-para-ia/cover.png",
    coverAlt: "Microsoft anuncia Maia 300 e amplia aposta em chips próprios para IA",
    isFeatured: true,
    isMostRead: true,
    tags: ["microsoft", "inteligencia-artificial", "semicondutores", "chips", "azure", "economia"],
    content: `
      <p>A Microsoft anunciou nesta segunda-feira a nova geração de seus aceleradores de inteligência artificial personalizados, denominada Maia 300. Projetado internamente para infraestrutura de computação em nuvem de hiperescala, o processador busca reduzir os custos operacionais de processamento de modelos de linguagem e inteligência artificial na plataforma Azure.</p>

      <p>Com litografia avançada e arquitetura otimizada para eficiência energética, o novo hardware visa atender às cargas de trabalho de data centers e fortalecer a infraestrutura tecnológica frente à crescente demanda por computação avançada no mercado global.</p>
    `,
  },
  {
    id: "noticia-conta-de-luz-sobe-798-e-leva-inflacao-de-setembro-a-082",
    type: "noticia",
    slug: "conta-de-luz-sobe-798-e-leva-inflacao-de-setembro-a-082",
    title: "Conta de luz sobe 7,98% e leva inflação de setembro a 0,82%",
    subtitle:
      "O reajuste na bandeira tarifária de energia elétrica pressionou o índice de preços ao consumidor, superando as projeções do mercado e renovando as preocupações com a política monetária.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-11T09:00:00.000Z",
    updateDate: "2026-10-11T09:00:00.000Z",
    readTimeMinutes: 3,
    coverImage:
      "/images/noticias/conta-de-luz-sobe-798-e-leva-inflacao-de-setembro-a-082/cover.png",
    coverAlt: "Conta de luz sobe 7,98% e leva inflação de setembro a 0,82%",
    isFeatured: true,
    isMostRead: true,
    tags: ["inflacao", "energia-eletrica", "ipca", "economia", "copom"],
    content: `
      <p>O Índice Nacional de Preços ao Consumidor Amplo (IPCA) de setembro acelerou para 0,82%, impulsionado diretamente pelo aumento de 7,98% nas tarifas de energia elétrica residencial após o acionamento da bandeira tarifária vermelha patamar 2 pela Agência Nacional de Energia Elétrica (Aneel). O resultado veio significativamente acima da mediana das projeções do mercado financeiro, que apontava para uma variação entre 0,45% e 0,55% para o período.</p>

      <p>A energia elétrica residencial é um dos itens de maior peso na composição do IPCA, correspondendo a cerca de 4% de todo o orçamento médio das famílias brasileiras. Com a vigência da bandeira tarifária mais severa em razão do baixo nível dos reservatórios hidrelétricos e do acionamento continuado de usinas termelétricas, com custo de geração substancialmente superior, o impacto repassado aos consumidores finais foi imediato e generalizado.</p>

      <p>De acordo com os dados oficiais divulgados pelo Instituto Brasileiro de Geografia e Estatística (IBGE), o grupo Habitação registrou a maior alta entre os nove grupos pesquisados, acumulando uma elevação de 2,41% no mês. Além da energia, outros serviços básicos e despesas de moradia apresentaram reajustes contratuais que somaram pressão ao custo de vida das principais regiões metropolitanas do país.</p>

      <p>Economistas e analistas de mercado destacam que o encarecimento da eletricidade não afeta exclusivamente as residências. A indústria de transformação e o setor de serviços, que dependem diretamente de energia elétrica como insumo produtivo essencial, tendem a repassar gradualmente os custos operacionais adicionais para os preços finais de produtos e serviços ao longo dos próximos trimestres.</p>

      <p>O repique inflacionário ocorre em um momento sensível para o Comitê de Política Monetária (Copom). Com a inflação acumulada em 12 meses voltando a se aproximar do teto da meta estabelecida pelo Conselho Monetário Nacional (CMN), as expectativas para a taxa básica de juros foram revisadas para cima no mais recente Boletim Focus.</p>

      <p>A persistência de choques climáticos e custos de infraestrutura reforça a necessidade de vigilância macroeconômica, mantendo o ambiente de juros reais elevados por um período mais prolongado e exigindo disciplina fiscal rigorosa para conter a desancoragem das projeções de longo prazo.</p>
    `,
  },
  {
    id: "noticia-varejo-cresce-63-no-trimestre-mas-setembro-tem-queda-nas-vendas",
    type: "noticia",
    slug: "varejo-cresce-63-no-trimestre-mas-setembro-tem-queda-nas-vendas",
    title: "Varejo cresce 6,3% no trimestre, mas setembro tem queda nas vendas",
    subtitle:
      "Indicador do setor aponta fôlego positivo no acumulado do terceiro trimestre puxado por consumo essencial, enquanto alta dos juros volta a conter segmentos dependentes de crédito.",
    category: "economia",
    categoryName: "Economia",
    author: AUTHORS.editoria,
    publishDate: "2026-10-13T08:00:00.000Z",
    updateDate: "2026-10-13T08:00:00.000Z",
    readTimeMinutes: 3,
    coverImage: "/images/materias/ciclos-de-mercado/cover.webp",
    coverAlt: "Varejo cresce 6,3% no trimestre, mas setembro tem queda nas vendas",
    isFeatured: true,
    isMostRead: true,
    tags: ["varejo", "comercio", "economia", "consumo", "juros"],
    content: `
      <p>O comércio varejista brasileiro encerrou o terceiro trimestre com um avanço expressivo de 6,3% em comparação com o mesmo período do ano anterior. O desempenho positivo foi sustentado principalmente pelo mercado de trabalho aquecido, ganhos reais na massa de rendimento das famílias e maior demanda por bens de primeira necessidade e giro diário.</p>

      <p>Apesar do balanço consolidado favorável no trimestre, os números de setembro acenderam um sinal de alerta entre analistas econômicos ao registrarem uma retração na margem de 0,3% em relação a agosto. O movimento sugere uma acomodação do ritmo de atividade comercial e perda gradual de tração na reta final do ano.</p>

      <p>Segundo analistas do setor, a perda de dinamismo recente decorre da postura mais restritiva da política monetária. Enquanto os segmentos voltados a consumo básico de supermercados, farmácias e combustíveis continuam demonstrando resiliência, categorias mais sensíveis ao custo do crédito — como veículos, eletrodomésticos, móveis e materiais de construção — voltaram a sofrer com taxas de juros elevadas e maior seletividade nas concessões financeiras.</p>

      <p>Para o fechamento do ano, a expectativa do mercado financeiro e de entidades do comércio permanece concentrada nas campanhas promocionais de fim de ano, como a Black Friday e as festas natalinas, que deverão testar a capacidade de endividamento dos consumidores em um contexto macroeconômico de taxa Selic pressionada.</p>
    `,
  },
];

