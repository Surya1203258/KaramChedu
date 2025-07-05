import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import SurveyForm from '../components/SurveyForm';
import SurveySummary from '../components/SurveySummary';
import SurveyList from '../components/SurveyList';
import styles from '../styles/Survey.module.css';

export default function Home() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('form');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1>Karamachedu Village Survey</h1>
          <p>Please sign in to access the survey application</p>
          <button 
            onClick={() => signIn('google')}
            className={styles.signInButton}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Karamachedu Village Survey</h1>
          <div className={styles.userInfo}>
            <span>Welcome, {session.user.name}</span>
            <button 
              onClick={handleSignOut}
              className={styles.signOutButton}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.active : ''}`}
          onClick={() => setActiveTab('form')}
        >
          📝 Survey Form
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'list' ? styles.active : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📋 Survey Data
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'summary' ? styles.active : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          📊 Summary Report
        </button>
      </nav>

      {/* Tab Content */}
      <main className={styles.mainContent}>
        {activeTab === 'form' && (
          <SurveyForm setIsLoading={setIsLoading} />
        )}
        {activeTab === 'list' && (
          <SurveyList />
        )}
        {activeTab === 'summary' && (
          <SurveySummary />
        )}
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Saving survey data...</p>
        </div>
      )}
    </div>
  );
}
