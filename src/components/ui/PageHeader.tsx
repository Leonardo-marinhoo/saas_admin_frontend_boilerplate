import React from "react";
import { Flex } from "./Flex";
import { PageTitle } from "./PageTitle";

interface PageHeaderProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions,
  className,
  style,
}) => (
  <Flex justify="between" align="center" className={className} style={style}>
    <PageTitle>{title}</PageTitle>
    {actions && <div>{actions}</div>}
  </Flex>
);

export default PageHeader;
