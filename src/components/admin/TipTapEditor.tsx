"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { Table as TableExtension } from "@tiptap/extension-table";
import { TableRow as TableRowExtension } from "@tiptap/extension-table-row";
import { TableCell as TableCellExtension } from "@tiptap/extension-table-cell";
import { TableHeader as TableHeaderExtension } from "@tiptap/extension-table-header";
import { Underline as UnderlineExtension } from "@tiptap/extension-underline";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  RemoveFormatting,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#168BFF] underline hover:text-[#3A91FF]",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-white/10 my-4 max-w-full h-auto",
        },
      }),
      TableExtension.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4 border border-white/10 text-sm",
        },
      }),
      TableRowExtension,
      TableHeaderExtension.configure({
        HTMLAttributes: {
          class: "bg-[#0B0F14] border border-white/10 p-2 font-bold text-[#F5F7FA]",
        },
      }),
      TableCellExtension.configure({
        HTMLAttributes: {
          class: "border border-white/10 p-2 text-[#AEB8C4]",
        },
      }),
    ],
    content: content || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[260px] p-4 text-[#F5F7FA] text-base leading-relaxed bg-[#0E131A] rounded-b-xl border border-t-0 border-white/10",
      },
    },
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML();
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_TAGS: ["table", "thead", "tbody", "tr", "th", "td"],
        ADD_ATTR: ["target", "rel", "href", "src", "alt"],
      });
      onChange(cleanHtml);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>");
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[300px] bg-[#0E131A] rounded-xl border border-white/10 flex items-center justify-center text-xs text-[#AEB8C4]">
        Carregando editor rich text...
      </div>
    );
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL do link:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL da imagem:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#0B0F14] border border-white/10 rounded-t-xl border-b-0 text-xs">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("bold") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Negrito"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("italic") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Itálico"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("underline") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Sublinhado"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Título H2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Subtítulo H3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("bulletList") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Lista com marcadores"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("orderedList") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("blockquote") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Citação"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={addLink}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            editor.isActive("link") ? "bg-[#168BFF]/20 text-[#168BFF]" : "text-[#AEB8C4]"
          }`}
          title="Inserir link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4]"
          title="Inserir imagem"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addTable}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4]"
          title="Inserir tabela"
        >
          <TableIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4]"
          title="Linha divisória"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4]"
          title="Desfazer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4]"
          title="Refazer (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#AEB8C4] ml-auto"
          title="Limpar formatação"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
