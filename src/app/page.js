'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
	const [openCard, setOpenCard] = useState(null);
	const toggleCard = (index) => {
    	// if clicking the already‑open card, close it; otherwise open new
    	setOpenCard(openCard === index ? null : index);
    };
	const projects = [
    {
      title: 'Enhancing Deformation Analysis Capstone Project',
      image: 'images/EDA_UI.png',
      link: 'https://github.com/OSU-Enhancing-Deformation-Analysis/EnhancingDeformationAnalysisUI',
      summary: 'A high-performance desktop graphical interface to assist OSU researchers with image/material analysis.',
      details: 'Tech stack: C++ with ImGui for UI, integrates OpenCV for image processing. I implemented key features including image loading, filtering, and analysis tools, as well as performance optimizations for handling large datasets. We integrated multiple AI models for image cleanup and analysis, improving accuracy and efficiency.',
    },
    {
      title: 'Wildfire Map',
      image: 'images/wildfire-map.png',
      link: 'https://wildfire-map.com',
      summary: 'Displaying wildfire locations and information on an interactive map.',
      details: 'Built with React, Leaflet, and a Node.js backend. Scrapes real-time data from government APIs and renders heatmaps. I handled the full stack, including data fetching, map rendering, and UI design.',
    },
    {
      title: 'Ray/Path Tracer',
      image: 'images/raytracer.png',
      link: 'https://github.com/ajh416/RayTracer',
      summary: 'A ray/path tracer created from scratch using well-known ray-object intersection techniques.',
      details: 'Written in C++ with multithreading and support for reflection, refraction, and global illumination. I implemented BVH acceleration structures to improve performance.',
    },
	{
		title: 'This Website',
		image: 'images/portfolio.png',
		link: 'https://github.com/ajh416/portfolio',
		summary: 'My personal portfolio website built with Next.js and hosted on a DigitalOcean droplet.',
		details: 'Features a responsive design, project showcase, and dynamic typing effect. I designed and developed the entire site, and implemented CI/CD pipelines for seamless updates using GitHub Actions.',
	},
    ];
	useEffect(() => {
		const phrases = [
			"I'm a recent CS graduate passionate about graphics and imaging.",
			"I am actively seeking a job in software development.",
		];
		const intro = document.querySelector(`.${styles.intro}`);
		let index = 0;
		let charIndex = 0;
		let isDeleting = false;

		function type() {
			const currentPhrase = phrases[index];
			intro.textContent = currentPhrase.substring(0, charIndex);
			if (!isDeleting && charIndex < currentPhrase.length) {
				charIndex++;
				setTimeout(type, 75);
			} else if (isDeleting && charIndex > 1) {
				charIndex--;
				setTimeout(type, 40);
			} else {
				isDeleting = !isDeleting;
				if (!isDeleting) index = (index + 1) % phrases.length;
				setTimeout(type, 1000); // Pause before next
			}
		}
		type();
	}, []);

	return (
		<div className={styles.body}>
			<Head>
				<title>Adam Henry</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.introSection}>
					<h1 className={styles.title}>Hey, I'm Adam Henry</h1>
					<p className={styles.intro}></p>
				</div>

				<h1 className={styles.title}>Stuff I've Made</h1>
				<div className={styles.cardGrid}>
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => toggleCard(idx)}
            >
              <Image src={proj.image} alt={`screenshot of ${proj.title}`} className={styles.cardImage} width={100} height={100} />
              <div className={styles.cardHeader}>
                <h3>{proj.title}</h3>
                <Link href={proj.link} target="_blank" className={styles.button}>view</Link>
              </div>
              <p className={styles.cardSummary}>{proj.summary}</p>
              {/* details section that expands on hover (desktop) or when clicked (mobile) */}
              <div className={`${styles.cardDetails} ${openCard === idx ? styles.cardDetailsOpen : ''}`}>
                <p>{proj.details}</p>
              </div>
            </div>
          ))}
        </div>
				<div className={styles.resumeSection}>
					<h2 className={styles.resumeTitle}>About Me</h2>
					<div className={styles.resumeContent}>
						<h3>Education</h3>
						<p>Oregon State University - B.S. Computer Science, Graduated June 2025</p>
						<p>Relevant Courses: Computer Graphics (CS450), Computer Graphics Shaders (CS457), Web Development (CS290)</p>
						<h3>Skills</h3>
						<ul className={styles.skillsList}>
							<li>C/C++, OpenGL, and Image Analysis</li>
							<li>Git and GitHub</li>
							<li>JavaScript, HTML, CSS</li>
							<li>Python and data analysis</li>
						</ul>
						<h3>Hobbies</h3>
						<p>Programming, gaming, hiking, photography (aviation/wildlife), and I've been learning about radio/rf stuff.</p>
					</div>
					<p className={styles.resumePlug}>Check out my <Link href="/AdamHenryResume.pdf" target="_blank" className={styles.resumebutton}>resume (.pdf)</Link> and <Link href="https://github.com/ajh416" target="_blank" className={styles.resumebutton}>GitHub</Link> for more information.</p>
				</div>
			</div>
		</div>
	);
}
