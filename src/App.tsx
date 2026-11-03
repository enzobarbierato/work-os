function App() {
  return (
    <div className="min-h-screen bg-surface">

      {/* Cabeçalho */}
      <header className="bg-ink px-8 py-5">
        <h1 className="text-2xl font-bold text-white">
          Work OS
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main className="mx-auto max-w-6xl p-8">

        <h2 className="text-3xl font-bold text-ink">
          Meu espaço de trabalho
        </h2>

        <p className="mt-2 text-gray-600">
          Sua plataforma de gestão de projetos.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">
              Meus quadros
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Nenhum quadro criado.
            </p>

            <div className="mt-5 h-2 w-20 rounded bg-brand-blue" />
          </article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">
              Minhas tarefas
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Nenhuma tarefa cadastrada.
            </p>

            <div className="mt-5 h-2 w-20 rounded bg-brand-yellow" />
          </article>

        </section>
      </main>
    </div>
  );
}

export default App;
