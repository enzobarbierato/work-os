
import { Routes, Route } from "react-router";

import AppLayout from "./components/layout/AppLayout";

import HomePage from "./features/home/HomePage";
import BoardsPage from "./features/boards/BoardsPage";
import WorkspacesPage from "./features/workspaces/WorkspacesPage";
import DashboardPage from "./features/dashboard/DashboardPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>

        <Route index element={<HomePage />} />

        <Route
          path="/boards"
          element={<BoardsPage />}
        />

        <Route
          path="/workspaces"
          element={<WorkspacesPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

      </Route>
    </Routes>
  );
}

export default App;
