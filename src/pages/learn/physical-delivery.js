import { useSession } from "next-auth/react";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';

export default function PhysicalDelivery() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Body Language</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🧍</div>
              <h2>Posture</h2>
              <ul>
                <li>Stand tall with shoulders back</li>
                <li>Keep feet shoulder-width apart</li>
                <li>Maintain balanced weight distribution</li>
                <li>Avoid slouching or leaning</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🚶</div>
              <h2>Movement</h2>
              <ul>
                <li>Use purposeful steps</li>
                <li>Move with confidence</li>
                <li>Stay within speaking area</li>
                <li>Use space effectively</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>👥</div>
              <h2>Audience Engagement</h2>
              <ul>
                <li>Face the audience directly</li>
                <li>Shift position for emphasis</li>
                <li>Move closer for important points</li>
                <li>Use space to show confidence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Facial Expressions</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>👀</div>
              <h2>Eye Contact</h2>
              <ul>
                <li>Maintain steady eye contact</li>
                <li>Scan the room naturally</li>
                <li>Connect with judges</li>
                <li>Show confidence through gaze</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>😊</div>
              <h2>Expression Control</h2>
              <ul>
                <li>Match expressions to content</li>
                <li>Show appropriate emotion</li>
                <li>Maintain professional demeanor</li>
                <li>Use expressions for emphasis</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎭</div>
              <h2>Emotional Impact</h2>
              <ul>
                <li>Convey conviction</li>
                <li>Show passion appropriately</li>
                <li>Express concern when needed</li>
                <li>Maintain composure under pressure</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hand Gestures</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>✋</div>
              <h2>Purposeful Gestures</h2>
              <ul>
                <li>Use hands to emphasize points</li>
                <li>Keep gestures above waist</li>
                <li>Make movements deliberate</li>
                <li>Avoid distracting motions</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🤲</div>
              <h2>Gesture Types</h2>
              <ul>
                <li>Use open palms for honesty</li>
                <li>Point for emphasis</li>
                <li>Count on fingers for lists</li>
                <li>Use size gestures for impact</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Strategic Gestures</h2>
              <ul>
                <li>Time gestures with speech</li>
                <li>Use gestures for transitions</li>
                <li>Emphasize key arguments</li>
                <li>Show confidence through movement</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Watch and Learn</h2>
          <div className={styles.videoGrid}>
            <div className={styles.videoCard}>
              <h3>Body Language in Debate</h3>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/cFLjudWTuGQ?si=GC8Iwk75A_wR06JP"
                  title="Body Language in Debate"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={styles.videoDescription}>
                Learn how to use body language effectively in debate settings.
              </p>
            </div>
            <div className={styles.videoCard}>
              <h3>Gestures and Expressions</h3>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/3yYjYvdcCw8?si=QdmUFDaYNjdWzPpW"
                  title="Gestures and Expressions in Debate"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={styles.videoDescription}>
                Master the art of using gestures and facial expressions in debate.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 