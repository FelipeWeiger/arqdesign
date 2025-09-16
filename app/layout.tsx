import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import OfflineNotification from "@/components/ui/OfflineNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArqDesign - Gestão de Projetos para Arquitetos",
  description: "Aplicativo web para arquitetos e designers centralizarem projetos e calcularem orçamentos",
  manifest: "/manifest.json",
  themeColor: "#0079bf",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  robots: "index, follow",
  authors: [{ name: "ArqDesign Team" }],
  keywords: ["arquitetura", "design", "projetos", "orçamentos", "gestão"],
  openGraph: {
    type: "website",
    title: "ArqDesign - Gestão de Projetos para Arquitetos",
    description: "Aplicativo web para arquitetos e designers centralizarem projetos e calcularem orçamentos",
    siteName: "ArqDesign",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArqDesign - Gestão de Projetos para Arquitetos",
    description: "Aplicativo web para arquitetos e designers centralizarem projetos e calcularem orçamentos",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ArqDesign",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <OfflineNotification />
        <div className="min-h-screen">
          <Navigation />

          {/* Main content wrapper */}
          <main className="md:ml-64 pb-16 md:pb-0 transition-all duration-300 ease-in-out">
            <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
