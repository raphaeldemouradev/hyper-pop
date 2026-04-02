import type { Metadata } from "next";
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
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
