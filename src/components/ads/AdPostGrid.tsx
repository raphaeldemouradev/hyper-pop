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
        console.warn("AdSense: Aguardando renderização do slot." + err);
      }
    };

    // Aumentado para 800ms para garantir que o layout do Hyper Pop se estabilize
    const timer = setTimeout(pushAd, 800);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  const configs = {
    mobile: "flex md:hidden col-span-1",
    tablet: "hidden md:flex lg:hidden col-span-2",
    desktop: "hidden lg:flex col-span-3",
  };

  return (
    /* A MÁGICA: O seletor [&:not(:has(...))]:!hidden força o container inteiro 
      (inclusive a col-span do grid) a virar "display: none" caso o anúncio não esteja preenchido.
    */
    <div className={`${configs[type]} justify-center w-full [&:not(:has(ins[data-ad-status='filled']))]:!hidden py-4`}>

      {/* Container do Anúncio: Removido bordas rígidas e fundo cinza que causavam visual de "site incompleto" */}
      <div className="w-full flex flex-col items-center overflow-hidden transition-all duration-300">
        
        {/* Label de Publicidade: Só aparece se o anúncio de baixo for carregado */}
        <div className="w-full flex justify-center pb-1">
          <span className="text-gray-600 font-bold text-[10px] tracking-[0.2em] uppercase underline">
            Publicidade
          </span>
        </div>

       {/* Área do Anúncio: Deixamos o tamanho fluido para o Google escolher o melhor formato nativo */}
        <div className="w-full flex justify-center items-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minWidth: "250px" }}
            data-ad-client="ca-pub-2300939406288493"
            data-ad-slot="2708203827"
            data-ad-format="fluid" // Alterado para fluid, perfeito para blocos que ficam no meio de feeds de notícias
            data-ad-layout-key="-6t+ed+2i-1n-4w" // Ajuda o AdSense a mesclar o anúncio nativo com o design dos seus posts
          />
        </div>
        
      </div>
    </div>
  );
}