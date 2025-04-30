import { useSession, signIn, signOut } from "next-auth/react";
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/West Umbria High (1).png"
            alt="West Umbria High Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>ArguMentor</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/learn" className={styles.navLink}>Learn</Link>
          <Link href="/evidence" className={styles.navLink}>Evidence</Link>
          <Link href="/case-selection" className={styles.navLink}>Case Selection</Link>
          <Link href="/forum" className={styles.navLink}>Forum</Link>
          {!session ? (
            <button 
              onClick={() => signIn("google")}
              className={styles.loginButton}
            >
              Login
            </button>
          ) : (
            <button 
              onClick={() => signOut()}
              className={styles.loginButton}
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>

      <div className={styles.jumbotron}>
        <div className={styles.jumbotronContent}>
          <h1 className={styles.primaryMessage}>Master debate skills with ArguMentor!</h1>
          <p className={styles.secondaryMessage}>
            Unlock the Power of Persuasion with ArguMentor! Learn the essentials of policy debate 
            and boost your confidence, critical thinking, and speaking skills—right from the start.
          </p>
          <button className={styles.ctaButton}>
            Sign up for our regular updates!
          </button>
        </div>
      </div>
    </div>
  );
}
