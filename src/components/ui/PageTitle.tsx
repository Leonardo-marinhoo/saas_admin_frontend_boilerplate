import React from "react";
import styled from "styled-components";

const PageTitleWrapper = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #181818;
  margin: 0;
`;

interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <PageTitleWrapper>{children}</PageTitleWrapper>
);

export default PageTitle;
