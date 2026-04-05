"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabaseOAuthUrl, hasSupabaseClientConfig, signUpWithSupabase } from "@/lib/supabase-client";

type Step = "welcome" | "account" | "preferences" | "navigation";
type NavTab = "planner" | "toolkit" | "social" | "recap";
type Preference =
  | "Nature"
  | "Woods"
  | "Water Views"
  | "Overlooks"
  | "Mountain Roads"
  | "Small Towns"
  | "Coastal"
  | "Stargazing"
  | "Food Stops"
  | "Historic Routes";

type ScenicStop = { id: string; name: string; note: string; query: string };
type DiscoverSet = { campsites: PlaceItem[]; gas: PlaceItem[]; coffee: PlaceItem[]; icecream: PlaceItem[] };
type PlaceItem = { name: string; etaMinutes: number; note: string };
type SocialPost = {
  id: string;
  author: string;
  title: string;
  summary: string;
  vibe: string[];
  obfuscatedStart: string;
  obfuscatedEnd: string;
  safetyRadiusMiles: number;
  comments: { id: string; author: string; body: string }[];
};

const preferenceOptions: Preference[] = [
  "Nature",
  "Woods",
  "Water Views",
  "Overlooks",
  "Mountain Roads",
  "Small Towns",
  "Coastal",
  "Stargazing",
  "Food Stops",
  "Historic Routes"
];

const scenicStops: ScenicStop[] = [
  { id: "overlook", name: "Sunset Overlook", note: "Golden-hour ridge view", query: "Scenic overlook" },
  { id: "waterfall", name: "Whisper Falls", note: "Short trail, high reward", query: "Waterfall trailhead" },
  { id: "forest", name: "Pine Hollow", note: "Quiet forest pull-off", query: "Forest scenic route" },
  { id: "town", name: "Maple Ridge Town", note: "Coffee + antique stops", query: "Small town main street" }
];

function buildMapUrl(destination: string, detourQuery: string, wanderMode: boolean) {
  const baseQuery = destination.trim() || "Scenic route near me";
  const scenicHint = wanderMode ? " scenic route" : "";
  const detourHint = detourQuery ? ` via ${detourQuery}` : "";
  return `https://www.google.com/maps?q=${encodeURIComponent(`${baseQuery}${detourHint}${scenicHint}`)}&output=embed`;
}

function getGuestEmail() {
  return `guest+${Date.now()}@backroads.local`;
}

