import {
  useGetTableSessionsQuery,
  useCloseTableSessionMutation,
} from "../../services/api/tableSessionsApi";
import { useUpdatePaymentStatusMutation } from "../../services/api/ordersApi";
import { useState } from "react";
import Swal from "sweetalert2";
import * as S from "./styles";
import { theme } from "../../styles/theme";

// Enum para métodos de pagamento
export enum PaymentMethod {
  Pix = "pix",
  Debit = "debit",
  Credit = "credit",
  Money = "money",
}

// Função para traduzir o status do pedido
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

// Função para traduzir o status de pagamento
const getPaymentStatusLabel = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "pending":
      return "Pendente";
    case "paid":
      return "Pago";
    case "cancelled":
      return "Cancelado";
    default:
      return paymentStatus;
  }
};

export default function TableSessions() {
  const {
    data: sessions,
    isLoading,
    isError,
    refetch: refetchTableSessions,
  } = useGetTableSessionsQuery();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const [closeTableSession] = useCloseTableSessionMutation();
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [closingSessionId, setClosingSessionId] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [orderPaymentMethod, setOrderPaymentMethod] = useState<{
    [orderId: number]: PaymentMethod | "";
  }>({});

  const handleCloseSession = async (session: any) => {
    const hasUnpaidOrders = session.orders.some((order: any) => {
      const isCancelled =
        order.status === "cancelled" || order.payment_status === "cancelled";
      const isPaid = order.payment_status === "paid";
      return !isCancelled && !isPaid;
    });

    if (hasUnpaidOrders) {
      Swal.fire({
        title: "Atenção!",
        text: "Existem pedidos na comanda que não foram pagos ou cancelados",
        icon: "warning",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setClosingSessionId(session.id);
      await closeTableSession({ sessionId: session.id }).unwrap();
      await refetchTableSessions();
    } catch (error) {
      console.error("Erro ao fechar comanda:", error);
    } finally {
      setClosingSessionId(null);
    }
  };

  const handleReceivePaymentClick = (session: any) => {
    setSelectedSession(session);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (orderId: number) => {
    const paymentMethod = orderPaymentMethod[orderId];
    if (!paymentMethod) return;
    try {
      setUpdatingOrderId(orderId);
      await updatePaymentStatus({
        id: orderId,
        payment_status: "paid",
        payment_method: paymentMethod,
      }).unwrap();
      setSelectedSession((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          orders: prev.orders.map((order: any) =>
            order.id === orderId ? { ...order, payment_status: "paid" } : order
          ),
        };
      });
      setOrderPaymentMethod((prev) => ({ ...prev, [orderId]: "" }));
      setUpdatingOrderId(null);
      Swal.fire({
        icon: "success",
        title: "Pagamento atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });
      await refetchTableSessions();
    } catch (error) {
      setUpdatingOrderId(null);
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando comandas...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar as comandas.</div>;
  }

  return (
    <S.Container>
      <S.Title>Comandas Abertas</S.Title>
      <S.SessionsGrid>
        {sessions
          ?.filter((session) => session.status === "open")
          .map((session) => (
            <S.SessionCard key={session.id}>
              <S.SessionHeader>
                <S.SessionTable>{session.table}</S.SessionTable>
                <S.SessionStatus>
                  {session.status === "open" ? "Aberta" : session.status}
                </S.SessionStatus>
              </S.SessionHeader>
              <S.OrdersList>
                {session.orders.map((order) => (
                  <S.OrderCard key={order.id}>
                    <S.OrderHeader>
                      <span>Pedido #{order.id}</span>
                      <S.OrderTotal>
                        R$ {Number(order.total_amount).toFixed(2)}
                      </S.OrderTotal>
                    </S.OrderHeader>
                    <div style={{ marginBottom: 8 }}>
                      <span>Status: {getStatusLabel(order.status)}</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <span>
                        Pagamento: {getPaymentStatusLabel(order.payment_status)}
                      </span>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        <strong>Itens:</strong>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {order.items.map((item) => (
                            <li key={item.id} style={{ marginBottom: 6 }}>
                              <span>
                                {item.product?.name || "Produto"} x
                                {item.quantity}
                              </span>
                              {item.note && (
                                <span
                                  style={{
                                    fontStyle: "italic",
                                    color: "#888",
                                    marginLeft: 8,
                                  }}
                                >
                                  ({item.note})
                                </span>
                              )}
                              <span style={{ marginLeft: 8, color: "#666" }}>
                                R$ {Number(item.subtotal).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mostrar status atual se o pedido foi pago ou cancelado */}
                    {order.payment_status === "paid" && (
                      <div
                        style={{
                          marginTop: 16,
                          padding: 8,
                          borderRadius: 4,
                          backgroundColor: "#d4edda",
                          color: "#155724",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                      >
                        ✅ Pedido da comanda já foi pago
                      </div>
                    )}

                    {(order.payment_status === "cancelled" ||
                      order.status === "cancelled") && (
                      <div
                        style={{
                          marginTop: 16,
                          padding: 8,
                          borderRadius: 4,
                          backgroundColor: "#f8d7da",
                          color: "#721c24",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                      >
                        ❌ Pedido Cancelado
                      </div>
                    )}
                  </S.OrderCard>
                ))}
              </S.OrdersList>
              <S.SessionActions>
                <S.ActionButton
                  variant="success"
                  onClick={() => handleReceivePaymentClick(session)}
                >
                  Receber Pagamento
                </S.ActionButton>
                <S.ActionButton
                  variant="secondary"
                  onClick={() => handleCloseSession(session)}
                  disabled={closingSessionId === session.id}
                  style={{ marginTop: 8 }}
                >
                  {closingSessionId === session.id
                    ? "Fechando..."
                    : "Fechar Comanda"}
                </S.ActionButton>
              </S.SessionActions>
            </S.SessionCard>
          ))}
      </S.SessionsGrid>
      {/* Modal de seleção de método de pagamento */}
      {showPaymentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              background: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.xl,
              width: "95vw",
              maxWidth: 900,
              minWidth: 320,
              boxShadow: theme.shadows.md,
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.lg,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                color: theme.colors.primary,
                marginBottom: theme.spacing.md,
                fontSize: theme.typography.fontSize["2xl"],
              }}
            >
              Receber Pagamento das Comandas
            </h2>
            {selectedSession && (
              <div
                key={selectedSession.id}
                style={{
                  background: theme.colors.background,
                  borderRadius: theme.borderRadius.md,
                  boxShadow: theme.shadows.sm,
                  border: `1px solid ${theme.colors.border}`,
                  marginBottom: theme.spacing.lg,
                  padding: theme.spacing.lg,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: theme.typography.fontSize.lg,
                      color: theme.colors.text,
                    }}
                  >
                    Mesa: {selectedSession.table}
                  </span>
                </div>
                <div
                  style={{
                    background: theme.colors.background,
                    color: theme.colors.text,
                    borderRadius: theme.borderRadius.md,
                    padding: theme.spacing.md,
                    fontWeight: 700,
                    fontSize: theme.typography.fontSize.xl,
                    border: `2px solid ${theme.colors.primary}`,
                    margin: `${theme.spacing.md} 0`,
                    textAlign: "left",
                    boxShadow: theme.shadows.sm,
                  }}
                >
                  Total da Comanda:{" "}
                  <span style={{ color: theme.colors.primary }}>
                    R${" "}
                    {selectedSession.orders
                      .reduce(
                        (acc: number, order: any) =>
                          acc + Number(order.total_amount),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: theme.spacing.md,
                  }}
                >
                  {selectedSession.orders.map((order: any) => {
                    let borderColor: string = theme.colors.primary;
                    let badge = null;
                    if (order.payment_status === "paid") {
                      borderColor = theme.colors.success;
                      badge = (
                        <span
                          style={{
                            background: theme.colors.success,
                            color: "#fff",
                            borderRadius: theme.borderRadius.sm,
                            padding: "2px 10px",
                            fontSize: theme.typography.fontSize.sm,
                            marginLeft: 8,
                          }}
                        >
                          Pago
                        </span>
                      );
                    } else if (
                      order.payment_status === "cancelled" ||
                      order.status === "cancelled"
                    ) {
                      borderColor = theme.colors.error;
                      badge = (
                        <span
                          style={{
                            background: theme.colors.error,
                            color: "#fff",
                            borderRadius: theme.borderRadius.sm,
                            padding: "2px 10px",
                            fontSize: theme.typography.fontSize.sm,
                            marginLeft: 8,
                          }}
                        >
                          Cancelado
                        </span>
                      );
                    }
                    return (
                      <div
                        key={order.id}
                        style={{
                          background: theme.colors.surface,
                          border: `2px solid ${borderColor}`,
                          borderRadius: theme.borderRadius.md,
                          padding: theme.spacing.md,
                          minWidth: 260,
                          flex: "1 1 320px",
                          marginBottom: theme.spacing.sm,
                          boxShadow: theme.shadows.sm,
                          color: theme.colors.text,
                          position: "relative",
                          opacity:
                            order.payment_status === "cancelled" ? 0.7 : 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: theme.spacing.sm,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: theme.typography.fontSize.md,
                            }}
                          >
                            Pedido #{order.id} {badge}
                          </span>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: theme.typography.fontSize.md,
                            }}
                          >
                            R$ {Number(order.total_amount).toFixed(2)}
                          </span>
                        </div>
                        <div style={{ marginBottom: theme.spacing.xs }}>
                          <span>Status: {getStatusLabel(order.status)}</span> |{" "}
                          <span>
                            Pagamento:{" "}
                            {getPaymentStatusLabel(order.payment_status)}
                          </span>
                        </div>
                        <div style={{ marginBottom: theme.spacing.xs }}>
                          <strong>Itens:</strong>
                          <ul style={{ margin: 0, paddingLeft: 18 }}>
                            {order.items.map((item: any) => (
                              <li key={item.id} style={{ marginBottom: 4 }}>
                                {item.product?.name || "Produto"} x
                                {item.quantity}
                                {item.note && (
                                  <span
                                    style={{
                                      fontStyle: "italic",
                                      color: theme.colors.textLight,
                                      marginLeft: 8,
                                    }}
                                  >
                                    ({item.note})
                                  </span>
                                )}
                                <span
                                  style={{
                                    marginLeft: 8,
                                    color: theme.colors.textSecondary,
                                  }}
                                >
                                  R$ {Number(item.subtotal).toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {order.payment_status === "pending" &&
                          order.status !== "cancelled" && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing.sm,
                                marginTop: theme.spacing.sm,
                              }}
                            >
                              <select
                                value={orderPaymentMethod[order.id] || ""}
                                onChange={(e) =>
                                  setOrderPaymentMethod((prev) => ({
                                    ...prev,
                                    [order.id]: e.target.value as PaymentMethod,
                                  }))
                                }
                                style={{
                                  padding: theme.spacing.sm,
                                  fontSize: theme.typography.fontSize.md,
                                  borderRadius: theme.borderRadius.sm,
                                  border: `1px solid ${theme.colors.border}`,
                                }}
                              >
                                <option value="" disabled>
                                  Escolha o método...
                                </option>
                                <option value={PaymentMethod.Pix}>Pix</option>
                                <option value={PaymentMethod.Debit}>
                                  Débito
                                </option>
                                <option value={PaymentMethod.Credit}>
                                  Crédito
                                </option>
                                <option value={PaymentMethod.Money}>
                                  Dinheiro
                                </option>
                              </select>
                              <button
                                onClick={() => handleConfirmPayment(order.id)}
                                disabled={
                                  !orderPaymentMethod[order.id] ||
                                  updatingOrderId === order.id
                                }
                                style={{
                                  padding: theme.spacing.sm,
                                  borderRadius: theme.borderRadius.sm,
                                  border: "none",
                                  background: theme.colors.primary,
                                  color: "#fff",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  minWidth: 120,
                                }}
                              >
                                {updatingOrderId === order.id
                                  ? "Atualizando..."
                                  : "Marcar como Pago"}
                              </button>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: theme.spacing.md,
                marginTop: theme.spacing.md,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedSession(null);
                  setOrderPaymentMethod({});
                }}
                style={{
                  padding: theme.spacing.sm + " " + theme.spacing.lg,
                  borderRadius: theme.borderRadius.md,
                  border: "1px solid " + theme.colors.border,
                  background: theme.colors.background,
                  color: theme.colors.text,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </S.Container>
  );
}
