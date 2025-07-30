import React from "react";
import { MainContentWrapper } from "./styles";

interface MainContentProps {
  hideSidebar?: boolean;
  collapsed?: boolean;
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({
  hideSidebar,
  collapsed,
  children,
}) => (
  <MainContentWrapper hideSidebar={hideSidebar} collapsed={collapsed}>
    {children}
  </MainContentWrapper>
);
