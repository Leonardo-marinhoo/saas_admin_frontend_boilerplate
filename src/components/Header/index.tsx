import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import logo from "../../assets/logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { MobileMenu } from "../MobileMenu";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${theme.headerHeight}px;
  background: white;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.lg};
  z-index: 1100;
  box-shadow: ${theme.shadows.sm};

  @media (min-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text};
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

const MobileSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
`;

const MobileSidebarTitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text};
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

const MobileSidebarContent = styled.div`
  height: calc(100% - 80px);
  overflow-y: auto;
  padding: ${theme.spacing.lg};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SidebarPanel = styled.div`
  width: 70%;
  height: 100%;
  background: ${theme.colors.background};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 85%;
  }
`;

export function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <LogoImage src={logo} alt="FoodIA Logo" />
        </LogoContainer>
        <MenuButton onClick={handleToggleSidebar} aria-label="Abrir menu">
          <MdMenu size={24} />
        </MenuButton>
      </HeaderContainer>

      {isSidebarOpen && (
        <Overlay onClick={handleCloseSidebar}>
          <SidebarPanel onClick={(e) => e.stopPropagation()}>
            <MobileSidebarHeader>
              <MobileSidebarTitle>Menu</MobileSidebarTitle>
              <CloseButton
                onClick={handleCloseSidebar}
                aria-label="Fechar menu"
              >
                <MdClose size={24} />
              </CloseButton>
            </MobileSidebarHeader>
            <MobileSidebarContent>
              <MobileMenu onNavigate={handleCloseSidebar} />
            </MobileSidebarContent>
          </SidebarPanel>
        </Overlay>
      )}
    </>
  );
}
