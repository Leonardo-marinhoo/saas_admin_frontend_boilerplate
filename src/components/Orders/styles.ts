import styled from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};

  @media (max-width: 600px) {
    padding: ${theme.spacing.sm};
    max-width: 100vw;
  }
`;

const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const Column = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  min-height: 500px;
  box-shadow: ${theme.shadows.sm};
`;

const ColumnTitle = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.primary};
  text-align: center;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const OrderId = styled.span`
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const OrderTotal = styled.span`
  font-weight: 500;
  color: ${theme.colors.text};
`;

const OrderInfo = styled.div`
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
`;

const OrderItems = styled.ul`
  margin-top: ${theme.spacing.sm};
  font-size: 0.9rem;
  list-style: none;
`;

export const OrderItem = styled.li`
  display: flex;
  width: 100%;
  min-height: fit-content;
  border: 1px solid ${theme.colors.border};
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.surface};
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

export const ItemThumbnail = styled.img`
  height: 40px;
  width: 40px;
  border-radius: ${theme.borderRadius.sm};
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 600px) {
    height: 35px;
    width: 35px;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
  margin-left: 0.5rem;
  min-width: 0;

  @media (max-width: 600px) {
    margin-left: 0.4rem;
    gap: 0.2rem;
  }
`;

export const ItemOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 6px;
  font-size: 0.75rem;
  color: ${theme.colors.textSecondary};

  @media (max-width: 600px) {
    gap: 2px;
    margin-top: 4px;
    font-size: 0.7rem;
  }
`;

export const ItemOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 3px 8px;
  background: white;
  border-radius: 6px;
  border: 1px solid ${theme.colors.border};
  font-size: 0.7rem;
  line-height: 1.2;
  min-height: 20px;

  @media (max-width: 600px) {
    padding: 2px 6px;
    gap: 4px;
    font-size: 0.65rem;
    min-height: 18px;
  }
`;

export const OptionPrice = styled.span<{ increment: number }>`
  color: ${({ increment }) =>
    increment > 0
      ? theme.colors.success
      : increment < 0
      ? theme.colors.error
      : theme.colors.textSecondary};
  font-weight: 600;
  font-size: 0.65rem;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

const StatusSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  background: white;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.xl} 0;
`;

export const FinishBtn = styled.button`
  /* display: flex; */
  text-transform: uppercase;
  margin-top: 1rem;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  color: white;
  width: 100%;
  height: 1.5rem;
  background: ${theme.colors.success};
`;

export const StatusHeader = styled.div<{
  status: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 0 0;
  padding: 16px 0 8px 0;
  margin-bottom: 16px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  background: ${({ status, theme }) => {
    switch (status) {
      case "pending":
        return theme.colors.warning;
      case "processing":
        return theme.colors.primary;
      case "completed":
        return theme.colors.success;
      case "cancelled":
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  }};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const OrderListWrapper = styled.div`
  padding: ${theme.spacing.md};
`;

export {
  Container,
  KanbanBoard,
  Column,
  ColumnTitle,
  OrderCard,
  OrderHeader,
  OrderId,
  OrderTotal,
  OrderInfo,
  OrderItems,
  StatusSelect,
  ErrorMessage,
  LoadingMessage,
};
