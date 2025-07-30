import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo (1).png";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
  background: #15152e;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm};
  }
`;

const LoginCard = styled.div`
  background: #2b2b5e;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 400px;
  color: white;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
    max-width: 100%;
    margin: 0 ${theme.spacing.sm};
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.md};
    min-height: 380px;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.spacing.lg};
  }
`;

const LogoImage = styled.img`
  height: 148px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: normal;
  color: white;
  margin-bottom: ${theme.spacing.lg};
  text-align: center;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: ${theme.typography.fontSize.md};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: white;

  @media (max-width: 480px) {
    font-size: ${theme.typography.fontSize.xs};
  }
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

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.md};
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.md};
    min-height: 52px;
  }
`;

const Button = styled.button`
  background: #4d4daa;
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

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.md};
    margin-top: ${theme.spacing.md};
    min-height: 48px;
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.md};
    min-height: 52px;
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

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Logo>
          <LogoImage src={logo} alt="Menu Flow Logo" />
        </Logo>
        <Title>Seja bem vindo</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </Form>
      </LoginCard>
    </Container>
  );
}
