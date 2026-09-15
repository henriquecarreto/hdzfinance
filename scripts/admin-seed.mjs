import { createClient } from "@supabase/supabase-js";
import path from "path";
import fs from "fs";

// Load environment variables from .env.local if present
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

async function seedAdminUser() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (process.env.NODE_ENV === "production") {
    console.error("❌ ERRO DE SEGURANÇA: O script de bootstrap admin não pode ser executado em ambiente de PRODUÇÃO com senha temporária.");
    process.exit(1);
  }

  if (!email || !password) {
    console.error("❌ ERRO: ADMIN_BOOTSTRAP_EMAIL e ADMIN_BOOTSTRAP_PASSWORD devem estar configurados no arquivo .env.local.");
    process.exit(1);
  }

  console.log(`[HDZ Admin Bootstrap] Processando usuário administrador: ${email}...`);

  if (!supabaseUrl || !serviceKey || serviceKey.includes("dummy")) {
    console.log("ℹ️ [HDZ Local Mode] Supabase remoto não configurado. O usuário local pode ser autenticado via credenciais de desenvolvimento.");
    console.log("✅ Administrador de desenvolvimento preparado para ambiente local.");
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Verify if user exists in auth.users
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    let userId = null;

    if (!listError && usersData?.users) {
      const existingUser = usersData.users.find((u) => u.email === email);
      if (existingUser) {
        userId = existingUser.id;
        console.log(`[HDZ Admin Bootstrap] Usuário ${email} já existe no Supabase (ID: ${userId}). Atualizando dados...`);
        await supabase.auth.admin.updateUserById(userId, { password });
      }
    }

    if (!userId) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createError) {
        console.error("❌ Erro ao criar usuário no Supabase Auth:", createError.message);
        process.exit(1);
      }
      userId = newUser.user.id;
      console.log(`[HDZ Admin Bootstrap] Novo usuário administrador criado com sucesso no Supabase (ID: ${userId}).`);
    }

    // Upsert into public.profiles
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      email,
      display_name: "Administrador HDZ",
      role: "admin",
      status: "active",
      must_change_password: false,
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error("⚠️ Aviso ao atualizar tabela profiles:", profileError.message);
    } else {
      console.log("✅ Perfil de administrador (role: admin, status: active) atualizado com sucesso.");
    }
  } catch (err) {
    console.error("❌ Erro durante o bootstrap do administrador:", err);
  }
}

seedAdminUser();
