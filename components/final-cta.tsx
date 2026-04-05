"use client";

import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { SectionShell } from "@/components/ui";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState(
    "Join the list for launch timing, first-run availability, and future dealer updates."
  );
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
    content: "",
    term: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setUtm({
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      content: params.get("utm_content") ?? "",
      term: params.get("utm_term") ?? ""
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Submitting your early-access request...");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          source: "website",
          productInterest: "Quack Attack",
          website: "",
          utm
        })
      });

      const data = (await response.json()) as { ok: boolean; created?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to submit.");
      }

      setStatus("success");
      setEmail("");
      setMessage(
        data.created
          ? "You’re on the list. Cobra Grip will reach out with launch updates and first access."
          : "You’re already on the list. We’ll keep you posted as Quack Attack moves toward launch."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="signup" className="section-divider relative py-24 pb-32 md:py-32">
      <SectionShell>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="industrial-panel rounded-[2.5rem] px-6 py-14 text-center md:px-16 md:py-20"
        >
          <p className="eyebrow-font mb-4 text-xs font-semibold text-venom/80">Launch access</p>
          <h2 className="display-font mx-auto max-w-4xl text-4xl leading-none text-white sm:text-6xl md:text-[5.25rem]">
            Get early access before launch
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/65">
            Join the drop list for launch timing, field updates, dealer announcements, and first-run availability.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["No spam", "Launch updates only", "First-run access"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/56"
              >
                {item}
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
            <label className="input-shell flex-1 rounded-full px-5 py-4">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                autoComplete="email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading"}
              className="min-w-[220px] rounded-full border border-venom/70 bg-venom px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-black shadow-venom transition hover:shadow-[0_0_32px_rgba(124,255,0,0.45)]"
            >
              {status === "loading" ? "Submitting..." : "Join the Drop"}
            </motion.button>
          </form>
          <p
            className={`mt-4 min-h-[1.5rem] text-sm ${
              status === "error" ? "text-red-300" : status === "success" ? "text-venom/85" : "text-white/45"
            }`}
          >
            {message}
          </p>
        </motion.div>
      </SectionShell>
    </section>
  );
}
