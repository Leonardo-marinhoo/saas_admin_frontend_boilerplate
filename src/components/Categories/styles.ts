import styled from "styled-components";
import { theme } from "../../styles/theme";
import categoryBanner from "../../assets/categorybanner.jpg";

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  padding-top: ${theme.contentPaddingTop}px;

  @media (max-width: 600px) {
    padding: ${theme.spacing.sm};
    max-width: 100vw;
    padding-top: ${theme.contentPaddingTop}px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text};
`;

const AddButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const Card = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const CardBanner = styled.div`
  position: relative;
  background: url(${categoryBanner}) center/cover no-repeat;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
`;

export const CategoryNavOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  z-index: 1;
`;

export const CategoryNavTitle = styled.div`
  font-weight: 500;
  color: #fff;
  font-size: 14px;
  margin: 8px 0 4px 0;
  text-align: center;
  text-shadow: 0 2px 8px #000a;
  z-index: 2;
`;

export const CategoryNavMock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0003;
  padding: 8px 16px;
  min-height: 48px;
  width: fit-content;
  margin: 8px auto 16px auto;
  position: relative;
  z-index: 2;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

const CardDescription = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin: ${theme.spacing.sm} 0;
  line-height: 1.5;
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.md};
  border: 2px solid ${theme.colors.surface};
  position: absolute;
  z-index: 1;
  top: -30px;
  left: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  /* overflow: hidden; */
  background: ${theme.colors.background};
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }

  &.delete:hover {
    color: ${theme.colors.error};
  }
`;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  max-width: 500px;
  box-shadow: ${theme.shadows.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
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

  &:hover {
    color: ${theme.colors.text};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
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

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-top: ${theme.spacing.md};

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

export {
  Container,
  Header,
  Title,
  AddButton,
  Grid,
  Card,
  BannerImage,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardIcon,
  IconImage,
  CardActions,
  ActionButton,
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
  SubmitButton,
  ErrorMessage,
};
