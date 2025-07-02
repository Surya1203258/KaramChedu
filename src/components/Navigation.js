import { useSession, signIn, signOut } from "next-auth/react";
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="ArguMentor Logo"
          width={40}
          height={40}
          className={styles.logoImage}
        />
        <span className={styles.logoText}>ArguMentor</span>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <div className={styles.dropdown}>
          <span className={styles.navLink}>Learn</span>
          <div className={styles.dropdownContent}>
            <Link href="/learn/strategy" className={styles.dropdownLink}>Strategy</Link>
            <Link href="/learn/speaking-tips" className={styles.dropdownLink}>Speaking Tips</Link>
            <Link href="/learn/physical-delivery" className={styles.dropdownLink}>Physical Delivery</Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <span className={styles.navLink}>Evidence</span>
          <div className={styles.dropdownContent}>
            <Link href="/evidence/list" className={styles.dropdownLink}>Evidence List</Link>
            <Link href="/evidence/submit" className={styles.dropdownLink}>Submit Evidence</Link>
            <Link href="/evidence/structuring" className={styles.dropdownLink}>Structuring Evidence</Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <span className={styles.navLink}>Case Selection</span>
          <div className={styles.dropdownContent}>
            <Link href="/case-selection/tips-strategies" className={styles.dropdownLink}>Tips and Strategies</Link>
            <Link href="/case-selection/ai-assistant" className={styles.dropdownLink}>AI Case Selection Assistant</Link>
          </div>
        </div>
        <Link href="/community-posts" className={styles.navLink}>Community Posts</Link>
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
  );
} 