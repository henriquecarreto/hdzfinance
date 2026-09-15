import { createClient } from "@supabase/supabase-js";
import path from "path";
import fs from "fs";

const envFiles = [".env.local", ".env"];
for (const envFile of envFiles) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

async function migrateContent() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("---------------------------------------------------------");
  console.log("   HDZ FINANCE - MIGRATION DE CONTEÚDOS EXISTENTES       ");
  console.log("---------------------------------------------------------");

  if (!supabaseUrl || !serviceKey || serviceKey.includes("dummy")) {
    console.log("ℹ️ [HDZ Local Mode] Supabase remoto não configurado.");
    console.log("As 3 Matérias ativas importadas do site antigo continuarão disponíveis no sistema local e prontas para sincronização assim que as chaves forem fornecidas.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Load manifest or imported json if available
  const manifestPath = path.resolve(process.cwd(), "src/data/migration-manifest.json");
  let manifest = [];
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  }

  console.log(`[Content Migrate] Analisando ${manifest.length} itens de matérias do manifesto...`);

  let countMigrated = 0;
  for (const item of manifest) {
    const { error } = await supabase.from("content_items").upsert({
      legacy_id: item.legacyId,
      type: "materia",
      status: "published",
      title: item.title,
      slug: item.slug,
      cover_image_path: item.localImage,
      published_at: item.publishedAt,
      author_name: "Produção HDZ Finance",
      updated_at: new Date().toISOString(),
    }, { onConflict: "slug" });

    if (!error) {
      countMigrated++;
    } else {
      console.error(`⚠️ Erro ao migrar matéria (${item.slug}):`, error.message);
    }
  }

  console.log(`✅ Migração concluída! Total de matérias sincronizadas com o Supabase: ${countMigrated}`);
}

migrateContent();
