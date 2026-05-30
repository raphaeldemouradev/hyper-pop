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
    // O container principal monitora os filhos. Se o AdSense estiver vazio, ele não ocupa espaço na tela.
    <div className="w-full flex justify-center [&:not(:has(ins[data-ad-status='filled']))]:hidden py-4 border-b border-gray-100">
      
      {/* CONTAINER PRINCIPAL: Altura máxima travada para NÃO ESTICAR */}
      <div className="w-full flex flex-col items-center max-w-[320px] md:max-w-[728px] lg:max-w-[970px]">
        
        {/* FAIXA DE PUBLICIDADE: Agora ela fica solta no topo, sem bloco cinza em volta */}
        <div className="w-full flex justify-center pb-1">
          <span className="text-gray-600 font-bold text-[10px] tracking-[0.2em] uppercase">
            Publicidade
          </span>
        </div>

        {/* ÁREA DO ANÚNCIO: Sem background cinza, sem bordas pesadas. 100% limpo. */}
        <div className="w-full flex justify-center items-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minWidth: "250px" }}
            data-ad-client="ca-pub-2300939406288493"
            data-ad-slot="4911597279"
            data-ad-format="horizontal" // Mudado de "auto" para "horizontal" para evitar que ele quebre o layout verticalmente
            data-full-width-responsive="true"
          />
        </div>
        
      </div>
    </div>
  );
}