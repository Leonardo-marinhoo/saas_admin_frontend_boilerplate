import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import PDV from "./components/PDV";
import EstablishmentInfoEdit from "./pages/EstablishmentInfoEdit";
import Dashboard from "./pages/Dashboard";
import TableSessions from "./pages/TableSessions";
import Usuarios from "./pages/Usuarios";
import Pacotes from "./pages/Pacotes/index";
import Entregas from "./pages/Entregas/index";
import ProductsPage from "./pages/Products";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

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
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/pdv"
        element={
          <ProtectedRoute>
            <PDV />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route path="/pproducts" element={<ProductsPage />} />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/establishment-info-edit"
        element={
          <ProtectedRoute>
            <EstablishmentInfoEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/comandas"
        element={
          <ProtectedRoute>
            <TableSessions />
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
      <Route
        path="/pacotes"
        element={
          <ProtectedRoute>
            <Pacotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entregas"
        element={
          <ProtectedRoute>
            <Entregas />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/pdv" replace />} />
    </RouterRoutes>
  );
}
