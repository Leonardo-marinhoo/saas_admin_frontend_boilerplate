import {
  MdDashboard,
  MdFastfood,
  MdStore,
  MdPeople,
  MdDeliveryDining,
} from "react-icons/md";

export const ProfessorLinks = [
  {
    to: "/disciplinas",
    label: "Disciplinas",
    icon: <MdDeliveryDining size={20} />,
  },
  { to: "/cursos", label: "Cursos", icon: <MdFastfood size={20} /> },
];

export const adminLinks = [
  {
    to: "/establishment-info-edit",
    label: "Administração",
    icon: <MdStore size={20} />,
  },
  { to: "/usuarios", label: "Usuários", icon: <MdPeople size={20} /> },
  {
    to: "/disciplinas",
    label: "Disciplinas",
    icon: <MdDeliveryDining size={20} />,
  },
  { to: "/cursos", label: "Cursos", icon: <MdFastfood size={20} /> },
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
  if (role_type === "Diretor") {
    // Remove Pacotes e Pacotes em entrega
    return [...adminLinks];
  }
  // Retorna todos os links para outros perfis
  if (role_type === "Professor") {
    return [...ProfessorLinks];
  }
}
