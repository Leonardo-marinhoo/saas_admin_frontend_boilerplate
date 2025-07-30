import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { MdLocalShipping, MdInventory2 } from "react-icons/md";

const NavbarWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 900; /* Menor que sidebar mobile */
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  padding: 0;
  pointer-events: auto;
`;

const NavButton = styled(Link)<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 0 8px 0;
  background: ${({ $active }) => ($active ? "#b91c1c" : "#dc2626")};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 0;
  transition: background 0.2s;
  margin: 0 2px;
  box-shadow: none;
  opacity: 1;
  &:hover,
  &:focus {
    background: #b91c1c;
    color: #fff;
    opacity: 0.95;
  }
  svg {
    margin-bottom: 4px;
    font-size: 2rem;
    color: #fff;
  }
`;

export const DriverNavbar: React.FC = () => {
  const location = useLocation();
  return (
    <NavbarWrapper>
      <NavButton to="/entregas" $active={location.pathname === "/entregas"}>
        <MdLocalShipping />
        Iniciar Entrega
      </NavButton>
      <NavButton to="/pacotes" $active={location.pathname === "/pacotes"}>
        <MdInventory2 />
        Coleta
      </NavButton>
    </NavbarWrapper>
  );
};
