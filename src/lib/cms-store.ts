import { ANALYSES } from "@/data/analyses";

export type ContentType = "materia" | "noticia" | "evento";
export type ContentStatus = "draft" | "scheduled" | "published" | "archived";

export interface CMSContentItem {
  id: string;
  legacyId?: string;
  type: ContentType;
  status: ContentStatus;
  title: string;
  subtitle?: string;
  excerpt?: string;
  slug: string;
  bodyJson?: any;
  bodyHtml: string;
  category: string;
  categoryName?: string;
  tags: string[];
  authorName: string;
  coverImagePath?: string;
  coverImageAlt?: string;
  featured: boolean;
  featuredOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImagePath?: string;
  publishedAt: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface CMSEventDetails {
  contentId: string;
  startsAt: string;
  endsAt?: string;
  timezone: string;
  format: "presencial" | "online" | "hibrido";
  locationName?: string;
  address?: string;
  registrationUrl?: string;
  priceLabel?: string;
  capacity?: number;
  organizer: string;
  eventStatus: "futuro" | "em_andamento" | "encerrado" | "cancelado";
}

export interface MediaAssetItem {
  id: string;
  storagePath: string;
  publicUrl: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  uploadedBy?: string;
  createdAt: string;
}

export interface SiteSettingsData {
  homeHeaderTitle?: string;
  homeHeaderSubtitle?: string;
  showSectionBeyondHeadlines?: boolean;
  showSectionBitcoinPrice?: boolean;
  trainingCtaLabel?: string;
  trainingCtaUrl?: string;
  picnicUrl?: string;
  quantfuryUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  aboutText?: string;
  termsText?: string;
  privacyText?: string;
  legalNoticeText?: string;
}

export interface AuditLogItem {
  id: string;
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: any;
  createdAt: string;
}

// Initial Data Population from ANALYSES
const INITIAL_MATERIAS: CMSContentItem[] = ANALYSES.map((art) => ({
  id: art.id,
  legacyId: art.legacyId,
  type: "materia",
  status: "published",
  title: art.title,
  subtitle: art.subtitle,
  excerpt: art.subtitle,
  slug: art.slug,
  bodyHtml: art.content,
  category: art.category,
  categoryName: art.categoryName,
  tags: art.tags || [],
  authorName: "Produção HDZ Finance",
  coverImagePath: art.coverImage,
  coverImageAlt: art.coverAlt,
  featured: true,
  featuredOrder: 1,
  seoTitle: art.title,
  seoDescription: art.subtitle,
  publishedAt: art.publishDate,
  createdAt: art.publishDate,
  updatedAt: art.updateDate || art.publishDate,
}));

// In-Memory Global State with Client-side LocalStorage Persistence
class CMSStoreManager {
  private items: CMSContentItem[] = [];
  private eventDetailsMap: Record<string, CMSEventDetails> = {};
  private mediaAssets: MediaAssetItem[] = [];
  private settings: SiteSettingsData = {
    homeHeaderTitle: "HDZ Finance — Inteligência Macroeconômica & Mercados",
    homeHeaderSubtitle: "Análises aprofundadas, escassez digital e educação financeira de alto nível.",
    showSectionBeyondHeadlines: true,
    showSectionBitcoinPrice: true,
    trainingCtaLabel: "Descobrir o treinamento",
    trainingCtaUrl: "/educacional/cursos",
    picnicUrl: "https://picnic.com.br",
    quantfuryUrl: "https://quantfury.com",
    contactEmail: "contato@hdzfinance.com.br",
    contactPhone: "+55 (11) 99999-8888",
    contactAddress: "São Paulo, SP - Brasil",
    twitterUrl: "https://x.com/hdzfinance",
    instagramUrl: "https://instagram.com/hdzfinance",
    youtubeUrl: "https://youtube.com/@hdzfinance",
    linkedinUrl: "https://linkedin.com/company/hdzfinance",
    aboutText: "A HDZ Finance é uma publicação independente voltada à análise macroeconômica, mercados financeiros e soberania monetária.",
    termsText: "Termos e Condições de Uso da Plataforma HDZ Finance.",
    privacyText: "Política de Privacidade e Proteção de Dados (LGPD).",
    legalNoticeText: "Isenção de Responsabilidade e Aviso Legal sobre conteúdos educacionais.",
  };
  private auditLogs: AuditLogItem[] = [];
  private initialized = false;

  constructor() {
    this.items = [...INITIAL_MATERIAS];
  }

  private initFromLocalStorage() {
    if (typeof window === "undefined" || this.initialized) return;
    try {
      const storedItems = localStorage.getItem("hdz_cms_items");
      if (storedItems) {
        this.items = JSON.parse(storedItems);
      }
      const storedEvents = localStorage.getItem("hdz_cms_events");
      if (storedEvents) {
        this.eventDetailsMap = JSON.parse(storedEvents);
      }
      const storedMedia = localStorage.getItem("hdz_cms_media");
      if (storedMedia) {
        this.mediaAssets = JSON.parse(storedMedia);
      }
      const storedSettings = localStorage.getItem("hdz_cms_settings");
      if (storedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
      }
      const storedLogs = localStorage.getItem("hdz_cms_logs");
      if (storedLogs) {
        this.auditLogs = JSON.parse(storedLogs);
      }
      this.initialized = true;
    } catch (e) {
      console.warn("Could not load CMS store from localStorage:", e);
    }
  }

