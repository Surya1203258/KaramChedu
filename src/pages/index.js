import { useState } from 'react';
import SurveyForm from '../components/SurveyForm';
import SurveySummary from '../components/SurveySummary';
import SurveyList from '../components/SurveyList';
import styles from '../styles/Survey.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('form');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Karamachedu Village Survey</h1>
          <div className={styles.userInfo}>
            <span>Village Survey Application</span>
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
