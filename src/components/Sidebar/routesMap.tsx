import {
  MdDashboard,
  MdPointOfSale,
  MdFastfood,
  MdCategory,
  MdListAlt,
  MdTableRestaurant,
  MdStore,
  MdPeople,
  MdDeliveryDining,
} from "react-icons/md";

export const vendasLinks = [
  { to: "/pdv", label: "PDV", icon: <MdPointOfSale size={20} /> },
  { to: "/comandas", label: "Comandas", icon: <MdTableRestaurant size={20} /> },
  { to: "/orders", label: "Pedidos", icon: <MdListAlt size={20} /> },
];

export const adminLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
  {
    to: "/establishment-info-edit",
    label: "Estabelecimento",
    icon: <MdStore size={20} />,
  },
  { to: "/usuarios", label: "Usuários", icon: <MdPeople size={20} /> },
  { to: "/pacotes", label: "Pacotes", icon: <MdDeliveryDining size={20} /> },
  { to: "/products", label: "Produtos", icon: <MdFastfood size={20} /> },
  { to: "/categories", label: "Categorias", icon: <MdCategory size={20} /> },
  {
    to: "/entregas",
    label: "Pacotes em entrega",
    icon: <MdDeliveryDining size={20} />,
  },
];

export function getSidebarLinks(role_type?: string) {
  if (role_type === "delivery") {
    return [
      {
        to: "/pacotes",
        label: "Pacotes",
        icon: <MdDeliveryDining size={20} />,
      },
      {
        to: "/entregas",
        label: "Pacotes em entrega",
        icon: <MdDeliveryDining size={20} />,
      },
    ];
  }
  if (role_type === "owner") {
    // Remove Pacotes e Pacotes em entrega
    return [...adminLinks, ...vendasLinks].filter(
      (item) => item.to !== "/pacotes" && item.to !== "/entregas"
    );
  }
  // Retorna todos os links para outros perfis
  return [...adminLinks, ...vendasLinks];
}
