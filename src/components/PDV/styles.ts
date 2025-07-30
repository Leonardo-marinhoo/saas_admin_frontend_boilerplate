import styled from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  padding-top: ${theme.contentPaddingTop}px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${theme.spacing.lg};
  height: calc(100dvh - 80px);
  max-height: 100dvh;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 350px;
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 320px;
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing.sm};
    height: auto;
    gap: ${theme.spacing.md};
    padding-top: ${theme.contentPaddingTop}px;
    min-height: calc(100dvh - 80px);
  }
`;

export const ProductsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 8px;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding-right: 0;
    height: auto;
    flex: 1;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  padding-right: ${theme.spacing.md};
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding-right: 0;
    gap: ${theme.spacing.sm};
    height: auto;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: ${theme.spacing.xs};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};

    &:hover {
      background: ${theme.colors.textLight};
    }
  }
`;

const ProductCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 220px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 200px;
    padding: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 180px;
    padding: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 200px;
    padding: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    height: 180px;
    padding: ${theme.spacing.sm};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 100px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 90px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 110px;
  }

  @media (max-width: 480px) {
    height: 90px;
  }
`;

const ProductName = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ProductPrice = styled.div`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CartContainer = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: auto;
    min-height: 400px;
    max-height: 500px;
  }
`;

const CartTitle = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.primary};
  font-size: 1.5rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: -${theme.spacing.sm} 0;
  padding: ${theme.spacing.sm} 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    max-height: 300px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};

    &:hover {
      background: ${theme.colors.textLight};
    }
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.xs} 0;
  }

  @media (max-width: 480px) {
    gap: ${theme.spacing.xs};
  }
`;

const CartItemThumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.div`
  font-weight: 500;
  color: ${theme.colors.text};
  font-size: 0.95rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const CartItemPrice = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-top: 2px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0 ${theme.spacing.md};
  background: ${theme.colors.background};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0 ${theme.spacing.sm};
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs};
  }

  @media (max-width: 480px) {
    margin: 0 ${theme.spacing.xs};
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.xs};
  }
`;

const QuantityButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 22px;
    height: 22px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
  }
`;

const CartTotal = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 2px solid ${theme.colors.border};
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.colors.text};
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.background};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
    padding: ${theme.spacing.sm};
    margin-top: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: ${theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.spacing.sm};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.95rem;
  background: ${theme.colors.background};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    min-height: 44px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.95rem;
  background: ${theme.colors.background};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    min-height: 44px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.95rem;
  resize: vertical;
  min-height: 80px;
  background: ${theme.colors.background};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: ${theme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
    padding: ${theme.spacing.sm};
    margin-top: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: ${theme.spacing.md};
    min-height: 48px;
    margin-top: ${theme.spacing.sm};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.sm};
  text-align: center;
  font-size: 0.9rem;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.error}10;
  border-radius: ${theme.borderRadius.sm};

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: ${theme.spacing.xs};
  }
`;

export const CategoriesNav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.border};
  background: ${theme.colors.background};
  height: 3rem;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
    height: auto;
    min-height: 3rem;
    padding-bottom: ${theme.spacing.xs};
  }

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};

    &:hover {
      background: ${theme.colors.textLight};
    }
  }
`;

export const CategoryButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${({ active }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active }) => (active ? "white" : theme.colors.text)};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  outline: none;
  min-width: 120px;
  box-shadow: ${({ active }) => (active ? theme.shadows.sm : "none")};

  &:hover {
    background: ${({ active }) =>
      active ? theme.colors.primaryDark : theme.colors.surface};
    color: ${({ active }) => (active ? "white" : theme.colors.primary)};
  }

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: ${theme.spacing.xs};
    border-radius: 50%;
    background: #fff;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-width: 100px;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.9rem;

    img {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 90px;
    padding: ${theme.spacing.xs};
    font-size: 0.85rem;
    white-space: nowrap;

    img {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    min-width: 80px;
    font-size: 0.8rem;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

export {
  Container,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  CartContainer,
  CartTitle,
  CartItems,
  CartItem,
  CartItemThumbnail,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemQuantity,
  QuantityButton,
  CartTotal,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  SubmitButton,
  ErrorMessage,
};
