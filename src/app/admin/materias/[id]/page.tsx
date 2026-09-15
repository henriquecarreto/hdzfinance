"use client";

import { use } from "react";
import ContentEditorForm from "@/components/admin/ContentEditorForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarMateriaPage({ params }: PageProps) {
  const { id } = use(params);
  return <ContentEditorForm type="materia" initialId={id} />;
}
