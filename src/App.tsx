
import { Routes, Route, Navigate } from "react-router";

import AppLayout from "./components/layout/AppLayout";
import AuthPage from "./features/auth/AuthPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

import HomePage from "./features/home/HomePage";
import BoardsPage from "./features/boards/BoardsPage";
import WorkspacesPage from "./features/workspaces/WorkspacesPage";
import DashboardPage from "./features/dashboard/DashboardPage";

function App() {
  return (
    <Routes>

      {/* Página pública */}
      <Route path="/login" element={<AuthPage />} />

      {/* Páginas que exigem login */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/workspaces" element={<WorkspacesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Endereços não encontrados */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
