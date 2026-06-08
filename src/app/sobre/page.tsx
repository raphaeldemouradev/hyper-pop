// src/app/sobre/page.tsx
import React from 'react';

export default function SobreProjeto() {
  return (
    <div className="min-h-screen bg-white">
      {/* Container Principal */}
      <div className="max-w-3xl mx-auto px-6 py-10">
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
            tecnologia aplicada ao jornalismo digital, utilizando ferramentas como Next.js, 
            TypeScript, Tailwind CSS e DatoCMS para garantir que a notícia chegue até você de forma instantânea.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
              Nossa Missão
            </h2>
            <p className="italic text-gray-600">
              "Conectar o público brasileiro às suas paixões através de uma plataforma robusta, 
              acessível e visualmente impactante."
            </p>
          </div>

          <div className="mt-10 p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Contato & Suporte ao Leitor 🤝
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Tem alguma sugestão de pauta, feedback sobre o design ou deseja anunciar no Hyper Pop? O nosso canal de atendimento oficial é feito de maneira direta e transparente pelas redes profissionais do fundador.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://www.linkedin.com/in/raphael-moura-dev/"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all shadow-sm text-center"
              >
                Contato via LinkedIn
              </a>

              <a 
                href="https://github.com/raphaeldemouradev/"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all text-center"
              >
                Ver Código no GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}