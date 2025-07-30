import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  padding-top: ${theme.contentPaddingTop}px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};
  }
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize["3xl"]};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize["2xl"]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active }) => (active ? "#fff" : theme.colors.text)};
  border: 1px solid
    ${({ active }) => (active ? theme.colors.primary : theme.colors.border)};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary};
    color: #fff;
    border-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.xs};
    min-width: 80px;
  }
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xs};
  }
`;

export const BentoBox = styled.div<{ variant?: "primary" | "dark" }>`
  background: ${({ variant, theme }) => {
    if (variant === "primary") return theme.colors.primary;
    if (variant === "dark") return theme.colors.darkSurface;
    return theme.colors.surface;
  }};
  color: #fff;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  position: relative;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.xs};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};
  }
`;

export const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};

  & > svg {
    font-size: 24px;
    color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};

    & > svg {
      font-size: 20px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};

    & > svg {
      font-size: 18px;
    }
  }
`;

export const MetricTitle = styled.h3`
  font-size: ${theme.typography.fontSize.md};
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const MetricValue = styled.p`
  font-size: ${theme.typography.fontSize["3xl"]};
  color: #fff;
  font-weight: ${theme.typography.fontWeight.bold};

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.typography.fontSize["2xl"]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export const MetricChange = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.success};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const TableContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};

  @media (max-width: ${theme.breakpoints.md}) {
    margin-top: ${theme.spacing.lg};
    padding: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-top: ${theme.spacing.md};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.md};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize["2xl"]};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.md};
    flex-wrap: wrap;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const DateInput = styled.input`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  font-size: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.md};
    min-height: 44px;
  }
`;

export const ExportButton = styled.button`
  background: ${theme.colors.success};
  color: #fff;
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  transition: background ${theme.transitions.default};

  &:hover {
    background: #218838;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-left: 0;
    width: 100%;
    padding: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.md};
    min-height: 44px;
  }
`;

export const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: ${theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }

  th {
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    th,
    td {
      padding: ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.sm};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    th,
    td {
      padding: ${theme.spacing.xs} ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.xs};
      min-width: 100px;
    }

    th:first-child,
    td:first-child {
      min-width: 80px;
    }

    th:last-child,
    td:last-child {
      min-width: 120px;
    }
  }
`;
