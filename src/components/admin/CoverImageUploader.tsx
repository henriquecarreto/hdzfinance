"use client";

import { useState, useRef, ChangeEvent, DragEvent, ClipboardEvent } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw, Trash2, Edit2, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CoverImageUploaderProps {
  contentId?: string;
  contentType: "materia" | "noticia" | "evento";
  currentPath: string;
  currentAlt: string;
  onUploadComplete: (path: string, alt: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  contentTitle?: string;
}

export default function CoverImageUploader({
  contentId,
  contentType,
  currentPath,
  currentAlt,
  onUploadComplete,
  onRemove,
  disabled = false,
  contentTitle = "",
}: CoverImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "preparing" | "uploading" | "processing" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: string;
    dimensions: string;
  } | null>(null);

  const [altText, setAltText] = useState(currentAlt || contentTitle);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  // Allowed MIME types
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

  const validateFile = (file: File): string | null => {
    // 1. Double extension check (e.g. image.png.exe)
    const nameParts = file.name.split(".");
    if (nameParts.length > 2) {
      const suspiciousExts = ["exe", "bat", "cmd", "sh", "php", "js", "html", "svg"];
      const lastExt = nameParts[nameParts.length - 1].toLowerCase();
      const secondLastExt = nameParts[nameParts.length - 2].toLowerCase();
      if (suspiciousExts.includes(lastExt) || suspiciousExts.includes(secondLastExt)) {
        return "Arquivo inválido. Extensões suspeitas ou duplas foram bloqueadas.";
      }
    }

    // 2. Extension check
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["jpg", "jpeg", "png", "webp", "avif"].includes(ext)) {
      return "Formato não suportado. Por favor, envie uma imagem PNG, JPG, WebP ou AVIF.";
    }

    // 3. MIME type check
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return "MIME type inválido. O arquivo deve ser uma imagem válida (JPEG, PNG, WebP ou AVIF).";
    }

    // 4. File size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `Tamanho de arquivo excede o limite de 10 MB (tamanho atual: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`;
    }

    if (file.size === 0) {
      return "O arquivo enviado está vazio.";
    }

    return null;
  };

  const processFile = async (file: File) => {
    setErrorMessage("");
    const validationError = validateFile(file);
    if (validationError) {
      setUploadStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setUploadStatus("preparing");
    setUploadProgress(10);

    // Read image dimensions
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = async () => {
      const dimensionsStr = `${img.width} × ${img.height} px`;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileDetails({
        name: file.name,
        size: `${sizeMb} MB`,
        dimensions: dimensionsStr,
      });
      URL.revokeObjectURL(objectUrl);

      // Start upload
      await uploadToStorage(file);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setUploadStatus("error");
      setErrorMessage("Não foi possível carregar a imagem. O arquivo pode estar corrompido.");
    };

    img.src = objectUrl;
  };

  const uploadToStorage = async (file: File) => {
    try {
      setUploadStatus("uploading");
      setUploadProgress(35);

      const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
      const uuid = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      const folderId = contentId || "temp-" + Date.now();
      const pathInBucket = `${contentType}s/${folderId}/cover/${uuid}.${ext}`;

      // Simulate progress step
      setUploadProgress(65);

      const supabase = createClient();
      let publicUrl = "";

      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("dummy")) {
        const { data, error } = await supabase.storage.from("content-media").upload(pathInBucket, file, {
          cacheControl: "3600",
          upsert: true,
        });

        if (error) {
          throw error;
        }

        const { data: publicUrlData } = supabase.storage.from("content-media").getPublicUrl(data.path);
        publicUrl = publicUrlData.publicUrl;
      } else {
        // Fallback for local dev mode: generate a Data URL
        publicUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Erro ao ler imagem local."));
          reader.readAsDataURL(file);
        });
      }

      setUploadProgress(90);
      setUploadStatus("processing");

      setTimeout(() => {
        setUploadProgress(100);
        setUploadStatus("success");
        const defaultAlt = altText || contentTitle || file.name.split(".")[0];
        setAltText(defaultAlt);
        onUploadComplete(publicUrl, defaultAlt);
      }, 400);
    } catch (err: unknown) {
      console.error("Erro no upload da imagem:", err);
      setUploadStatus("error");
      setErrorMessage("Não foi possível enviar a imagem. Verifique o arquivo e tente novamente.");
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files[0]) {
      const file = e.clipboardData.files[0];
      if (file.type.startsWith("image/")) {
        processFile(file);
      }
    }
  };

  const handleAltChange = (val: string) => {
    setAltText(val);
    if (currentPath) {
      onUploadComplete(currentPath, val);
    }
  };

  const triggerSelect = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const confirmRemoveImage = () => {
    setShowConfirmRemove(false);
    setFileDetails(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    onRemove();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileSelect}
        className="sr-only"
        aria-label="Upload de imagem de capa"
      />

      {/* Main Upload Dropzone Container */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#F59A18] flex items-center space-x-2">
            <ImageIcon className="w-4 h-4" />
            <span>Upload da Imagem de Capa</span>
          </label>
          <span className="text-[11px] text-[#AEB8C4]">
            Recomendado: 1200 px + de largura (16:9)
          </span>
        </div>

        {/* Empty Dropzone State */}
        {!currentPath && uploadStatus === "idle" && (
          <div
            onClick={triggerSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPaste={handlePaste}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerSelect();
              }
            }}
            className={`group relative w-full p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-3 ${
              isDragging
                ? "border-[#F59A18] bg-[#F59A18]/10 shadow-[0_0_20px_rgba(245,154,24,0.15)] scale-[1.005]"
                : "border-[#EEF4FA]/20 bg-[#0E131A] hover:border-[#F59A18] hover:bg-[#121720]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="p-3.5 rounded-full bg-[#050709] border border-white/10 group-hover:border-[#F59A18]/50 group-hover:text-[#F59A18] text-[#AEB8C4] transition-colors">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="font-outfit font-bold text-base text-[#F5F7FA] group-hover:text-[#FFC05A] transition-colors">
                Importar imagem de capa
              </h4>
              <p className="text-xs text-[#AEB8C4] max-w-md mx-auto">
                Arraste uma imagem para esta área ou clique para selecionar no computador
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerSelect();
                }}
                disabled={disabled}
                className="px-4 py-2 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] text-white text-xs font-bold transition-all shadow-md"
              >
                Selecionar imagem
              </button>
            </div>

            <p className="text-[11px] text-[#AEB8C4]/60 pt-1">
              PNG, JPG, WebP ou AVIF. Tamanho máximo de 10 MB.
            </p>
          </div>
        )}

        {/* Uploading / Progress State */}
        {(uploadStatus === "preparing" || uploadStatus === "uploading" || uploadStatus === "processing") && (
          <div className="w-full p-6 rounded-xl border border-white/10 bg-[#0E131A] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F5F7FA] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#168BFF]" />
                {uploadStatus === "preparing" && "Preparando imagem..."}
                {uploadStatus === "uploading" && `Enviando ${uploadProgress}%`}
                {uploadStatus === "processing" && "Processando imagem..."}
              </span>
              <span className="text-[#AEB8C4]">{uploadProgress}%</span>
            </div>

            {/* Progress Bar */}
            <div
              className="w-full h-2 rounded-full bg-[#050709] overflow-hidden border border-white/10"
              aria-live="polite"
              aria-valuenow={uploadProgress}
            >
              <div
                className="h-full bg-gradient-to-r from-[#168BFF] to-[#F59A18] transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            {fileDetails && (
              <div className="text-[11px] text-[#AEB8C4] flex items-center justify-between pt-1">
                <span>{fileDetails.name}</span>
                <span>{fileDetails.dimensions} • {fileDetails.size}</span>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {uploadStatus === "error" && (
          <div className="w-full p-6 rounded-xl border border-[#FF5263]/30 bg-[#FF5263]/10 space-y-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-[#FF5263]">
              <AlertCircle className="w-5 h-5" />
              <span className="font-bold text-xs">Falha no upload</span>
            </div>
            <p className="text-xs text-[#F5F7FA]">
              {errorMessage || "Não foi possível enviar a imagem. Verifique o arquivo e tente novamente."}
            </p>
            <div className="pt-2 flex justify-center space-x-2">
              <button
                type="button"
                onClick={triggerSelect}
                className="px-4 py-2 rounded-xl bg-[#FF5263] hover:bg-[#FF5263]/80 text-white text-xs font-bold transition-all shadow-md"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Success / Loaded Preview State */}
        {currentPath && uploadStatus !== "uploading" && uploadStatus !== "preparing" && uploadStatus !== "processing" && (
          <div className="space-y-4">
            <div className="relative w-full p-4 rounded-xl border border-white/10 bg-[#0E131A] flex flex-col sm:flex-row items-center gap-4">
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] w-full sm:w-48 rounded-lg overflow-hidden bg-[#050709] border border-white/10 shrink-0">
                <Image src={currentPath} alt={currentAlt || "Prévia da capa"} fill className="object-cover" />
              </div>

              {/* Info & Badges */}
              <div className="flex-1 space-y-2 text-xs w-full">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#18C98B]/20 border border-[#18C98B]/30 text-[#18C98B] font-bold text-[10px] uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Upload Concluído
                  </span>
                  <span className="text-[11px] text-[#AEB8C4]">Capa Ativa</span>
                </div>

                {fileDetails ? (
                  <div className="text-[11px] text-[#AEB8C4] space-y-0.5">
                    <p className="text-[#F5F7FA] font-medium truncate">{fileDetails.name}</p>
                    <p>{fileDetails.dimensions} • {fileDetails.size}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-[#AEB8C4] truncate">
                    <p className="text-[#F5F7FA] font-medium">Imagem em uso</p>
                    <p className="truncate text-[10px] text-[#AEB8C4]/70">{currentPath}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={triggerSelect}
                    disabled={disabled}
                    className="px-3 py-1.5 rounded-lg bg-[#050709] hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F5F7FA] transition-all flex items-center space-x-1"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#168BFF]" />
                    <span>Substituir imagem</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowConfirmRemove(true)}
                    disabled={disabled}
                    className="px-3 py-1.5 rounded-lg bg-[#050709] hover:bg-[#FF5263]/20 border border-white/10 hover:border-[#FF5263]/40 text-xs font-semibold text-[#FF5263] transition-all flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Accessibility Alt Text Field */}
            <div className="p-4 rounded-xl bg-[#0E131A] border border-white/10 space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FFC05A]" />
                <span>Descrição da imagem para acessibilidade (Alt Text)</span>
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => handleAltChange(e.target.value)}
                placeholder="Descreva brevemente o conteúdo visual da imagem para leitores de tela..."
                className="w-full bg-[#050709] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F7FA] placeholder-[#AEB8C4]/40 focus:outline-none focus:border-[#168BFF]"
              />
              <p className="text-[11px] text-[#AEB8C4]/70">
                Descreva brevemente o conteúdo visual da imagem. Obrigatório para a publicação final.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Image Removal */}
      {showConfirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/16 space-y-4 shadow-2xl">
            <h3 className="font-outfit font-extrabold text-lg text-[#F5F7FA]">Remover imagem de capa?</h3>
            <p className="text-xs text-[#AEB8C4] leading-relaxed">
              Deseja remover esta imagem de capa? A associação com este conteúdo será removida e uma nova imagem será exigida antes da publicação.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmRemove(false)}
                className="px-4 py-2 rounded-xl bg-[#0E131A] hover:bg-white/10 border border-white/10 text-xs font-bold text-[#F5F7FA]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmRemoveImage}
                className="px-4 py-2 rounded-xl bg-[#FF5263] hover:bg-[#FF5263]/80 text-white text-xs font-bold"
              >
                Remover capa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
