import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import { productCategoriesApi } from "./services/api/productCategoriesApi";
import { productsApi } from "./services/api/productsApi";
import { productOptionsApi } from "./services/api/productOptionsApi";
import { ordersApi } from "./services/api/ordersApi";
import { tenantApi } from "./services/api/tenantApi";
import { tableSessionsApi } from "./services/api/tableSessionsApi";
import { authApi } from "./services/api/authApi";
import { productAddonsApi } from "./services/api/productAddonsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [productCategoriesApi.reducerPath]: productCategoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productOptionsApi.reducerPath]: productOptionsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [tenantApi.reducerPath]: tenantApi.reducer,
    [tableSessionsApi.reducerPath]: tableSessionsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productAddonsApi.reducerPath]: productAddonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productCategoriesApi.middleware,
      productsApi.middleware,
      productOptionsApi.middleware,
      ordersApi.middleware,
      tenantApi.middleware,
      tableSessionsApi.middleware,
      authApi.middleware,
      productAddonsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
