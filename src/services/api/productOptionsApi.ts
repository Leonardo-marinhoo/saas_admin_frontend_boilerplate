import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export type OptionValue = {
  id?: number;
  option_id?: number;
  name: string;
  price_increment: number;
  default_option: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProductOption = {
  id?: number;
  name: string;
  type: "single" | "multiple";
  required: boolean;
  product_id?: number;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    product_id: number;
    option_id: number;
    created_at: string;
    updated_at: string;
  };
  values: OptionValue[];
};

export const productOptionsApi = createApi({
  reducerPath: "productOptionsApi",
  baseQuery,
  tagTypes: ["ProductOption", "Product"],
  endpoints: (builder) => ({
    getOptions: builder.query<{ options: ProductOption[] }, void>({
      query: () => ({
        url: "tenant/options",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      providesTags: ["ProductOption"],
    }),
    createOption: builder.mutation<ProductOption, ProductOption>({
      query: (body) => ({
        url: "tenant/options",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProductOption", { type: "Product", id: "LIST" }],
    }),
    updateOption: builder.mutation<
      { message: string; option: ProductOption },
      { id: number; data: Partial<ProductOption> }
    >({
      query: ({ id, data }) => ({
        url: `tenant/options/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProductOption", { type: "Product", id: "LIST" }],
    }),
    updateOptionValue: builder.mutation<
      { message: string; option_value: OptionValue },
      { optionId: number; valueId: number; data: Partial<OptionValue> }
    >({
      query: ({ optionId, valueId, data }) => ({
        url: `tenant/options/${optionId}/values/${valueId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProductOption", { type: "Product", id: "LIST" }],
    }),
    deleteOption: builder.mutation<void, number>({
      query: (id) => ({
        url: `tenant/options/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductOption", "Product"],
    }),
    attachOptionToProduct: builder.mutation<
      { message: string },
      { optionIds: number[]; productId: number }
    >({
      query: ({ optionIds, productId }) => ({
        url: `tenant/products/${productId}/options`,
        method: "POST",
        body: { option_ids: optionIds },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProductOption", { type: "Product", id: "LIST" }],
    }),
    detachOptionFromProduct: builder.mutation<
      { message: string },
      { optionIds: number[]; productId: number }
    >({
      query: ({ optionIds, productId }) => ({
        url: `tenant/products/${productId}/options`,
        method: "DELETE",
        body: { option_ids: optionIds },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["ProductOption", { type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOptionsQuery,
  useCreateOptionMutation,
  useUpdateOptionMutation,
  useUpdateOptionValueMutation,
  useDeleteOptionMutation,
  useAttachOptionToProductMutation,
  useDetachOptionFromProductMutation,
} = productOptionsApi;
