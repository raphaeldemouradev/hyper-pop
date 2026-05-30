"use client"
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function AdMateria() {
    const pathname = usePathname();
  
    useEffect(() => {
      const pushAd = () => {
        try {
          // Usamos (window as any) para o TypeScript entender scripts externos
          const adsbygoogle = (window as any).adsbygoogle;
  
          if (typeof window !== "undefined" && adsbygoogle) {
            // Selecionamos o elemento específico deste slot
            const adElement = document.querySelector(`[data-ad-slot="7614784252"]`);
            
            // Só disparar se o elemento existir e já tiver largura no layout
            if (adElement && (adElement as HTMLElement).clientWidth > 0) {
              adsbygoogle.push({});
            }
          }
        } catch (err) {
          console.warn("AdSense: Aguardando renderização do slot." + err);
        }
      };
  
      const timer = setTimeout(pushAd, 800);
      
      return () => clearTimeout(timer);
    }, [pathname]);

  return (
    /* A MÁGICA DO RECOLHIMENTO: 
       Se o elemento <ins> não ganhar o status de preenchido pelo Google, 
       esta div some por completo da matéria (:hidden com prioridade !important).
    */
    <div className="w-full flex flex-col items-center [&:not(:has(ins[data-ad-status='filled']))]:!hidden my-6 transition-all duration-300">
      
      {/* Etiqueta profissional suavizada e limpa (sem underline agressivo) */}
      <span className="text-gray-400 font-sans text-[10px] tracking-[0.3em] mb-2 uppercase font-semibold">
        Publicidade
      </span>

      {/* Espaço do Anúncio: Removido fundos artificiais e o min-h fixo de 250px */}
      <div className="w-full flex justify-center overflow-hidden py-2">
        <ins
          className="adsbygoogle"
          style={{ display: "block", textDecoration: "none", width: "100%" }}
          data-ad-layout="in-article" // Mantém o formato nativo otimizado para leitura entre parágrafos
          data-ad-format="fluid" // O Google AdSense exige "fluid" para anúncios do tipo in-article funcionarem de forma 100% Flex
          data-ad-client="ca-pub-2300939406288493"
          data-ad-slot="7614784252"   
          data-full-width-responsive="true"   
        />
      </div>

      {/* Linha decorativa sutil de fechamento: Só aparece se o anúncio existir */}
      <div className="w-24 h-[1px] bg-gray-200 mt-4"></div>
    </div>
  );
}