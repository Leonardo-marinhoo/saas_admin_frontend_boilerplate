import { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import {
  useFinishOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../services/api/ordersApi";
import type { Order } from "../../services/api/ordersApi";
import { useSubscriptionError } from "../../hooks/useSubscriptionError";
import { FaWhatsapp } from "react-icons/fa";
import { handlePrintOrder } from "../../utils/print";

const notificationSound = new Audio("/notification.mp3");

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "processing":
      return "Processando";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

export default function Orders() {
  const {
    data: orders = [],
    isLoading,
    refetch,
    error: ordersError,
  } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [finishOrder] = useFinishOrderMutation();
  const [error, setError] = useState("");
  const previousOrdersRef = useRef<Order[]>([]);
  const intervalRef = useRef<number>(0);

  // Verificar erros de assinatura
  useSubscriptionError(ordersError);

  useEffect(() => {
    const updateRate = Number(import.meta.env.VITE_ORDERS_UPDATE_RATE) || 30000; // Default 30 seconds

    // Start polling immediately when component mounts
    intervalRef.current = window.setInterval(() => {
      refetch();
    }, updateRate);

    // Cleanup when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetch]);

  useEffect(() => {
    if (orders.length > 0) {
      const previousIds = new Set(
        previousOrdersRef.current.map((order) => order.id)
      );
      const hasNewOrders = orders.some((order) => !previousIds.has(order.id));

      if (hasNewOrders) {
        // Play sound even when page is not visible
        const playPromise = notificationSound.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Erro ao tocar o som:", error);
          });
        }
      }
    }
    previousOrdersRef.current = orders;
  }, [orders]);

  const handleStatusChange = async (order: Order, newStatus: string) => {
    setError("");
    try {
      await updateOrderStatus({
        id: order.id,
        status: newStatus,
      }).unwrap();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      setError("Erro ao atualizar status do pedido");
    }
  };
  const handleFinishOrder = async (order: Order) => {
    finishOrder({
      id: order.id,
    });
  };

  const activeOrders = orders.filter((order) => !order.finished);

  const groupedOrders = activeOrders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  const statuses = ["pending", "processing", "completed", "cancelled"];

  if (isLoading)
    return <S.LoadingMessage>Carregando pedidos...</S.LoadingMessage>;

  return (
    <S.Container>
      <h1>Painel de Pedidos</h1>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.KanbanBoard>
        {statuses.map((status) => (
          <S.Column key={status}>
            <S.StatusHeader status={status}>
              {getStatusLabel(status)} ({groupedOrders[status]?.length || 0})
            </S.StatusHeader>
            <S.OrderListWrapper>
              {groupedOrders[status]?.map((order) => (
                <S.OrderCard key={order.id}>
                  <S.OrderHeader>
                    <S.OrderId>#{order.id}</S.OrderId>
                    <S.OrderTotal>R$ {order.total_amount}</S.OrderTotal>
                  </S.OrderHeader>
                  <div
                    style={{
                      margin: "4px 0 8px 0",
                      fontWeight: 500,
                      color: "#666",
                    }}
                  >
                    Tipo:{" "}
                    {order.type === "dinein"
                      ? "Comanda"
                      : order.type === "delivery"
                      ? "Delivery"
                      : order.type}
                  </div>
                  <S.OrderInfo>
                    <div>
                      <strong>Cliente:</strong>{" "}
                      {order.table_session_id
                        ? order.table_session?.table
                        : order.delivery_name}
                    </div>
                    {!order.table_session_id && (
                      <>
                        <div>
                          <strong>Endereço:</strong> {order.delivery_address}
                        </div>
                        <div>
                          <strong>Telefone:</strong> {order.delivery_phone}
                          {order.delivery_phone && (
                            <button
                              style={{
                                marginLeft: "0.5rem",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                              title="Abrir WhatsApp"
                              onClick={() => {
                                const phone = order.delivery_phone?.replace(
                                  /\D/g,
                                  ""
                                );
                                window.open(`https://wa.me/${phone}`, "_blank");
                              }}
                            >
                              <FaWhatsapp size={20} color="#25D366" />
                            </button>
                          )}
                        </div>
                        <div>
                          <strong>Pagamento:</strong> {order.payment_method}
                        </div>
                      </>
                    )}
                  </S.OrderInfo>
                  <S.OrderItems>
                    <strong>Itens:</strong>

                    {order.items.map((item) => (
                      <S.OrderItem key={item.id}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              width: "100%",
                            }}
                          >
                            <S.ItemThumbnail src={item.product.thumbnail} />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: 12,
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 600,
                                  fontSize: "1.05em",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.quantity}x {item.product.name}
                              </span>
                              {item.product.description && (
                                <span
                                  style={{
                                    color: "#888",
                                    fontSize: "0.93em",
                                    marginTop: 2,
                                    whiteSpace: "normal",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: 260,
                                  }}
                                >
                                  {item.product.description}
                                </span>
                              )}
                              {item.note && (
                                <span
                                  style={{
                                    color: "#b71c1c",
                                    fontSize: "0.92em",
                                    marginTop: 2,
                                  }}
                                >
                                  {item.note}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.order_options &&
                            item.order_options.length > 0 && (
                              <div style={{ marginTop: 4 }}>
                                {item.order_options.map(
                                  (orderOption, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        fontSize: "0.92em",
                                        color: "#444",
                                        marginLeft: 8,
                                        marginBottom: 2,
                                      }}
                                    >
                                      {orderOption.option_value.name}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          {item.order_addons &&
                            item.order_addons.length > 0 && (
                              <div style={{ marginTop: 4 }}>
                                {item.order_addons.map((addon, idx) => (
                                  <div
                                    key={idx}
                                    style={{
                                      fontSize: "0.92em",
                                      color: "#444",
                                      marginLeft: 8,
                                      marginBottom: 2,
                                    }}
                                  >
                                    • Adicional: {addon.quantity}x{" "}
                                    {addon.ingredient?.name}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      </S.OrderItem>
                    ))}
                  </S.OrderItems>
                  <S.StatusSelect
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </S.StatusSelect>
                  {/* Botão de imprimir */}
                  <button
                    style={{
                      marginTop: "0.75rem",
                      width: "100%",
                      background: "#222",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "0.5rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const orderForPrint = {
                        ...order,
                        items: order.items.map((item) => ({
                          ...item,
                          note: [
                            ...(item.order_options || []).map(
                              (option) => `${option.option_value.name}`
                            ),
                            ...(item.order_addons || []).map(
                              (addon) =>
                                `${addon.quantity}x ${addon.ingredient?.name}`
                            ),
                          ].join(", "),
                        })),
                      };
                      handlePrintOrder(orderForPrint);
                    }}
                  >
                    Imprimir
                  </button>
                  {order.status === "completed" ||
                  order.status === "cancelled" ? (
                    <S.FinishBtn onClick={() => handleFinishOrder(order)}>
                      Finalizar
                    </S.FinishBtn>
                  ) : null}
                </S.OrderCard>
              ))}
            </S.OrderListWrapper>
          </S.Column>
        ))}
      </S.KanbanBoard>
    </S.Container>
  );
}
