import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import { tenantApi } from "./services/api/tenantApi";
import { authApi } from "./services/api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tenantApi.reducerPath]: tenantApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tenantApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
