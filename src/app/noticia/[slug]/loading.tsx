// src/app/noticia/[slug]/loading.tsx
import React from 'react';

// Blocos de esqueleto para o texto
const SkeletonText = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// Bloco de anúncio (AD) cinza claro no topo
const SkeletonAD = ({ className }: { className?: string }) => (
  <div className={`bg-[#c1c6cd] animate-pulse rounded flex items-center justify-center ${className}`} >
    <span className="text-[#3a4759] font-mono text-xs uppercase tracking-widest opacity-40">
        Anúncio (AD)
    </span>
  </div>
);

export default function LoadingMateria() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className="w-full bg-[#1a1a1a] border-b border-[#E6C62F]/30 sticky top-0 z-50 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO 'TESTE TV' - Esqueleto fiel ao estilo da Imagem 16 */}
          <div className="flex items-center">

            {/* Div borda */}
            <div className="flex border-2 border-[#9136be] tracking-tighter uppercase text-sm rounded">

              {/* Parte "Hyper" - Fundo */}
              <div className="bg-[#E6C62F] animate-pulse w-14 h-8 px-2 py-1"></div>

              {/* Parte "POP" */}
              <div className="bg-[#a23bd5] animate-pulse w-10 h-8 px-2 py-1"></div>
              
            </div>
          </div>

          {/* MENU HAMBÚRGUER */}
          <div className="flex flex-col gap-1.5">
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
            <div className="w-7 h-1 bg-[#E6C62F] animate-pulse rounded"></div>
          </div>
        </div>
      </nav>

      {/* ESTRATÉGIA: ANÚNCIO (AD) NO TOPO DA MATÉRIA */}
      <div className="w-full py-6 flex justify-center border-b border-gray-100">
        <SkeletonAD className="w-[300px] h-[100px] md:w-[728px] md:h-[90px]" />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-10 w-full">
        {/* CABEÇALHO DA MATÉRIA */}
        <div className="mb-8 space-y-4">
          {/* Categoria (Nicho) */}
          <div className="w-20 h-4 bg-red-600/20 animate-pulse rounded" />
          
          {/* Título Grande (2 a 3 linhas conforme o Figma) */}
          <SkeletonText className="w-full h-10 md:h-12" />
          <SkeletonText className="w-full h-10 md:h-12" />
          <SkeletonText className="w-3/4 h-10 md:h-12" />
        </div>

        {/* IMAGEM PRINCIPAL DA MATÉRIA */}
        <div className="w-full aspect-video bg-gray-100 animate-pulse rounded-2xl mb-10 shadow-inner" />

        {/* CORPO DO TEXTO (Simulando parágrafos) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-5/6 h-4" />
          </div>
          <div className="space-y-2">
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-4/6 h-4" />
          </div>
        </div>
      </main>

    </div>
  );
}