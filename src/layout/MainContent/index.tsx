import React from "react";
import { MainContentWrapper } from "./styles";
import { useLocation } from "react-router-dom";

interface MainContentProps {
  hideSidebar?: boolean;
  collapsed?: boolean;
  children: React.ReactNode;
}

export const MainContent = ({
  hideSidebar,
  collapsed,
  children,
}: MainContentProps) => {
  const location = useLocation();

  return location.pathname === "/login" ? (
    <>{children}</>
  ) : (
    <MainContentWrapper hideSidebar={hideSidebar} collapsed={collapsed}>
      {children}
    </MainContentWrapper>
  );
};
