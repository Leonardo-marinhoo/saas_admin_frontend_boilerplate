import { useState, useMemo } from "react";
import * as S from "./styles";
import {
  useGetOrdersQuery,
  useUpdatePaymentStatusMutation,
} from "../../services/api/ordersApi";
import { subDays, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { CSVLink } from "react-csv";
import { FaDollarSign, FaReceipt, FaChartLine, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Modal } from "../../components/ui/Modal";

type Period = "today" | "7d" | "30d" | "all";

// Enum para métodos de pagamento
export enum PaymentMethod {
  Pix = "pix",
  Debit = "debit",
  Credit = "credit",
  Money = "money",
}

// Função para formatar a data para o input type="date"
const formatDateForInput = (date: Date) => {
  return date.toISOString().split("T")[0];
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

export default function Dashboard() {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const [period, setPeriod] = useState<Period>("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  // State para o filtro de data do histórico
  const [startDate, setStartDate] = useState<Date | null>(
    startOfDay(subDays(new Date(), 30))
  );
  const [endDate, setEndDate] = useState<Date | null>(endOfDay(new Date()));

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Filtrar apenas orders pagas
  const paidOrders = useMemo(() => {
    return orders.filter((order) => order.payment_status === "paid");
  }, [orders]);

  // Lógica para os cards de métricas - apenas orders pagas
  const filteredOrdersForCards = useMemo(() => {
    if (period === "all") {
      return paidOrders;
    }
    const now = new Date();
    let start: Date;
    if (period === "today") {
      start = startOfDay(now);
    } else if (period === "7d") {
      start = subDays(now, 6);
    } else {
      start = subDays(now, 29);
    }
    return paidOrders.filter((order) =>
      isWithinInterval(new Date(order.created_at), {
        start: startOfDay(start),
        end: endOfDay(now),
      })
    );
  }, [paidOrders, period]);

  // Lógica para a tabela de histórico - apenas orders pagas
  const filteredOrdersForTable = useMemo(() => {
    if (!startDate || !endDate) return [];

    return paidOrders.filter((order) =>
      isWithinInterval(new Date(order.created_at), {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      })
    );
  }, [paidOrders, startDate, endDate]);

  const stats = useMemo(() => {
    // Usar diretamente as orders filtradas (já são apenas pagas)
    const totalRevenue = filteredOrdersForCards.reduce(
      (acc, order) => acc + Number(order.total_amount),
      0
    );
    const totalOrdersInPeriod = filteredOrdersForCards.length;
    const averageTicket =
      totalOrdersInPeriod > 0 ? totalRevenue / totalOrdersInPeriod : 0;
    return { totalRevenue, totalOrders: totalOrdersInPeriod, averageTicket };
  }, [filteredOrdersForCards]);

  // Preparar dados para exportação CSV - apenas orders pagas
  const csvData = useMemo(() => {
    const data = filteredOrdersForTable.map((order) => ({
      orderId: order.id,
      date: new Date(order.created_at).toLocaleDateString("pt-BR"),
      items: order.items
        .map((item) => `${item.quantity}x ${item.product.name}`)
        .join(", "),
      total: formatCurrency(Number(order.total_amount)),
      paymentMethod: order.payment_method,
      paymentStatus: getPaymentStatusLabel(order.payment_status),
    }));
    return data;
  }, [filteredOrdersForTable]);

  const csvHeaders = [
    { label: "ID Pedido", key: "orderId" },
    { label: "Data", key: "date" },
    { label: "Itens", key: "items" },
    { label: "Valor Total", key: "total" },
    { label: "Método de Pagamento", key: "paymentMethod" },
    { label: "Status de Pagamento", key: "paymentStatus" },
  ];

  const handleEditPaymentClick = (order: any) => {
    setSelectedOrder(order);
    setSelectedPaymentMethod(order.payment_method as PaymentMethod);
    setShowEditModal(true);
  };

  const handleConfirmPaymentUpdate = async () => {
    if (!selectedOrder || !selectedPaymentMethod) return;
    try {
      setUpdatingOrderId(selectedOrder.id);
      await updatePaymentStatus({
        id: selectedOrder.id,
        payment_status: "paid",
        payment_method: selectedPaymentMethod,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Método de pagamento atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      });
      setShowEditModal(false);
      setSelectedOrder(null);
      setSelectedPaymentMethod(null);
    } catch (error) {
      console.error("Erro ao atualizar método de pagamento:", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (isLoading) return <div>Carregando dados...</div>;

  return (
    <S.Container>
      <S.Title>Métricas - Pedidos Pagos</S.Title>
      <S.FilterContainer>
        <S.FilterButton
          active={period === "today"}
          onClick={() => setPeriod("today")}
        >
          Hoje
        </S.FilterButton>
        <S.FilterButton
          active={period === "7d"}
          onClick={() => setPeriod("7d")}
        >
          Últimos 7 dias
        </S.FilterButton>
        <S.FilterButton
          active={period === "30d"}
          onClick={() => setPeriod("30d")}
        >
          Últimos 30 dias
        </S.FilterButton>
        <S.FilterButton
          active={period === "all"}
          onClick={() => setPeriod("all")}
        >
          Todos
        </S.FilterButton>
      </S.FilterContainer>
      <S.BentoGrid>
        <S.BentoBox variant="primary">
          <S.IconWrapper>
            <FaDollarSign />
          </S.IconWrapper>
          <S.MetricTitle>Receita Total (Pagos)</S.MetricTitle>
          <S.MetricValue>{formatCurrency(stats.totalRevenue)}</S.MetricValue>
        </S.BentoBox>
        <S.BentoBox variant="dark">
          <S.IconWrapper>
            <FaReceipt />
          </S.IconWrapper>
          <S.MetricTitle>Total de Pedidos (Pagos)</S.MetricTitle>
          <S.MetricValue>{stats.totalOrders}</S.MetricValue>
        </S.BentoBox>
        <S.BentoBox variant="dark">
          <S.IconWrapper>
            <FaChartLine />
          </S.IconWrapper>
          <S.MetricTitle>Ticket Médio (Pagos)</S.MetricTitle>
          <S.MetricValue>{formatCurrency(stats.averageTicket)}</S.MetricValue>
        </S.BentoBox>
      </S.BentoGrid>

      {/* Seção do Histórico de Pedidos */}
      <S.TableContainer>
        <S.SectionTitle>Histórico de Vendas - Pedidos Pagos</S.SectionTitle>
        <S.DateFilterContainer>
          <S.DateInput
            type="date"
            value={startDate ? formatDateForInput(startDate) : ""}
            onChange={(e) => setStartDate(e.target.valueAsDate)}
          />
          <span>até</span>
          <S.DateInput
            type="date"
            value={endDate ? formatDateForInput(endDate) : ""}
            onChange={(e) => setEndDate(e.target.valueAsDate)}
          />
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={"historico_vendas_pagos.csv"}
            style={{ textDecoration: "none", marginLeft: "auto" }}
          >
            <S.ExportButton>Exportar</S.ExportButton>
          </CSVLink>
        </S.DateFilterContainer>
        <S.OrderTable>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Itens</th>
              <th>Valor Total</th>
              <th>Pagamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrdersForTable.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.created_at).toLocaleString("pt-BR")}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}x {item.product.name}
                    </div>
                  ))}
                </td>
                <td>{formatCurrency(Number(order.total_amount))}</td>
                <td>{order.payment_method}</td>
                <td>
                  <span
                    style={{
                      color: "#28a745",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    ✅ Pago
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEditPaymentClick(order)}
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FaEdit size={14} />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </S.OrderTable>
        {/* Modal de edição de método de pagamento */}
        <Modal
          open={showEditModal && !!selectedOrder}
          onClose={() => {
            setShowEditModal(false);
            setSelectedOrder(null);
            setSelectedPaymentMethod(null);
          }}
          title="Editar Método de Pagamento"
        >
          {selectedOrder && (
            <div style={{ minWidth: 240, maxWidth: 400, margin: "0 auto" }}>
              <div style={{ marginBottom: "16px" }}>
                <strong>Pedido:</strong> #{selectedOrder.id}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong>Valor:</strong>{" "}
                {formatCurrency(Number(selectedOrder.total_amount))}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Método de Pagamento:
                </label>
                <select
                  value={selectedPaymentMethod || ""}
                  onChange={(e) =>
                    setSelectedPaymentMethod(e.target.value as PaymentMethod)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value={PaymentMethod.Pix}>Pix</option>
                  <option value={PaymentMethod.Debit}>Débito</option>
                  <option value={PaymentMethod.Credit}>Crédito</option>
                  <option value={PaymentMethod.Money}>Dinheiro</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedOrder(null);
                    setSelectedPaymentMethod(null);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    background: "#eee",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmPaymentUpdate}
                  disabled={
                    !selectedPaymentMethod ||
                    updatingOrderId === selectedOrder.id
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    background: "#EA1D2C",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {updatingOrderId === selectedOrder.id
                    ? "Atualizando..."
                    : "Confirmar"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      </S.TableContainer>
    </S.Container>
  );
}
