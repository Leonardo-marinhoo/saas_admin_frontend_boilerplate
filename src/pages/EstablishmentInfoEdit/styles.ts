import styled from "styled-components";

export const Heading = styled.h1<{
  size?: "6" | "4";
  weight?: "bold" | "medium";
}>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: ${(props) =>
    props.weight === "bold"
      ? props.theme.typography.fontWeight.bold
      : props.theme.typography.fontWeight.medium};
  font-size: ${(props) =>
    props.size === "6"
      ? props.theme.typography.fontSize["3xl"]
      : props.theme.typography.fontSize.xl};
  color: ${(props) => props.theme.colors.text};
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) =>
      props.size === "6"
        ? props.theme.typography.fontSize["2xl"]
        : props.theme.typography.fontSize.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) =>
      props.size === "6"
        ? props.theme.typography.fontSize.xl
        : props.theme.typography.fontSize.md};
  }
`;

export const Text = styled.p<{
  color?: "gray";
  size?: "2" | "3" | "4";
  weight?: "medium";
}>`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) =>
    props.size === "2"
      ? props.theme.typography.fontSize.sm
      : props.size === "3"
      ? props.theme.typography.fontSize.md
      : props.size === "4"
      ? props.theme.typography.fontSize.lg
      : props.theme.typography.fontSize.md};
  color: ${(props) =>
    props.color === "gray"
      ? props.theme.colors.textSecondary
      : props.theme.colors.text};
  font-weight: ${(props) =>
    props.weight === "medium"
      ? props.theme.typography.fontWeight.medium
      : "normal"};
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) =>
      props.size === "2"
        ? props.theme.typography.fontSize.xs
        : props.size === "3"
        ? props.theme.typography.fontSize.sm
        : props.size === "4"
        ? props.theme.typography.fontSize.md
        : props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) =>
      props.size === "2"
        ? props.theme.typography.fontSize.xs
        : props.size === "3"
        ? props.theme.typography.fontSize.xs
        : props.size === "4"
        ? props.theme.typography.fontSize.sm
        : props.theme.typography.fontSize.xs};
  }
`;

export const Button = styled.button<{
  variant?: "soft";
  size?: "3";
}>`
  padding: 10px 20px;
  font-size: ${(props) => props.theme.typography.fontSize.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};

  background-color: ${(props) =>
    props.variant === "soft"
      ? props.theme.colors.background
      : props.theme.colors.primary};
  color: ${(props) =>
    props.variant === "soft"
      ? props.theme.colors.text
      : props.theme.colors.surface};

  /* Botão cancelar mais opaco e menos chamativo */
  &[data-cancel="true"] {
    opacity: 0.5;
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textSecondary};
    border: 1px solid ${(props) => props.theme.colors.border};
    font-weight: normal;
    box-shadow: none;
    filter: grayscale(0.3);
  }

  &:hover {
    background-color: ${(props) =>
      props.variant === "soft"
        ? props.theme.colors.border
        : props.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 8px 16px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 6px 12px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin: ${(props) => props.theme.spacing.lg} 0;
`;

export const Label = styled.label`
  display: block;
`;

export const TextField = styled.input`
  width: 100%;
  padding: 16px;
  font-size: ${(props) => props.theme.typography.fontSize.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  box-sizing: border-box;
  transition: all ${(props) => props.theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}20;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textLight};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.background};
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 14px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 12px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

export const FileInput = styled.input.attrs({ type: "file" })`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.md};
  background-color: ${(props) => props.theme.colors.surface};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.background};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 10px 14px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 8px 12px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
  }
`;

export const BannerPreview = styled.img`
  width: 200px;
  height: 100px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: all ${(props) => props.theme.transitions.default};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 150px;
    height: 75px;
  }
`;

export const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 44px;
    height: 26px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 40px;
    height: 24px;
  }
`;

export const SwitchInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${(props) => props.theme.colors.success};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    &:checked + span:before {
      transform: translateX(18px);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    &:checked + span:before {
      transform: translateX(16px);
    }
  }
`;

export const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    border-radius: 26px;

    &:before {
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    border-radius: 24px;

    &:before {
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
    }
  }
