import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery, useLoginMutation } from "../services/api/authApi";
import { setCredentials, logout } from "../store/authSlice";
import type { RootState } from "../store";
import type { User } from "../types/auth";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, token, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    data: getMeData,
    isLoading: isGetMeLoading,
    error: getMeError,
  } = useGetMeQuery();

  const [login] = useLoginMutation();

  const signIn = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
          role_type: result.role_type,
        })
      );
      const roleType = result.user.role?.type || result.role_type;
      if (roleType === "delivery") {
        navigate("/pacotes");
      } else if (roleType === "kitchen") {
        navigate("/orders");
      } else {
        navigate("/establishment-info-edit");
      }
    } catch (error) {
      throw new Error("Falha na autenticação");
    }
  };

  const signOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  const verifyAuth = () => {
    if (getMeError) {
      alert("erro autenticação");
    }
    if (getMeData) {
      dispatch(
        setCredentials({
          user: { ...getMeData },
          token: token!,
          role_type: getMeData.role?.type,
        })
      );
      alert("reautenticado");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      verifyAuth();
    }
  }, [getMeData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
