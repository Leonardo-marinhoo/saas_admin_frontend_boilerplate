import React from "react";
import { AppContainerWrapper } from "./styles";

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => (
  <AppContainerWrapper>{children}</AppContainerWrapper>
);