`;

export const CreditCard = styled.div`
  position: relative;
  min-width: 340px;
  max-width: 375px;
  width: 100%;
  height: 225px;
  background: rgba(255, 255, 255, 0.15); /* translúcido para o blur funcionar */
  border-radius: 25px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Poppins", sans-serif;
  backdrop-filter: blur(2px);
  z-index: 1;
  overflow: visible;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    height: 200px;
    padding: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    height: 180px;
    padding: 16px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  font-family: "Poppins", sans-serif;
  position: relative;
  z-index: 3;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
`;

export const CardLogoRow = styled.span`
  display: flex;
  align-items: center;
`;

export const CardLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  margin-right: 10px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px #23252633;
  border: 2px solid #fff;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
`;

export const CardTitle = styled.h5`
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin: 0;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 14px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 13px;
  }
`;

export const CardChip = styled.img`
  width: 50px;
  height: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 40px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 35px;
  }
`;

export const CardDetails = styled.div`
  display: flex;
  /* margin-top: 10px; */
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
  height: 100%;
`;

export const CardNumberLabel = styled.h6`
  font-size: 12px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin: 0;
  color: rgba(249, 211, 211, 0.95);
`;
export const CardMainInfo = styled.div`
  flex-direction: column;
  height: 82%;
`;

export const CardNumber = styled.h5`
  font-size: 14px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  letter-spacing: 1px;
  margin: 0;
  margin-bottom: 18px;
  position: relative;
  z-index: 2;
  color: white;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 16px;
    margin-bottom: 14px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

export const CardName = styled.h5`
  font-size: 16px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin: 20px 0 0 0;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 14px;
    margin: 16px 0 0 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 13px;
    margin: 14px 0 0 0;
  }
`;

export const CardValidBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  z-index: 2;
`;

export const CardValidLabel = styled.h6`
  font-size: 11px;
  font-weight: 400;
  font-family: "Poppins";
  margin: 0;
  position: relative;
  z-index: 2;
  text-align: left;
  color: rgba(249, 211, 211, 0.95);
`;

export const CardValidThru = styled.h5`
  font-size: 18px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin: 0;
  position: relative;
  z-index: 2;
  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 16px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const PlanLabel = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 0.92em;
  color: #bfa100;
  margin-bottom: 2px;
  text-align: left;
`;

export const PlanNotice = styled.p`
  font-size: 0.8rem;
  color: #fff;
  margin: 0 0 4px 0;
  opacity: 0.85;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 0.75rem;
    margin: 0 0 3px 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.7rem;
    margin: 0 0 2px 0;
  }
`;

export const PlanSection = styled.section<{ bg?: string }>`
  position: relative;
  width: 100%;
  min-height: 320px;
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #181828;
  overflow: hidden;
  padding-left: 2vw;
  ${({ bg }) =>
    bg &&
    `
      background-image: url(${bg});
      background-size: cover;
      background-position: center;
    `}

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    padding: 20px 1rem;
    min-height: auto;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

export const PlanSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  background: rgba(24, 24, 40, 0.7);
  border-radius: 16px;
  padding: 32px 24px;
  width: auto;
  height: 225px;
  margin: 0 auto;
  color: #fff;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.12);
  overflow: auto;
  /* padding: 0.5rem; */

  p,
  span,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 200px;
    padding: 20px 16px;
    gap: 12px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    max-width: 100%;
    padding: 16px 12px;
    gap: 10px;
    min-height: 180px;
  }
`;

export const PlanActionsSection = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px 0 0 0;
  margin-top: 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// Estilos responsivos para as linhas de endereço
export const AddressRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CityStateRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ZipCountryRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

// Estilos CSS globais para responsividade
export const GlobalStyles = styled.div`
  .address-row,
  .city-state-row,
  .zip-country-row {
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      flex-direction: column !important;
      gap: 16px !important;
    }
  }

  .address-row > div,
  .city-state-row > div,
  .zip-country-row > div {
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      flex: 1 !important;
    }
  }
`;

export const DeliveryTaxSection = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const DeliveryTaxInput = styled.input`
  width: 120px;
  padding: 12px 16px;
  font-size: ${(props) => props.theme.typography.fontSize.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  box-sizing: border-box;
  transition: all ${(props) => props.theme.transitions.default};
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textLight};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100px;
    padding: 10px 14px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 90px;
    padding: 8px 12px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

export const UpdateButton = styled.button`
  padding: 12px 20px;
  font-size: ${(props) => props.theme.typography.fontSize.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.default};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 10px 16px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 8px 12px;
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;
