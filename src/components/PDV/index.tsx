import { useState, useEffect } from "react";
import * as S from "./styles";
import { theme } from "../../styles/theme";
import { useGetProductsQuery } from "../../services/api/productsApi";
import {
  useCreateOrderMutation,
  useAddOrderToSessionMutation,
} from "../../services/api/ordersApi";
import { useGetCategoriesQuery } from "../../services/api/productCategoriesApi";
import { useGetTableSessionsQuery } from "../../services/api/tableSessionsApi";
import type { TableSession } from "../../services/api/tableSessionsApi";
import { useSubscriptionError } from "../../hooks/useSubscriptionError";
import Modal from "../ui/Modal";
import styled from "styled-components";
import { handlePrintOrder } from "../../utils/print";
import Swal from "sweetalert2";

const Container = S.Container;

const ProductsGrid = S.ProductsGrid;

const ProductCard = S.ProductCard;

const ProductImage = S.ProductImage;

const ProductName = S.ProductName;

const ProductPrice = S.ProductPrice;

const CartContainer = S.CartContainer;

const CartTitle = S.CartTitle;

const CartItems = S.CartItems;

const CartItem = S.CartItem;

const CartItemInfo = S.CartItemInfo;

const CartItemName = S.CartItemName;

const CartItemPrice = S.CartItemPrice;

const CartItemQuantity = S.CartItemQuantity;

const QuantityButton = S.QuantityButton;

const CartTotal = S.CartTotal;

const FormGroup = S.FormGroup;

const Label = S.Label;

const Input = S.Input;

const TextArea = S.TextArea;

const SubmitButton = S.SubmitButton;

const ErrorMessage = S.ErrorMessage;

const CategoryButton = S.CategoryButton;

const CategoriesNav = S.CategoriesNav;

const CartItemThumbnail = S.CartItemThumbnail;

const ModalProductImage = styled.img`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 160px;
    height: 100px;
    margin-bottom: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    max-width: 180px;
    height: 100px;
    margin-bottom: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    max-width: 140px;
    height: 80px;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const ModalDescription = styled.div`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.3;
  max-width: 100%;
  word-wrap: break-word;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.xs};
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 8px;
    line-height: 1.2;
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  resize: vertical;
  font-family: inherit;

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 60px;
    padding: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    margin-bottom: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    min-height: 50px;
    padding: 8px;
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: ${theme.spacing.xs};
    margin-bottom: 8px;
  }
`;

const QuantityValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
  user-select: none;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.1rem;
    min-width: 28px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    min-width: 24px;
  }
`;

const AddToCartButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  transition: background ${theme.transitions.default};
  min-height: 48px;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm} 0;
    font-size: 1rem;
    min-height: 44px;
    margin-top: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    padding: 12px 0;
    font-size: 0.95rem;
    min-height: 40px;
    margin-top: ${theme.spacing.xs};
    margin-bottom: 8px;
  }
`;

const OptionsContainer = styled.div`
  width: 100%;
  margin-bottom: ${theme.spacing.md};
  max-height: 40vh;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.spacing.sm};
    max-height: 35vh;
  }

  @media (max-width: 480px) {
    margin-bottom: ${theme.spacing.xs};
    max-height: 30vh;
  }
`;

const OptionGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.spacing.sm};
    padding: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    margin-bottom: ${theme.spacing.xs};
    padding: ${theme.spacing.xs};
  }
`;

const OptionTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
  font-size: 0.9rem;

  .required {
    color: ${theme.colors.error};
    margin-left: ${theme.spacing.xs};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.85rem;
    margin-bottom: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const OptionValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};

  @media (max-width: 480px) {
    gap: 2px;
  }
`;

const OptionValue = styled.label<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.isSelected ? theme.colors.primary : "transparent"};
  color: ${(props) => (props.isSelected ? "#fff" : theme.colors.text)};
  border: 1px solid
    ${(props) =>
      props.isSelected ? theme.colors.primary : theme.colors.border};

  &:hover {
    background: ${(props) =>
      props.isSelected ? theme.colors.primaryDark : theme.colors.background};
  }

  input {
    margin: 0;
    min-width: 16px;
    min-height: 16px;

    @media (max-width: 480px) {
      min-width: 14px;
      min-height: 14px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs};
    gap: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 6px;
  }
`;

const OptionValueInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0; // Para permitir que o texto seja cortado

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

const OptionValueName = styled.span`
  font-size: 0.9rem;
  word-break: break-word;
  flex: 1;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.2;
  }
`;

const OptionValuePrice = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.color || theme.colors.textSecondary};
  white-space: nowrap;
  margin-left: ${theme.spacing.xs};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-left: 0;
  }
`;

const OptionErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-bottom: ${theme.spacing.sm};
  text-align: center;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.75rem;
    margin-bottom: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  padding: 0 ${theme.spacing.sm};
  min-height: 100%;
  justify-content: flex-start;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    padding: 0 4px;
  }

  @media (max-width: 360px) {
    padding: 0 2px;
  }
`;

const SelectionButton = styled.button<{ variant?: "primary" | "secondary" }>`
  background: ${(props) =>
    props.variant === "secondary"
      ? theme.colors.background
      : theme.colors.primary};
  color: ${(props) =>
    props.variant === "secondary" ? theme.colors.text : "#fff"};
  border: 2px solid
    ${(props) =>
      props.variant === "secondary"
        ? theme.colors.border
        : theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  min-height: 80px;
  width: 100%;

  &:hover {
    background: ${(props) =>
      props.variant === "secondary"
        ? theme.colors.border
        : theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    min-height: 70px;
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};
    font-size: 0.95rem;
    min-height: 60px;
    gap: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
    font-size: 0.9rem;
    min-height: 55px;
  }
`;

const SessionSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  height: 100%;
  overflow-y: auto;
  flex: 1;

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.sm};
    max-height: 300px;
  }

  @media (max-width: 480px) {
    gap: ${theme.spacing.xs};
  }
`;

const SessionName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SessionInfo = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BackButton = styled.button`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  font-size: 0.9rem;

  &:hover {
    background: ${theme.colors.border};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.xs};
    font-size: 0.8rem;
  }
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const CartMode = styled.div`
  background: ${theme.colors.primary};
  color: #fff;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.xs};
    font-size: 0.7rem;
  }
`;

// Definir tipo para addon no carrinho
interface AddonCartItem {
  product_addon_id: number;
  quantity: number;
  name?: string;
  extra_price?: number | string;
  ingredient?: Ingredient;
}

type CartItem = {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  note?: string;
  thumbnail: string | undefined;
  options?: Array<{
    option_id: number;
    option_value_id: number;
    option_name?: string;
    value_name?: string;
    price_increment?: number;
  }>;
  addons?: AddonCartItem[];
};

type PDVMode = "selection" | "new-session" | "existing-session" | "cart";

// Definir tipo para ingredient dentro de addon
interface Ingredient {
  id: number;
  tenant_id?: number;
  name: string;
  unit: string;
  unit_price: string;
  stock_quantity: string;
  thumbnail?: string | null;
  created_at?: string;
  updated_at?: string;
}
// Tipo para addon do produto (não do carrinho)
interface ProductAddon {
  id: number;
  product_id: number;
  ingredient_id: number;
  extra_price: string;
  max_quantity?: number;
  is_required?: boolean | number;
  order?: number;
  created_at?: string;
  updated_at?: string;
  ingredient: Ingredient;
}

// Renomear tipo Product para PDVProduct
interface PDVProduct {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  stock_quantity?: number;
  category_id?: number;
  tenant_id?: number;
  created_at?: string;
  updated_at?: string;
  category_name?: string;
  thumbnail?: string;
  images?: any[];
  options?: Array<{
    id?: number;
    name: string;
    type: "single" | "multiple";
    required: boolean;
    values: Array<{
      id?: number;
      option_id?: number;
      name: string;
      price_increment: number | string;
      default_option: boolean;
      created_at?: string;
      updated_at?: string;
    }>;
  }>;
  addons?: ProductAddon[];
}

