"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (response.status === 503) {
      setError("Admin is not configured.");
      return;
    }
    if (response.status === 429) {
      setError("Too many attempts. Wait 15 minutes.");
      return;
    }
    if (!response.ok) {
      setError("Wrong password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  if (!configured) {
    return (
      <div className="login">
        <h1>Admin is not configured</h1>
        <p>
          Set <code>ADMIN_PASSWORD_HASH</code> and <code>SESSION_SECRET</code> in the Vercel project.
          The public site is unchanged.
        </p>
      </div>
    );
  }

  return (
    <form className="login" onSubmit={submit}>
      <h1>Host login</h1>
      <label>
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="gold" type="submit" disabled={pending}>
        Log in
      </button>
    </form>
  );
}
