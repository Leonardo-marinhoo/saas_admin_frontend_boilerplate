import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export type SubscriptionInfo = {
  id: number;
  type: string;
  status: string;
  external_id: string | null;
  next_billing_date: string | null;
  trial_ends_at: string | null;
  starts_at: string | null;
  ends_at: string | null;
  cancelled_at: string | null;
  unpaid_at: string | null;
  past_due_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TenantInfo = {
  id: number;
  client_token: string;
  name: string;
  domain?: string | null;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code?: string | null;
  country?: string | null;
  logo?: string;
  banner?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  delivery_tax?: string;
  subscription_id?: number;
  primary_color?: string | null;
  secondary_color?: string | null;
  subscription?: SubscriptionInfo;
};

export type UpdateTenantInfoRequest = {
  name: string;
  domain?: string;
  city: string;
  logo?: File;
  banner?: File;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  zip_code?: string;
  country?: string;
};

export type UpdateTenantStatusRequest = {
  status: string;
};

export type UpdateDeliveryTaxRequest = {
  delivery_tax: string;
};

// Types para usuários do tenant
export type TenantUserRole = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type TenantUser = {
  id: number;
  name: string;
  email: string;
  tenant_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
  role: TenantUserRole;
};

export type GetTenantUsersResponse = {
  users: TenantUser[];
};

export type CreateTenantUserRequest = {
  name: string;
  email: string;
  password: string;
  role_type: "kitchen" | "delivery";
};

export type CreateTenantUserResponse = TenantUser;

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  baseQuery,
  tagTypes: ["TenantInfo"],
  endpoints: (builder) => ({
    getTenantInfo: builder.query<TenantInfo, void>({
      query: () => ({
        url: "tenant/infos",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      keepUnusedDataFor: 0,
      providesTags: ["TenantInfo"],
    }),
    updateTenantStatus: builder.mutation<TenantInfo, UpdateTenantStatusRequest>(
      {
        query: (body) => ({
          url: "tenant/infos/status",
          method: "PATCH",
          body: { status: body.status },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
        invalidatesTags: ["TenantInfo"],
      }
    ),
    updateTenantInfo: builder.mutation<TenantInfo, UpdateTenantInfoRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", body.name || "");
        formData.append("city", body.city || "");
        formData.append("street", body.street || "");
        formData.append("number", body.number || "");
        formData.append("neighborhood", body.neighborhood || "");
        formData.append("state", body.state || "");
        if (body.domain !== undefined && body.domain !== "") {
          formData.append("domain", body.domain);
        }
        if (body.zip_code !== undefined && body.zip_code !== "") {
          formData.append("zip_code", body.zip_code);
        }
        if (body.country !== undefined && body.country !== "") {
          formData.append("country", body.country);
        }
        if (body.logo) {
          formData.append("logo", body.logo);
        }
        if (body.banner) {
          formData.append("banner", body.banner);
        }
        // Debug: log do FormData
        console.log("FormData enviado para tenant/infos/edit:");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
        return {
          url: "tenant/infos/edit",
          method: "POST",
          body: formData,
          formData: true,
          headers: {
            Accept: "application/json",
          },
        };
      },
      invalidatesTags: ["TenantInfo"],
    }),
    // Adicionando mutation para ativar plano
    createCheckoutSession: builder.mutation<{ url: string }, void>({
      query: () => ({
        url: "checkout/session",
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    // Adicionando mutation para cancelar assinatura
    cancelSubscription: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "subscription/cancel",
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["TenantInfo"],
    }),
    // Adicionando mutation para reativar assinatura
    reactivateSubscription: builder.mutation<
      {
        message: string;
        url?: string;
        requires_payment: boolean;
        subscription?: SubscriptionInfo;
      },
      void
    >({
      query: () => ({
        url: "subscription/reactivate",
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["TenantInfo"],
    }),
    // Adicionando mutation para atualizar taxa de delivery
    updateDeliveryTax: builder.mutation<TenantInfo, UpdateDeliveryTaxRequest>({
      query: (body) => ({
        url: "tenant/infos/delivery-tax",
        method: "PATCH",
        body: { delivery_tax: body.delivery_tax },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["TenantInfo"],
    }),
    // Adicionando endpoint para listar usuários do tenant
    getTenantUsers: builder.query<GetTenantUsersResponse, void>({
      query: () => ({
        url: "tenant/users",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    // Adicionando mutation para criar usuário do tenant
    createTenantUser: builder.mutation<
      CreateTenantUserResponse,
      CreateTenantUserRequest
    >({
      query: (body) => ({
        url: "tenant/users",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetTenantInfoQuery,
  useUpdateTenantInfoMutation,
  useUpdateTenantStatusMutation,
  useCreateCheckoutSessionMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useUpdateDeliveryTaxMutation,
  useGetTenantUsersQuery,
  useCreateTenantUserMutation,
} = tenantApi;
