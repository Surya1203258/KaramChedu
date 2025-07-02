import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css';
import Navigation from '../components/Navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleNewsletterSignup = () => {
    router.push('/newsletter-signup');
  };

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.jumbotron}>
        <div className={styles.jumbotronContent}>
          <h1 className={styles.primaryMessage}>Master debate skills with ArguMentor!</h1>
          <p className={styles.secondaryMessage}>
            Unlock the Power of Persuasion with ArguMentor! Learn the essentials of policy debate 
            and boost your confidence, critical thinking, and speaking skills—right from the start.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={handleNewsletterSignup}
          >
            Sign up for our regular updates!
          </button>
        </div>
      </div>
    </div>
  );
}
