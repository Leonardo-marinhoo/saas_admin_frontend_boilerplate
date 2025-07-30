import React from "react";
import { MobileHeaderWrapperContainer } from "./styles";
import { MobileHeader } from "../../components/Header";

export const MobileHeaderWrapper: React.FC = () => (
  <MobileHeaderWrapperContainer>
    <MobileHeader />
  </MobileHeaderWrapperContainer>
);
