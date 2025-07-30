import React, { useState } from "react";
import { useCreateProductAddonMutation } from "../../services/api/productAddonsApi";
import Modal from "../ui/Modal";
import * as S from "../ProductOptionsModal/styles";
import { useGetIngredientsQuery } from "../../services/api/productAddonsApi";
import { useAttachIngredientToProductAddonMutation } from "../../services/api/productAddonsApi";

interface ProductAddonCreateModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductAddonCreateModal({
  productId,
  isOpen,
  onClose,
}: ProductAddonCreateModalProps) {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    unit_price: "",
    stock_quantity: "",
    thumbnail: undefined as File | undefined,
    extra_price: "",
    max_quantity: "",
    is_required: false,
    order: "",
  });
  const [error, setError] = useState("");
  const [createAddon, { isLoading }] = useCreateProductAddonMutation();
  const { data: ingredients = [], isLoading: isLoadingIngredients } =
    useGetIngredientsQuery();
  const [attachIngredient, { isLoading: isAttaching }] =
    useAttachIngredientToProductAddonMutation();
  const [selectedIngredient, setSelectedIngredient] = useState<any | null>(
    null
  );
  const [attachForm, setAttachForm] = useState({
    extra_price: "",
    max_quantity: "",
    is_required: false,
    order: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, thumbnail: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.unit ||
      !form.unit_price ||
      !form.stock_quantity ||
      !form.extra_price
    ) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    const data = new FormData();
    data.append("name", form.name);
    data.append("unit", form.unit);
    data.append("unit_price", form.unit_price);
    data.append("stock_quantity", form.stock_quantity);
    if (form.thumbnail) data.append("thumbnail", form.thumbnail);
    data.append("extra_price", form.extra_price);
    if (form.max_quantity) data.append("max_quantity", form.max_quantity);
    data.append("is_required", form.is_required ? "1" : "0");
    if (form.order) data.append("order", form.order);
    try {
      await createAddon({ productId, data }).unwrap();
      onClose();
    } catch (err) {
      setError("Erro ao criar adicional.");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Novo Adicional">
      <div style={{ marginBottom: 24 }}>
        <h4
          style={{
            margin: 0,
            marginBottom: 12,
            fontSize: "1.1rem",
            color: "#222",
          }}
        >
          Usar insumo já cadastrado
        </h4>
        {isLoadingIngredients ? (
          <div style={{ textAlign: "center", color: "#888", padding: 16 }}>
            Carregando insumos...
          </div>
        ) : ingredients.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", padding: 16 }}>
            Nenhum insumo cadastrado.
          </div>
        ) : (
          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              border: "1px solid #ececec",
              borderRadius: 8,
              background: "#fafbfc",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.97rem",
              }}
            >
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ padding: 8, fontWeight: 600, color: "#222" }}>
                    Imagem
                  </th>
                  <th style={{ padding: 8, fontWeight: 600, color: "#222" }}>
                    Nome
                  </th>
                  <th style={{ padding: 8, fontWeight: 600, color: "#222" }}>
                    Unidade
                  </th>
                  <th style={{ padding: 8, fontWeight: 600, color: "#222" }}>
                    Preço base
                  </th>
                  <th style={{ padding: 8, fontWeight: 600, color: "#222" }}>
                    Estoque
                  </th>
                  <th style={{ padding: 8 }}></th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ing) => (
                  <tr key={ing.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 6, textAlign: "center" }}>
                      {ing.thumbnail ? (
                        <img
                          src={ing.thumbnail}
                          alt={ing.name}
                          style={{
                            width: 38,
                            height: 38,
                            objectFit: "cover",
                            borderRadius: 6,
                            border: "1px solid #ddd",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#bbb" }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: 6 }}>{ing.name}</td>
                    <td style={{ padding: 6 }}>{ing.unit}</td>
                    <td style={{ padding: 6 }}>
                      R$ {Number(ing.unit_price).toFixed(2)}
                    </td>
                    <td style={{ padding: 6 }}>{ing.stock_quantity}</td>
                    <td style={{ padding: 6 }}>
                      <button
                        type="button"
                        style={{
                          background: "#2196f3",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          padding: "4px 10px",
                          cursor: "pointer",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          setSelectedIngredient(ing);
                          setAttachForm({
                            extra_price: "",
                            max_quantity: "",
                            is_required: false,
                            order: "",
                          });
                        }}
                      >
                        Usar como adicional
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedIngredient && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await attachIngredient({
                productId,
                data: {
                  ingredient_id: selectedIngredient.id,
                  extra_price: Number(attachForm.extra_price),
                  max_quantity: attachForm.max_quantity
                    ? Number(attachForm.max_quantity)
                    : undefined,
                  is_required: attachForm.is_required,
                  order: attachForm.order
                    ? Number(attachForm.order)
                    : undefined,
                },
              });
              setSelectedIngredient(null);
              setAttachForm({
                extra_price: "",
                max_quantity: "",
                is_required: false,
                order: "",
              });
              onClose();
            }}
            style={{
              marginTop: 16,
              background: "#f5faff",
              border: "1px solid #b3e5fc",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontWeight: 600, color: "#1976d2", marginBottom: 4 }}>
              Vincular "{selectedIngredient.name}" como adicional
            </div>
            <S.FormRow>
              <div>
                <S.Label>Preço extra *</S.Label>
                <S.Input
                  name="extra_price"
                  type="number"
                  step="0.01"
                  value={attachForm.extra_price}
                  onChange={(e) =>
                    setAttachForm((f) => ({
                      ...f,
                      extra_price: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <S.Label>Quantidade máxima</S.Label>
                <S.Input
                  name="max_quantity"
                  type="number"
                  value={attachForm.max_quantity}
                  onChange={(e) =>
                    setAttachForm((f) => ({
                      ...f,
                      max_quantity: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <S.Label>Ordem</S.Label>
                <S.Input
                  name="order"
                  type="number"
                  value={attachForm.order}
                  onChange={(e) =>
                    setAttachForm((f) => ({ ...f, order: e.target.value }))
                  }
                />
              </div>
            </S.FormRow>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <S.Checkbox
                name="is_required"
                type="checkbox"
                checked={attachForm.is_required}
                onChange={(e) =>
                  setAttachForm((f) => ({
                    ...f,
                    is_required: e.target.checked,
                  }))
                }
                id="is_required_attach"
              />
              <S.CheckboxLabel htmlFor="is_required_attach">
                Obrigatório
              </S.CheckboxLabel>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 8,
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedIngredient(null)}
                style={{
                  background: "#eee",
                  border: "none",
                  borderRadius: 4,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isAttaching}
                style={{
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {isAttaching ? "Salvando..." : "Vincular"}
              </button>
            </div>
          </form>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "#fafbfc",
            borderRadius: 10,
            border: "1px solid #ececec",
            padding: 18,
            marginBottom: 18,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <S.FormRow>
            <div>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Nome *
              </S.Label>
              <S.Input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
            <div>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Unidade *
              </S.Label>
              <S.Input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="ex: g, ml, fatia..."
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
            <div>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Ordem
              </S.Label>
              <S.Input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
          </S.FormRow>
          <S.FormRow>
            <div style={{ width: "100%" }}>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Preço base da unidade *
              </S.Label>
              <S.Input
                name="unit_price"
                type="number"
                step="0.01"
                value={form.unit_price}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Estoque *
              </S.Label>
              <S.Input
                name="stock_quantity"
                type="number"
                step="0.01"
                value={form.stock_quantity}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
          </S.FormRow>
          <div>
            <S.Label style={{ fontWeight: 600, color: "#222" }}>Imagem</S.Label>
            <S.Input
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ background: "#fff" }}
            />
          </div>
          <S.FormRow>
            <div style={{ width: "100%" }}>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Preço extra (adicional) *
              </S.Label>
              <S.Input
                name="extra_price"
                type="number"
                step="0.01"
                value={form.extra_price}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <S.Label style={{ fontWeight: 600, color: "#222" }}>
                Quantidade máxima
              </S.Label>
              <S.Input
                name="max_quantity"
                type="number"
                value={form.max_quantity}
                onChange={handleChange}
                style={{ fontWeight: 500, background: "#fff" }}
              />
            </div>
          </S.FormRow>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
            }}
          >
            <S.Checkbox
              name="is_required"
              type="checkbox"
              checked={form.is_required}
              onChange={handleChange}
              id="is_required_addon"
            />
            <S.CheckboxLabel
              htmlFor="is_required_addon"
              style={{ fontWeight: 500, color: "#222" }}
            >
              Obrigatório
            </S.CheckboxLabel>
          </div>
        </div>
        {error && (
          <div
            style={{
              color: "#b71c1c",
              marginBottom: 12,
              fontWeight: 500,
              background: "#ffeaea",
              borderRadius: 6,
              padding: 8,
            }}
          >
            {error}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#eee",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
