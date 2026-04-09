"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdTopHorizontal() {
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
    const timer = setTimeout(pushAd, 800);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="w-full bg-[#ffffff] py-5 flex justify-center border-b border-gray-100">
      
      {/* CONTAINER PRINCIPAL: Altura máxima travada para NÃO ESTICAR */}
      <div className="relative w-full bg-gray-200 flex flex-col items-center border border-gray-400 overflow-hidden rounded-md shadow-2x1 max-w-[320px] md:max-w-[728px] lg:max-w-[970px]]">
        
        {/* FAIXA DE PUBLICIDADE: Dentro do bloco cinza e fixa no topo */}
        <div className="w-full bg-gray-400/30 border-b border-gray-400/50 py-1 flex justify-center shrink-0">
          <span className="text-gray-600 font-black text-[10px] tracking-[0.2em] uppercase">
            Publicidade
          </span>
        </div>

        {/* ÁREA DO ANÚNCIO: Forçamos o Google a respeitar o espaço horizontal */}
        <div className="w-full flex justify-center items-center min-h-[100px] md:min-h-[90px]">
          <ins
            className="adsbygoogle"
            style={{ display: "block"}}
            data-ad-client="ca-pub-2300939406288493"
            data-ad-slot="4911597279"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}