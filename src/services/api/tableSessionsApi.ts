import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import type { Order } from "./ordersApi"; // Assuming Order type can be reused or adapted

export type TableSession = {
  id: number;
  tenant_id: number;
  table: string;
  status: "open" | "closed";
  opened_at: string;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  orders: Order[];
};

export const tableSessionsApi = createApi({
  reducerPath: "tableSessionsApi",
  baseQuery,
  tagTypes: ["TableSession"],
  endpoints: (builder) => ({
    getTableSessions: builder.query<TableSession[], void>({
      query: () => ({
        url: "tenant/table-session",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["TableSession"],
    }),
    closeTableSession: builder.mutation<TableSession, { sessionId: number }>({
      query: ({ sessionId }) => ({
        url: `tenant/table-session/${sessionId}/close`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["TableSession"],
    }),
  }),
});

export const { useGetTableSessionsQuery, useCloseTableSessionMutation } =
  tableSessionsApi;
