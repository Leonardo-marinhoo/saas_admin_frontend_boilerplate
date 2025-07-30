import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../services/api/authApi";
import { logout, setCredentials } from "../store/authSlice";
import type { RootState } from "../store";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data: userData,
    error,
    isLoading,
  } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (userData && userData !== user) {
      dispatch(
        setCredentials({
          user: userData,
          token: token || localStorage.getItem("token") || "",
          role_type: userData.role?.type,
        })
      );
    }
  }, [userData, user, dispatch, token]);

  useEffect(() => {
    if (error && isAuthenticated) {
      if (error) {
        // Especificamente para autenticação falha
        dispatch(logout());
      } else {
        console.error("Outro erro ocorreu:", error);
      }
    }
  }, [error, isAuthenticated, dispatch]);

  // Não mostrar nada se autorizado não está, e não está carregando
  if (!isAuthenticated && !isLoading) {
    return <>{children}</>;
  }

  // Mostrar carregamento apenas enquanto não tem usuário e está carregando
  if (isLoading && !user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Carregando...
      </div>
    );
  }

  // Quando usuário está presente, não precisa mais mostrar carregando
  if (user) {
    return <>{children}</>;
  }

  return null; // Garantir que qualquer outro estado retorne null para evitar erros
}
