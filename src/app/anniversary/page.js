// app/anniversary/page.jsx
"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

// ==== config ====
const PASS_HASH = "e4ad93ca07acb8d908a3aa41e920ea4f4ef4f26e7f86cf8291c5db289780a5ae";
const STORAGE_KEY = "anniv-pass-ok-v1";

const seedMemories = [
  {
    id: "coast-trip",
    date: "2024-03-25",
    title: "coast trip",
    caption: "tillamook, depoe bay, and sea lion caves.",
    src: "/anniversary/images/coast-trip.JPG",
    alt: "tillamook cheese",
  },
  {
    id: "dinner-date",
    date: "2024-03-28",
    title: "dinner date",
    caption: "our romantic dinner at zydeco.",
    src: "/anniversary/images/dinner-date.JPG",
    alt: "food at zydeco",
  },
  {
    id: "tulip-festival",
    date: "2025-04-12",
    title: "tulip festival",
    caption: "exploring the colorful fields of woodburn, with my love.",
    src: "/anniversary/images/tulip-festival.JPG",
    alt: "tulip fields in bloom",
  },
  {
    id: "japanese-garden",
    date: "2025-05-01",
    title: "japanese garden",
    caption: "us in the japanese garden, springtime greenery all around.",
    src: "/anniversary/images/japanese-garden.jpg",
    alt: "japanese garden with spring greenery",
  },
  {
    id: "my-graduation",
    date: "2025-06-14",
    title: "my graduation",
    caption: "celebrating my graduation day.",
    src: "/anniversary/images/my-graduation.jpg",
    alt: "my graduation day",
  },
  {
    id: "kas-streets",
    date: "2025-06-23",
    title: "Kas streets",
    caption: "exploring the beautiful streets of Kas with my beauty.",
    src: "/anniversary/images/kas-streets.jpg",
    alt: "Kas streets",
  },
  {
    id: "hot-air-balloon-ride",
    date: "2025-06-24",
    title: "hot air balloon ride in Turkey",
    caption: "in the air with you, over Pamukkale.",
    src: "/anniversary/images/hot-air-balloon-ride.JPG",
    alt: "hot air balloon ride",
  },
  {
    id: "working-from-bend",
    date: "2025-07-02",
    title: "working while visiting me in Bend",
    caption: "annoying each other while trying to work...",
    src: "/anniversary/images/working-from-bend.JPG",
    alt: "working from bend",
  },
  {
    id: "sparks-lake",
    date: "2025-07-27",
    title: "Sparks lake",
    caption: "Sparks lake with stunning views of my bebe",
    src: "/anniversary/images/sparks-lake.JPG",
    alt: "Sparks lake with stunning reflections",
  },
  {
    id: "sf-palace",
    date: "2025-10-18",
    title: "palace of fine arts",
    caption: "so much walking and exploring san francisco with you.",
    src: "/anniversary/images/sf-palace.JPG",
    alt: "us, inside the palace of fine arts",
  },
  {
    id: "sf-kiss",
    date: "2025-10-18",
    title: "golden gate park kiss",
    caption: "a perfect moment in the park!",
    src: "/anniversary/images/sf-kiss.JPG",
    alt: "us, inside golden gate park",
  },
];

// ===== date utils: parse as LOCAL, not utc =====
function parseLocalISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight
}
function fmtLocal(iso, opts) {
  return parseLocalISO(iso).toLocaleDateString(undefined, opts);
}
function daysSinceLocal(isoStart) {
  const s = parseLocalISO(isoStart);
  const n = new Date();
  // compare at local noon to dodge dst edges
  const sNoon = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 12);
  const nNoon = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12);
  return Math.round((nNoon - sNoon) / 86400000);
}

