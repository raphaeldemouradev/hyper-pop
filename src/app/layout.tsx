import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Hyper Pop | Notícias e Entretenimento",
    template: "%s | Hyper Pop" // Isso adiciona o nome do site automaticamente em todas as páginas
  },
  description: "As melhores notícias de Esportes, Entretenimento e Videogame.",
  keywords: ["Hyper Pop", "hyper-pop", "hyper-pop-blog", "notícias de entretenimento", "últimas notícias de esportes", "games e tecnologia", "curitiba", "futebol", "lançamento de games", "portal de notícias"],
  authors: [{ name: "Raphael" }],
  robots: "index, follow", // Diz ao Google para ler o site
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
    <head>
        {/* SCRIPT GLOBAL DO ADSENSE (O que você acabou de me enviar) */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2300939406288493"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-36CFNTYHNH" />
        <Script id="google-analystics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-36CFNTYHNH');
          `}
        </ Script>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
