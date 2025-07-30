import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type {
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import type { SubscriptionError } from "../../types/auth";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("baseQueryWithReauth - result:", result);

  // if (result.error && result.error.status === 401) {
  //   // Token inválido - limpar localStorage e redirecionar para login
  //   localStorage.removeItem("token");

  //   // Redirecionar para login apenas se não estiver já na página de login
  //   if (window.location.pathname !== "/login") {
  //     window.location.href = "/login";
  //   }
  // }

  // Intercepta resposta do getMe para garantir role_type persistente
  // if (
  //   args &&
  //   typeof args === "object" &&
  //   "url" in args &&
  //   typeof (args as any).url === "string" &&
  //   (args as any).url.includes("tenant/user")
  // ) {
  //   if (
  //     result.data &&
  //     typeof result.data === "object" &&
  //     "role" in result.data &&
  //     result.data.role &&
  //     typeof result.data.role === "object" &&
  //     "type" in result.data.role &&
  //     typeof result.data.role.type === "string"
  //   ) {
  //     localStorage.setItem("role_type", result.data.role.type);
  //   }
  // }

  // Verificar se a resposta contém erro de assinatura (tanto em data quanto em error)
  let subscriptionError: SubscriptionError | null = null;

  // Verificar em result.data
  if (
    result.data &&
    typeof result.data === "object" &&
    "error_code" in result.data
  ) {
    subscriptionError = result.data as SubscriptionError;
  }

  // Verificar em result.error.data (incluindo status 402)
  if (
    result.error &&
    result.error.data &&
    typeof result.error.data === "object" &&
    "error_code" in result.error.data
  ) {
    subscriptionError = result.error.data as SubscriptionError;
  }

  if (
    subscriptionError &&
    subscriptionError.error_code === "SUBSCRIPTION_REQUIRED"
  ) {
    console.log("Erro de assinatura detectado:", subscriptionError);

    // Redirecionar para a página de assinatura
    const redirectUrl = subscriptionError.redirect_url.replace(
      /^https?:\/\/[^\/]+/,
      ""
    );
    console.log("Redirecionando para:", redirectUrl);

    if (window.location.pathname !== redirectUrl) {
      window.location.href = redirectUrl;
    }

    // Retornar erro para que o componente possa tratar
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "SUBSCRIPTION_REQUIRED",
        data: subscriptionError,
      } as FetchBaseQueryError,
    };
  }

  return result;
};
