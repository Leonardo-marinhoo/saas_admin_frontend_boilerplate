import React from "react";
import {
  DesktopHeaderWrapper,
  PageTitle,
  UserInfo,
  UserAvatar,
} from "./styles";

interface DesktopHeaderProps {
  collapsed: boolean;
  pageTitle: string;
  tenantInfo?: { logo?: string; name?: string };
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  collapsed,
  pageTitle,
  tenantInfo,
}) => (
  <DesktopHeaderWrapper
    style={{
      left: collapsed ? 80 : 250,
      width: `calc(100% - ${collapsed ? 80 : 250}px)`,
    }}
  >
    <PageTitle>{pageTitle}</PageTitle>
    <UserInfo>
      <UserAvatar>
        <img
          src={tenantInfo?.logo || "/public/vite.svg"}
          alt="Logo do usuário"
          style={{ width: 32, height: 32, objectFit: "cover" }}
        />
      </UserAvatar>
      {tenantInfo?.name}
    </UserInfo>
  </DesktopHeaderWrapper>
);
