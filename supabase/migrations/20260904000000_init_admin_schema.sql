-- =========================================================================
-- HDZ FINANCE - MIGRATION COMPLETA DE INFRAESTRUTURA E PAINEL ADMINISTRATIVO
-- =========================================================================

-- 1. EXTENSÕES E FUNÇÕES AUXILIARES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. TABELA PROFILES (Perfis Administrativos)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  status TEXT NOT NULL CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
  must_change_password BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABELA CONTENT_ITEMS (Matérias, Notícias, Eventos)
CREATE TABLE IF NOT EXISTS public.content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id TEXT,
  type TEXT NOT NULL CHECK (type IN ('materia', 'noticia', 'evento')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'scheduled', 'published', 'archived')) DEFAULT 'draft',
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  slug TEXT NOT NULL UNIQUE,
  body_json JSONB,
  body_html TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author_name TEXT NOT NULL DEFAULT 'Produção HDZ Finance',
  cover_image_path TEXT,
  cover_image_alt TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  featured_order INT NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  og_image_path TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scheduled_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- 4. TABELA EVENT_DETAILS (Detalhamento de Eventos)
CREATE TABLE IF NOT EXISTS public.event_details (
  content_id UUID PRIMARY KEY REFERENCES public.content_items(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  timezone TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
  format TEXT NOT NULL CHECK (format IN ('presencial', 'online', 'hibrido')) DEFAULT 'online',
  location_name TEXT,
  address TEXT,
  registration_url TEXT,
  price_label TEXT,
  capacity INT,
  organizer TEXT NOT NULL DEFAULT 'HDZ Finance',
  event_status TEXT NOT NULL CHECK (event_status IN ('futuro', 'em_andamento', 'encerrado', 'cancelado')) DEFAULT 'futuro',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TABELA MEDIA_ASSETS (Biblioteca de Mídia)
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABELA SITE_SETTINGS (Configurações do Site e Páginas Institucionais)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name TEXT NOT NULL,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TABELA CONTENT_REVISIONS (Histórico e Versões de Conteúdo)
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  revision_number INT NOT NULL,
  snapshot JSONB NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABELA AUDIT_LOGS (Logs de Auditoria Administrativa)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TRIGGERS PARA UPDATED_AT
CREATE TRIGGER trigger_update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_content_items_updated_at BEFORE UPDATE ON public.content_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_event_details_updated_at BEFORE UPDATE ON public.event_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_media_assets_updated_at BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Funções auxiliares RLS
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLÍTICAS PUBLICAS (Anon & Authenticated)
CREATE POLICY "Public Read Published Content" ON public.content_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public Read Event Details" ON public.event_details
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.content_items
    WHERE id = event_details.content_id AND status = 'published'
  ));

CREATE POLICY "Public Read Media Assets" ON public.media_assets
  FOR SELECT USING (true);

CREATE POLICY "Public Read Public Settings" ON public.site_settings
  FOR SELECT USING (is_public = true);

-- POLÍTICAS ADMINISTRATIVAS (Somente Administradores Ativos)
CREATE POLICY "Admin All Profiles" ON public.profiles
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Content Items" ON public.content_items
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Event Details" ON public.event_details
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Media Assets" ON public.media_assets
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Site Settings" ON public.site_settings
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Content Revisions" ON public.content_revisions
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin All Audit Logs" ON public.audit_logs
  FOR ALL USING (public.is_active_admin());

-- =========================================================================
-- BUCKET DE STORAGE (content-media)
-- =========================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-media', 'content-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Media Storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-media');

CREATE POLICY "Admin Manage Media Storage" ON storage.objects
  FOR ALL USING (bucket_id = 'content-media' AND public.is_active_admin());
