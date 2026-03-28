import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        {/* Ícone ou Ilustração estilizada */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-[#3A3A3A] opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">📺</span>
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#3A3A3A] uppercase tracking-tighter mb-4">
          Fora do Ar!
        </h2>
        
        <p className="text-gray-600 max-w-md mb-8 font-medium">
          Parece que essa notícia "saiu da grade" ou o link foi movido. 
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            href="/" 
            className="bg-[#E6C62F] text-[#3A3A3A] font-black py-3 px-8 rounded-full hover:bg-[#3A3A3A] hover:text-white transition-all transform hover:scale-105 uppercase text-sm shadow-lg"
          >
            Voltar para a Home
          </Link>
        </div>

        {/* Detalhe estético: "chuvisco" de TV */}
        <div className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-[#E6C62F] to-transparent opacity-50"></div>
      </section>

      <Footer />
    </main>
  );
}