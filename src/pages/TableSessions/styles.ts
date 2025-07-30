import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize["2xl"]};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

export const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

export const SessionCard = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
`;

export const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

export const SessionTable = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.primary};
`;

export const SessionStatus = styled.span`
  background-color: ${theme.colors.success};
  color: #fff;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  text-transform: capitalize;
`;

export const OrdersList = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const OrderCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

export const OrderHeader = styled.div`
  font-weight: bold;
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  justify-content: space-between;
`;

export const OrderTotal = styled.span`
  color: ${theme.colors.textSecondary};
`;

export const OrderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const ActionButton = styled.button<{
  variant: "success" | "danger" | "secondary";
}>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  flex: 1;

  background-color: ${(props) => {
    switch (props.variant) {
      case "success":
        return theme.colors.success;
      case "danger":
        return "#dc3545";
      case "secondary":
        return "#6c757d";
      default:
        return theme.colors.primary;
    }
  }};
  color: #fff;

  &:hover {
    background-color: ${(props) => {
      switch (props.variant) {
        case "success":
          return "#28a745";
        case "danger":
          return "#c82333";
        case "secondary":
          return "#5a6268";
        default:
          return theme.colors.primaryDark;
      }
    }};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SessionActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;
