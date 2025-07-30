import styled from "styled-components";
import { theme } from "../../styles/theme";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: 0;
  width: 100%;
  max-width: 60dvw;
  box-shadow: ${theme.shadows.lg};
  height: 90dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 95dvw;
  }
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${theme.colors.surface};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top-left-radius: ${theme.borderRadius.lg};
  border-top-right-radius: ${theme.borderRadius.lg};
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.default};
  font-size: 2rem;
  line-height: 1;
  &:hover {
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: auto;
  padding: 0 ${theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.md};
  transition: all ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.md};
  transition: all ${theme.transitions.default};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: ${theme.borderRadius.sm};
    border: 1px solid ${theme.colors.border};
  }
`;

const ImageLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageButton = styled.label`
  background: ${theme.colors.background};
  border: 1px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.sm};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.lg} 0;
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-top: 0;
  min-width: 240px;
  width: 60%;
  max-width: 400px;
  box-shadow: none;
  display: block;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  text-align: center;
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.error}10;
  border-radius: ${theme.borderRadius.sm};
`;

export const S = {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ImagePreview,
  ImageLabel,
  ImageInput,
  ImageButton,
  Footer,
  SubmitButton,
  ErrorMessage,
};
