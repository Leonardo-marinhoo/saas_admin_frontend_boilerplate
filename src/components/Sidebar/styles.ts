import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Aside = styled.aside<{ $collapsed?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ $collapsed, theme }) =>
    $collapsed
      ? `${theme.sidebarCollapsedWidth}px`
      : `${theme.sidebarWidth}px`};
  background: ${theme.colors.background};
  /* border-radius: 24px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 24px 24px;
  z-index: 1200;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;

  @media (max-width: ${theme.breakpoints.sm}) {
    position: static;
    width: 100%;
    height: auto;
    border-radius: 0;
    padding: 0;
    background: transparent;
  }
`;

export const Logo = styled.div<{ $collapsed?: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  height: ${({ theme }) => theme.headerHeight}px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: ${({ theme }) => theme.contentPaddingTop}px;
  background-color: white;
`;

export const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

export const LogoImageCollapsed = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
`;

export const LogoText = styled.span<{ $collapsed?: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  align-items: center;
  color: #181818;
  gap: 8px;
`;

export const LogoIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.primary};
  color: #fff;
  font-size: 1.2rem;
`;

export const Divider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    rgba(200, 200, 200, 0) 0%,
    #d1d5db 50%,
    rgba(200, 200, 200, 0) 100%
  );
  border-radius: 1px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  flex: 1;
`;

export const NavLink = styled.div<{ $active?: boolean; $collapsed?: boolean }>`
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

  .nav-text {
    transition: opacity 0.2s, width 0.2s, margin 0.2s;
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    width: ${({ $collapsed }) => ($collapsed ? "0" : "auto")};
    margin-left: ${({ $collapsed }) => ($collapsed ? "0" : "8px")};
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const IconWrapper = styled.span<{ $active?: boolean }>`
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

export const LogoutButton = styled.button<{ $collapsed?: boolean }>`
  margin-top: 32px;
  padding: 10px 32px;
  border: none;
  border-radius: 12px;
  background: ${theme.colors.error};
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  display: ${({ $collapsed }) => ($collapsed ? "none" : "block")};
  &:hover {
    background: ${theme.colors.primary};
  }
`;

export const Label = styled.div<{ $collapsed?: boolean }>`
  width: 100%;
  padding-left: 8px;
  margin: 8px 0;
  color: #888e98;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  width: ${({ $collapsed }) => ($collapsed ? "0" : "auto")};
  margin-left: ${({ $collapsed }) => ($collapsed ? "0" : "8px")};
  transition: opacity 0.2s, width 0.2s, margin 0.2s;
  overflow: hidden;
  white-space: nowrap;
`;

export const CollapseButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  z-index: 2000;
  overflow: visible;
`;

export const CollapseButton = styled.button<{ $collapsed?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #67748e;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  z-index: 2100;
`;

export const LogoLink = styled.a`
  text-decoration: none;
`;
