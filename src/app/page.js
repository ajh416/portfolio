// app/page.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

function useTypewriter(phrases, { typeMs = 42, deleteMs = 25, holdMs = 1100 } = {}) {
  const [i, setI] = useState(0);      // phrase index
  const [pos, setPos] = useState(0);  // char position in current phrase
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!phrases?.length) return;
    const full = phrases[i] || "";
    const atEnd = pos === full.length;
    const atStart = pos === 0;

    const delay = !del
      ? atEnd ? holdMs : typeMs
      : atStart ? typeMs : deleteMs;

    const id = setTimeout(() => {
      if (!del) {
        if (!atEnd) setPos(pos + 1);
        else setDel(true);
      } else {
        if (!atStart) setPos(pos - 1);
        else { setDel(false); setI((i + 1) % phrases.length); }
      }
    }, delay);

    return () => clearTimeout(id);
  }, [phrases, i, pos, del, typeMs, deleteMs, holdMs]);

  const full = phrases?.[i] || "";
  const text = pos === 0 ? "\u00A0" : full.slice(0, pos); // never visually empty
  return text;
}

export default function Home() {
  const [openCard, setOpenCard] = useState(null);
  const toggleCard = useCallback(
    (i) => setOpenCard((v) => (v === i ? null : i)),
    []
  );

  const phrases = useMemo(
    () => [
      'Software engineer focused on imaging, graphics, and full-stack web.',
      'Shipped ml imaging tooling, a production wildfire map, and a realtime ray/path tracer.'
    ],
    []
  );

  const projects = [
    {
      title: 'Enhancing Deformation Analysis capstone',
      image: '/images/EDA_UI.png',
      link: 'https://github.com/OSU-Enhancing-Deformation-Analysis/EnhancingDeformationAnalysisUI',
      summary:
        'c++ desktop ui for ml-assisted sem imaging and stress analysis used by researchers.',
      details: [
        'trained models on 10k+ sem images of graphite for stress analysis',
        'c++ + imgui ui; opencv tooling for filtering and measurement',
        'ci/cd via github actions for automated build and release'
      ]
    },
    {
      title: 'Wildfire Map',
      image: '/images/wildfire-map.png',
      link: 'https://wildfire-map.com',
      summary:
        'full-stack app visualizing wildfire locations and satellite heat points.',
      details: [
        'react + leaflet frontend, node.js backend',
        'deployed on digitalocean with nginx reverse proxy',
        'data ingestion from public agency endpoints'
      ]
    },
    {
      title: 'Ray/Path Tracer',
      image: '/images/raytracer.png',
      link: 'https://github.com/ajh416/RayTracer',
      summary:
        'cpu/gpu renderer with bvh, reflections, refractions, and gi at interactive framerates.',
      details: [
        '60+ fps rendering on >1000 triangles depending on scene',
        'imgui controls for runtime parameter tweaks',
        'parallelism and acceleration structures for perf'
      ]
    },
    {
      title: 'This Website',
      image: '/images/portfolio.png',
      link: 'https://github.com/ajh416/portfolio',
      summary:
        'next.js portfolio with ci/cd and a responsive project grid.',
      details: [
        'github actions for deploy automation',
        'accessible, keyboard-navigable project cards',
        'simple analytics-ready cta structure'
      ]
    }
  ];

  const text = useTypewriter(phrases)
  return (
    <div className={styles.body}>
      <div className={styles.container}>

        {/* hero */}
        <section className={styles.introSection} aria-label="hero">
          <h1 className={styles.title}>Adam Henry</h1>
          <p className={styles.intro} aria-live="polite">
            {text}
          </p>

          {/* ctas */}
          <div className={styles.ctaRow}>
            <Link href="mailto:adamhenry416@gmail.com" className={styles.button}>
              Email Me
            </Link>
            <Link
              href="/AdamHenryResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              Download Resume (pdf)
            </Link>
            <Link
              href="https://github.com/ajh416"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              GitHub
            </Link>
          </div>

          {/* quick facts */}
          <ul className={styles.quickFacts} aria-label="quick facts">
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
        </section>

        {/* projects */}
        <h1 className={styles.title}>Stuff I've Made</h1>
        <div className={styles.cardGrid}>
          {projects.map((proj, idx) => (
            <div
              key={proj.title}
              className={styles.card}
              role="button"
              tabIndex={0}
              aria-expanded={openCard === idx}
              onClick={() => toggleCard(idx)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleCard(idx);
                }
              }}
            >
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

              <div className={styles.cardHeader}>
                <h3>{proj.title}</h3>
                <Link href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.button}>
                  view
                </Link>
              </div>

              <p className={styles.cardSummary}>{proj.summary}</p>

              <div className={`${styles.cardDetails} ${openCard === idx ? styles.cardDetailsOpen : ''}`}>
                <ul className={styles.detailsList}>
                  {proj.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* about / resume mirror */}
        <div className={styles.resumeSection}>
          <h2 className={styles.resumeTitle}>About Me</h2>
          <div className={styles.resumeContent}>
            <h3>Experience</h3>
            <p><strong>Capstone — Imaging / AI</strong> • Oregon State University • 2024-2025</p>
            <ul className={styles.skillsList}>
              <li>Trained models on 10k+ sem images for stress analysis</li>
              <li>Built c++/imgui desktop ui with opencv image tooling</li>
              <li>Set up github actions ci/cd for automated build and release</li>
              <li>Researched imaging techniques for crack detection</li>
            </ul>

            <h3>Projects</h3>
            <ul className={styles.skillsList}>
              <li><strong>Wildfire Map</strong> — js, html, css, node.js, leaflet; deployed with nginx on digitalocean</li>
              <li><strong>Flashcard Web App</strong> — next.js + typescript hackathon project with ai card generation and google oauth</li>
              <li><strong>Ray/Path Tracer</strong> — c++ renderer with bvh; 60+ fps on 1000 triangles; imgui controls</li>
            </ul>

            <h3>Skills</h3>
            <ul className={styles.skillsList}>
              <li><strong>Languages:</strong> c/c++, c#, python, javascript/typescript, java, sql, html/css</li>
              <li><strong>Frameworks:</strong> react, next.js, node.js</li>
              <li><strong>Developer tools:</strong> git, docker, github actions (ci/cd), gcp, aws, linux, vs code, visual studio</li>
              <li><strong>Libraries & APIs:</strong> opencv, imgui, numpy, pandas, matplotlib, pytorch, tensorflow, rest apis</li>
            </ul>

            <h3>Education</h3>
            <p>Oregon State University — B.S. Computer Science, Graduated June 2025</p>
          </div>

          <p className={styles.resumePlug}>
            check out my{' '}
            <Link href="/AdamHenryResume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumebutton}>
              resume (.pdf)
            </Link>{' '}
            and{' '}
            <Link href="https://github.com/ajh416" target="_blank" rel="noopener noreferrer" className={styles.resumebutton}>
              github
            </Link>{' '}
            for more information.
          </p>
        </div>
      </div>
    </div>
  );
}
