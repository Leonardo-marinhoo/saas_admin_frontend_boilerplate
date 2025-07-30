import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthInitializer } from "./components/AuthInitializer";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/globalStyles";
import { DesktopSidebar } from "./layout/DesktopSidebar";
import { DesktopHeader } from "./layout/DesktopHeader";
import { MobileHeaderWrapper } from "./layout/MobileHeaderWrapper";
import { AppContainer } from "./layout/AppContainer";
import { MainContent } from "./layout/MainContent";
import { useGetTenantInfoQuery } from "./services/api/tenantApi";
import { useSubscriptionError } from "./hooks/useSubscriptionError";
import { useState } from "react";

function getPageTitle(pathname: string) {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/pdv":
      return "PDV";
    case "/products":
      return "Produtos";
    case "/categories":
      return "Categorias";
    case "/orders":
      return "Pedidos";
    case "/comandas":
      return "Comandas";
    case "/establishment-info-edit":
      return "Estabelecimento";
    default:
      return "";
  }
}

function AppContent() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const hideSidebar = location.pathname === "/login";
  const { data: tenantInfo, error: tenantError } = useGetTenantInfoQuery();
  const pageTitle = getPageTitle(location.pathname);

  // Verificar erros de assinatura
  useSubscriptionError(tenantError);

  return (
    <AppContainer>
      {/* Desktop Sidebar - apenas em telas grandes */}
      {!hideSidebar && (
        <DesktopSidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      )}

      {/* Desktop Header - apenas em telas grandes */}
      {!hideSidebar && (
        <DesktopHeader
          collapsed={sidebarCollapsed}
          pageTitle={pageTitle}
          tenantInfo={tenantInfo}
        />
      )}

      {/* Mobile Header - apenas em telas pequenas */}
      {!hideSidebar && <MobileHeaderWrapper />}

      <MainContent hideSidebar={hideSidebar} collapsed={sidebarCollapsed}>
        <Routes />
      </MainContent>
    </AppContainer>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AuthInitializer>
            <AppContent />
          </AuthInitializer>
        </AuthProvider>
      </Router>
    </>
  );
}
