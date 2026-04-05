import React from 'react';

// Blocos que piscam sobre o fundo azul escuro do banner (cor azulada/cinza)
const SkeletonOnDark = ({ className }: { className?: string }) => (
  <div className={`bg-[#505f75] animate-pulse rounded ${className}`} />
);

// Blocos que piscam sobre o fundo branco do banner
const SkeletonOnLight = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// O bloco do Anúncio (AD) em cinza claro, fora do quadro escuro
const SkeletonAD = ({ className }: { className?: string }) => (
  <div className={`bg-[#c1c6cd] animate-pulse rounded flex items-center justify-center ${className}`} >
    <span className="text-[#3a4759] font-mono text-xs uppercase tracking-widest opacity-40">
        Anúncio (AD)
    </span>
  </div>
);

export default function LoadingHome() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* --- NAVBAR LOADING --- */}
      <nav className="w-full bg-[#1a1a1a] border-b border-[#E6C62F]/30 sticky top-0 z-50 h-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO */}
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
      {/* --- FIM DA NAVBAR --- */}

      {/* --- QUADRO SUPERIOR (FUNDO AZUL ESCURO) --- */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-[#1a2331] px-6 pt-12">
        
        {/* TEXTO DE DESTAQUE SIMULADO (3 linhas) */}
        <div className="absolute bottom-12 left-6 md:left-12 space-y-3 w-full max-w-[calc(100%-48px)] z-10">
          <SkeletonOnDark className="w-full h-10" />
          <SkeletonOnDark className="w-full h-10" />
          <SkeletonOnDark className="w-2/3 h-10" />
        </div>
      </section>

      {/* --- ESPAÇO DO ANÚNCIO (AD) --- */}
      <div className="px-6 py-8 flex justify-center -mt-2">
        <SkeletonAD className="w-full h-[100px]" />
      </div>

      {/* --- SEÇÃO INFERIOR (FUNDO CLARO) --- */}
      <div className="px-6 py-4 opacity-50">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-red-600 rounded"></div>
          <span className="text-xl font-black text-gray-900 uppercase italic tracking-tight">
            Mais Recentes
          </span>
        </div>

         {/* LISTA DE NOTÍCIAS (Layout de Nicho costuma ser lista ou grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-4 border-b border-gray-100 pb-8">
              <SkeletonOnLight className="w-full aspect-video rounded-xl" />
              <div className="space-y-2">
                <SkeletonOnLight className="w-32 h-4" /> {/* Categoria */}
                <SkeletonOnLight className="w-full h-8" />   {/* Título linha 1 */}
                <SkeletonOnLight className="w-4/5 h-8" />   {/* Título linha 2 */}
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}