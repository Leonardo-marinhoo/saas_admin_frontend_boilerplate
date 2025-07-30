import styled from "styled-components";
import { theme } from "../../styles/theme";

export const MobileHeaderWrapperContainer = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }
`;
