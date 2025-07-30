import styled from "styled-components";
import React from "react";

interface FlexProps {
  direction?: "row" | "column";
  gap?: string;
  justify?:
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  flex?: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "0"};
  justify-content: ${(props) =>
    props.justify === "between" ? "space-between" : props.justify || "start"};
  align-items: ${(props) => props.align || "stretch"};
  flex: ${(props) => props.flex};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) =>
      props.direction === "row" && props.justify === "between"
        ? "column"
        : props.direction || "row"};
    gap: ${(props) =>
      props.direction === "row" && props.justify === "between"
        ? "12px"
        : props.gap || "0"};
    align-items: ${(props) =>
      props.direction === "row" && props.justify === "between"
        ? "stretch"
        : props.align || "stretch"};
  }
`;

export default Flex;
