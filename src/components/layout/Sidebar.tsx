
type MenuItem = {
  label: string;
  active?: boolean;
};

const menuItems: MenuItem[] = [
  { label: "Início", active: true },
  { label: "Meus quadros" },
  { label: "Workspaces" },
  { label: "Dashboard" },
];

function Sidebar() {
  return (
    <aside className="w-full bg-ink p-5 text-white md:min-h-screen md:w-64 md:shrink-0 md:p-6">

      {/* Identidade visual */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow">
          <span className="font-bold text-ink">W</span>
        </div>

        <span className="text-xl font-bold">
          Work OS
        </span>
      </div>

      {/* Menu de navegação */}
      <nav aria-label="Menu principal" className="mt-8 md:mt-12">
        <ul className="flex flex-wrap gap-2 md:flex-col">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={`rounded-lg px-4 py-3 text-sm ${
                item.active
                  ? "bg-brand-yellow font-semibold text-ink"
                  : "text-gray-300"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
}

export default Sidebar;
