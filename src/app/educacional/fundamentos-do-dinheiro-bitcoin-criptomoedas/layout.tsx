import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fundamentos do Dinheiro, Bitcoin e Criptomoedas | HDZ Finance",
  description:
    "Conheça o treinamento HDZ Finance sobre dinheiro, Bitcoin, ciclos de mercado, autocustódia e utilização prática. Confira as aulas e as condições de acesso.",
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
