import { useSession } from "next-auth/react";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';
import Image from 'next/image';

export default function StructuringEvidence() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Structuring Evidence</h2>
          
          <div className={styles.evidenceStructure}>
            <div className={styles.structureImage}>
              <Image
                src="/citation.png"
                alt="Evidence Citation Example"
                width={800}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div className={styles.structureGuide}>
              <h3>Essential Components of Evidence Citation</h3>
              <div className={styles.tipsGrid}>
                <div className={styles.tipCard}>
                  <div className={styles.tipIcon}>📚</div>
                  <h2>Author Information</h2>
                  <ul>
                    <li>Author's full name</li>
                    <li>Credentials or qualifications</li>
                    <li>Institutional affiliation</li>
                    <li>Publication date</li>
                  </ul>
                </div>

                <div className={styles.tipCard}>
                  <div className={styles.tipIcon}>📄</div>
                  <h2>Source Details</h2>
                  <ul>
                    <li>Title of the work</li>
                    <li>Publication name</li>
                    <li>Volume and issue numbers</li>
                    <li>Page numbers</li>
                  </ul>
                </div>

                <div className={styles.tipCard}>
                  <div className={styles.tipIcon}>🔍</div>
                  <h2>Citation Format</h2>
                  <ul>
                    <li>Use consistent formatting</li>
                    <li>Include all required elements</li>
                    <li>Follow debate league standards</li>
                    <li>Maintain readability</li>
                  </ul>
                </div>
              </div>

              <div className={styles.noteBox}>
                <h3>Important Note</h3>
                <p>
                  The placement of citations may vary depending on your debate league's requirements. 
                  Citations can be placed either at the bottom of the page or immediately before the quoted text, 
                  as shown in the example image. Always check your specific league's guidelines for the preferred format.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 