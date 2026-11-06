import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function AppLayout() {

  const [logoutError, setLogoutError] = useState("");
  
  async function handleLogout() {
    setLogoutError("");
  
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      setLogoutError("Não foi possível encerrar a sessão.");
    }
  }

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
