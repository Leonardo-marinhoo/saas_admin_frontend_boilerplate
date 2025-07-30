import styled from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
    max-width: 100vw;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${theme.spacing.lg};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};

  th,
  td {
    padding: ${theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }

  th {
    background-color: ${theme.colors.surface};
    color: ${theme.colors.text};
    font-weight: 600;
  }

  td {
    color: ${theme.colors.text};
  }
`;

const DesktopTable = styled(Table)`
  display: table;

  @media (max-width: 768px) {
    display: none !important;
  }
`;

const MobileTable = styled(Table)`
  display: none;

  @media (max-width: 768px) {
    display: block !important;
    overflow-x: auto;
    white-space: nowrap;

    th,
    td {
      padding: ${theme.spacing.xs};
      font-size: 0.85rem;
    }
  }
`;

const MobileCards = styled.div`
  display: none;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (max-width: 768px) {
    display: flex !important;
  }
`;

const ProductCard = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border};
  min-height: 120px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
    min-height: 100px;
  }
`;

const CardImage = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${theme.colors.border};
  align-self: flex-start;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    align-self: center;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 120px;
  padding-right: 16px;

  @media (max-width: 768px) {
    min-height: 80px;
    padding-right: 8px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 4px;
  }
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    -webkit-line-clamp: 1;
    margin-bottom: 8px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  align-items: center;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  min-width: 90px;
  margin-top: 0;
  align-self: stretch;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    min-width: 70px;
    margin-top: 0;
    gap: 6px;
    height: 100%;
  }
`;

const Badge = styled.span<{ variant?: "category" | "price" | "stock" }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ variant }) => {
    switch (variant) {
      case "category":
        return `
          background: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary}40;
        `;
      case "price":
        return `
          background: #10b98120;
          color: #10b981;
          border: 1px solid #10b98140;
        `;
      case "stock":
        return `
          background: #f59e0b20;
          color: #f59e0b;
          border: 1px solid #f59e0b40;
        `;
      default:
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 0.95rem;
  width: auto;
  min-width: 80px;
  height: 36px;
  margin: 0;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &.primary {
    background-color: ${theme.colors.primary};
    color: white;
    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
  }
  &.danger {
    background-color: ${theme.colors.error};
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    width: auto;
    min-width: 60px;
    height: 32px;
    font-size: 0.85rem;
    padding: 6px 10px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`;

const ModalContent = styled.div`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.lg};

  @media (max-width: 768px) {
    width: 95%;
    max-width: none;
    margin: ${theme.spacing.sm};
    padding: ${theme.spacing.md};
    max-height: 80vh;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    gap: ${theme.spacing.sm};
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  min-height: 100px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    min-height: 80px;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
  font-size: 0.875rem;
`;

const ImagePreview = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.sm};

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: ${theme.borderRadius.sm};
    border: 1px solid ${theme.colors.border};
  }

  @media (max-width: 768px) {
    gap: ${theme.spacing.xs};

    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ImageCheckbox = styled.input`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${theme.colors.error};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0;

  &:hover {
    background-color: #c82333;
  }
`;

const ProductImage = styled.img<{ isPrimary: boolean }>`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  border: 2px solid
    ${(props) => (props.isPrimary ? theme.colors.primary : theme.colors.border)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) =>
      props.isPrimary ? theme.colors.primary : theme.colors.primaryLight};
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${theme.colors.border};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  /* Para cards mobile */
  &.card-image {
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius.md};
    border: none;
  }
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-weight: 500;
  margin-bottom: ${theme.spacing.xs};
  display: block;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const FilterWrapper = styled.div`
  flex: 1;
  max-width: 320px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #181818;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

export {
  Container,
  Table,
  Button,
  Modal,
  ModalContent,
  Form,
  Input,
  Select,
  TextArea,
  ErrorMessage,
  ImagePreview,
  ImageContainer,
  ImageCheckbox,
  DeleteButton,
  ProductImage,
  LoadingOverlay,
  Thumbnail,
  Label,
  FilterContainer,
  FilterWrapper,
  ButtonWrapper,
  Title,
  ActionButtons,
  ModalButtons,
  DesktopTable,
  MobileTable,
  MobileCards,
  ProductCard,
  CardImage,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardInfo,
  CardActions,
  Badge,
};
