import styled from "styled-components";

export const Card = styled.div<{ $isEditing?: boolean }>`
  padding: 40px;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  opacity: ${(props) => (props.$isEditing ? 1 : 0.8)};
  transition: opacity ${(props) => props.theme.transitions.default};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 24px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

export default Card;
