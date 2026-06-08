import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Hyper Pop | Notícias e Entretenimento",
    template: "%s | Hyper Pop" // Isso adiciona o nome do site automaticamente em todas as páginas
  },
  description: "As melhores notícias de Esportes, Entretenimento e Videogame.",
  authors: [{ name: "Raphael" }],
  keywords: ["Hyper Pop", "hyper-pop", "hyper-pop-blog", "notícias de entretenimento", "últimas notícias de esportes", "games e tecnologia", "curitiba", "futebol", "lançamento de games", "portal de notícias"],
  robots: {
    index: true, 
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
    <head>
        {/* SCRIPT GLOBAL DO ADSENSE */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2300939406288493"
          crossOrigin="anonymous"
          strategy="afterInteractive" 
        />

        {/* Google Analytics */}
        <Script id="google-analystics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-36CFNTYHNH');
          `}
        </ Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-36CFNTYHNH" />

        <meta name="google-site-verification" content="0TpD0oC29WOIG1l5wAPOgDNFPtIfVASLoiUkRDLZ2O0" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
