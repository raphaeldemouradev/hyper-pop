"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  // Estado que controla se o banner está visível na tela ou oculto
  const [showBanner, setShowBanner] = useState(false);

  // ESTADO NOVO: Controla se a aba de opções personalizadas está aberta ou fechada
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  // ESTADOS DOS CHECKBOXES: Começam marcados (verdadeiro) por padrão
  const [allowAds, setAllowAds] = useState(true);
  const [allowAnalytics, setAllowAnalytics] = useState(true);

  useEffect(() => {
    // Verifica se já existe um consentimento salvo no navegador
    const cookieConsent = localStorage.getItem("cookie-consent-v2");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  /* FUNÇÃO DE SALVAMENTO: Salvar a decisão. */
  const handleConsent = (choice: "accepted" | "declined" | "custom_saved") => {
    try {
      // 1. Se clicou em "Aceitar Todos", salvamos apenas o estado no localStorage
      if (choice === "accepted") {
        localStorage.setItem("cookie-consent-v2", "all_accepted");
      }
      // 2. Se clicou em "Recusar", desativamos ambos no salvamento
      else if (choice === "declined") {
        localStorage.setItem("cookie-consent-v2", "all_declined");
      }
      // 3. Se ele customizou e clicou em "Salvar Escolhas"
      else if (choice === "custom_saved") {
        const escolhas = { ads: allowAds, analytics: allowAnalytics };
        localStorage.setItem("cookie-consent-v2", JSON.stringify(escolhas));
      }
    } catch (error) {
      console.error("Erro ao salvar consentimento:", error);
    }

    // FECHAMENTO: Diz ao React para sumir com o banner da tela
    setShowBanner(false);
  };

  // Trava de exibição para ambiente de produção (Comente a linha abaixo para testar o design fixo na tela!)
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 m-4 md:m-6 p-4 md:p-6 bg-white border border-gray-100 rounded-xl shadow-2xl max-w-4xl mx-auto flex flex-col gap-4 transition-all duration-300 animate-fade-in-up">
      {/* ESTRUTURA PRINCIPAL (Texto + Botões) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texto Informativo */}
        <div className="text-center md:text-left max-w-2xl">
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            Nós valorizamos a sua privacidade 🍪
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            O Hyper Pop utiliza cookies para personalizar anúncios e analisar o
            nosso tráfego. Você pode aceitar todos, recusar ou escolher
            detalhadamente como deseja interagir conosco acessando nossa{" "}
            <a
              href="/privacidade"
              className="text-gray-900 underline font-semibold hover:text-gray-700"
            >
              Política de Privacidade
            </a>
            e
            <a
              href="/termos"
              className="text-gray-900 underline font-semibold hover:text-gray-700"
            >
              Termos e Condições
            </a>
            .
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => handleConsent("declined")}
            className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Recusar
          </button>

          {/* Clicar aqui apenas abre/fecha a aba de opções, sem fechar o banner */}
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              isOptionsOpen
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isOptionsOpen ? "Fechar Opções" : "Personalizar"}
          </button>

          {/* BOTÃO ACEITAR: O ideal para o seu faturamento. Salva "accepted" e libera todos os blocos do AdSense. */}
          <button
            onClick={() => handleConsent("accepted")}
            className="px-5 py-2 text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all shadow-sm"
          >
            Sim, aceitar tudo
          </button>
        </div>
      </div>

      {/* PAINEL DE PERSONALIZAÇÃO SIMULADO (Aba Condicional) */}
      {isOptionsOpen && (
        <div className="w-full border-t border-gray-100 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          {/* Opções de Seleção */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Opção Anúncios */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allowAds}
                onChange={(e) => setAllowAds(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800">
                  Anúncios Personalizados
                </span>
                <span className="text-[11px] text-gray-400">
                  Permite anúncios baseados nos seus interesses.
                </span>
              </div>
            </label>

            {/* Opção Analytics */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allowAnalytics}
                onChange={(e) => setAllowAnalytics(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800">
                  Métricas e Analytics
                </span>
                <span className="text-[11px] text-gray-400">
                  Nos ajuda a entender quais notícias são mais lidas.
                </span>
              </div>
            </label>
          </div>

          {/* Botão de Confirmação das Opções Selecionadas */}
          <button
            onClick={() => handleConsent("custom_saved")}
            className="px-4 py-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto text-center"
          >
            Salvar Minhas Escolhas
          </button>
        </div>
      )}
    </div>
  );
}
