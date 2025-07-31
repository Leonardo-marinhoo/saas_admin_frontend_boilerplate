import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./styles";
import logo from "../../assets/logo (1).png";
import logoColapsed from "../../assets/logo (1).png";

import { MdChevronRight } from "react-icons/md";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

import { useState } from "react";
import { getSidebarLinks } from "./routesMap";
import { useSelector } from "react-redux";

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
  onNavigate?: () => void;
}

export function Sidebar({
  collapsed: collapsedProp,
  setCollapsed,
  onNavigate,
}: SidebarProps = {}) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed =
    collapsedProp !== undefined ? collapsedProp : internalCollapsed;
  const role_type =
    useSelector((state: any) => state.auth.role_type) ||
    localStorage.getItem("role_type");
  const sidebarLinks = getSidebarLinks(role_type);

  const toggleCollapse = (value?: boolean) => {
    if (setCollapsed) {
      setCollapsed(typeof value === "boolean" ? value : !collapsed);
    } else {
      setInternalCollapsed((prev) =>
        typeof value === "boolean" ? value : !prev
      );
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
    onNavigate?.();
  };

  return (
    <S.Aside $collapsed={collapsed}>
      <S.AsideContent>
        <S.Logo $collapsed={collapsed}>
          {/* <S.CollapseButtonWrapper>
          <S.CollapseButton
            aria-label={collapsed ? "Expandir menu" : "Colapsar menu"}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            $collapsed={collapsed}
          >
            {collapsed ? (
              <MdChevronRight size={28} />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled size={28} />
            )}
          </S.CollapseButton>
        </S.CollapseButtonWrapper> */}
          <S.LogoLink href="#">
            {collapsed ? (
              <S.LogoImageCollapsed src={logoColapsed} alt="FoodIA Logo" />
            ) : (
              <>
                <S.LogoImage src={logo} alt="FoodIA Logo" />
              </>
            )}
          </S.LogoLink>
        </S.Logo>
        <S.Nav>
          {sidebarLinks?.map((item) => (
            <S.NavLink
              as={Link}
              to={item.to}
              key={item.to}
              $active={location.pathname === item.to}
              $collapsed={collapsed}
              onClick={onNavigate}
            >
              <S.IconWrapper $active={location.pathname === item.to}>
                {item.icon}
              </S.IconWrapper>
              <span className="nav-text">{item.label}</span>
            </S.NavLink>
          ))}
        </S.Nav>
        <S.LogoutButton onClick={handleSignOut} $collapsed={collapsed}>
          <span className="nav-text">Sair</span>
        </S.LogoutButton>
      </S.AsideContent>
    </S.Aside>
  );
}
