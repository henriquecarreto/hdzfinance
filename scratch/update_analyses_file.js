const fs = require('fs');

const imported = JSON.parse(fs.readFileSync('scratch/imported_analyses_array.json', 'utf8'));
const existingCode = fs.readFileSync('src/data/analyses.ts', 'utf8');

const existingItemsMatch = existingCode.match(/export const ANALYSES: AnalysisArticle\[\] = \[([\s\S]*)\];/);
const existingItemsText = existingItemsMatch ? existingItemsMatch[1] : '';

let itemsStr = '';

imported.forEach(item => {
  itemsStr += `
  {
    id: ${JSON.stringify(item.id)},
    legacyId: ${JSON.stringify(item.legacyId)},
    type: "materia",
    sourceUrl: ${JSON.stringify(item.sourceUrl)},
    slug: ${JSON.stringify(item.slug)},
    title: ${JSON.stringify(item.title)},
    subtitle: ${JSON.stringify(item.subtitle)},
    category: ${JSON.stringify(item.category)},
    categoryName: ${JSON.stringify(item.categoryName)},
    author: AUTHORS.editoria,
    publishDate: ${JSON.stringify(item.publishDate)},
    updateDate: ${JSON.stringify(item.updateDate)},
    readTimeMinutes: ${item.readTimeMinutes},
    coverImage: ${JSON.stringify(item.coverImage)},
    coverAlt: ${JSON.stringify(item.coverAlt)},
    tags: ${JSON.stringify(item.tags, null, 6)},
    keyTakeaways: ${JSON.stringify(item.keyTakeaways, null, 6)},
    content: \`${item.content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
  },`;
});

const fileHeader = `import { AnalysisArticle } from "@/types";
import { AUTHORS } from "./articles";

export const ANALYSES: AnalysisArticle[] = [`;

const finalFileContent = fileHeader + itemsStr + existingItemsText + '\n];\n';

fs.writeFileSync('src/data/analyses.ts', finalFileContent);
console.log('Successfully updated src/data/analyses.ts with all 4 Matérias!');
