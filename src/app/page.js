'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const experience = [
  {
    role: 'IT Client Services Technician I',
    organization: 'Bend-La Pine Schools',
    location: 'Bend, OR',
    dates: 'November 2025 - Present',
    details: [
      'Provide technical support for 1,500 users across macOS, iPadOS, and Windows; manage device lifecycle through Jamf MDM, including deployment, imaging, and configuration.',
      'Maintain internal documentation and support integrations with Synergy SIS, Canvas LMS, and Google Workspace.',
      'Assist with network maintenance including patch-panel termination.',
    ],
  },
];

const projects = [
  {
    title: 'Enhancing Deformation Analysis UI',
    technologies: 'C++, OpenCV, PyTorch, CMake, CUDA',
    link: 'https://github.com/OSU-Enhancing-Deformation-Analysis/EnhancingDeformationAnalysisUI',
    details: [
      'Architected and authored more than 90% of a cross-platform desktop application for ML-assisted deformation analysis of SEM, TEM, and STEM microscopy image sequences.',
      'Built a real-time image-processing pipeline for stabilization, denoising, crack detection, and strain-map generation using OpenCV and the PyTorch C++ API.',
      'Integrated LibTorch inference with optional CUDA and cuDNN acceleration for GPU processing.',
    ],
  },
  {
    title: 'Ray / Path Tracer',
    technologies: 'C++, ImGui, GLFW, GLSL',
    link: 'https://github.com/ajh416/RayTracer',
    details: [
      'Built a CPU/GPU ray- and path-tracing renderer in C++ with real-time interactive controls through ImGui.',
      'Sustains 60+ FPS while rendering 1,000+ triangles using BVH acceleration and GLSL compute shaders for GPU path tracing.',
    ],
  },
  {
    title: 'Wildfire Map',
    technologies: 'JavaScript, React, Node.js, HTML/CSS',
    link: 'https://wildfire-map.com',
    details: [
      'Built a full-stack web application that visualizes live wildfire data, including satellite-detected heat points.',
      'Deployed on DigitalOcean through nginx and integrated external geospatial APIs for real-time data ingestion.',
    ],
  },
];

const skills = [
  ['Languages', 'C/C++, Python, JavaScript/TypeScript, SQL, HTML/CSS'],
  ['Libraries & frameworks', 'OpenCV, LibTorch/PyTorch, ONNX Runtime, ImGui, NumPy, React, Next.js, Node.js'],
  ['Developer tools', 'Git, CMake, Docker, GitHub Actions (CI/CD), Linux, AWS, GCP'],
  ['Other', 'CUDA/cuDNN, REST APIs, nginx, PostgreSQL, Jamf, Cisco networking'],
];

export default function Home() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const activeTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(activeTheme);

    const followSystemTheme = (event) => {
      if (localStorage.getItem('theme')) return;
      const nextTheme = event.matches ? 'dark' : 'light';
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    media.addEventListener('change', followSystemTheme);
    return () => media.removeEventListener('change', followSystemTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  return (
    <main className={styles.page}>
      <article className={styles.resume}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.name}>Adam Henry</h1>
            <p className={styles.role}>Software Engineer</p>
          </div>

          <div className={styles.contact} aria-label="Contact information">
            <Link href="mailto:adam@siamang.dev">adam@siamang.dev</Link>
            <span aria-hidden="true">/</span>
            <Link href="https://github.com/ajh416" target="_blank" rel="noopener noreferrer">
              github.com/ajh416
            </Link>
            <span aria-hidden="true">/</span>
            <span>Bend, Oregon</span>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.headerAction}
              onClick={() => setShowResumeModal(true)}
            >
              View PDF résumé
            </button>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="profile-heading">
          <h2 id="profile-heading" className={styles.sectionTitle}>Profile</h2>
          <p className={styles.profile}>
            Software engineer with a B.S. in Computer Science from Oregon State University.
            Experienced in C++ and Python, with shipped projects spanning GPU-accelerated image
            processing, real-time rendering, and full-stack web development. Currently supporting
            end-user systems for a public school district.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="experience-heading">
          <h2 id="experience-heading" className={styles.sectionTitle}>Experience</h2>
          {experience.map((job) => (
            <div className={styles.entry} key={`${job.organization}-${job.role}`}>
              <div className={styles.entryHeader}>
                <div>
                  <h3>{job.role}</h3>
                  <p className={styles.organization}>{job.organization} · {job.location}</p>
                </div>
                <p className={styles.dates}>{job.dates}</p>
              </div>
              <ul className={styles.details}>
                {job.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <h2 id="projects-heading" className={styles.sectionTitle}>Selected Projects</h2>
          <div className={styles.projectList}>
            {projects.map((project) => (
              <div className={styles.entry} key={project.title}>
                <div className={styles.projectHeading}>
                  <h3>
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </Link>
                  </h3>
                  <p className={styles.technologies}>{project.technologies}</p>
                </div>
                <ul className={styles.details}>
                  {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="education-heading">
          <h2 id="education-heading" className={styles.sectionTitle}>Education</h2>
          <div className={styles.entryHeader}>
            <div>
              <h3>Oregon State University</h3>
              <p className={styles.organization}>Bachelor of Science in Computer Science</p>
            </div>
            <div className={styles.educationMeta}>
              <p>Corvallis, OR</p>
              <p>September 2021 - June 2025</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.skillsSection}`} aria-labelledby="skills-heading">
          <h2 id="skills-heading" className={styles.sectionTitle}>Technical Skills</h2>
          <dl className={styles.skills}>
            {skills.map(([label, value]) => (
              <div className={styles.skillRow} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerIdentity}>
            <span>Adam Henry · Software Engineer</span>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={styles.footerTheme}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
          <Link href="mailto:adam@siamang.dev">Get in touch</Link>
        </footer>
      </article>

      {showResumeModal && (
        <ResumeModal theme={theme} onClose={() => setShowResumeModal(false)} />
      )}
    </main>
  );
}

function ResumeModal({ theme, onClose }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;
      const turnstile = typeof window !== 'undefined' ? window.turnstile : undefined;
      if (!turnstile || !containerRef.current) {
        setTimeout(tryRender, 100);
        return;
      }
      widgetIdRef.current = turnstile.render(containerRef.current, {
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
        theme,
      });
    };
    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && typeof window !== 'undefined' && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // The widget may already have cleaned itself up.
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleToken(token) {
    setStatus('verifying');
    setError('');
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const blob = await response.blob();
      setStatus('downloading');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
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
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h2 id="resume-modal-title" className={styles.modalTitle}>One quick check</h2>
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className={styles.modalBody}>Confirm you&apos;re human to open the PDF résumé.</p>
        <div ref={containerRef} className={styles.turnstileContainer} />
        {status === 'verifying' && <p className={styles.modalStatus}>Verifying…</p>}
        {status === 'downloading' && <p className={styles.modalStatus}>Opening résumé…</p>}
        {status === 'error' && <p className={styles.modalError}>{error}</p>}
      </div>
    </div>
  );
}
