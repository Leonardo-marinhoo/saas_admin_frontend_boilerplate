import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { getSidebarLinks } from "../Sidebar/routesMap";
import { useSelector } from "react-redux";

interface MobileMenuProps {
  onNavigate?: () => void;
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${theme.colors.background};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  flex: 1;
  padding: ${theme.spacing.lg};
`;

const NavLink = styled.div<{ $active?: boolean }>`
  width: 100%;
  padding: 12px 8px;
  border-radius: 12px;
  color: #67748e;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $active }) => ($active ? "#fff" : "none")};
  color: ${({ $active }) => ($active ? theme.colors.primary : "#67748e")};
  font-weight: ${({ $active }) => ($active ? 600 : 300)};
  box-shadow: ${({ $active }) =>
    $active ? "0 2px 8px 0 rgba(31,38,135,0.04)" : "none"};

  &:hover {
    background: #fff;
    color: ${theme.colors.primary};
  }
`;

const IconWrapper = styled.span<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "#fff"};
  color: ${({ $active }) => ($active ? "#fff" : "inherit")};
  border-radius: 6px;
  width: 32px;
  height: 32px;
  padding: 10px;
  box-shadow: 0 1px 4px 0 rgba(31, 38, 135, 0.07);
  transition: background 0.2s, color 0.2s;
`;

const LogoutButton = styled.button`
  margin: ${theme.spacing.lg};
  padding: 10px 32px;
  border: none;
  border-radius: 12px;
  background: ${theme.colors.error};
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;

  &:hover {
    background: ${theme.colors.primary};
  }
`;

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const role_type =
    useSelector((state: any) => state.auth.role_type) ||
    localStorage.getItem("role_type");
  const sidebarLinks = getSidebarLinks(role_type);

  const handleSignOut = () => {
    signOut();
    navigate("/login");
    onNavigate?.();
  };

  return (
    <MenuContainer>
      <Nav>
        {sidebarLinks.map((item) => (
          <NavLink
            as={Link}
            to={item.to}
            key={item.to}
            $active={location.pathname === item.to}
            onClick={onNavigate}
          >
            <IconWrapper $active={location.pathname === item.to}>
              {item.icon}
            </IconWrapper>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </Nav>
      <LogoutButton onClick={handleSignOut}>Sair</LogoutButton>
    </MenuContainer>
  );
}
