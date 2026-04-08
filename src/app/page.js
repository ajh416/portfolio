// app/page.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Home() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const projects = [
    {
      title: 'Enhancing Deformation Analysis capstone',
      image: '/images/EDA_UI.png',
      link: 'https://github.com/OSU-Enhancing-Deformation-Analysis/EnhancingDeformationAnalysisUI',
      summary:
        'c++ desktop ui for ml-assisted sem imaging and stress analysis used by researchers.'
    },
    {
      title: 'Wildfire Map',
      image: '/images/wildfire-map.png',
      link: 'https://wildfire-map.com',
      summary:
        'full-stack app visualizing wildfire locations and satellite heat points.'
    },
    {
      title: 'Ray/Path Tracer',
      image: '/images/raytracer.png',
      link: 'https://github.com/ajh416/RayTracer',
      summary:
        'cpu/gpu renderer with bvh, reflections, refractions, and gi at interactive framerates.'
    },
    {
      title: 'This Website',
      image: '/images/portfolio.png',
      link: 'https://github.com/ajh416/portfolio',
      summary:
        'next.js portfolio with ci/cd and a distinctive design'
    }
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h1 className={styles.name}>Adam Henry</h1>
          <p className={styles.tagline}>
            Software engineer focused on imaging, graphics, and full-stack web.
          </p>

          <ul className={styles.quickFacts}>
            <li className={styles.quickFact}>
              <span className={styles.qfLabel}>Degree</span>
              <span className={styles.qfValue}>B.S. Computer Science, Oregon State, June 2025</span>
            </li>
            <li className={styles.quickFact}>
              <span className={styles.qfLabel}>Focus</span>
              <span className={styles.qfValue}>C/C++ & Embedded, OpenCV, Next.js, ML, Imaging</span>
            </li>
            <li className={styles.quickFact}>
              <span className={styles.qfLabel}>Location</span>
              <span className={styles.qfValue}>Bend, OR • Open to Relocation</span>
            </li>
          </ul>

          <div className={styles.ctaColumn}>
            <Link href="mailto:adam@siamang.dev" className={styles.ctaLink}>
              Email Me
            </Link>
            <button
              type="button"
              onClick={() => setShowResumeModal(true)}
              className={styles.ctaLink}
            >
              Resume (pdf)
            </button>
            <Link
              href="https://github.com/ajh416"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
            >
              GitHub
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.cardGrid}>
            {projects.map((proj, idx) => (
              <article key={proj.title} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={proj.image}
                    alt={`${proj.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                    priority={idx < 2}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{proj.title}</h3>
                  <p className={styles.cardSummary}>{proj.summary}</p>
                  <Link
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    View Project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutBlock}>
              <h3>Experience</h3>
              <p><strong>IT Client Services Technician I</strong></p>
              <p className={styles.jobMeta}>Bend-La Pine School District • Nov. 2025 - Present</p>
            </div>

            <div className={styles.aboutBlock}>
              <h3>Skills</h3>
              <ul>
                <li><strong>Languages:</strong> c/c++, c#, python, javascript/typescript, java, sql, html/css</li>
                <li><strong>Frameworks:</strong> react, next.js, node.js</li>
                <li><strong>Developer tools:</strong> git, docker, github actions, gcp, aws, linux</li>
                <li><strong>Libraries:</strong> opencv, imgui, numpy, pandas, pytorch, tensorflow</li>
              </ul>
            </div>

            <div className={styles.aboutBlock}>
              <h3>Education</h3>
              <p>Oregon State University — B.S. Computer Science, Graduated June 2025</p>
            </div>
          </div>
        </section>
      </main>

      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
    </div>
  );
}

function ResumeModal({ onClose }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | verifying | downloading | error
  const [error, setError] = useState('');

  // Render the Turnstile widget once the script + container are ready.
  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;
      const ts = typeof window !== 'undefined' ? window.turnstile : undefined;
      if (!ts || !containerRef.current) {
        setTimeout(tryRender, 100);
        return;
      }
      widgetIdRef.current = ts.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: handleToken,
        'error-callback': () => {
          setStatus('error');
          setError('Challenge failed. Please try again.');
        },
        'expired-callback': () => {
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
        theme: 'dark',
      });
    };
    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc key closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleToken(token) {
    setStatus('verifying');
    setError('');
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const blob = await res.blob();
      setStatus('downloading');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AdamHenryResume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      onClose();
    } catch (err) {
      setStatus('error');
      setError(err?.message || 'Download failed.');
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h2 id="resume-modal-title" className={styles.modalTitle}>
            Quick check before the download
          </h2>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <p className={styles.modalBody}>
          Just confirming you&apos;re a human.
        </p>
        <div ref={containerRef} className={styles.turnstileContainer} />
        {status === 'verifying' && (
          <p className={styles.modalStatus}>Verifying…</p>
        )}
        {status === 'downloading' && (
          <p className={styles.modalStatus}>Starting download…</p>
        )}
        {status === 'error' && (
          <p className={styles.modalError}>{error}</p>
        )}
      </div>
    </div>
  );
}