export function BackroadsApp() {
  const [step, setStep] = useState<Step>("welcome");
  const [tab, setTab] = useState<NavTab>("planner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowGuestMode, setAllowGuestMode] = useState(true);
  const [preferences, setPreferences] = useState<Preference[]>(["Nature", "Overlooks"]);
  const [selectedStopId, setSelectedStopId] = useState("overlook");
  const [origin, setOrigin] = useState("Current Location");
  const [destination, setDestination] = useState("");
  const [wanderMode, setWanderMode] = useState(true);
  const [distanceMiles, setDistanceMiles] = useState("120");
  const [tripNote, setTripNote] = useState("");
  const [sunPhase, setSunPhase] = useState("Daylight cruising");
  const [weatherLabel, setWeatherLabel] = useState("Loading weather...");
  const [guidePrompt, setGuidePrompt] = useState("Looking for a lake day, willing to drive 2+ hours");
  const [guidePlan, setGuidePlan] = useState<{ headline: string; tone: string; stops: { name: string; reason: string }[] } | null>(null);
  const [discover, setDiscover] = useState<DiscoverSet | null>(null);
  const [feed, setFeed] = useState<SocialPost[]>([]);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [recap, setRecap] = useState<{ year: number; totalTrips: number; totalMiles: number; topVibes: { name: string; count: number }[] } | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [isSavingTrip, setIsSavingTrip] = useState(false);

  const selectedStop = useMemo(
    () => scenicStops.find((stop) => stop.id === selectedStopId) || scenicStops[0],
    [selectedStopId]
  );
  const mapUrl = useMemo(
    () => buildMapUrl(destination, selectedStop.query, wanderMode),
    [destination, selectedStop.query, wanderMode]
  );
  const safeEmail = useMemo(() => email.trim().toLowerCase() || getGuestEmail(), [email]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour <= 8) setSunPhase("Sunrise window");
    else if (hour >= 17 && hour <= 20) setSunPhase("Sunset window");
    else if (hour >= 21 || hour <= 4) setSunPhase("Stargazing window");
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code`
            );
            const payload = (await response.json()) as {
              current?: { temperature_2m?: number; weather_code?: number };
            };
            const temp = payload.current?.temperature_2m;
            const code = payload.current?.weather_code;
            setWeatherLabel(typeof temp === "number" ? `${Math.round(temp)}° | weather ${code ?? "-"}` : "Weather unavailable");
          } catch {
            setWeatherLabel("Weather unavailable");
          }
        },
        () => setWeatherLabel("Weather unavailable")
      );
    };

    void fetchWeather();
  }, []);

  useEffect(() => {
    if (step !== "navigation") return;
    void loadDiscover();
    void loadFeed();
  }, [step]);

  async function loadDiscover() {
    const response = await fetch("/api/backroads/discover", { method: "POST" });
    const payload = (await response.json()) as { ok?: boolean } & DiscoverSet;
    if (response.ok && payload.ok) setDiscover(payload);
  }

  async function loadFeed() {
    const response = await fetch("/api/backroads/social/posts");
    const payload = (await response.json()) as { ok?: boolean; posts?: SocialPost[] };
    if (response.ok && payload.ok) setFeed(payload.posts || []);
  }

  async function loadRecap() {
    const response = await fetch(`/api/backroads/recap?email=${encodeURIComponent(safeEmail)}`);
    const payload = (await response.json()) as { ok?: boolean; recap?: typeof recap };
    if (response.ok && payload.ok && payload.recap) setRecap(payload.recap);
  }

  async function handleGuidePlan() {
    setError("");
    const response = await fetch("/api/backroads/guide", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        prompt: guidePrompt,
        preferences,
        destination
      })
    });
    const payload = (await response.json()) as {
      ok?: boolean;
      plan?: { headline: string; tone: string; stops: { name: string; reason: string }[] };
      error?: string;
    };
    if (!response.ok || !payload.ok || !payload.plan) {
      setError(payload.error || "Could not create plan.");
      return;
    }
    setGuidePlan(payload.plan);
    setStatus("AI guide plan ready.");
  }

  function togglePreference(value: Preference) {
    setPreferences((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  function continueWithProvider(provider: "google" | "apple") {
    const redirectTo = `${window.location.origin}/backroads`;
    const url = getSupabaseOAuthUrl(provider, redirectTo);
    if (!url) {
      setError("Social sign-in requires Supabase auth keys.");
      return;
    }
    window.location.href = url;
  }

  async function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    if (!allowGuestMode && password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    setIsSavingAccount(true);
    try {
      if (!allowGuestMode && hasSupabaseClientConfig()) {
        const authResult = await signUpWithSupabase(email.trim().toLowerCase(), password);
        if (!authResult.ok) throw new Error(authResult.error);
      }
      const response = await fetch("/api/backroads/accounts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Backroads Traveler",
          email: safeEmail
        })
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        if (!allowGuestMode) throw new Error(payload.error || "Could not create account.");
      }
      setStep("preferences");
      setStatus("Account ready.");
    } catch (requestError) {
      if (allowGuestMode) {
        setStep("preferences");
        setStatus("Guest mode active.");
      } else {
        setError(requestError instanceof Error ? requestError.message : "Could not create account.");
      }
    } finally {
      setIsSavingAccount(false);
    }
  }

  async function handleStartDrive(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    if (!destination.trim()) {
      setError("Enter a destination.");
      return;
    }
    setIsSavingTrip(true);
    try {
      const response = await fetch("/api/backroads/trips", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          accountEmail: safeEmail,
          origin,
          destination,
          preferences,
          wanderMode,
          scenicStop: selectedStop.name,
          notes: tripNote,
          distanceMiles: Number.parseFloat(distanceMiles) || 0
        })
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Could not save route.");
      setStatus("Drive saved.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save route.");
    } finally {
      setIsSavingTrip(false);
    }
  }

  async function handleShareDrive() {
    const response = await fetch("/api/backroads/social/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        author: name || "Backroads Driver",
        origin,
        destination,
        vibe: preferences,
        summary: tripNote || "Scenic route with great stops."
      })
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) {
      setError(payload.error || "Could not share drive.");
      return;
    }
    setStatus("Drive shared to community.");
    await loadFeed();
  }

  async function handlePostComment(postId: string) {
    const body = commentDraft[postId]?.trim() || "";
    if (!body) return;
    const response = await fetch("/api/backroads/social/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        postId,
        author: name || "Backroads Friend",
        body
      })
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) {
      setError(payload.error || "Could not add comment.");
      return;
    }
    setCommentDraft((current) => ({ ...current, [postId]: "" }));
    await loadFeed();
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-[#1f2d1e] text-[#f8f3e4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(235,214,146,0.24),transparent_36%),linear-gradient(180deg,#496647_0%,#2f452f_45%,#223423_100%)]" />

      {step === "welcome" ? (
        <section className="relative min-h-screen px-5 pb-8 pt-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#f0e2b5]/80">Backroads</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">Find your backroads.</h1>
          <p className="mt-3 max-w-sm text-sm text-[#f7f2e0]/85">Adventure-first routing for wanderers and dreamers.</p>
          <div className="mt-6 h-[56vh] overflow-hidden rounded-[2rem] border border-[#f2e6bf]/20 bg-[linear-gradient(180deg,#f4d9a4_0%,#9ab080_34%,#5f7a58_65%,#40543c_100%)]" />
          <button type="button" onClick={() => setStep("account")} className="mt-6 w-full rounded-2xl bg-[#f3e4b8] px-4 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">
            Find Your Backroads
          </button>
        </section>
      ) : null}

      {step === "account" ? (
        <section className="relative min-h-screen px-4 pb-8 pt-6">
          <button type="button" onClick={() => setStep("welcome")} className="mb-3 text-xs uppercase tracking-[0.15em] text-[#f4e8c4]/75">Back</button>
          <div className="rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4">
            <h2 className="text-2xl font-semibold">Create account</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => continueWithProvider("apple")} className="rounded-xl border border-[#f4e8c4]/20 bg-[#f4e8c4]/10 py-3 text-sm">Apple</button>
              <button type="button" onClick={() => continueWithProvider("google")} className="rounded-xl border border-[#f4e8c4]/20 bg-[#f4e8c4]/10 py-3 text-sm">Google</button>
            </div>
            <form onSubmit={handleCreateAccount} className="mt-4 space-y-3">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] px-3 py-3 text-sm" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] px-3 py-3 text-sm" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] px-3 py-3 text-sm" />
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={allowGuestMode} onChange={(e) => setAllowGuestMode(e.target.checked)} /> Allow guest fallback</label>
              <button type="submit" disabled={isSavingAccount} className="w-full rounded-xl bg-[#f3e4b8] py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">{isSavingAccount ? "Creating..." : "Continue"}</button>
            </form>
          </div>
        </section>
      ) : null}

      {step === "preferences" ? (
        <section className="relative min-h-screen px-4 pb-6 pt-6">
          <button type="button" onClick={() => setStep("account")} className="mb-3 text-xs uppercase tracking-[0.15em] text-[#f4e8c4]/75">Back</button>
          <div className="rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4">
            <h2 className="text-2xl font-semibold">Choose your drive vibe</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {preferenceOptions.map((item) => {
                const selected = preferences.includes(item);
                return (
                  <button key={item} type="button" onClick={() => togglePreference(item)} className={`rounded-full border px-3 py-2 text-xs ${selected ? "border-[#f3e4b8] bg-[#f3e4b8]/25" : "border-[#f4e8c4]/25 bg-[#f4e8c4]/8"}`}>
                    {item}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => setStep("navigation")} className="mt-4 w-full rounded-xl bg-[#f3e4b8] py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">
              Go to navigation
            </button>
          </div>
        </section>
      ) : null}

      {step === "navigation" ? (
        <section className="relative min-h-screen px-4 pb-6 pt-6">
          <div className="rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f3e4b8]/80">Adventure Route</p>
            <h2 className="mt-2 text-2xl font-semibold">Where to next?</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-[#f4e8c4]/30 bg-[#f4e8c4]/10 px-3 py-1">{sunPhase}</span>
              <span className="rounded-full border border-[#f4e8c4]/30 bg-[#f4e8c4]/10 px-3 py-1">{weatherLabel}</span>
              <button type="button" onClick={() => setWanderMode((c) => !c)} className="rounded-full border border-[#f4e8c4]/30 bg-[#f4e8c4]/10 px-3 py-1">Wander: {wanderMode ? "On" : "Off"}</button>
            </div>
          </div>

          <div className="mt-3 flex gap-2 text-xs">
            {(["planner", "toolkit", "social", "recap"] as NavTab[]).map((item) => (
              <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-full border px-3 py-2 uppercase ${tab === item ? "border-[#f3e4b8] bg-[#f3e4b8]/25" : "border-[#f4e8c4]/25 bg-[#f4e8c4]/8"}`}>
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-[#f4e8c4]/20">
            <iframe title="Backroads Map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full" />
          </div>

          {tab === "planner" ? (
            <div className="mt-4 space-y-3 rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4">
              <textarea value={guidePrompt} onChange={(e) => setGuidePrompt(e.target.value)} className="h-20 w-full rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] px-3 py-2 text-sm" />
              <button type="button" onClick={handleGuidePlan} className="w-full rounded-xl bg-[#f3e4b8] py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">
                Run intelligence model
              </button>
              {guidePlan ? (
                <div className="rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] p-3 text-sm">
                  <p className="font-semibold">{guidePlan.headline}</p>
                  <p className="text-xs text-[#f8f2dd]/80">Tone: {guidePlan.tone}</p>
                  <ul className="mt-2 space-y-1 text-xs">
                    {guidePlan.stops.map((stop) => (
                      <li key={stop.name}>{stop.name}: {stop.reason}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {tab === "toolkit" ? (
            <div className="mt-4 space-y-3 rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {scenicStops.map((stop) => (
                  <button key={stop.id} type="button" onClick={() => setSelectedStopId(stop.id)} className={`rounded-xl border p-2 text-left ${selectedStopId === stop.id ? "border-[#f3e4b8] bg-[#f3e4b8]/20" : "border-[#f4e8c4]/20 bg-[#f4e8c4]/8"}`}>
                    <p className="font-semibold">{stop.name}</p>
                    <p>{stop.note}</p>
                  </button>
                ))}
              </div>
              <form onSubmit={handleStartDrive} className="space-y-2">
                <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Starting point" className="w-full rounded-lg border border-[#f4e8c4]/20 bg-[#1f2f21] px-2 py-2" />
                <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" className="w-full rounded-lg border border-[#f4e8c4]/20 bg-[#1f2f21] px-2 py-2" />
                <input value={distanceMiles} onChange={(e) => setDistanceMiles(e.target.value)} placeholder="Distance miles" className="w-full rounded-lg border border-[#f4e8c4]/20 bg-[#1f2f21] px-2 py-2" />
                <textarea value={tripNote} onChange={(e) => setTripNote(e.target.value)} placeholder="Trip note" className="h-16 w-full rounded-lg border border-[#f4e8c4]/20 bg-[#1f2f21] px-2 py-2" />
                <button type="submit" disabled={isSavingTrip} className="w-full rounded-xl bg-[#f3e4b8] py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">{isSavingTrip ? "Saving..." : "Save drive"}</button>
                <button type="button" onClick={handleShareDrive} className="w-full rounded-xl border border-[#f4e8c4]/30 bg-[#f4e8c4]/10 py-3 uppercase">Share to community</button>
              </form>
              {discover ? (
                <div className="grid grid-cols-2 gap-2">
                  {[...discover.campsites, ...discover.gas, ...discover.coffee, ...discover.icecream].map((item) => (
                    <div key={`${item.name}-${item.etaMinutes}`} className="rounded-lg border border-[#f4e8c4]/20 bg-[#1f2f21] p-2">
                      <p className="font-semibold">{item.name}</p>
                      <p>{item.note}</p>
                      <p>{item.etaMinutes} min away</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {tab === "social" ? (
            <div className="mt-4 space-y-3 rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4 text-xs">
              {feed.map((post) => (
                <article key={post.id} className="rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] p-3">
                  <p className="font-semibold">{post.author}: {post.title}</p>
                  <p className="mt-1">{post.summary}</p>
                  <p className="mt-1 text-[#f8f2dd]/80">Start: {post.obfuscatedStart} | End: {post.obfuscatedEnd}</p>
                  <p className="text-[#f8f2dd]/80">Safety buffer: {post.safetyRadiusMiles} miles</p>
                  <div className="mt-2 space-y-1">
                    {post.comments.map((comment) => (
                      <p key={comment.id}><span className="font-semibold">{comment.author}:</span> {comment.body}</p>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input value={commentDraft[post.id] || ""} onChange={(e) => setCommentDraft((c) => ({ ...c, [post.id]: e.target.value }))} placeholder="Comment..." className="flex-1 rounded-lg border border-[#f4e8c4]/20 bg-[#223525] px-2 py-1" />
                    <button type="button" onClick={() => void handlePostComment(post.id)} className="rounded-lg border border-[#f4e8c4]/30 bg-[#f4e8c4]/10 px-2">Post</button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {tab === "recap" ? (
            <div className="mt-4 space-y-3 rounded-3xl border border-[#f4e8c4]/20 bg-[#2b3f2d]/75 p-4 text-xs">
              <button type="button" onClick={() => void loadRecap()} className="w-full rounded-xl bg-[#f3e4b8] py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#243622]">
                Load year recap
              </button>
              {recap ? (
                <div className="rounded-xl border border-[#f4e8c4]/20 bg-[#1f2f21] p-3">
                  <p className="font-semibold">{recap.year} Recap</p>
                  <p>{recap.totalTrips} drives</p>
                  <p>{recap.totalMiles} miles tracked</p>
                  <ul className="mt-2 space-y-1">
                    {recap.topVibes.map((vibe) => (
                      <li key={vibe.name}>{vibe.name}: {vibe.count}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {status ? <p className="relative px-4 pb-1 text-sm text-[#e0f5c8]">{status}</p> : null}
      {error ? <p className="relative px-4 pb-2 text-sm text-[#ffd4ca]">{error}</p> : null}

      <div className="relative mt-auto px-4 pb-4 text-center text-xs text-[#f8f2dd]/70">
        <Link href="/" className="underline underline-offset-4">Return home</Link>
      </div>
    </main>
  );
}
