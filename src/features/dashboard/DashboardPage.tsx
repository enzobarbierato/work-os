import Header from "../../components/layout/Header";

function DashboardPage() {
  return (
    <>
      <Header
        title="Dashboard"
        description="Acompanhe os indicadores dos seus projetos."
      />

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">
          Visão geral
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          Os indicadores e gráficos serão exibidos
          aqui quando implementarmos os dados.
        </p>
      </section>
    </>
  );
}

export default DashboardPage;
