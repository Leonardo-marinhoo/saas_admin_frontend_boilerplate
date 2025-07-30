import styled from "styled-components";
import { theme } from "../../styles/theme";

export const UsersPanel = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  min-height: 200px;
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${theme.spacing.md};

  th,
  td {
    padding: ${theme.spacing.sm};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }

  th {
    background: ${theme.colors.background};
    font-weight: 600;
    color: ${theme.colors.text};
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const Loading = styled.div`
  padding: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

export const Error = styled.div`
  padding: ${theme.spacing.md};
  color: ${theme.colors.error};
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${theme.spacing.md};
`;

export const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${theme.colors.primaryDark || theme.colors.primary};
    opacity: 0.95;
  }
`;

export const CancelButton = styled.button`
  background: #eee;
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s;
  &:hover {
    background: #ddd;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.text};
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  background: #fff;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;
