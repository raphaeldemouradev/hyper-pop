// src/app/sobre/page.tsx
import React from 'react';

export default function SobreProjeto() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter border-l-8 border-[#E6C62F] pl-4 mb-8">
          Sobre o Hyper Pop
        </h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <p className="font-bold text-xl text-black">
            Bem-vindo ao futuro da informação sobre cultura pop no Brasil.
          </p>
          
          <p>
            O <strong>Hyper Pop</strong> nasceu da necessidade de um portal de notícias que une velocidade, 
            design moderno e tecnologia de ponta. Nosso foco é cobrir o que há de mais relevante no mundo 
            do entretenimento, games e esportes.
          </p>

          <p>
            Este projeto foi desenvolvido por <strong>Raphael de Moura</strong> como uma demonstração de 
            tecnologia aplicada ao jornalismo digital, utilizando ferramentas como Next.js 14, 
            TypeScript e DatoCMS para garantir que a notícia chegue até você de forma instantânea.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Nossa Missão
            </h2>
            <p className="italic text-gray-600">
              "Conectar o público brasileiro às suas paixões através de uma plataforma robusta, 
              acessível e visualmente impactante."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}