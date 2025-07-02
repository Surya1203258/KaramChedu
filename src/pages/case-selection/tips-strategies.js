import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';

export default function TipsAndStrategies() {
  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tips for Finding the Perfect Debate Case</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🔍</div>
              <h2>Research Broadly</h2>
              <ul>
                <li>Explore multiple sources and perspectives</li>
                <li>Look for recent and credible evidence</li>
                <li>Identify trending topics in debate circuits</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Focus Your Topic</h2>
              <ul>
                <li>Choose a case with clear impacts</li>
                <li>Make sure your case is debatable</li>
                <li>Ensure it aligns with the resolution</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💡</div>
              <h2>Be Creative</h2>
              <ul>
                <li>Consider unique or underused arguments</li>
                <li>Think about innovative solutions</li>
                <li>Don't be afraid to challenge the status quo</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🤝</div>
              <h2>Know Your Audience</h2>
              <ul>
                <li>Consider what judges and opponents expect</li>
                <li>Adapt your case to your league's norms</li>
                <li>Be ready to defend your choices</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🔄</div>
              <h2>Review and Revise</h2>
              <ul>
                <li>Revisit your case after initial drafting</li>
                <li>Look for logical gaps or weak evidence</li>
                <li>Refine arguments for clarity and impact</li>
              </ul>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🤔</div>
              <h2>Collaborate with Others</h2>
              <ul>
                <li>Discuss your case with teammates or mentors</li>
                <li>Get feedback from different perspectives</li>
                <li>Practice debating your case with others</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 