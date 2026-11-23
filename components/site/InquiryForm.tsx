"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import type { Copy } from "@/lib/site/copy";

export default function InquiryForm({ copy }: { copy: Copy }) {
  const form = copy.contact.form;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = event.currentTarget;
    setStatus("sending");
    try {
      await emailjs.sendForm("service_5hbmibg", "template_68rxy05", current, {
        publicKey: "eUyIM_8VqpqpTOORR",
      });
      current.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1 w-full rounded-xl border border-sand bg-paper px-3 py-2 text-ink outline-none focus:border-olive";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-sand bg-paper p-5 sm:p-6">
      <input type="hidden" name="holidayHome" value="Villa Luxury Ulika" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-ink/80">
          {form.name}
          <input name="from_name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm text-ink/80">
          {form.email}
          <input name="user_email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm text-ink/80">
          {form.phone}
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm text-ink/80">
            {form.arrival}
            <input name="arrivalDate" type="date" className={field} />
          </label>
          <label className="block text-sm text-ink/80">
            {form.departure}
            <input name="departureDate" type="date" className={field} />
          </label>
        </div>
      </div>
      <label className="mt-4 block text-sm text-ink/80">
        {form.message}
        <textarea name="message" required rows={5} className={field} />
      </label>
      <p className="mt-3 text-xs leading-relaxed text-ink/60">{form.privacy}</p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 rounded-full bg-olive px-5 py-2.5 text-sm text-paper hover:bg-olive-deep disabled:opacity-60"
      >
        {status === "sending" ? form.sending : form.submit}
      </button>
      {status === "sent" && (
        <p role="status" className="mt-3 text-sm text-olive">
          {form.sent}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-clay">
          {form.error}
        </p>
      )}
    </form>
  );
}
