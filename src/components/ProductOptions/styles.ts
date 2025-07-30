import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  margin-top: ${theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

export const Title = styled.h3`
  margin: 0;
  color: ${theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  border: 2px dashed ${theme.colors.border};

  p {
    margin: ${theme.spacing.sm} 0;
    font-size: 0.9rem;
  }
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const OptionCard = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

export const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

export const OptionInfo = styled.div`
  flex: 1;
`;

export const OptionName = styled.h4`
  margin: 0 0 ${theme.spacing.sm} 0;
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
`;

export const OptionMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const Badge = styled.span<{ type: "single" | "multiple" | "required" }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;

  ${({ type }) => {
    switch (type) {
      case "single":
        return `
          background-color: ${theme.colors.primaryLight};
          color: ${theme.colors.primary};
        `;
      case "multiple":
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.text};
        `;
      case "required":
        return `
          background-color: ${theme.colors.error};
          color: white;
        `;
      default:
        return "";
    }
  }}
`;

export const OptionActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.background};
  }

  &.danger {
    color: ${theme.colors.error};
    border-color: ${theme.colors.error};

    &:hover {
      background-color: ${theme.colors.error};
      color: white;
    }
  }
`;

export const ValuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const ValueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.sm};
`;

export const ValueName = styled.span`
  font-weight: 500;
  color: ${theme.colors.text};
`;

export const ValuePrice = styled.span`
  color: ${theme.colors.success};
  font-weight: 500;
  font-size: 0.9rem;
`;

export const DefaultBadge = styled.span`
  background-color: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.lg};

  @media (max-width: 768px) {
    width: 95%;
    margin: ${theme.spacing.sm};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};

  h3 {
    margin: 0;
    color: ${theme.colors.text};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.text};
  }
`;

export const Form = styled.form`
  padding: ${theme.spacing.lg};
`;

export const FormContainer = styled.div`
  padding: ${theme.spacing.lg};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.md};
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  background-color: ${theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${theme.colors.text};
  cursor: pointer;
  margin: 0;
`;

export const ValuesSection = styled.div`
  margin-top: ${theme.spacing.lg};
`;

export const ValuesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

export const AddValueButton = styled.button`
  background-color: ${theme.colors.success};
  color: white;
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;

  &:hover {
    background-color: ${theme.colors.success};
    opacity: 0.8;
  }
`;

export const ValueForm = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

export const ValueFormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr auto auto;
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xs};
  }
`;

export const ValueInput = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const PriceInput = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  text-align: right;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const RemoveButton = styled.button`
  background-color: ${theme.colors.error};
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.error};
    opacity: 0.8;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  background-color: ${theme.colors.background};

  &:hover {
    background-color: ${theme.colors.background};
  }

  &.primary {
    background-color: ${theme.colors.primary};
    color: white;
    border-color: ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
  }
`;
