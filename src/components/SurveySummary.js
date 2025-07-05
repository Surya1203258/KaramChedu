import { useState, useEffect } from 'react';
import styles from '../styles/SurveySummary.module.css';

export default function SurveySummary() {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/survey-summary');
      const result = await response.json();

      if (result.success) {
        setSummaryData(result.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading summary data...</p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className={styles.errorContainer}>
        <p>Error loading summary data</p>
      </div>
    );
  }

  const {
    totalFamilies,
    familyComposition,
    education,
    health,
    elderCare,
    employment,
    bankAccount,
    priorityLevels,
    statusDistribution,
    topEducationNeeds,
    topHealthNeeds,
    topElderCareNeeds
  } = summaryData;

  const StatCard = ({ title, value, subtitle, icon, color = 'blue' }) => (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <h3>{title}</h3>
        <div className={styles.statValue}>{value}</div>
        {subtitle && <p className={styles.statSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, total, color = 'blue' }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <div className={styles.progressItem}>
        <div className={styles.progressLabel}>
          <span>{label}</span>
          <span>{value} / {total}</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progressFill} ${styles[color]}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const ChartSection = ({ title, data, color = 'blue' }) => (
    <div className={styles.chartSection}>
      <h3>{title}</h3>
      <div className={styles.chartContainer}>
        {data.map((item, index) => (
          <div key={item._id || index} className={styles.chartItem}>
            <div className={styles.chartBar}>
              <div 
                className={`${styles.chartFill} ${styles[color]}`}
                style={{ 
                  height: `${Math.max((item.count / Math.max(...data.map(d => d.count))) * 100, 10)}%` 
                }}
              ></div>
            </div>
            <div className={styles.chartLabel}>
              <span>{item._id}</span>
              <span className={styles.chartValue}>{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.surveySummary}>
      <div className={styles.summaryHeader}>
        <h2>Karamachedu Village Survey Summary</h2>
        <p>Comprehensive analysis of {totalFamilies} families surveyed</p>
      </div>

      {/* Key Statistics */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Families"
          value={totalFamilies}
          subtitle="Surveyed"
          icon="🏠"
          color="blue"
        />
        <StatCard
          title="Total Members"
          value={familyComposition.totalMembers || 0}
          subtitle="Average: {Math.round(familyComposition.avgFamilySize || 0)} per family"
          icon="👥"
          color="green"
        />
        <StatCard
          title="Children Under 18"
          value={familyComposition.totalChildren || 0}
          subtitle="Need education support"
          icon="👶"
          color="orange"
        />
        <StatCard
          title="Elderly Above 60"
          value={familyComposition.totalElderly || 0}
          subtitle="Need elder care"
          icon="👴"
          color="purple"
        />
        <StatCard
          title="Average Income"
          value={`₹${Math.round(familyComposition.avgIncome || 0).toLocaleString('en-IN')}`}
          subtitle="Monthly per family"
          icon="💰"
          color="yellow"
        />
        <StatCard
          title="Bank Accounts"
          value={`${bankAccount.bankAccount || 0} / ${totalFamilies}`}
          subtitle="Financial inclusion"
          icon="🏦"
          color="teal"
        />
      </div>

      {/* Priority and Status Distribution */}
      <div className={styles.distributionSection}>
        <div className={styles.distributionCard}>
          <h3>Priority Level Distribution</h3>
          <div className={styles.distributionGrid}>
            {priorityLevels.map((item) => (
              <div key={item._id} className={styles.distributionItem}>
                <div className={styles.distributionLabel}>
                  <span className={`${styles.priorityDot} ${styles[item._id.toLowerCase()]}`}></span>
                  {item._id}
                </div>
                <div className={styles.distributionValue}>
                  {item.count} ({Math.round((item.count / totalFamilies) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.distributionCard}>
          <h3>Status Distribution</h3>
          <div className={styles.distributionGrid}>
            {statusDistribution.map((item) => (
              <div key={item._id} className={styles.distributionItem}>
                <div className={styles.distributionLabel}>
                  <span className={`${styles.statusDot} ${styles[item._id.toLowerCase().replace(' ', '')]}`}></span>
                  {item._id}
                </div>
                <div className={styles.distributionValue}>
                  {item.count} ({Math.round((item.count / totalFamilies) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className={styles.section}>
        <h3>Education Analysis</h3>
        <div className={styles.sectionGrid}>
          <div className={styles.progressSection}>
            <h4>Education Statistics</h4>
            <ProgressBar 
              label="Children in School" 
              value={education.childrenInSchool || 0} 
              total={familyComposition.totalChildren || 0}
              color="green"
            />
            <ProgressBar 
              label="Children Dropped Out" 
              value={education.childrenDroppedOut || 0} 
              total={familyComposition.totalChildren || 0}
              color="red"
            />
            <ProgressBar 
              label="Aware of Education Schemes" 
              value={education.educationSchemesAware || 0} 
              total={totalFamilies}
              color="blue"
            />
            <ProgressBar 
              label="Applied for Education Schemes" 
              value={education.educationSchemesApplied || 0} 
              total={totalFamilies}
              color="orange"
            />
            <ProgressBar 
              label="Received Education Schemes" 
              value={education.educationSchemesReceived || 0} 
              total={totalFamilies}
              color="purple"
            />
          </div>
          <ChartSection 
            title="Top Education Needs" 
            data={topEducationNeeds} 
            color="blue"
          />
        </div>
      </div>

      {/* Health Section */}
      <div className={styles.section}>
        <h3>Health Analysis</h3>
        <div className={styles.sectionGrid}>
          <div className={styles.progressSection}>
            <h4>Health Statistics</h4>
            <ProgressBar 
              label="Has Health Insurance" 
              value={health.healthInsurance || 0} 
              total={totalFamilies}
              color="green"
            />
            <ProgressBar 
              label="Has Chronic Diseases" 
              value={health.chronicDiseases || 0} 
              total={totalFamilies}
              color="red"
            />
            <ProgressBar 
              label="Takes Regular Medication" 
              value={health.regularMedication || 0} 
              total={totalFamilies}
              color="orange"
            />
            <ProgressBar 
              label="Aware of Health Schemes" 
              value={health.healthSchemesAware || 0} 
              total={totalFamilies}
              color="blue"
            />
            <ProgressBar 
              label="Applied for Health Schemes" 
              value={health.healthSchemesApplied || 0} 
              total={totalFamilies}
              color="purple"
            />
            <ProgressBar 
              label="Received Health Schemes" 
              value={health.healthSchemesReceived || 0} 
              total={totalFamilies}
              color="teal"
            />
          </div>
          <ChartSection 
            title="Top Health Needs" 
            data={topHealthNeeds} 
            color="green"
          />
        </div>
      </div>

      {/* Elder Care Section */}
      <div className={styles.section}>
        <h3>Elder Care Analysis</h3>
        <div className={styles.sectionGrid}>
          <div className={styles.progressSection}>
            <h4>Elder Care Statistics</h4>
            <ProgressBar 
              label="Elderly Care Needed" 
              value={elderCare.elderlyCareNeeded || 0} 
              total={totalFamilies}
              color="purple"
            />
            <ProgressBar 
              label="Receives Elderly Pension" 
              value={elderCare.elderlyPension || 0} 
              total={totalFamilies}
              color="green"
            />
            <ProgressBar 
              label="Aware of Elderly Schemes" 
              value={elderCare.elderlySchemesAware || 0} 
              total={totalFamilies}
              color="blue"
            />
            <ProgressBar 
              label="Applied for Elderly Schemes" 
              value={elderCare.elderlySchemesApplied || 0} 
              total={totalFamilies}
              color="orange"
            />
            <ProgressBar 
              label="Received Elderly Schemes" 
              value={elderCare.elderlySchemesReceived || 0} 
              total={totalFamilies}
              color="teal"
            />
          </div>
          <ChartSection 
            title="Top Elder Care Needs" 
            data={topElderCareNeeds} 
            color="purple"
          />
        </div>
      </div>

      {/* Employment Section */}
      <div className={styles.section}>
        <h3>Employment & Financial Inclusion</h3>
        <div className={styles.employmentGrid}>
          <div className={styles.employmentCard}>
            <h4>Employment Scheme Awareness</h4>
            <div className={styles.employmentStats}>
              <div className={styles.employmentStat}>
                <span className={styles.statNumber}>{employment.employmentSchemesAware || 0}</span>
                <span className={styles.statLabel}>Aware of Schemes</span>
              </div>
              <div className={styles.employmentStat}>
                <span className={styles.statNumber}>{employment.employmentSchemesApplied || 0}</span>
                <span className={styles.statLabel}>Applied for Schemes</span>
              </div>
            </div>
          </div>
          <div className={styles.employmentCard}>
            <h4>Financial Inclusion</h4>
            <div className={styles.employmentStats}>
              <div className={styles.employmentStat}>
                <span className={styles.statNumber}>{bankAccount.bankAccount || 0}</span>
                <span className={styles.statLabel}>Have Bank Accounts</span>
              </div>
              <div className={styles.employmentStat}>
                <span className={styles.statNumber}>{totalFamilies - (bankAccount.bankAccount || 0)}</span>
                <span className={styles.statLabel}>Need Bank Accounts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className={styles.recommendations}>
        <h3>Key Recommendations</h3>
        <div className={styles.recommendationsGrid}>
          <div className={styles.recommendation}>
            <h4>🎓 Education</h4>
            <ul>
              <li>Focus on reducing school dropout rates</li>
              <li>Increase awareness of education schemes</li>
              <li>Provide transportation support for remote families</li>
              <li>Ensure mid-day meal programs reach all children</li>
            </ul>
          </div>
          <div className={styles.recommendation}>
            <h4>🏥 Health</h4>
            <ul>
              <li>Expand health insurance coverage</li>
              <li>Improve access to healthcare facilities</li>
              <li>Increase awareness of health schemes</li>
              <li>Provide regular health checkups</li>
            </ul>
          </div>
          <div className={styles.recommendation}>
            <h4>👴 Elder Care</h4>
            <ul>
              <li>Ensure all eligible elderly receive pensions</li>
              <li>Establish elder care facilities</li>
              <li>Provide home care support</li>
              <li>Increase awareness of elderly schemes</li>
            </ul>
          </div>
          <div className={styles.recommendation}>
            <h4>💰 Financial</h4>
            <ul>
              <li>Promote financial inclusion through bank accounts</li>
              <li>Provide employment training programs</li>
              <li>Increase awareness of employment schemes</li>
              <li>Support micro-enterprise development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 