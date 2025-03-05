import styles from './page.module.css';
import Link from 'next/link';
import Head from 'next/head'

export default function Home() {
  return (
    <div className={styles.body}>
      <Head>
	<title>Adam Henry</title>
      </Head>
    <div className={styles.container}>
      <h1 className={styles.title}>Hey, I'm Adam Henry</h1>
      <p className={styles.intro}>
        I’m a programmer who builds cool stuff.<br></br>Passionate about cool things like images and machine vision. 
      </p>
      <h1 className={styles.title}>Stuff I've Made</h1>
      <div className={styles.cardGrid}>
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
          <p>Oregon State University - Computer Science, Expected June 2025</p>
          <p>Relevant Courses: Data Structures (CS261), Computer Graphics (CS450), Computer Graphics Shaders (CS457), Web Development (CS290)</p>
          <h3>Skills</h3>
          <ul className={styles.skillsList}>
            <li>C/C++ and OpenGL</li>
            <li>JavaScript, HTML, CSS</li>
            <li>Python and data analysis</li>
          </ul>
          <h3>Hobbies</h3>
          <p>Programming, gaming, hiking, and I've been learning about radio/rf stuff.</p>
        </div>
	<p className={styles.resumePlug}>Check out my <Link href="/resume.pdf" target="_blank" className={styles.resumebutton}>resume (.pdf)</Link> for all of my information.</p>
      </div>
    </div>
    </div>
  );
}
