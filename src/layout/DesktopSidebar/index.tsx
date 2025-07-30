import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { DesktopSidebarWrapper } from "./styles";

interface DesktopSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  collapsed,
  setCollapsed,
}) => (
  <DesktopSidebarWrapper>
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
  </DesktopSidebarWrapper>
);
