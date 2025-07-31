import styled from "styled-components";
import { theme } from "../../styles/theme";

const HeaderContainer = styled.header`
  background: red !important;
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 600px) {
    padding: ${theme.spacing.sm} 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    width: 100vw;
    gap: 0;
    padding: 0;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.text};

  @media (max-width: 600px) {
    font-size: 1.1rem;
    padding: 0;
    margin-right: auto;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const LogoIA = styled.span`
  background: ${theme.colors.primary};
  color: white;
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.sm};
  margin-left: 4px;
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.xs};
    width: 100%;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }

  &.active {
    color: ${theme.colors.primary};
    background: ${theme.colors.primaryLight}20;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.error};
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  margin-left: auto;
  z-index: 1101;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0;
  }
`;

const HamburgerLines = styled.div`
  width: 28px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 4px;
    width: 100%;
    background: ${theme.colors.text};
    border-radius: 2px;
    transition: 0.3s;
  }
`;

const MobileMenu = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: 600px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${theme.colors.surface};
    box-shadow: ${theme.shadows.lg};
    z-index: 1100;
    padding: ${theme.spacing.md} 0;
    border-bottom-left-radius: ${theme.borderRadius.md};
    border-bottom-right-radius: ${theme.borderRadius.md};
  }
`;

const MobileNavLink = styled.a`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: 0;
  font-size: 1.1rem;
  transition: background 0.2s, color 0.2s;
  width: 100%;
  text-align: left;

  &:hover,
  &.active {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

export {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoImage,
  LogoIA,
  Nav,
  NavLink,
  LogoutButton,
  Hamburger,
  HamburgerLines,
  MobileMenu,
  MobileNavLink,
};
