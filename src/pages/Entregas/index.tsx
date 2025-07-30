import React from "react";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Flex } from "../../components/ui/Flex";
import { PageHeader } from "../../components/ui/PageHeader";
import { useGetDriverDeliveriesQuery } from "../../services/api/ordersApi";
import type { Order } from "../../services/api/ordersApi";
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../../components/ui/Modal";
import { useFinishDriverDeliveryPaymentMutation } from "../../services/api/ordersApi";
import { useMarkOrderAsDeliveredMutation } from "../../services/api/ordersApi";
import { DriverNavbar } from "../../components/ui/DriverNavbar";

const PedidoCard = styled(Card)`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #fff;
  @media (max-width: 600px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
`;

const PedidoId = styled.span`
  font-weight: bold;
  color: #ea1d2c;
  font-size: 1.1rem;
`;

const PedidoInfo = styled.div`
  margin: 8px 0 0 0;
  font-size: 0.98rem;
  color: #444;
  line-height: 1.4;
`;

const PedidoItens = styled.ul`
  margin: 12px 0 0 0;
  padding: 0;
  list-style: none;
`;

const PedidoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemThumb = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  background: #f3f3f3;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.97rem;
`;

const Badge = styled.span`
  display: inline-block;
  background: #f3e8ff;
  color: #7c3aed;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-top: 4px;
`;

const TotalBadge = styled.span`
  display: inline-block;
  background: #22c55e;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 2px 12px;
  margin-top: 8px;
`;

const statusBindings: Record<string, { label: string; color: string }> = {
  completed: { label: "Pronto para Entrega", color: "#22c55e" }, // verde
  pending: { label: "Pendente", color: "#facc15" }, // amarelo
  processing: { label: "Processando", color: "#3b82f6" }, // azul
  cancelled: { label: "Cancelado", color: "#ef4444" }, // vermelho
};

const StatusBadge = styled.span<{ $color: string }>`
  display: inline-block;
  background: ${(props) => props.$color};
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 2px 12px;
  margin-left: 8px;
  margin-top: 4px;
`;

const paymentBindings: Record<string, { label: string; color: string }> = {
  debit: { label: "Débito", color: "#2563eb" },
  credit: { label: "Crédito", color: "#a21caf" },
  money: { label: "Dinheiro", color: "#f59e42" },
  pix: { label: "Pix", color: "#10b981" },
};

const PaymentBadge = styled.span<{ $color: string }>`
  display: inline-block;
  background: ${(props) => props.$color};
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-top: 4px;
`;

const RotaButton = styled.button`
  background: #4285f4; // azul Google Maps
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  margin: 18px auto 0 auto;
  display: block;
  width: 80%;
  max-width: 300px;
  transition: opacity 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.85;
  }
`;

const GreenButton = styled(RotaButton)`
  background: #22c55e;
  margin-top: 16px;
`;

const RotaMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  padding: 12px 0;
`;

const PaddedContainer = styled(Container)`
  padding-bottom: 90px !important;
  @media (min-width: 700px) {
    padding-bottom: 40px !important;
  }
`;

