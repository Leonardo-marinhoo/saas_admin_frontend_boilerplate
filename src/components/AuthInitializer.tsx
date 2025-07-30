import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../services/api/authApi";
import { logout, setLoading, setCredentials } from "../store/authSlice";
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
    if (userData) {
      dispatch(
        setCredentials({
          user: userData,
          token: token || localStorage.getItem("token") || "",
          role_type: userData.role?.type,
        })
      );
    }
  }, [userData, dispatch, token]);

  useEffect(() => {
    if (error && isAuthenticated) {
      // Se há erro e o usuário está marcado como autenticado, fazer logout
      dispatch(logout());
    }
  }, [error, isAuthenticated, dispatch]);

  // Se não está autenticado, não mostrar loading
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Mostrar loading apenas se estiver carregando e não tem dados do usuário
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

  // Se tem dados do usuário, parar de carregar
  if (user && isLoading) {
    dispatch(setLoading(false));
  }

  return <>{children}</>;
}
