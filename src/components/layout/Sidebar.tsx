
import { NavLink } from "react-router";

type MenuItem = {
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { label: "Início", path: "/" },
  { label: "Meus quadros", path: "/boards" },
  { label: "Workspaces", path: "/workspaces" },
  { label: "Dashboard", path: "/dashboard" },
];

function Sidebar() {
  return (
    <aside className="w-full bg-ink p-5 text-white md:min-h-screen md:w-64 md:shrink-0 md:p-6">

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow">
          <span className="font-bold text-ink">W</span>
        </div>

        <span className="text-xl font-bold">
          Work OS
        </span>
      </div>

      <nav aria-label="Menu principal" className="mt-8 md:mt-12">
        <ul className="flex flex-wrap gap-2 md:flex-col">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-brand-yellow font-semibold text-ink"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;