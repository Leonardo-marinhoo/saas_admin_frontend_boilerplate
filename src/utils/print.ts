import type { Order } from "../services/api/ordersApi";

// Enum para tipos de impressão
const PrintType = {
  DINEIN: "COMANDA",
  DELIVERY: "DELIVERY",
} as const;

export const handlePrintOrder = async (order: Order) => {
  const payload: any = {
    mesa: order.table_session?.table || order.delivery_name,
    tipo: order.type === "dinein" ? PrintType.DINEIN : order.type,
    items: order.items.map((item) => {
      const obj: any = {
        nome: item.product.name,
        quantidade: item.quantity,
      };

      // Preparar observações combinando note e opções
      let observacoes = [];

      // Adicionar note do item se existir
      if (item.note) {
        observacoes.push(item.note);
      }

      // Adicionar opções se existirem
      if (item.order_options && item.order_options.length > 0) {
        const opcoesTexto = item.order_options.map((orderOption) => {
          const opcaoNome = orderOption.option.name;
          const valorNome = orderOption.option_value.name;
          const preco = Number(orderOption.price_increment);

          let opcaoCompleta = `${opcaoNome}: ${valorNome}`;

          if (preco > 0) {
            opcaoCompleta += ` (+R$ ${preco.toFixed(2)})`;
          } else if (preco < 0) {
            opcaoCompleta += ` (-R$ ${Math.abs(preco).toFixed(2)})`;
          } else {
            opcaoCompleta += ` (Grátis)`;
          }

          return opcaoCompleta;
        });

        observacoes.push(...opcoesTexto);
      }

      // Combinar todas as observações
      if (observacoes.length > 0) {
        obj.note = observacoes.join(" | ");
      }

      return obj;
    }),
  };

  payload.total = order.total_amount;
  if (order.type === "delivery") {
    payload.endereco = order.delivery_address;
    payload.pagamento = order.payment_method;
  } else {
    payload.pagamento = "";
  }

  try {
    await fetch("http://localhost:5169/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    alert("Erro ao enviar para impressora");
  }
};
