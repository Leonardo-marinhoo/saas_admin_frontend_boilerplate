import { useGetProductAddonsQuery } from "../../services/api/productAddonsApi";
import type { ProductAddon } from "../../types/addon";

interface ProductAddonsProps {
  productId: number;
  onAddAddonClick: () => void;
}

export default function ProductAddons({
  productId,
  onAddAddonClick,
}: ProductAddonsProps) {
  const {
    data: addons = [],
    isLoading,
    error,
  } = useGetProductAddonsQuery(productId);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h4 style={{ margin: 0 }}>Adicionais (Addons)</h4>
        <button
          type="button"
          onClick={onAddAddonClick}
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          + Adicionar Adicional
        </button>
      </div>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 20, color: "#666" }}>
          Carregando adicionais...
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: 20, color: "red" }}>
          Erro ao carregar adicionais
        </div>
      ) : addons.length === 0 ? (
        <div style={{ textAlign: "center", padding: 20, color: "#666" }}>
          Nenhum adicional cadastrado para este produto.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {addons.map((addon: ProductAddon) => (
            <div
              key={addon.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 16,
                gap: 16,
              }}
            >
              {addon.ingredient.thumbnail && (
                <img
                  src={addon.ingredient.thumbnail}
                  alt={addon.ingredient.name}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>
                  {addon.ingredient.name}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#666" }}>
                  Unidade: {addon.ingredient.unit} | Preço base: R${" "}
                  {Number(addon.ingredient.unit_price).toFixed(2)} | Estoque:{" "}
                  {addon.ingredient.stock_quantity}
                </div>
                <div style={{ fontSize: "0.95rem", color: "#666" }}>
                  Preço extra: <b>R$ {Number(addon.extra_price).toFixed(2)}</b>{" "}
                  | Máx: {addon.max_quantity ?? "-"} |{" "}
                  {addon.is_required ? "Obrigatório" : "Opcional"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
