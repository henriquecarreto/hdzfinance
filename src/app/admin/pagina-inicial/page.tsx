"use client";

import { useState, useEffect } from "react";
import { cmsStore, SiteSettingsData } from "@/lib/cms-store";
import { Home, Save, CheckCircle2, Sparkles, Layout } from "lucide-react";

export default function AdminPaginaInicialPage() {
  const [settings, setSettings] = useState<SiteSettingsData>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(cmsStore.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
          <Home className="w-4 h-4" />
          <span>Editor da Página Inicial</span>
        </div>
        <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Configurações da Homepage</h1>
        <p className="text-xs text-[#AEB8C4]">
          Edite títulos institucionais, ordem e visibilidade das seções da página principal sem alterar o código estrutural.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Banner Section Settings */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#168BFF]">
            <Layout className="w-4 h-4" />
            <span>Seção Principal / Banner Hero</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-[#AEB8C4] font-semibold block">Título Principal do Cabeçalho</label>
            <input
              type="text"
              value={settings.homeHeaderTitle || ""}
              onChange={(e) => setSettings({ ...settings, homeHeaderTitle: e.target.value })}
              className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-[#AEB8C4] font-semibold block">Subtítulo Institucional</label>
            <textarea
              rows={2}
              value={settings.homeHeaderSubtitle || ""}
              onChange={(e) => setSettings({ ...settings, homeHeaderSubtitle: e.target.value })}
              className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        {/* Section Visibilities */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#F59A18]">
            <Sparkles className="w-4 h-4" />
            <span>Visibilidade das Seções Especiais</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E131A] border border-white/10">
              <div>
                <span className="font-semibold text-[#F5F7FA] block">Seção 1: Além das Manchetes</span>
                <span className="text-[11px] text-[#AEB8C4]">Exibe o bloco com a imagem de fundo de economia global.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showSectionBeyondHeadlines ?? true}
                onChange={(e) => setSettings({ ...settings, showSectionBeyondHeadlines: e.target.checked })}
                className="w-4 h-4 accent-[#168BFF] rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E131A] border border-white/10">
              <div>
                <span className="font-semibold text-[#F5F7FA] block">Seção 3: Bitcoin Além do Preço</span>
                <span className="text-[11px] text-[#AEB8C4]">Exibe o bloco com a imagem de escassez digital institucional.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showSectionBitcoinPrice ?? true}
                onChange={(e) => setSettings({ ...settings, showSectionBitcoinPrice: e.target.checked })}
                className="w-4 h-4 accent-[#168BFF] rounded"
              />
            </div>
          </div>
        </div>

        {/* Training CTA Settings */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <h3 className="font-outfit font-bold text-sm text-[#F5F7FA]">Botões de Ação do Rodapé Final</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Texto do Botão de Treinamento</label>
              <input
                type="text"
                value={settings.trainingCtaLabel || ""}
                onChange={(e) => setSettings({ ...settings, trainingCtaLabel: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">URL do Treinamento</label>
              <input
                type="text"
                value={settings.trainingCtaUrl || ""}
                onChange={(e) => setSettings({ ...settings, trainingCtaUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F14] border border-white/10">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-[#18C98B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Alterações salvas com sucesso!
            </span>
          ) : (
            <span className="text-xs text-[#AEB8C4]">As alterações afetam os textos públicos da home imediatamente.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#F59A18] hover:bg-[#FFC05A] font-outfit font-extrabold text-xs uppercase tracking-wider text-[#050709] transition-all shadow-md flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