// sha-256(text) -> hex
async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const arr = Array.from(new Uint8Array(buf));
  return arr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function AnniversaryPage() {
  const startDateISO = "2024-11-01";
  const days = useMemo(() => daysSinceLocal(startDateISO), [startDateISO]);

  const memories = useMemo(
    () =>
      [...seedMemories].sort(
        (a, b) => parseLocalISO(a.date).getTime() - parseLocalISO(b.date).getTime()
      ),
    []
  );

  // gate state
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);

  // lightbox
  const [active, setActive] = useState(null);

  // read persisted auth
  useEffect(() => {
    try {
      setOk(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
    setChecking(false);
  }, []);

  async function handleTryPass(pass) {
    const hash = await sha256Hex(pass);
    if (hash === PASS_HASH) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setOk(true);
      return true;
    }
    console.log("bad pass", { pass, hash });
    return false;
  }

  function handleLogout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setOk(false);
    setActive(null);
  }

  if (checking) {
    return (
      <main className="gate">
        <div className="card">
          <p>loading…</p>
        </div>
        <Style />
      </main>
    );
  }

  if (!ok) {
    return <PasscodeGate onPass={handleTryPass} />;
  }

  return (
    <main className="site">
      <header className="hero">
        <h1>
          1 year of us <span aria-hidden>💕</span>
        </h1>
        <p>
          since{" "}
          {fmtLocal(startDateISO, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          — {days} days and counting.
        </p>
      </header>

      <section className="timeline">
        <ol>
          {memories.map((m) => (
            <li key={m.id} className="item">
              <div className="dot" />
              <article className="card">
                <button
                  className="thumb"
                  onClick={() => setActive(m)}
                  aria-label={`open image: ${m.title}`}
                >
                  <Image
                    src={m.src}
                    alt={m.alt ?? m.title}
                    width={800}
                    height={600}
                    sizes="(max-width: 900px) 100vw, 420px"
                  />
                </button>
                <div className="meta">
                  <h3>{m.title}</h3>
                  <time>
                    {fmtLocal(m.date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <p>{m.caption}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* lightbox */}
      <dialog
        open={!!active}
        className="lightbox"
        onClose={() => setActive(null)}
      >
        {active && (
          <div className="lightbox-body">
            <button
              className="close"
              onClick={() => setActive(null)}
              aria-label="close"
            >
              ✕
            </button>
            <Image
              src={active.src}
              alt={active.alt ?? active.title}
              width={1600}
              height={1200}
            />
            <div className="caption">
              <h4>{active.title}</h4>
              <p>{active.caption}</p>
            </div>
          </div>
        )}
      </dialog>

      <Style />
    </main>
  );
}

function PasscodeGate({ onPass }) {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    const ok = await onPass(value);
    if (!ok) setErr("nope. try again.");
  }

  return (
    <main className="gate">
      <div className="card">
        <h1>hi bebe 💌</h1>
        <p>enter something we said 6 months ago</p>
        <form onSubmit={submit} className="row">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="passcode"
            autoFocus
            aria-label="passcode"
          />
          <button type="submit">unlock</button>
        </form>
        {err && <p className="err">{err}</p>}
      </div>
      <Style />
    </main>
  );
}

function Style() {
  return (
    <style jsx global>{`
      :root {
        --bg: #faf7f8;
        --fg: #1f2328;
        --muted: #6b7280;
        --accent: #e56d8a;
        --card: #ffffff;
        --ring: rgba(0, 0, 0, 0.06);
      }
      * { box-sizing: border-box; }
      html, body { height: 100%; margin: 0; }
      body { color: var(--fg); background: var(--bg); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"; }
      .site { min-height: 100vh; display: flex; flex-direction: column; }
      .hero { max-width: 52rem; margin: 0 auto; padding: 4rem 1.25rem 1rem; position: relative; }
      .hero h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.015em; }
      .hero p { margin: 0.5rem 0 0; color: var(--muted); }
      .ghost { position: absolute; right: 1.25rem; top: 1.5rem; font: inherit; background: transparent; border: 1px solid rgba(0,0,0,.1); padding: .35rem .6rem; border-radius: 10px; cursor: pointer; }

      .timeline { max-width: 64rem; margin: 0 auto; padding: 1rem 1.25rem 4rem; position: relative; }
      .timeline::before { content: ""; position: absolute; left: 1.25rem; top: 0.5rem; bottom: 2rem; width: 2px; background: linear-gradient(180deg, #f7cad4, #f2a9ba); opacity: 0.7; }
      .timeline ol { list-style: none; margin: 0; padding: 0; }
      .item { position: relative; margin: 0 0 2rem; padding-left: 2.5rem; }
      .dot { position: absolute; left: 0.95rem; top: 0.4rem; width: 14px; height: 14px; border-radius: 999px; background: var(--accent); box-shadow: 0 0 0 4px #fff, 0 0 0 6px rgba(229,109,138,.25); }
      .card { display: grid; grid-template-columns: 1fr; gap: .75rem; background: var(--card); border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 6px 24px var(--ring); overflow: hidden; border: 1px solid rgba(0,0,0,.06); }
      @media (min-width: 720px) { .card { grid-template-columns: 420px 1fr; } }
      .thumb { border: 0; padding: 0; background: transparent; cursor: pointer; width: 100%; overflow: hidden; }
      .thumb img { display: block !important; width: 100%; height: 260px; object-fit: cover; transition: transform 200ms ease; }
      .thumb:hover img { transform: scale(1.015); }
      .meta { padding: .75rem .9rem 1rem; }
      .meta h3 { margin: .1rem 0; font-size: 1.1rem; text-transform: capitalize; }
      .meta time { color: var(--muted); font-size: .9rem; }
      .meta p { margin: .5rem 0 0; line-height: 1.5; }
      .foot { max-width: 52rem; margin: 0 auto; padding: 0 1.25rem 3rem; color: var(--muted); font-size: .9rem; }

      /* dialog */
      .lightbox { border: none; padding: 0; max-width: min(96vw, 1000px); width: 96vw; background: transparent; }
      .lightbox::backdrop { background: rgba(0,0,0,.6); }
      .lightbox-body { position: relative; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,.25); }
      .close { position: absolute; right: 10px; top: 10px; border: 0; background: rgba(255,255,255,.9); border-radius: 999px; padding: 6px 9px; cursor: pointer; font-size: 18px; box-shadow: 0 1px 2px rgba(0,0,0,.15); }
      .caption { padding: .75rem 1rem 1rem; }
      .caption h4 { margin: 0 0 .25rem; font-size: 1rem; text-transform: capitalize; }
      .caption p { margin: 0; color: var(--muted); font-size: .95rem; }

      /* gate */
      .gate { min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--fg); }
      .gate .card { width: min(92vw, 620px); background: #fff; padding: 1.25rem; border-radius: 16px; border: 1px solid rgba(0,0,0,.06); box-shadow: 0 8px 30px rgba(0,0,0,.07); text-align: center; }
      .gate h1 { margin: .25rem 0 .5rem; }
      .gate .row { display: flex; gap: .5rem; margin-top: .75rem; }
      .gate input { flex: 1; padding: .6rem .75rem; border-radius: 10px; border: 1px solid rgba(0,0,0,.15); font: inherit; }
      .gate button { padding: .6rem .9rem; border-radius: 10px; border: 1px solid rgba(0,0,0,.1); background: #fff; cursor: pointer; }
      .gate .err { color: #b91c1c; margin-top: .5rem; }
      .gate .muted { color: var(--muted); margin-top: .5rem; font-size: .9rem; }
    `}</style>
  );
}
