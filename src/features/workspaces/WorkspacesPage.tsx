import Header from "../../components/layout/Header";

function WorkspacesPage() {
  return (
    <>
      <Header
        title="Workspaces"
        description="Organize seus ambientes de trabalho."
      />

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">
          Seus ambientes de trabalho
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          Aqui você poderá gerenciar seus workspaces
          e futuramente adicionar membros.
        </p>
      </section>
    </>
  );
}

export default WorkspacesPage;
