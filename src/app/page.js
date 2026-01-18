// app/page.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
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
            <Link
              href="/AdamHenryResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
            >
              Resume (pdf)
            </Link>
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
    </div>
  );
}
