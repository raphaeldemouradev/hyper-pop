// src/app/nicho/[slug]/loading.tsx
import React from 'react';

const SkeletonOnLight = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const SkeletonAD = ({ className }: { className?: string }) => (
  <div className={`bg-[#c1c6cd] animate-pulse rounded flex items-center justify-center ${className}`} >
    <span className="text-[#3a4759] font-mono text-xs uppercase tracking-widest opacity-40">
        Anúncio (AD)
    </span>
  </div>
);

export default function LoadingNicho() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* --- NAVBAR --- */}

      {/* ANÚNCIO (AD) NO TOPO */}
      <div className="w-full py-6 flex justify-center border-b border-gray-100">
        <SkeletonAD className="w-[300px] h-[100px] md:w-[728px] md:h-[90px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 w-full">
        {/* TÍTULO DO FEED (Ex: Feed de: Games) */}
        <div className="mb-12">
          <SkeletonOnLight className="w-64 h-10 mb-2" />
          <div className="w-20 h-1 bg-[#A32222] rounded" />
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
      </main>

      {/* 5. ANÚNCIO (AD) NO RODAPÉ */}
      <div className="w-full py-10 flex justify-center mt-auto bg-gray-50">
        <SkeletonAD className="w-[300px] h-[250px] md:w-[728px] md:h-[90px]" />
      </div>

    </div>
  );
}