  private saveToLocalStorage() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("hdz_cms_items", JSON.stringify(this.items));
      localStorage.setItem("hdz_cms_events", JSON.stringify(this.eventDetailsMap));
      localStorage.setItem("hdz_cms_media", JSON.stringify(this.mediaAssets));
      localStorage.setItem("hdz_cms_settings", JSON.stringify(this.settings));
      localStorage.setItem("hdz_cms_logs", JSON.stringify(this.auditLogs));
    } catch (e) {
      console.warn("Could not save CMS store to localStorage:", e);
    }
  }

  public getItems(type?: ContentType): CMSContentItem[] {
    this.initFromLocalStorage();
    if (!type) return this.items;
    return this.items.filter((item) => item.type === type);
  }

  public getItemBySlug(slug: string): CMSContentItem | undefined {
    this.initFromLocalStorage();
    return this.items.find((item) => item.slug === slug);
  }

  public getItemById(id: string): CMSContentItem | undefined {
    this.initFromLocalStorage();
    return this.items.find((item) => item.id === id);
  }

  public saveItem(itemData: Partial<CMSContentItem> & { type: ContentType; title: string }): CMSContentItem {
    this.initFromLocalStorage();
    const now = new Date().toISOString();
    let existingIndex = itemData.id ? this.items.findIndex((i) => i.id === itemData.id) : -1;

    let finalSlug = itemData.slug || this.generateSlug(itemData.title);
    
    // Ensure slug uniqueness
    const duplicate = this.items.find((i) => i.slug === finalSlug && i.id !== itemData.id);
    if (duplicate) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    if (existingIndex >= 0) {
      const updated: CMSContentItem = {
        ...this.items[existingIndex],
        ...itemData,
        slug: finalSlug,
        updatedAt: now,
      };
      this.items[existingIndex] = updated;
      this.logAction("content_updated", itemData.type, updated.id, { title: updated.title });
      this.saveToLocalStorage();
      return updated;
    } else {
      const created: CMSContentItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type: itemData.type,
        status: itemData.status || "draft",
        title: itemData.title,
        subtitle: itemData.subtitle || "",
        excerpt: itemData.excerpt || itemData.subtitle || "",
        slug: finalSlug,
        bodyJson: itemData.bodyJson || null,
        bodyHtml: itemData.bodyHtml || "",
        category: itemData.category || "economia",
        categoryName: itemData.categoryName || "Economia",
        tags: itemData.tags || [],
        authorName: itemData.authorName || "Produção HDZ Finance",
        coverImagePath: itemData.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp",
        coverImageAlt: itemData.coverImageAlt || itemData.title,
        featured: itemData.featured || false,
        featuredOrder: itemData.featuredOrder || 0,
        seoTitle: itemData.seoTitle || itemData.title,
        seoDescription: itemData.seoDescription || itemData.subtitle,
        publishedAt: itemData.publishedAt || now,
        createdAt: now,
        updatedAt: now,
      };
      this.items.unshift(created);
      this.logAction("content_created", itemData.type, created.id, { title: created.title });
      this.saveToLocalStorage();
      return created;
    }
  }

  public archiveItem(id: string): boolean {
    this.initFromLocalStorage();
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.status = "archived";
      item.archivedAt = new Date().toISOString();
      item.updatedAt = new Date().toISOString();
      this.logAction("content_archived", item.type, id, { title: item.title });
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  public deleteItem(id: string): boolean {
    this.initFromLocalStorage();
    const index = this.items.findIndex((i) => i.id === id);
    if (index >= 0) {
      const item = this.items[index];
      this.items.splice(index, 1);
      this.logAction("content_deleted", item.type, id, { title: item.title });
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  public getEventDetails(contentId: string): CMSEventDetails | undefined {
    this.initFromLocalStorage();
    return this.eventDetailsMap[contentId];
  }

  public saveEventDetails(details: CMSEventDetails) {
    this.initFromLocalStorage();
    this.eventDetailsMap[details.contentId] = details;
    this.saveToLocalStorage();
  }

  public getMediaAssets(): MediaAssetItem[] {
    this.initFromLocalStorage();
    return this.mediaAssets;
  }

  public addMediaAsset(asset: Omit<MediaAssetItem, "id" | "createdAt">): MediaAssetItem {
    this.initFromLocalStorage();
    const newAsset: MediaAssetItem = {
      ...asset,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.mediaAssets.unshift(newAsset);
    this.logAction("media_uploaded", "media", newAsset.id, { filename: newAsset.originalFilename });
    this.saveToLocalStorage();
    return newAsset;
  }

  public deleteMediaAsset(id: string): boolean {
    this.initFromLocalStorage();
    const index = this.mediaAssets.findIndex((m) => m.id === id);
    if (index >= 0) {
      this.mediaAssets.splice(index, 1);
      this.logAction("media_deleted", "media", id);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  public getSettings(): SiteSettingsData {
    this.initFromLocalStorage();
    return this.settings;
  }

  public updateSettings(newSettings: Partial<SiteSettingsData>): SiteSettingsData {
    this.initFromLocalStorage();
    this.settings = { ...this.settings, ...newSettings };
    this.logAction("site_setting_updated", "settings", "global");
    this.saveToLocalStorage();
    return this.settings;
  }

  public getAuditLogs(): AuditLogItem[] {
    this.initFromLocalStorage();
    return this.auditLogs;
  }

  public logAction(action: string, entityType: string, entityId?: string, metadata?: any) {
    this.initFromLocalStorage();
    const log: AuditLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      entityType,
      entityId,
      metadata,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) {
      this.auditLogs = this.auditLogs.slice(0, 200);
    }
    this.saveToLocalStorage();
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
}

export const cmsStore = new CMSStoreManager();
