
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout
      title="Meu espaço de trabalho"
      description="Gerencie seus projetos em um só lugar."
    >

      <section className="grid gap-5 md:grid-cols-2">

        {/* Quadros */}
        <article className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-ink">
            Meus quadros
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Nenhum quadro criado até o momento.
          </p>

          <div className="mt-6 h-2 w-24 rounded bg-brand-blue" />

        </article>

        {/* Tarefas */}
        <article className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-ink">
            Minhas tarefas
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Nenhuma tarefa cadastrada.
          </p>

          <div className="mt-6 h-2 w-24 rounded bg-brand-yellow" />

        </article>

      </section>

    </AppLayout>
  );
}

export default App;
