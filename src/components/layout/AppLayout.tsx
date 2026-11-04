import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-surface md:flex">

      <Sidebar />

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-7xl p-6 md:p-10">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default AppLayout;
