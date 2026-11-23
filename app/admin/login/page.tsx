import { redirect } from "next/navigation";
import { loginAction } from "../actions";
import { authConfigured, readSession } from "@/lib/admin/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  if (readSession()) redirect("/admin");
  const configured = authConfigured();
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <p className="text-xs uppercase tracking-[0.2em] text-olive">Villa Luxury Ulika</p>
      <h1 className="mt-2 font-display text-4xl">Prijava domaćina</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        Samo postojeći domaćin. Nema javne registracije.
      </p>
      {!configured && (
        <p className="mt-4 text-sm text-clay">
          Prijava nije postavljena. Na produkciji trebaju HOST_EMAIL, HOST_PASSWORD_HASH i SESSION_SECRET.
        </p>
      )}
      <form action={loginAction} className="mt-6 space-y-3">
        <label className="block text-sm">
          E-pošta
          <input name="email" type="email" required autoComplete="username" className="mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2" />
        </label>
        <label className="block text-sm">
          Lozinka
          <input name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2" />
        </label>
        <button className="rounded-full bg-olive px-5 py-2 text-sm text-paper" type="submit">
          Prijavi se
        </button>
        {searchParams?.error === "rate" && <p className="text-sm text-clay">Previše pokušaja. Pričekajte 15 minuta.</p>}
        {searchParams?.error === "credentials" && <p className="text-sm text-clay">Podaci se ne podudaraju.</p>}
      </form>
    </main>
  );
}
