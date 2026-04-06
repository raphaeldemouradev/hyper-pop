"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdTopHorizontal() {
  const pathname = usePathname();

  useEffect(() => {
    // Função para empurrar o anúncio com uma pequena folga de tempo
    const pushAd = () => {
      try {
        // Verifica se o script do Google já está disponível no window
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    };

    // O timeout de 500ms evita o conflito de renderização inicial do Next.js
    const timer = setTimeout(pushAd, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
      
      {/* CONTAINER PRINCIPAL: Altura máxima travada para NÃO ESTICAR */}
      <div className="relative w-full max-w-[300px] md:max-w-[728px] bg-gray-300 flex flex-col items-center border border-gray-400 overflow-hidden rounded-sm shadow-sm">
        
        {/* FAIXA DE PUBLICIDADE: Dentro do bloco cinza e fixa no topo */}
        <div className="w-full bg-gray-400/30 border-b border-gray-400/50 py-1 flex justify-center shrink-0">
          <span className="text-gray-600 font-mono text-[9px] tracking-[0.2em] uppercase">
            Publicidade
          </span>
        </div>

        {/* ÁREA DO ANÚNCIO: Forçamos o Google a respeitar o espaço horizontal */}
        <div className="w-full flex justify-center items-center min-h-[100px] md:min-h-[90px]">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "90px" }}
            data-ad-client="ca-pub-2300939406288493"
            data-ad-slot="4911597279"
            data-ad-format="horizontal"
            data-full-width-responsive="false"
          />
        </div>
      </div>
    </div>
  );
}