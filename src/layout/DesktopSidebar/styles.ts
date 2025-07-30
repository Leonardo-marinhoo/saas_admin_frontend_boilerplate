import styled from "styled-components";
import { theme } from "../../styles/theme";

export const DesktopSidebarWrapper = styled.div`
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;
