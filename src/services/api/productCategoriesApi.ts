import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export type Category = {
  id: number;
  name: string;
  description: string | null;
  banner_image: string | null;
  icon_image: string | null;
};

export type CreateCategoryRequest = {
  name: string;
  description?: string;
  bannerFile?: File;
  iconFile?: File;
};

export type UpdateCategoryRequest = {
  name: string;
  description?: string;
  bannerFile?: File;
  iconFile?: File;
};

export const productCategoriesApi = createApi({
  reducerPath: 'productCategoriesApi',
  baseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: 'tenant/product-categories',  
      }),
      keepUnusedDataFor: 0, // dados expiram no time setado
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (body) => {
        const formData = new FormData();
        
        // Ensure name is always sent
        if (!body.name) {
          throw new Error('Name is required');
        }
        
        formData.append('name', body.name);
        
        if (body.description) {
          formData.append('description', body.description);
        }
        if (body.bannerFile) {
          formData.append('bannerFile', body.bannerFile);
        }
        if (body.iconFile) {
          formData.append('iconFile', body.iconFile);
        }

        return {
          url: 'tenant/product-categories',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, { id: number; data: UpdateCategoryRequest }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        
        // Ensure name is always sent
        if (!data.name) {
          throw new Error('Name is required');
        }
        
        // Add _method=PUT for Laravel to handle it as a PUT request
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        
        if (data.description) {
          formData.append('description', data.description);
        }
        if (data.bannerFile) {
          formData.append('bannerFile', data.bannerFile);
        }
        if (data.iconFile) {
          formData.append('iconFile', data.iconFile);
        }

        return {
          url: `tenant/product-categories/${id}`,
          method: 'POST', // Laravel expects POST for FormData with _method=PUT
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `tenant/product-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productCategoriesApi;