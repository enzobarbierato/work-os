
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

function AppLayout({
  children,
  title,
  description,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface md:flex">

      <Sidebar />

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-7xl p-6 md:p-10">

          <Header
            title={title}
            description={description}
          />

          {children}

        </main>
      </div>

    </div>
  );
}

export default AppLayout;
