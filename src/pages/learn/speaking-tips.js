import { useSession, signIn, signOut } from "next-auth/react";
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import Navigation from '../../components/Navigation';

export default function SpeakingTips() {
  const { data: session, status } = useSession();
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <div ref={contentRef} className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Essential Speaking Skills</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎯</div>
              <h2>Clarity is Key</h2>
              <ul>
                <li>Speak at a moderate pace</li>
                <li>Enunciate clearly</li>
                <li>Use appropriate volume</li>
                <li>Pause between points</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>💡</div>
              <h2>Structure Your Speech</h2>
              <ul>
                <li>Start with a roadmap</li>
                <li>Number your arguments</li>
                <li>Use signposting</li>
                <li>Summarize key points</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🎭</div>
              <h2>Engage Your Audience</h2>
              <ul>
                <li>Maintain eye contact</li>
                <li>Use appropriate gestures</li>
                <li>Vary your tone</li>
                <li>Show confidence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Debate-Specific Skills</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>📝</div>
              <h2>Effective Note-Taking</h2>
              <ul>
                <li>Use shorthand</li>
                <li>Organize by speaker</li>
                <li>Highlight key points</li>
                <li>Track time</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>🤝</div>
              <h2>Team Coordination</h2>
              <ul>
                <li>Plan transitions</li>
                <li>Share flow</li>
                <li>Support partner</li>
                <li>Maintain consistency</li>
              </ul>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>⚡</div>
              <h2>Quick Thinking</h2>
              <ul>
                <li>Stay composed</li>
                <li>Think on your feet</li>
                <li>Adapt to changes</li>
                <li>Use prep time wisely</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Watch and Learn</h2>
          <div className={styles.videoGrid}>
            <div className={styles.videoCard}>
              <h3>Basic Speaking Techniques</h3>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/962eYqe--Yc?si=L38c1HijL7IV0TsJ"
                  title="Basic Public Speaking Tips"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={styles.videoDescription}>
                Learn essential public speaking techniques that are crucial for debate success.
              </p>
            </div>
            <div className={styles.videoCard}>
              <h3>Advanced Delivery Tips</h3>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/tJmQnIgjyfw?si=myqaOi042wuJE0-C"
                  title="Advanced Debate Speaking Techniques"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className={styles.videoDescription}>
                Master advanced debate speaking techniques and delivery methods.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 