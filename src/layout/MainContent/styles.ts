import styled from "styled-components";
import { theme } from "../../styles/theme";

export const MainContentWrapper = styled.main<{
  hideSidebar?: boolean;
  collapsed?: boolean;
}>`
  padding-top: ${theme.headerHeight}px;
  padding-left: ${({ hideSidebar, collapsed }) =>
    hideSidebar ? 0 : collapsed ? "80px" : "250px"};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding-left: 0;
    padding-top: ${theme.headerHeight}px;
  }
`;