export default function PDV() {
  // Corrigir tipo do array de produtos e derivados para PDVProduct[]
  const {
    data: products = [],
    isLoading,
    error: productsError,
  } = useGetProductsQuery() as {
    data: PDVProduct[];
    isLoading: boolean;
    error: any;
  };
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: tableSessions = [],
    isLoading: isLoadingSessions,
    refetch: refetchTableSessions,
    error: sessionsError,
  } = useGetTableSessionsQuery();
  const [createOrder] = useCreateOrderMutation();
  const [addOrderToSession] = useAddOrderToSessionMutation();

  // Verificar erros de assinatura
  useSubscriptionError(productsError);
  useSubscriptionError(categoriesError);
  useSubscriptionError(sessionsError);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [modalProduct, setModalProduct] = useState<PDVProduct | null>(null);
  const [productNote, setProductNote] = useState("");
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});
  const [optionErrors, setOptionErrors] = useState<string[]>([]);
  const [pdvMode, setPdvMode] = useState<PDVMode>("selection");
  const [selectedSession, setSelectedSession] = useState<TableSession | null>(
    null
  );
  const [selectedAddons, setSelectedAddons] = useState<Record<number, number>>(
    {}
  );

  const [formData, setFormData] = useState({
    table: "",
    notes: "",
  });

  const handleUpdateQuantity = (
    productId: number,
    change: number,
    options?: Array<{ option_id: number; option_value_id: number }>
  ) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.product_id === productId) {
          // Se options foi fornecido, verificar se é o mesmo item (mesmas opções)
          if (options) {
            const itemOptions =
              item.options?.map((opt) => ({
                option_id: opt.option_id,
                option_value_id: opt.option_value_id,
              })) || [];
            const optionsMatch =
              JSON.stringify(itemOptions.sort()) ===
              JSON.stringify(options.sort());
            if (!optionsMatch) return item;
          }

          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Substituir a função calculateTotal por uma versão que soma:
  // - preço base do produto
  // - price_increment de cada option selecionada
  // - (extra_price + unit_price) * quantidade de cada addon
  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      // Preço base do produto
      let base = Number(item.price) || 0;
      // Soma das options
      if (item.options && item.options.length > 0) {
        base += item.options.reduce(
          (sum, opt) => sum + (Number(opt.price_increment) || 0),
          0
        );
      }
      // Soma dos addons
      let addonsSum = 0;
      if (item.addons && item.addons.length > 0) {
        const prod = products.find((p) => p.id === item.product_id);
        item.addons.forEach((addon) => {
          let extra = Number(addon.extra_price) || 0;
          let unit = 0;
          if (prod) {
            const prodAddon = prod.addons?.find(
              (a) => a.id === addon.product_addon_id
            );
            unit = Number(prodAddon?.ingredient?.unit_price) || 0;
          }
          addonsSum += (extra + unit) * addon.quantity;
        });
      }
      // Soma final: (base + addonsSum) * quantidade
      total += (base + addonsSum) * item.quantity;
    });
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Adicione pelo menos um item ao carrinho");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const orderData = {
        ...formData,
        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          note: item.note || "",
          options:
            item.options?.map((opt) => ({
              option_id: opt.option_id,
              option_value_id: opt.option_value_id,
            })) || [],
          addons:
            item.addons?.map((addon) => ({
              product_addon_id: addon.product_addon_id,
              quantity: addon.quantity,
            })) || [],
        })),
      };

      // Verificar se é nova comanda
      if (pdvMode === "new-session") {
        try {
          const createdOrder = await createOrder(orderData).unwrap();
          if (createdOrder) {
            const orderForPrint = {
              ...createdOrder,
              total_amount: calculateTotal().toFixed(2),
              payment_method: "",
              items: cart.map((cartItem) => {
                // Preparar observações combinando note e opções
                let observacoes = [];

                // Adicionar note do item se existir
                if (cartItem.note) {
                  observacoes.push(cartItem.note);
                }

                // Adicionar opções se existirem
                if (cartItem.options && cartItem.options.length > 0) {
                  const opcoesTexto = cartItem.options.map((option) => {
                    const opcaoNome = option.option_name || "";
                    const valorNome = option.value_name || "";
                    const preco = Number(option.price_increment || 0);

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

                // Adicionar addons se existirem
                if (cartItem.addons && cartItem.addons.length > 0) {
                  const addonsTexto = cartItem.addons.map((addon) => {
                    const addonNome = addon.name || ""; // Assuming 'name' is available in the cart item
                    const preco = Number(addon.extra_price || 0);
                    let addonCompleto = `${addonNome}`;
                    if (preco > 0) {
                      addonCompleto += ` (+R$ ${preco.toFixed(2)})`;
                    } else if (preco < 0) {
                      addonCompleto += ` (-R$ ${Math.abs(preco).toFixed(2)})`;
                    } else {
                      addonCompleto += ` (Grátis)`;
                    }
                    return addonCompleto;
                  });
                  observacoes.push(...addonsTexto);
                }

                return {
                  quantity: cartItem.quantity,
                  note:
                    observacoes.length > 0
                      ? observacoes.join(" | ")
                      : undefined,
                  product: {
                    name: cartItem.name,
                  },
                };
              }),
              table_session: {
                table: formData.table,
              },
              type: "dinein",
            };
            handlePrintOrder(orderForPrint as any);
            Swal.fire({
              icon: "success",
              title: "Pedido enviado!",
              showConfirmButton: false,
              timer: 1800,
              timerProgressBar: true,
            });
          }
          setCart([]);
          setFormData({
            table: "",
            notes: "",
          });
          setPdvMode("selection");
          setSelectedSession(null);
          setShowForm(false);
        } catch (error) {
          setError("Erro ao criar pedido. Tente novamente.");
        }
      }
      // Verificar se é adição a comanda existente
      else if (selectedSession) {
        const sessionData = {
          sessionId: selectedSession.id,
          body: {
            notes: formData.notes,
            items: orderData.items,
          },
        };
        await addOrderToSession(sessionData).unwrap();
        setCart([]);
        setFormData({
          table: "",
          notes: "",
        });
        setPdvMode("selection");
        setSelectedSession(null);
        setShowForm(false);
        Swal.fire({
          icon: "success",
          title: "Pedido enviado!",
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
        });
      } else {
        throw new Error("Modo inválido ou sessão não selecionada");
      }
    } catch (error) {
      setError("Erro ao criar pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleModeSelection = (mode: "new-session" | "existing-session") => {
    setPdvMode(mode);
    if (mode === "new-session") {
      setShowForm(false);
    } else if (mode === "existing-session") {
      // Fazer refetch das comandas quando selecionar esta opção
      refetchTableSessions();
    }
  };

  const handleSessionSelection = (session: TableSession) => {
    setSelectedSession(session);
    setPdvMode("cart");
    setShowForm(false);
  };

  const handleBackToSelection = () => {
    setPdvMode("selection");
    setSelectedSession(null);
    setCart([]);
    setFormData({
      table: "",
      notes: "",
    });
    // Fazer refetch das comandas quando voltar para a seleção
    refetchTableSessions();
  };

  // Filtrar produtos pela categoria selecionada
  const filteredProducts: PDVProduct[] = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  const handleProductClick = (product: PDVProduct) => {
    setModalProduct(product);
    setProductNote("");
    setModalQuantity(1);
    setOptionErrors([]);
    setSelectedAddons({});

    // Inicializar opções com valores padrão
    const initialOptions: Record<number, number[]> = {};
    if (product.options) {
      product.options.forEach((option) => {
        const defaultValues = option.values.filter(
          (value) => value.default_option
        );
        if (defaultValues.length > 0) {
          initialOptions[option.id!] = defaultValues.map((v) => v.id!);
        } else {
          initialOptions[option.id!] = [];
        }
      });
    }
    setSelectedOptions(initialOptions);
  };

  const handleOptionChange = (
    optionId: number,
    valueId: number,
    isMultiple: boolean
  ) => {
    setSelectedOptions((prev) => {
      const currentValues = prev[optionId] || [];

      if (isMultiple) {
        // Múltipla escolha: toggle do valor
        const newValues = currentValues.includes(valueId)
          ? currentValues.filter((id) => id !== valueId)
          : [...currentValues, valueId];
        return { ...prev, [optionId]: newValues };
      } else {
        // Única escolha: substitui o valor
        return { ...prev, [optionId]: [valueId] };
      }
    });
  };

  const validateOptions = (): boolean => {
    if (!modalProduct?.options) return true;

    const errors: string[] = [];

    modalProduct.options.forEach((option) => {
      const selectedValues = selectedOptions[option.id!] || [];

      if (option.required && selectedValues.length === 0) {
        errors.push(`"${option.name}" é obrigatório`);
      }
    });

    setOptionErrors(errors);
    return errors.length === 0;
  };

  const handleAddToCartWithNote = () => {
    if (!modalProduct) return;

    // Validar opções obrigatórias
    if (!validateOptions()) {
      return;
    }

    // Converter opções para o formato da API
    const optionsArray = Object.entries(selectedOptions)
      .map(([optionId, valueIds]) =>
        valueIds.map((valueId) => {
          const option = modalProduct.options?.find(
            (o) => o.id === parseInt(optionId)
          );
          const value = option?.values.find((v) => v.id === valueId);
          return {
            option_id: parseInt(optionId),
            option_value_id: valueId,
            option_name: option?.name,
            value_name: value?.name,
            price_increment: Number(value?.price_increment) || 0,
          };
        })
      )
      .flat();

    // Montar addons selecionados
    const addonsArray = (modalProduct.addons || [])
      .filter(
        (addon) => selectedAddons[addon.id] && selectedAddons[addon.id] > 0
      )
      .map((addon) => ({
        product_addon_id: addon.id,
        quantity: selectedAddons[addon.id],
        name: addon.ingredient?.name,
        extra_price: addon.extra_price,
      }));

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.product_id === modalProduct.id &&
          item.note === productNote &&
          JSON.stringify(item.options || []) === JSON.stringify(optionsArray) &&
          JSON.stringify(item.addons || []) === JSON.stringify(addonsArray)
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === modalProduct.id &&
          item.note === productNote &&
          JSON.stringify(item.options || []) === JSON.stringify(optionsArray) &&
          JSON.stringify(item.addons || []) === JSON.stringify(addonsArray)
            ? { ...item, quantity: item.quantity + modalQuantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          product_id: modalProduct.id,
          quantity: modalQuantity,
          name: modalProduct.name,
          price: Number(modalProduct.price),
          note: productNote,
          thumbnail: modalProduct.thumbnail,
          options: optionsArray,
          addons: addonsArray,
        },
      ];
    });

    setModalProduct(null);
    setProductNote("");
    setModalQuantity(1);
    setSelectedOptions({});
    setSelectedAddons({});
    setOptionErrors([]);
  };

  useEffect(() => {
    if (pdvMode === "selection") {
      refetchTableSessions();
    }
  }, [pdvMode, refetchTableSessions]);

  // Refetch das comandas quando o componente for montado
  useEffect(() => {
    refetchTableSessions();
  }, [refetchTableSessions]);

  if (isLoading || isLoadingCategories || isLoadingSessions)
    return <div>Carregando produtos...</div>;

  return (
    <Container>
      <S.ProductsContainer>
        <CategoriesNav>
          <CategoryButton
            active={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </CategoryButton>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon_image && (
                <img src={category.icon_image} alt={category.name} />
              )}
              {category.name}
            </CategoryButton>
          ))}
        </CategoriesNav>
        <ProductsGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => handleProductClick(product)}
            >
              <ProductImage src={product.thumbnail} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>R$ {Number(product.price).toFixed(2)}</ProductPrice>
            </ProductCard>
          ))}
        </ProductsGrid>
      </S.ProductsContainer>

      <CartContainer>
        {pdvMode === "selection" ? (
          <>
            <CartTitle>Selecionar Ação</CartTitle>

            <SelectionButton
              onClick={() => handleModeSelection("new-session")}
              style={{ marginBottom: theme.spacing.md }}
            >
              🆕 Abrir Nova Comanda
            </SelectionButton>

            <div
              style={{
                marginBottom: theme.spacing.lg,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                flex: 1,
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: theme.spacing.sm,
                  color: theme.colors.text,
                }}
              >
                Comandas Abertas
              </h3>

              {tableSessions.filter((s) => s.status === "open").length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: theme.colors.textSecondary,
                    padding: theme.spacing.md,
                    fontSize: "0.9rem",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Nenhuma comanda aberta
                </div>
              ) : (
                <SessionSelectionContainer>
                  {tableSessions
                    .filter((s) => s.status === "open")
                    .sort(
                      (a, b) =>
                        new Date(b.opened_at).getTime() -
                        new Date(a.opened_at).getTime()
                    )
                    .map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleSessionSelection(session)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: theme.spacing.md,
                          marginBottom: theme.spacing.sm,
                          background: theme.colors.background,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: theme.borderRadius.md,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div>
                          <SessionName>{session.table}</SessionName>
                          <SessionInfo>
                            Aberta em:{" "}
                            {new Date(session.opened_at).toLocaleString(
                              "pt-BR"
                            )}
                          </SessionInfo>
                        </div>
                        <button
                          style={{
                            background: theme.colors.primary,
                            color: "#fff",
                            border: "none",
                            borderRadius: theme.borderRadius.sm,
                            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          Novo Pedido
                        </button>
                      </div>
                    ))}
                </SessionSelectionContainer>
              )}
            </div>
          </>
        ) : (
          <>
            <CartHeader>
              <CartTitle>Carrinho</CartTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                }}
              >
                <CartMode>
                  {pdvMode === "new-session"
                    ? "🆕 Nova Comanda"
                    : `📋 ${selectedSession?.table}`}
                </CartMode>
                <BackButton onClick={handleBackToSelection}>
                  ← Voltar
                </BackButton>
              </div>
            </CartHeader>

            {!showForm ? (
              <>
                <CartItems>
                  {cart.map((item) => (
                    <CartItem key={item.product_id + (item.note || "")}>
                      <CartItemThumbnail src={item.thumbnail} alt={item.name} />
                      <CartItemInfo>
                        <CartItemName>{item.name}</CartItemName>
                        {item.note && (
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "#888",
                              margin: "2px 0 0 0",
                              fontStyle: "italic",
                            }}
                          >
                            {item.note}
                          </div>
                        )}
                        {item.options && item.options.length > 0 && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#666",
                              margin: "2px 0 0 0",
                            }}
                          >
                            {item.options.map((opt, index) => (
                              <div key={index} style={{ marginLeft: "8px" }}>
                                {opt.value_name}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.addons && item.addons.length > 0 && (
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#666",
                              margin: "2px 0 0 0",
                            }}
                          >
                            {item.addons.map((addon, index) => {
                              let addonName = addon.name;
                              let unitPrice = 0;
                              if (
                                !addonName ||
                                typeof addon.ingredient === "undefined"
                              ) {
                                // Buscar no array de produtos
                                const prod = products.find(
                                  (p) => p.id === item.product_id
                                );
                                const prodAddon = prod?.addons?.find(
                                  (a) => a.id === addon.product_addon_id
                                );
                                addonName = prodAddon?.ingredient?.name || "";
                                unitPrice =
                                  Number(prodAddon?.ingredient?.unit_price) ||
                                  0;
                              } else if (addon.ingredient) {
                                unitPrice =
                                  Number(addon.ingredient.unit_price) || 0;
                              }
                              const extraPrice = Number(addon.extra_price) || 0;
                              return (
                                <div key={index} style={{ marginLeft: "8px" }}>
                                  • Adicional: {addon.quantity}x {addonName}
                                  {extraPrice + unitPrice > 0 && (
                                    <span style={{ color: "#28a745" }}>
                                      {" "}
                                      (+R$ {(extraPrice + unitPrice).toFixed(2)}
                                      )
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <CartItemPrice>
                          R$ {item.price.toFixed(2)}
                        </CartItemPrice>
                      </CartItemInfo>
                      <CartItemQuantity>
                        <QuantityButton
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              -1,
                              item.options?.map((opt) => ({
                                option_id: opt.option_id,
                                option_value_id: opt.option_value_id,
                              }))
                            )
                          }
                        >
                          -
                        </QuantityButton>
                        <span>{item.quantity}</span>
                        <QuantityButton
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              1,
                              item.options?.map((opt) => ({
                                option_id: opt.option_id,
                                option_value_id: opt.option_value_id,
                              }))
                            )
                          }
                        >
                          +
                        </QuantityButton>
                      </CartItemQuantity>
                    </CartItem>
                  ))}
                </CartItems>

                <CartTotal>
                  <span>Total:</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </CartTotal>

                <SubmitButton
                  onClick={handleContinue}
                  disabled={cart.length === 0}
                >
                  Continuar Pedido
                </SubmitButton>
              </>
            ) : (
              (() => {
                return (
                  <form onSubmit={handleSubmit}>
                    {pdvMode === "new-session" && (
                      <FormGroup>
                        <Label>Nome da comanda / Mesa</Label>
                        <Input
                          type="text"
                          name="table"
                          value={formData.table}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    )}

                    <FormGroup>
                      <Label>Observações</Label>
                      <TextArea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Ex: servir refrigerante somente com o lanche."
                      />
                    </FormGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Enviando..."
                        : pdvMode === "new-session"
                        ? "Finalizar Pedido"
                        : "Adicionar à Comanda"}
                    </SubmitButton>

                    <SubmitButton
                      type="button"
                      onClick={handleBack}
                      style={{
                        background: theme.colors.background,
                        color: theme.colors.text,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      Voltar ao Carrinho
                    </SubmitButton>
                  </form>
                );
              })()
            )}
          </>
        )}
      </CartContainer>

      <Modal
        open={!!modalProduct}
        onClose={() => setModalProduct(null)}
        title={modalProduct?.name}
        width="640px"
      >
        {modalProduct && (
          <ModalContentContainer>
            <ModalProductImage
              src={modalProduct.thumbnail}
              alt={modalProduct.name}
            />
            <ModalDescription>{modalProduct.description}</ModalDescription>
            <QuantityRow>
              <QuantityButton
                onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </QuantityButton>
              <QuantityValue>{modalQuantity}</QuantityValue>
              <QuantityButton onClick={() => setModalQuantity((q) => q + 1)}>
                +
              </QuantityButton>
            </QuantityRow>
            <div
              style={{
                maxHeight: 320,
                overflowY: "auto",
                marginBottom: 16,
                paddingRight: 4,
              }}
            >
              {modalProduct.options && modalProduct.options.length > 0 && (
                <OptionsContainer>
                  {modalProduct.options.map((option) => (
                    <OptionGroup key={option.id} style={{ marginBottom: 18 }}>
                      <OptionTitle
                        style={{ fontSize: "1rem", fontWeight: 600 }}
                      >
                        {option.name}
                        {option.required && <span className="required">*</span>}
                      </OptionTitle>
                      <OptionValues style={{ gap: 10 }}>
                        {option.values.map((value) => {
                          const isSelected = (
                            selectedOptions[option.id!] || []
                          ).includes(value.id!);
                          const priceIncrement = Number(value.price_increment);
                          return (
                            <OptionValue
                              key={value.id}
                              isSelected={isSelected}
                              onClick={() =>
                                handleOptionChange(
                                  option.id!,
                                  value.id!,
                                  option.type === "multiple"
                                )
                              }
                              style={{
                                minWidth: 0,
                                fontSize: "0.98rem",
                                padding: "8px 10px",
                                borderRadius: 6,
                              }}
                            >
                              <input
                                type={
                                  option.type === "multiple"
                                    ? "checkbox"
                                    : "radio"
                                }
                                name={`option-${option.id}`}
                                checked={isSelected}
                                onChange={() => {}} // Handled by onClick
                                style={{ marginRight: 8 }}
                              />
                              <OptionValueInfo>
                                <OptionValueName
                                  style={{
                                    fontSize: "0.98rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  {value.name}
                                </OptionValueName>
                                <OptionValuePrice
                                  color={
                                    priceIncrement > 0
                                      ? "#28a745"
                                      : priceIncrement < 0
                                      ? "#dc3545"
                                      : undefined
                                  }
                                  style={{ fontSize: "0.95rem" }}
                                >
                                  {priceIncrement > 0
                                    ? `+R$ ${priceIncrement.toFixed(2)}`
                                    : priceIncrement < 0
                                    ? `-R$ ${Math.abs(priceIncrement).toFixed(
                                        2
                                      )}`
                                    : "Grátis"}
                                </OptionValuePrice>
                              </OptionValueInfo>
                            </OptionValue>
                          );
                        })}
                      </OptionValues>
                    </OptionGroup>
                  ))}
                </OptionsContainer>
              )}
              {modalProduct.addons && modalProduct.addons.length > 0 && (
                <div style={{ margin: "18px 0 8px 0" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#222",
                      marginBottom: 8,
                      fontSize: "1rem",
                    }}
                  >
                    Adicionais
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                      width: "100%",
                    }}
                  >
                    {modalProduct.addons.map((addon) => {
                      const max = addon.max_quantity || 99;
                      const min = addon.is_required ? 1 : 0;
                      const value = selectedAddons[addon.id] || 0;
                      return (
                        <div
                          key={addon.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 28,
                            background: "#fafbfc",
                            border: "1px solid #ececec",
                            borderRadius: 10,
                            padding: "18px 28px",
                            width: "100%",
                          }}
                        >
                          {addon.ingredient?.thumbnail && (
                            <img
                              src={addon.ingredient.thumbnail}
                              alt={addon.ingredient.name}
                              style={{
                                width: 54,
                                height: 54,
                                objectFit: "cover",
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <div
                            style={{
                              flex: 1,
                              minWidth: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "1.18rem",
                              }}
                            >
                              {addon.ingredient?.name}
                            </div>
                            <div
                              style={{
                                fontSize: "1.07rem",
                                color: "#666",
                                marginTop: 4,
                              }}
                            >
                              Valor unitário:{" "}
                              <b>
                                R${" "}
                                {(
                                  Number(addon.extra_price) +
                                  Number(addon.ingredient?.unit_price || 0)
                                ).toFixed(2)}
                              </b>
                              {addon.max_quantity &&
                                ` | Máx: ${addon.max_quantity}`}
                              {addon.is_required ? (
                                <span
                                  style={{ color: "#d32f2f", marginLeft: 10 }}
                                >
                                  (Obrigatório)
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                              marginLeft: "auto",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedAddons((prev) => ({
                                  ...prev,
                                  [addon.id]: Math.max(min, value - 1),
                                }))
                              }
                              style={{
                                background: "#eee",
                                border: "none",
                                borderRadius: 6,
                                width: 40,
                                height: 40,
                                fontWeight: 700,
                                fontSize: 26,
                                cursor: "pointer",
                              }}
                            >
                              -
                            </button>
                            <span
                              style={{
                                minWidth: 28,
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: 22,
                              }}
                            >
                              {value}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedAddons((prev) => ({
                                  ...prev,
                                  [addon.id]: Math.min(max, value + 1),
                                }))
                              }
                              style={{
                                background: "#eee",
                                border: "none",
                                borderRadius: 6,
                                width: 40,
                                height: 40,
                                fontWeight: 700,
                                fontSize: 26,
                                cursor: "pointer",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {optionErrors.length > 0 && (
              <OptionErrorMessage>
                {optionErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </OptionErrorMessage>
            )}
            <ModalTextarea
              placeholder="Observações para o pedido (ex: sem cebola, ao ponto, etc)"
              value={productNote}
              onChange={(e) => setProductNote(e.target.value)}
            />
            <AddToCartButton onClick={handleAddToCartWithNote}>
              Adicionar ao Carrinho
            </AddToCartButton>
          </ModalContentContainer>
        )}
      </Modal>
    </Container>
  );
}
