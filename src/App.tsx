import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/globalStyles";
import { DesktopSidebar } from "./layout/DesktopSidebar";
import { DesktopHeader } from "./layout/DesktopHeader";
import { MobileHeaderWrapper } from "./layout/MobileHeaderWrapper";
import { MainContent } from "./layout/MainContent";
import { useGetTenantInfoQuery } from "./services/api/tenantApi";
import { useSubscriptionError } from "./hooks/useSubscriptionError";
import { useState } from "react";

function getPageTitle(pathname: string) {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
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
    <>
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
    </>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </>
  );
}
