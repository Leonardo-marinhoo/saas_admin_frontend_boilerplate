import styled from "styled-components";
import { theme } from "../../styles/theme";

export const DesktopHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${theme.headerHeight}px;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  /* padding-top: 3rem; */
  background: none;
  z-index: 1100;
  margin-bottom: ${theme.contentPaddingTop}px;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

export const PageTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #181818;
  margin: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #67748e;
  font-weight: 500;
  gap: 12px;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
