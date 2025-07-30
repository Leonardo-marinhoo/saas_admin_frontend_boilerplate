import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { SubscriptionError } from "../types/auth";

export function useSubscriptionError(error: any) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useSubscriptionError - error:", error);

    // Verificar erro customizado
    if (
      error &&
      error.status === "CUSTOM_ERROR" &&
      error.error === "SUBSCRIPTION_REQUIRED"
    ) {
      const subscriptionError = error.data as SubscriptionError;

      // Mostrar mensagem de erro
      console.warn("Erro de assinatura:", subscriptionError.message);

      // Extrair apenas o path da URL
      const redirectUrl = subscriptionError.redirect_url.replace(
        /^https?:\/\/[^\/]+/,
        ""
      );

      // Redirecionar para a página de assinatura se não estiver já lá
      if (window.location.pathname !== redirectUrl) {
        console.log("useSubscriptionError - redirecionando para:", redirectUrl);
        navigate(redirectUrl);
      }
    }

    // Verificar erro 402 (Payment Required)
    if (
      error &&
      error.status === 402 &&
      error.data &&
      error.data.error_code === "SUBSCRIPTION_REQUIRED"
    ) {
      const subscriptionError = error.data as SubscriptionError;

      // Mostrar mensagem de erro
      console.warn("Erro de assinatura (402):", subscriptionError.message);

      // Extrair apenas o path da URL
      const redirectUrl = subscriptionError.redirect_url.replace(
        /^https?:\/\/[^\/]+/,
        ""
      );

      // Redirecionar para a página de assinatura se não estiver já lá
      if (window.location.pathname !== redirectUrl) {
        console.log(
          "useSubscriptionError (402) - redirecionando para:",
          redirectUrl
        );
        navigate(redirectUrl);
      }
    }
  }, []);
}
