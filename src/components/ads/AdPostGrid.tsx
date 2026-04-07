"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface AdPostGridProps {
  type: "mobile" | "tablet" | "desktop";
}

export default function AdPostGrid({ type }: AdPostGridProps) {
  const pathname = usePathname();

  useEffect(() => {
    const pushAd = () => {
      try {
        // Usamos (window as any) para o TypeScript entender scripts externos
        const adsbygoogle = (window as any).adsbygoogle;

        if (typeof window !== "undefined" && adsbygoogle) {
          // Selecionamos o elemento específico deste slot
          const adElement = document.querySelector(`[data-ad-slot="2708203827"]`);
          
          // Só disparar se o elemento existir e já tiver largura no layout
          if (adElement && (adElement as HTMLElement).clientWidth > 0) {
            adsbygoogle.push({});
          }
        }
      } catch (err) {
        // Log leve para não poluir o console do usuário final
        console.warn("AdSense: Aguardando renderização do slot.");
      }
    };

    // Aumentado para 800ms para garantir que o layout do Hyper Pop se estabilize
    const timer = setTimeout(pushAd, 800);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  const configs = {
    mobile: "block md:hidden col-span-1",
    tablet: "hidden md:flex lg:hidden col-span-2",
    desktop: "hidden lg:flex col-span-3",
  };

  return (
    <div className={`${configs[type]} py-5 flex justify-center w-full`}>

      {/* Container do Anúncio */}
      <div className="relative w-full bg-gray-200 flex flex-col items-center border border-gray-400 overflow-hidden rounded-md shadow-2xl transition-all duration-300">
        
        {/* Label de Publicidade */}
        <div className="w-full bg-gray-400/30 border-b border-gray-400/50 py-1 flex justify-center shrink-0">
          <span className="text-gray-600 font-black text-[10px] tracking-[0.2em] uppercase">
            Espaço Publicitário
          </span>
        </div>

        {/* Área do Anúncio */}
        <div className="w-full flex justify-center items-center min-h-[180px] md:min-h-[250px]">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2300939406288493"
            data-ad-slot="2708203827"
            data-ad-format="auto"  
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}