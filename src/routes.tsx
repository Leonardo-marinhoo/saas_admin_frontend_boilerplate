import {
  Routes as RouterRoutes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import EstablishmentInfoEdit from "./pages/EstablishmentInfoEdit";
import Usuarios from "./pages/Usuarios";

import ProductsPage from "./pages/Disciplinas";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Se está carregando, mostrar loading
  if (isLoading) {
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

  // Se não está autenticado, redirecionar para login
  if (!isAuthenticated || !user) {
    navigate("/login");
  }

  return <>{children}</>;
}

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />

      <Route path="/disciplinas" element={<ProductsPage />} />

      <Route
        path="/establishment-info-edit"
        element={
          <ProtectedRoute>
            <EstablishmentInfoEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/pdv" replace />} />
    </RouterRoutes>
  );
}
