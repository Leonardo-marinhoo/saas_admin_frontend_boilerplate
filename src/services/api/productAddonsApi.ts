import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import type { Ingredient, ProductAddon } from "../../types/addon";

export const productAddonsApi = createApi({
  reducerPath: "productAddonsApi",
  baseQuery,
  tagTypes: ["ProductAddon", "Product"],
  endpoints: (builder) => ({
    getProductAddons: builder.query<ProductAddon[], number>({
      query: (productId) => `tenant/products/${productId}/addons`,
      providesTags: ["ProductAddon"],
    }),
    createProductAddon: builder.mutation<
      ProductAddon,
      { productId: number; data: FormData }
    >({
      query: ({ productId, data }) => ({
        url: `tenant/products/${productId}/addons`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["ProductAddon", { type: "Product", id: "LIST" }],
    }),
    getIngredients: builder.query<Ingredient[], void>({
      query: () => `tenant/ingredients`,
    }),
    attachIngredientToProductAddon: builder.mutation<
      any,
      {
        productId: number;
        data: {
          ingredient_id: number;
          extra_price: number;
          max_quantity?: number;
          is_required?: boolean;
          order?: number;
        };
      }
    >({
      query: ({ productId, data }) => ({
        url: `tenant/products/${productId}/addons/attach`,
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["ProductAddon", { type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductAddonsQuery,
  useCreateProductAddonMutation,
  useGetIngredientsQuery,
  useAttachIngredientToProductAddonMutation,
} = productAddonsApi;
