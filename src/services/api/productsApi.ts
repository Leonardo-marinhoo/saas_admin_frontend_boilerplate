import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import type { ProductOption } from "./productOptionsApi";

export type ProductImage = {
  id: number;
  product_id: number;
  file_name: string;
  file_path: string;
  full_file_path: string;
  is_primary: number;
  order: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  category_name: string;
  images: ProductImage[];
  thumbnail: string;
  options: ProductOption[];
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: "tenant/products",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      keepUnusedDataFor: 10, // dados expiram no time setado
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => ({
        url: `tenant/products/${id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      providesTags: (_result, _error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
      keepUnusedDataFor: 10, // dados expiram no time setado
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: "tenant/products",
        method: "POST",
        body,
        formData: true,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, { id: number; data: FormData }>({
      query: ({ id, data }) => {
        data.append("_method", "PUT");
        return {
          url: `tenant/products/${id}`,
          method: "POST",
          body: data,
          formData: true,
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        };
      },
      invalidatesTags: ["Product"],
    }),
    setPrimaryImage: builder.mutation<
      Product,
      { productId: number; imageId: number }
    >({
      query: ({ productId, imageId }) => ({
        url: `tenant/products/${productId}/set-primary-image/${imageId}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Product"],
    }),
    addProductImages: builder.mutation<
      Product,
      { productId: number; images: File[] }
    >({
      query: ({ productId, images }) => {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("images[]", image);
        });

        return {
          url: `tenant/products/${productId}/images`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProductImage: builder.mutation<
      Product,
      { productId: number; imageId: number }
    >({
      query: ({ productId, imageId }) => ({
        url: `tenant/products/${productId}/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `tenant/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useSetPrimaryImageMutation,
  useAddProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
} = productsApi;
