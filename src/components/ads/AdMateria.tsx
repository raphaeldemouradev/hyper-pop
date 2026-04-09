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
            const adElement = document.querySelector(`[data-ad-slot="4911597279"]`);
            
            // Só disparar se o elemento existir e já tiver largura no layout
            if (adElement && (adElement as HTMLElement).clientWidth > 0) {
              adsbygoogle.push({});
            }
          }
        } catch (err) {
          console.warn("AdSense: Aguardando renderização do slot." + err);
        }
      };
  
      // Aumentado para 800ms para garantir que o layout do Hyper Pop se estabilize
      const timer = setTimeout(pushAd, 500);
      
      return () => clearTimeout(timer);
    }, [pathname]);

  return (
    <div className="my-12 w-full flex flex-col items-center">
      {/* Etiqueta profissional conforme discutido */}
      <span className="text-gray-300 font-sans text-[10px] tracking-[0.3em] mb-3 uppercase font-medium">
        Publicidade
      </span>

      {/* Espaço do Anúncio */}
      <div className="w-full flex justify-center overflow-hidden min-h-[250px] bg-[#fdfdfd] border-y border-gray-50 py-4">
        {/* Código Real do Google AdSense */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-layout= "in-article"
          data-ad-format= "auto"
          data-ad-client= "ca-pub-2300939406288493"
          data-ad-slot= "7614784252"   
          data-full-width-responsive="true"   
        />
      </div>

      {/* Linha decorativa sutil para separar do texto */}
      <div className="w-24 h-[2px] bg-[#E6C62F]/30 mt-6"></div>
    </div>
  );
}