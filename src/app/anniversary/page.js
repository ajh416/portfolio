// app/anniversary/page.jsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

// ---- data: replace with your own ----
const seedMemories = [
  {
    id: "coast-trip",
    date: "2024-03-26",
    title: "coast trip",
    caption: "tillamook, depoe bay, and sea lion caves.",
    src: "/anniversary/coast-trip.jpg",
    alt: "two people hiking at sunset",
  },
  {
    id: "tulip-festival",
    date: "2025-04-13",
    title: "tulip festival",
    caption: "exploring the colorful fields of woodburn, with you.",
    src: "/anniversary/tulip-festival.jpg",
    alt: "tulip fields in bloom",
  },
  {
    id: "japanese-garden",
    date: "2025-05-02",
    title: "japanese garden",
    caption: "japanese garden with spring greenery.",
    src: "/anniversary/japanese-garden.jpg",
    alt: "japanese garden with spring greenery",
  },
  {
    id: "sf-trip",
    date: "2025-10-18",
    title: "san francisco",
    caption: "fog, cable cars, and 10k steps. worth.",
    src: "/anniversary/sf.jpg",
    alt: "city street with cable car",
  },
];

function daysSince(isoStart) {
  const start = new Date(isoStart);
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

export default function AnniversaryPage() {
  const startDateISO = "2024-11-02"; // <- your anniversary start date
  const days = useMemo(() => daysSince(startDateISO), [startDateISO]);
  const memories = useMemo(
    () =>
      [...seedMemories].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    []
  );

  const [active, setActive] = useState(null);

  return (
    <main className="site">
      <header className="hero">
        <h1>1 year of us <span aria-hidden>💕</span></h1>
        <p>
          since{" "}
          {new Date(startDateISO).toLocaleDateString(undefined, {
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
                    priority
                  />
                </button>
                <div className="meta">
                  <h3>{m.title}</h3>
                  <time>
                    {new Date(m.date).toLocaleDateString(undefined, {
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

      <footer className="foot">
        <p>built by adam • hosted on siamang.dev</p>
      </footer>

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

      <style jsx>{`
        :root {
          --bg: #faf7f8;
          --fg: #1f2328;
          --muted: #6b7280;
          --accent: #e56d8a;
          --card: #ffffff;
          --ring: rgba(0, 0, 0, 0.06);
        }
        * { box-sizing: border-box; }
        html, body, .site { height: 100%; }
        body { margin: 0; color: var(--fg); background: var(--bg); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; }
        .site { display: flex; flex-direction: column; min-height: 100vh; }

        .hero {
          max-width: 52rem;
          margin: 0 auto;
          padding: 4rem 1.25rem 1rem;
          text-align: left;
        }
        .hero h1 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.015em;
        }
        .hero p {
          margin: 0.5rem 0 0;
          color: var(--muted);
          font-size: 1rem;
        }

        .timeline {
          max-width: 64rem;
          margin: 0 auto;
          padding: 1rem 1.25rem 4rem;
          position: relative;
        }
        .timeline ol { list-style: none; padding: 0; margin: 0; }
        .timeline::before {
          content: "";
          position: absolute;
          left: 1.25rem;
          top: 0.5rem;
          bottom: 2rem;
          width: 2px;
          background: linear-gradient(180deg, #f7cad4, #f2a9ba);
          opacity: 0.7;
        }
        .item { position: relative; margin: 0 0 2rem 0; padding-left: 2.5rem; }
        .dot {
          position: absolute; left: 0.95rem; top: 0.4rem;
          width: 14px; height: 14px; border-radius: 999px; background: var(--accent);
          box-shadow: 0 0 0 4px #fff, 0 0 0 6px rgba(229, 109, 138, 0.25);
        }

        .card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          background: var(--card);
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 6px 24px var(--ring);
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
        }
        @media (min-width: 720px) {
          .card { grid-template-columns: 420px 1fr; }
        }

        .thumb {
          border: 0; margin: 0; padding: 0; background: transparent; cursor: pointer;
          display: block; width: 100%; overflow: hidden;
        }
        .thumb :global(img) {
          display: block; width: 100%; height: 260px; object-fit: cover; transition: transform 200ms ease;
        }
        .thumb:hover :global(img) { transform: scale(1.015); }

        .meta { padding: 0.75rem 0.9rem 1rem; }
        .meta h3 { margin: 0.1rem 0; font-size: 1.1rem; text-transform: capitalize; }
        .meta time { color: var(--muted); font-size: 0.9rem; }
        .meta p { margin: 0.5rem 0 0; line-height: 1.5; }

        .foot {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 1.25rem 3rem;
          color: var(--muted);
          font-size: 0.9rem;
        }

        /* lightbox */
        .lightbox {
          border: none;
          padding: 0;
          max-width: min(96vw, 1000px);
          width: 96vw;
          background: transparent;
        }
        .lightbox::backdrop { background: rgba(0,0,0,0.6); }
        .lightbox-body {
          position: relative;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.25);
        }
        .close {
          position: absolute; right: 10px; top: 10px;
          border: 0; background: rgba(255,255,255,0.9); border-radius: 999px;
          padding: 6px 9px; cursor: pointer; font-size: 18px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
        .caption { padding: 0.75rem 1rem 1rem; }
        .caption h4 { margin: 0 0 0.25rem; font-size: 1rem; text-transform: capitalize; }
        .caption p { margin: 0; color: var(--muted); font-size: 0.95rem; }
      `}</style>
    </main>
  );
}
