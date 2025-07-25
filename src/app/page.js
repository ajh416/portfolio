'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Head from 'next/head'
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		const phrases = [
			"I'm a CS graduate passionate about graphics and imaging.",
			"I enjoy playing with shaders and ray tracing.",
			"I am actively seeking a job in the graphics or imaging field.",
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
				setTimeout(type, 100);
			} else if (isDeleting && charIndex > 1) {
				charIndex--;
				setTimeout(type, 50);
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
				<div className={styles.card}>
						<img src="images/EDA_UI.png" alt="A high-performance graphical interface to assist OSU researchers with image/material analysis." className={styles.cardImage} />
						<div className={styles.cardHeader}>
							<h3>Enhancing Deformation Analysis UI</h3>
							<Link href="https://github.com/OSU-Enhancing-Deformation-Analysis/EnhancingDeformationAnalysisUI" target="_blank" className={styles.button}>View</Link>
						</div>
						<p>A high-performance desktop graphical interface to assist OSU researchers with image/material analysis.</p>
					</div>
					<div className={styles.card}>
						<img src="images/wildfire-map.png" alt="Image of wildfire-map.com, displaying a map of current wildfires" className={styles.cardImage} />
						<div className={styles.cardHeader}>
							<h3>Wildfire Map</h3>
							<Link href="https://wildfire-map.com" target="_blank" className={styles.button}>View</Link>
						</div>
						<p>Displaying wildfire locations and information on an interactive map!</p>
					</div>
					<div className={styles.card}>
						<img src="images/raytracer.png" alt="A ray-traced image featuring multiple objects and light" className={styles.cardImage} />
						<div className={styles.cardHeader}>
							<h3>Ray/Path Tracer</h3>
							<Link href="https://github.com/ajh416/RayTracer" target="_blank" className={styles.button}>View</Link>
						</div>
						<p>A ray/path tracer created from scratch using well-known ray-object intersection techniques.</p>
					</div>
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
						<p>Programming, gaming, hiking, photography, and I've been learning about radio/rf stuff.</p>
					</div>
					<p className={styles.resumePlug}>Check out my <Link href="/AdamHenryResume.pdf" target="_blank" className={styles.resumebutton}>resume (.pdf)</Link> for all of my information.</p>
				</div>
			</div>
		</div>
	);
}