const Entregas: React.FC = () => {
  const { data, isLoading, error } = useGetDriverDeliveriesQuery();
  const orders = Array.isArray(data?.orders) ? data.orders : [];
  const [rotaOpen, setRotaOpen] = useState<number | null>(null);
  const [modalOrder, setModalOrder] = useState<Order | null>(null);
  const [finishPayment, { isLoading: isFinishing }] =
    useFinishDriverDeliveryPaymentMutation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markAsDelivered, { isLoading: isMarking }] =
    useMarkOrderAsDeliveredMutation();

  function openMaps(endereco: string) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      endereco
    )}`;
    window.open(url, "_blank");
  }
  function openWaze(endereco: string) {
    const url = `https://waze.com/ul?q=${encodeURIComponent(endereco)}`;
    window.open(url, "_blank");
  }

  async function handleFinishPayment(order: Order) {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await finishPayment({ id: order.id }).unwrap();
      setSuccessMsg("Entrega finalizada e pagamento marcado como recebido!");
      setTimeout(() => {
        setModalOrder(null);
        setSuccessMsg(null);
      }, 1200);
    } catch (e) {
      setErrorMsg("Erro ao finalizar entrega. Tente novamente.");
    }
  }

  async function handleMarkAsDelivered(order: Order) {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await markAsDelivered({ id: order.id }).unwrap();
      setSuccessMsg("Entrega marcada como concluída!");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 1200);
    } catch (e) {
      setErrorMsg("Erro ao marcar entrega. Tente novamente.");
    }
  }

  return (
    <>
      <PaddedContainer>
        <PageHeader title="Pacotes em entrega" />
        <Card>
          {isLoading && <div>Carregando...</div>}
          {error && (
            <div style={{ color: "red" }}>Erro ao carregar pacotes.</div>
          )}
          {!isLoading && !error && orders.length === 0 && (
            <div>Nenhum pacote em entrega.</div>
          )}
          {!isLoading && !error && orders.length > 0 && (
            <Flex direction="column" gap="0">
              {orders.map((order) => (
                <PedidoCard key={order.id} style={{ position: "relative" }}>
                  <PedidoHeader>
                    <div>
                      <PedidoId>Pedido #{order.id}</PedidoId>
                    </div>
                    <StatusBadge
                      $color={statusBindings[order.status]?.color || "#eaeaea"}
                    >
                      {statusBindings[order.status]?.label || order.status}
                    </StatusBadge>
                  </PedidoHeader>
                  <PedidoInfo>
                    <div>
                      <strong>Cliente:</strong> {order.delivery_name || "-"}
                    </div>
                    <div>
                      <strong>Endereço:</strong> {order.delivery_address || "-"}
                    </div>
                    <div>
                      <strong>Telefone:</strong> {order.delivery_phone || "-"}
                    </div>
                    {order.payment_method && (
                      <PaymentBadge
                        $color={
                          paymentBindings[order.payment_method]?.color || "#888"
                        }
                      >
                        {paymentBindings[order.payment_method]?.label ||
                          order.payment_method}
                      </PaymentBadge>
                    )}
                    {order.delivery_tax && (
                      <>
                        <Badge>Taxa de Entrega: R$ {order.delivery_tax}</Badge>
                        <br />
                        <TotalBadge>
                          Total do pedido: R$ {order.total_amount}
                        </TotalBadge>
                      </>
                    )}
                  </PedidoInfo>
                  <PedidoItens>
                    <strong style={{ fontSize: "1rem", color: "#222" }}>
                      Itens:
                    </strong>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <PedidoItem key={item.id}>
                          <ItemThumb
                            src={
                              item.product?.thumbnail ||
                              "https://placehold.co/48x48?text=Sem+Foto"
                            }
                            alt={item.product?.name}
                          />
                          <ItemDetails>
                            <span>
                              <strong>{item.quantity}x</strong>{" "}
                              {item.product?.name}
                            </span>
                            {item.note && (
                              <span style={{ color: "#888" }}>
                                (Obs: {item.note})
                              </span>
                            )}
                          </ItemDetails>
                        </PedidoItem>
                      ))
                    ) : (
                      <div
                        style={{
                          color: "#888",
                          fontStyle: "italic",
                          padding: 8,
                        }}
                      >
                        Sem itens
                      </div>
                    )}
                  </PedidoItens>
                  {order.payment_status !== "paid" && (
                    <GreenButton onClick={() => setModalOrder(order)}>
                      Finalizar Entrega
                    </GreenButton>
                  )}
                  {order.payment_status === "paid" && (
                    <GreenButton
                      onClick={() => handleMarkAsDelivered(order)}
                      disabled={isMarking}
                    >
                      {isMarking ? "Finalizando..." : "Finalizar Entrega"}
                    </GreenButton>
                  )}
                  <RotaButton
                    onClick={() =>
                      setRotaOpen(rotaOpen === order.id ? null : order.id)
                    }
                  >
                    Iniciar rota
                  </RotaButton>
                  {rotaOpen === order.id && (
                    <RotaMenu>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#222",
                          fontWeight: 600,
                          fontSize: "1rem",
                          padding: "10px 0",
                          cursor: "pointer",
                          width: "100%",
                        }}
                        onClick={() => {
                          openMaps(order.delivery_address || "");
                          setRotaOpen(null);
                        }}
                      >
                        Google Maps
                      </button>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#222",
                          fontWeight: 600,
                          fontSize: "1rem",
                          padding: "10px 0",
                          cursor: "pointer",
                          width: "100%",
                        }}
                        onClick={() => {
                          openWaze(order.delivery_address || "");
                          setRotaOpen(null);
                        }}
                      >
                        Waze
                      </button>
                    </RotaMenu>
                  )}
                </PedidoCard>
              ))}
            </Flex>
          )}
        </Card>
        <Modal
          open={!!modalOrder}
          onClose={() => {
            setModalOrder(null);
            setErrorMsg(null);
            setSuccessMsg(null);
          }}
          title={
            modalOrder ? `Cobrança do Pedido #${modalOrder.id}` : "Cobrança"
          }
        >
          {modalOrder && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 12 }}>
                <strong>Cobrar:</strong> R$ {modalOrder.total_amount}
              </div>
              <div style={{ fontSize: 16, marginBottom: 12 }}>
                <strong>Método de pagamento:</strong>{" "}
                {paymentBindings[modalOrder.payment_method || ""]?.label ||
                  modalOrder.payment_method ||
                  "-"}
              </div>
              {errorMsg && (
                <div style={{ color: "#ea1d2c", marginBottom: 8 }}>
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div style={{ color: "#22c55e", marginBottom: 8 }}>
                  {successMsg}
                </div>
              )}
              <GreenButton
                style={{ width: "100%" }}
                disabled={isFinishing || !!successMsg}
                onClick={() => modalOrder && handleFinishPayment(modalOrder)}
              >
                {isFinishing ? "Finalizando..." : "Finalizar Entrega"}
              </GreenButton>
            </div>
          )}
        </Modal>
        {successMsg && !modalOrder && (
          <div style={{ color: "#22c55e", textAlign: "center", marginTop: 16 }}>
            {successMsg}
          </div>
        )}
        {errorMsg && !modalOrder && (
          <div style={{ color: "#ea1d2c", textAlign: "center", marginTop: 16 }}>
            {errorMsg}
          </div>
        )}
      </PaddedContainer>
      <DriverNavbar />
    </>
  );
};

export default Entregas;
