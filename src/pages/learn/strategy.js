import { useSession } from "next-auth/react";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';

export default function Strategy() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>General Debate Strategy</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Know Your Case</h2>
              <ul>
                <li>Memorize key arguments</li>
                <li>Understand evidence thoroughly</li>
                <li>Prepare counter-arguments</li>
                <li>Practice explaining complex ideas simply</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>⏱️</div>
              <h2>Time Management</h2>
              <ul>
                <li>Allocate time for each argument</li>
                <li>Keep track of speaking time</li>
                <li>Plan cross-examination questions</li>
                <li>Reserve time for rebuttals</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>📝</div>
              <h2>Effective Note-Taking</h2>
              <ul>
                <li>Use a clear flow system</li>
                <li>Record key arguments</li>
                <li>Note dropped arguments</li>
                <li>Track evidence citations</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🤝</div>
              <h2>Team Coordination</h2>
              <ul>
                <li>Plan transitions</li>
                <li>Share flow effectively</li>
                <li>Support partner's arguments</li>
                <li>Maintain consistent messaging</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎭</div>
              <h2>Adaptability</h2>
              <ul>
                <li>Think on your feet</li>
                <li>Adjust to opponent's strategy</li>
                <li>Stay composed under pressure</li>
                <li>Use prep time effectively</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💡</div>
              <h2>Strategic Thinking</h2>
              <ul>
                <li>Identify opponent's weaknesses</li>
                <li>Build strong links</li>
                <li>Create clear impacts</li>
                <li>Maintain strategic advantage</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Impact Calculus</h2>
              <ul>
                <li>Compare impacts effectively</li>
                <li>Prioritize key arguments</li>
                <li>Weigh evidence properly</li>
                <li>Build strong narratives</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🔍</div>
              <h2>Evidence Analysis</h2>
              <ul>
                <li>Evaluate source credibility</li>
                <li>Check for recency</li>
                <li>Verify statistics</li>
                <li>Understand methodology</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎤</div>
              <h2>Cross-Examination</h2>
              <ul>
                <li>Ask leading questions</li>
                <li>Control the conversation</li>
                <li>Expose weaknesses</li>
                <li>Build your case</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>📊</div>
              <h2>Framework</h2>
              <ul>
                <li>Establish clear standards</li>
                <li>Define key terms</li>
                <li>Set up voting issues</li>
                <li>Create clear burdens</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Affirmative Team Strategy</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🏆</div>
              <h2>Case Construction</h2>
              <ul>
                <li>Build a strong plan</li>
                <li>Create clear advantages</li>
                <li>Establish solvency</li>
                <li>Prepare for common neg positions</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🛡️</div>
              <h2>Defense</h2>
              <ul>
                <li>Prepare for common attacks</li>
                <li>Build strong solvency answers</li>
                <li>Defend your framework</li>
                <li>Maintain offense</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>⚡</div>
              <h2>Offense</h2>
              <ul>
                <li>Attack negative positions</li>
                <li>Expose framework flaws</li>
                <li>Challenge evidence</li>
                <li>Build strong impacts</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>2AC Strategy</h2>
              <ul>
                <li>Prioritize key arguments</li>
                <li>Extend strong positions</li>
                <li>Answer all neg arguments</li>
                <li>Build strong narratives</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💫</div>
              <h2>1AR Strategy</h2>
              <ul>
                <li>Cover all arguments</li>
                <li>Extend key positions</li>
                <li>Maintain offense</li>
                <li>Build strong impacts</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Negative Team Strategy</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Case Attacks</h2>
              <ul>
                <li>Identify case weaknesses</li>
                <li>Challenge solvency</li>
                <li>Attack advantages</li>
                <li>Expose framework flaws</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🛡️</div>
              <h2>Defense</h2>
              <ul>
                <li>Defend your positions</li>
                <li>Answer case attacks</li>
                <li>Maintain offense</li>
                <li>Protect your framework</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>⚡</div>
              <h2>Offense</h2>
              <ul>
                <li>Build strong positions</li>
                <li>Create clear impacts</li>
                <li>Challenge aff framework</li>
                <li>Expose case flaws</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>2NC Strategy</h2>
              <ul>
                <li>Cover all arguments</li>
                <li>Extend key positions</li>
                <li>Maintain offense</li>
                <li>Build strong impacts</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💫</div>
              <h2>NR Strategy</h2>
              <ul>
                <li>Prioritize key arguments</li>
                <li>Extend strong positions</li>
                <li>Answer all aff arguments</li>
                <li>Build strong narratives</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 