const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/materias_imported_raw.json', 'utf8'));

// Order by publish_date descending
raw.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

const materiasData = raw.map((item, idx) => {
  let contentText = item.content.replace(/HDZ Crypto[\s\S]*$/i, '').trim();
  
  // Clean formatting into HTML
  const lines = contentText.split(/\r?\n\r?\n/).map(s => s.trim()).filter(Boolean);
  
  let formattedHTML = '';
  lines.forEach((block, i) => {
    // Check if line is heading
    const isHeading = block.length < 90 && !block.endsWith('.') && !block.endsWith(':');
    if (isHeading && i > 0) {
      formattedHTML += `\n      <h2>${block}</h2>`;
    } else if (i === 0 && (block.startsWith('O padrão-ouro:') || block.startsWith('Ciclos de mercado e'))) {
      formattedHTML += `\n      <p class="lead">${block}</p>`;
    } else {
      formattedHTML += `\n      <p>${block}</p>`;
    }
  });

  return {
    id: `mat-legacy-${idx + 1}`,
    legacyId: item.id,
    type: "materia",
    sourceUrl: `https://hdzfinance.vercel.app/noticias/${item.id}`,
    slug: item.slug,
    title: item.title,
    subtitle: item.summary,
    category: item.category.toLowerCase().includes('ouro') ? 'economia' : 'economia',
    categoryName: item.category,
    author: {
      id: "auth-1",
      name: "Equipe Editorial HDZ",
      role: "Análise Econômica & Mercados",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Jornalistas e analistas dedicados ao monitoramento rigoroso do mercado financeiro e indicadores macroeconômicos."
    },
    publishDate: item.published_at,
    updateDate: item.updated_at || item.published_at,
    readTimeMinutes: Math.ceil(item.content.split(/\s+/).length / 200),
    coverImage: `/images/materias/${item.slug}/cover.webp`,
    coverAlt: item.title,
    tags: item.category === 'Esmeralda, Ouro e Prata' 
      ? ["Ouro", "Prata", "Esmeralda", "Reserva de Valor", "Economia"]
      : item.category === 'Gold Standart'
      ? ["Padrão Ouro", "História Monetária", "Bretton Woods", "Moeda Fiduciária", "Economia"]
      : item.slug === 'ciclos-de-mercado'
      ? ["Ciclos de Mercado", "Psicologia do Investidor", "Longo Prazo", "Alocação", "Gestão de Risco"]
      : ["Moeda Fiduciária", "Inflação", "Hiperinflação", "Política Monetária", "História Econômica"],
    keyTakeaways: item.slug === 'por-que-o-ouro-prata-e-esmeralda-voltaram-ao-centro-das-atencoes'
      ? [
          "Ativos reais como ouro, prata e esmeralda voltam ao centro das atenções em cenários de incerteza e inflação.",
          "A escassez física e natural desses ativos os diferencia de moedas fiduciárias sujeitas a emissão discricionária.",
          "O objetivo primário das reservas de valor é a proteção e preservação patrimonial ao longo dos ciclos econômicos."
        ]
      : item.slug === 'como-comeca-se-desenvolve-e-termina-o-colapso-de-uma-moeda'
      ? [
          "O colapso de uma moeda é um processo gradual de perda de confiança e erosão da disciplina fiscal.",
          "A expansão monetária desenfreada gera distorções de preços e desestabiliza a economia real.",
          "O estágio final ocorre quando a moeda deixa de cumprir suas funções básicas de reserva de valor e meio de troca."
        ]
      : item.slug === 'ciclos-de-mercado'
      ? [
          "Os mercados financeiros alternam fases de acumulação, expansão, euforia, distribuição e contração.",
          "A disciplina e o controle emocional permitem aproveitar oportunidades nos momentos de maior pessimismo.",
          "Separar preço de valor é a competência central do investidor focado na construção de patrimônio."
        ]
      : [
          "O padrão-ouro garantia conversibilidade direta das moedas em ouro, promovendo estabilidade cambial e limites à emissão.",
          "As grandes guerras e a Grande Depressão de 1930 expuseram a rigidez do sistema frente a crises fiscais e recessões.",
          "O Choque de Nixon em 1971 encerrou o lastro físico, dando início ao regime monetário integralmente fiduciário."
        ],
    content: formattedHTML
  };
});

fs.writeFileSync('scratch/imported_analyses_array.json', JSON.stringify(materiasData, null, 2));
console.log('Successfully generated scratch/imported_analyses_array.json');
