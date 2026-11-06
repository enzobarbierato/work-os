import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";

type AuthMode = "login" | "register";

function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        if (data.session) {
          navigate("/", { replace: true });
        } else {
          setSuccessMessage(
            "Cadastro solicitado! Verifique seu e-mail para confirmar a conta."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        navigate("/", { replace: true });
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir a operação."
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(isRegister ? "login" : "register");
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow font-bold text-ink">
            W
          </div>
          <span className="text-xl font-bold text-ink">
            Work OS
          </span>
        </div>

        <h1 className="text-2xl font-bold text-ink">
          {isRegister ? "Criar conta" : "Entrar na plataforma"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {isRegister
            ? "Crie sua conta para começar a organizar seus projetos."
            : "Acesse seu ambiente de trabalho."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {isRegister && (
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nome
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={100}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-blue"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-brand-blue"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p role="status" className="text-sm text-green-700">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-blue py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Processando..."
              : isRegister
                ? "Criar conta"
                : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={switchMode}
            className="text-sm font-medium text-brand-blue hover:underline"
          >
            {isRegister
              ? "Já possui uma conta? Entrar"
              : "Ainda não tem conta? Criar conta"}
          </button>
        </div>

      </section>
    </main>
  );
}

export default AuthPage;
