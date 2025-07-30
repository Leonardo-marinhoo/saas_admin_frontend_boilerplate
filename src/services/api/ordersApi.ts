import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import type { TableSession } from "./tableSessionsApi";

export type OrderItemProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  thumbnail: string;
  category: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  note: string;
};

export type OrderItemOption = {
  id: number;
  order_item_id: number;
  option_id: number;
  option_value_id: number;
  price_increment: string;
  created_at: string;
  updated_at: string;
  option: {
    id: number;
    name: string;
    type: string;
    required: boolean;
    created_at: string;
    updated_at: string;
  };
  option_value: {
    id: number;
    option_id: number;
    name: string;
    price_increment: string;
    default_option: boolean;
    created_at: string;
    updated_at: string;
  };
};

export type OrderItemAddon = {
  id: number;
  order_item_id: number;
  ingredient_id: number;
  quantity: number;
  unit_price: string;
  extra_price: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  ingredient: {
    id: number;
    tenant_id: number;
    name: string;
    unit: string;
    unit_price: string;
    stock_quantity: string;
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
  };
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  status: string;
  created_at: string;
  updated_at: string;
  product: OrderItemProduct;
  note: string;
  order_options: OrderItemOption[];
  order_addons?: OrderItemAddon[];
};

export type Order = {
  id: number;
  user_id: number | null;
  status: string;
  payment_status: PaymentStatus;
  total_amount: string;
  payment_method: string | null;
  delivery_name: string | null;
  delivery_address: string | null;
  delivery_phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  finished: boolean | number;
  items: OrderItem[];
  type: string;
  table_session_id?: number;
  table_session?: TableSession;
  delivery_tax?: string;
};

export type CreateOrderRequest = {
  table: string;
  notes?: string;
  items: {
    product_id: number;
    quantity: number;
    note?: string;
    options?: Array<{
      option_id: number;
      option_value_id: number;
    }>;
    addons?: Array<{
      product_addon_id: number;
      quantity: number;
    }>;
  }[];
};

export type AddOrderToSessionRequest = {
  notes?: string;
  items: {
    product_id: number;
    quantity: number;
    note?: string;
  }[];
};

export type PaymentStatus = "pending" | "paid" | "cancelled";

export type UpdatePaymentStatusRequest = {
  payment_status: PaymentStatus;
  payment_method?: string;
};

export type ReadyForDeliveryOrdersResponse = {
  orders: Order[];
};

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Order", "TableSession"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: "tenant/orders",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      keepUnusedDataFor: 10, // dados expiram no time setado
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: "tenant/orders",
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Order", "TableSession"],
    }),
    addOrderToSession: builder.mutation<
      Order,
      { sessionId: number; body: AddOrderToSessionRequest }
    >({
      query: ({ sessionId, body }) => ({
        url: `tenant/table-session/${sessionId}/order`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Order", "TableSession"],
    }),
    updateOrderStatus: builder.mutation<Order, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `tenant/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    updatePaymentStatus: builder.mutation<
      Order,
      { id: number; payment_status: PaymentStatus; payment_method?: string }
    >({
      query: ({ id, payment_status, payment_method }) => ({
        url: `tenant/orders/${id}/payment-status`,
        method: "PATCH",
        body: payment_method
          ? { payment_status, payment_method }
          : { payment_status },
      }),
      invalidatesTags: ["Order", "TableSession"],
    }),
    finishOrder: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `tenant/orders/${id}/finish`,
        method: "PATCH",
      }),
    }),
    markOrderAsDelivered: builder.mutation<Order, { id: number }>({
      query: ({ id }) => ({
        url: `tenant/orders/${id}/mark-as-delivered`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    getReadyForDeliveryOrders: builder.query<
      ReadyForDeliveryOrdersResponse,
      void
    >({
      query: () => ({
        url: "tenant/orders/delivery/ready",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      providesTags: ["Order"],
    }),
    collectOrderForDelivery: builder.mutation<Order, { id: number }>({
      query: ({ id }) => ({
        url: `tenant/orders/${id}/collect-for-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    getDriverDeliveries: builder.query<ReadyForDeliveryOrdersResponse, void>({
      query: () => ({
        url: "tenant/driver/deliveries",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      providesTags: ["Order"],
    }),
    finishDriverDeliveryPayment: builder.mutation<Order, { id: number }>({
      query: ({ id }) => ({
        url: `tenant/driver/deliveries/${id}/finish-payment`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useAddOrderToSessionMutation,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useFinishOrderMutation,
  useMarkOrderAsDeliveredMutation,
  useGetReadyForDeliveryOrdersQuery,
  useCollectOrderForDeliveryMutation,
  useGetDriverDeliveriesQuery,
  useFinishDriverDeliveryPaymentMutation,
} = ordersApi;
