import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { CryptoMarketProvider } from "@/context/CryptoMarketContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HDZ Finance | Informação para entender. Educação para decidir.",
    template: "%s | HDZ Finance",
  },
  description:
    "Portal editorial independente de notícias financeiras, economia, análise de mercados, investimentos, educação e tecnologia.",
  metadataBase: new URL("https://hdzfinance.com.br"),
  keywords: [
    "finanças",
    "economia",
    "mercado financeiro",
    "investimentos",
    "finanças pessoais",
    "bitcoin",
    "criptomoedas",
    "educação financeira",
    "análises econômicas",
  ],
  authors: [{ name: "Equipe Editorial HDZ Finance" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://hdzfinance.com.br",
    siteName: "HDZ Finance",
    title: "HDZ Finance | Informação para entender. Educação para decidir.",
    description:
      "Portal editorial independente de notícias financeiras, economia, análise de mercados, investimentos e educação financeira.",
    images: [
      {
        url: "/assets/hdz-symbol.png",
        width: 800,
        height: 800,
        alt: "Símbolo HDZ Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HDZ Finance",
    description:
      "Informação para entender. Educação para decidir. Portal de notícias e finanças.",
    images: ["/assets/hdz-symbol.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${lora.variable} dark`}
    >
      <body className="bg-[#050607] text-[#F5F7FA] font-sans min-h-screen flex flex-col antialiased selection:bg-[#147BFF] selection:text-white">
        <CryptoMarketProvider>
          <HeaderWrapper />

          <main className="flex-1">{children}</main>

          <Footer />
        </CryptoMarketProvider>
      </body>
    </html>
  );
}
