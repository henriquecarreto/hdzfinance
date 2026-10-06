export interface Book {
  id: string;
  title: string;
  author: string;
  category: "Economia" | "Dinheiro & Investimentos" | "Filosofia" | "Mentalidade" | "História & Sociedade";
  description: string;
  image: string | null;
  purchaseUrl: string;
}

export const BOOK_CATEGORIES = [
  "Todos",
  "Economia",
  "Dinheiro & Investimentos",
  "Filosofia",
  "Mentalidade",
  "História & Sociedade",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

export const RECOMMENDED_BOOKS: Book[] = [
  {
    id: "livro-01",
    title: "Bitcoin: A Moeda na Era Digital",
    author: "Fernando Ulrich",
    category: "Dinheiro & Investimentos",
    description: "Uma introdução clara e rigorosa ao surgimento do Bitcoin, explicando seu funcionamento técnico, fundamentação econômica e impacto no sistema financeiro global.",
    image: "/images/books/bitcoin-a-moeda-na-era-digital.png",
    purchaseUrl: "https://meli.la/1AqtmM8",
  },
  {
    id: "livro-02",
    title: "As Seis Lições",
    author: "Ludwig von Mises",
    category: "Economia",
    description: "Compilação de palestras proferidas por Mises na Universidade de Buenos Aires, abordando capitalismo, socialismo, intervenção estatal, inflação, investimento e política.",
    image: "/images/books/as-seis-licoes.png",
    purchaseUrl: "https://meli.la/2kv6TY5",
  },
  {
    id: "livro-03",
    title: "Bitcoin Red Pill",
    author: "Alan Schramm & Renato Amoedo",
    category: "Dinheiro & Investimentos",
    description: "Análise profunda sobre a soberania individual, escassez digital e o papel do Bitcoin na proteção patrimonial contra a inflação e coerção estatal.",
    image: "/images/books/bitcoin-red-pill.png",
    purchaseUrl: "https://meli.la/1WUEF4W",
  },
  {
    id: "livro-04",
    title: "Democracia, o Deus que Falhou",
    author: "Hans-Hermann Hoppe",
    category: "Filosofia",
    description: "Exame crítico da democracia moderna a partir da teoria econômica austríaca, contrastando a gestão estatal com a propriedade privada e a ordem natural.",
    image: "/images/books/democracia-o-deus-que-falhou.png",
    purchaseUrl: "https://meli.la/1vLJSLe",
  },
  {
    id: "livro-05",
    title: "Ponerologia: Psicopatas no Poder",
    author: "Andrew Lobaczewski",
    category: "Mentalidade",
    description: "Estudo científico sobre a gênese do mal nos processos políticos e sociais, investigando como personalidades patológicas chegam ao poder.",
    image: "/images/books/ponerologia-psicopatas-no-poder.png",
    purchaseUrl: "https://meli.la/1TUb88o",
  },
  {
    id: "livro-06",
    title: "A Lei e outros ensaios",
    author: "Frédéric Bastiat",
    category: "Filosofia",
    description: "Defesa clássica do Estado mínimo, da liberdade individual e da propriedade privada, demonstrando como a legislação pode ser pervertida em espoliação legal.",
    image: "/images/books/a-lei-e-outros-ensaios.png",
    purchaseUrl: "https://meli.la/1ymFq4x",
  },
  {
    id: "livro-07",
    title: "A Estratégia do Oceano Azul",
    author: "W. Chan Kim | Renée Mauborgne",
    category: "Mentalidade",
    description: "Guia prático sobre inovação estratégica para criar novos mercados inexplorados e tornar a concorrência irrelevante no mundo dos negócios.",
    image: "/images/books/a-estrategia-do-oceano-azul.png",
    purchaseUrl: "https://meli.la/1FYcwhP",
  },
  {
    id: "livro-08",
    title: "O Que Deve Ser Feito",
    author: "Hans-Hermann Hoppe",
    category: "Economia",
    description: "Proposta estratégica para a descentralização política, secessão e a construção de uma sociedade baseada no direito privado e na liberdade contratual.",
    image: "/images/books/o-que-deve-ser-feito.png",
    purchaseUrl: "https://meli.la/2GSBLbf",
  },
  {
    id: "livro-09",
    title: "Esquerda e Direita",
    author: "Murray N. Rothbard",
    category: "História & Sociedade",
    description: "Análise histórica e teórica sobre as origens do espectro político moderno, desmistificando velhos dogmas da dicotomia ideológica.",
    image: "/images/books/esquerda-e-direita.png",
    purchaseUrl: "https://meli.la/1WPU7yG",
  },
  {
    id: "livro-10",
    title: "A Mentalidade Anticapitalista",
    author: "Ludwig von Mises",
    category: "Economia",
    description: "Exame psicológico e sociológico dos mofos intelectuais e sentimentos de ressentimento que alimentam a oposição à economia de livre mercado.",
    image: "/images/books/a-mentalidade-anticapitalista.png",
    purchaseUrl: "https://meli.la/2ZukAD7",
  },
];
