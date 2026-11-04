import Header from "../../components/layout/Header";

function BoardsPage() {
  return (
    <>
      <Header
        title="Meus quadros"
        description="Organize e acompanhe seus projetos."
      />

      <section className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">
          Seus quadros aparecerão aqui
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          A funcionalidade de criação de quadros
          será implementada em uma próxima etapa.
        </p>
      </section>
    </>
  );
}

export default BoardsPage;
