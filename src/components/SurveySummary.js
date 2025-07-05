import { useState, useEffect } from 'react';
import styles from '../styles/SurveySummary.module.css';

export default function SurveySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/survey/summary?period=${selectedPeriod}`);
      const result = await response.json();

      if (result.success) {
        setSummary(result.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [selectedPeriod]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading summary data...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className={styles.errorContainer}>
        <p>Unable to load summary data</p>
      </div>
    );
  }

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  const formatPercentage = (value, total) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  return (
    <div className={styles.surveySummary}>
      <div className={styles.summaryHeader}>
        <h2>Survey Summary Dashboard</h2>
        <div className={styles.periodSelector}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={styles.periodSelect}
          >
            <option value="all">All Time</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_week">This Week</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.keyMetrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📊</div>
          <div className={styles.metricContent}>
            <h3>Total Surveys</h3>
            <div className={styles.metricValue}>{formatNumber(summary.totalSurveys)}</div>
            <div className={styles.metricSubtext}>
              {summary.totalFamilies} families surveyed
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>👨‍👩‍👧‍👦</div>
          <div className={styles.metricContent}>
            <h3>Total Population</h3>
            <div className={styles.metricValue}>{formatNumber(summary.totalPopulation)}</div>
            <div className={styles.metricSubtext}>
              {summary.averageFamilySize.toFixed(1)} avg family size
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>🆘</div>
          <div className={styles.metricContent}>
            <h3>Need Help</h3>
            <div className={styles.metricValue}>{formatNumber(summary.familiesNeedingHelp)}</div>
            <div className={styles.metricSubtext}>
              {formatPercentage(summary.familiesNeedingHelp, summary.totalSurveys)} of families
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>💰</div>
          <div className={styles.metricContent}>
            <h3>Avg Monthly Income</h3>
            <div className={styles.metricValue}>₹{formatNumber(summary.averageMonthlyIncome)}</div>
            <div className={styles.metricSubtext}>
              {summary.belowPovertyLine} families below poverty line
            </div>
          </div>
        </div>
      </div>

      {/* Help Assessment */}
      <div className={styles.section}>
        <h3>🆘 Help Assessment Overview</h3>
        <div className={styles.helpGrid}>
          <div className={styles.helpCard}>
            <h4>Immediate Help Needed</h4>
            <div className={styles.helpStats}>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>Yes:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.immediateHelp.yes)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.immediateHelp.yes, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>Maybe:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.immediateHelp.maybe)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.immediateHelp.maybe, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>No:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.immediateHelp.no)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.immediateHelp.no, summary.totalSurveys)})
                </span>
              </div>
            </div>
          </div>

          <div className={styles.helpCard}>
            <h4>Help Priority Levels</h4>
            <div className={styles.helpStats}>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>Very High:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.priorityLevels.veryHigh)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.priorityLevels.veryHigh, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>High:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.priorityLevels.high)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.priorityLevels.high, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>Medium:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.priorityLevels.medium)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.priorityLevels.medium, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>Low:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.priorityLevels.low)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.priorityLevels.low, summary.totalSurveys)})
                </span>
              </div>
              <div className={styles.helpStat}>
                <span className={styles.helpLabel}>None:</span>
                <span className={styles.helpValue}>{formatNumber(summary.helpAssessment.priorityLevels.none)}</span>
                <span className={styles.helpPercentage}>
                  ({formatPercentage(summary.helpAssessment.priorityLevels.none, summary.totalSurveys)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Family Demographics */}
      <div className={styles.section}>
        <h3>👨‍👩‍👧‍👦 Family Demographics</h3>
        <div className={styles.demographicsGrid}>
          <div className={styles.demographicCard}>
            <h4>Children (Under 18)</h4>
            <div className={styles.demographicValue}>{formatNumber(summary.demographics.childrenUnder18)}</div>
            <div className={styles.demographicSubtext}>
              {formatPercentage(summary.demographics.childrenUnder18, summary.totalPopulation)} of total population
            </div>
          </div>

          <div className={styles.demographicCard}>
            <h4>Elderly (Above 85)</h4>
            <div className={styles.demographicValue}>{formatNumber(summary.demographics.elderlyAbove85)}</div>
            <div className={styles.demographicSubtext}>
              {formatPercentage(summary.demographics.elderlyAbove85, summary.totalPopulation)} of total population
            </div>
          </div>

          <div className={styles.demographicCard}>
            <h4>Disabled Members</h4>
            <div className={styles.demographicValue}>{formatNumber(summary.demographics.disabledMembers)}</div>
            <div className={styles.demographicSubtext}>
              {formatPercentage(summary.demographics.disabledMembers, summary.totalPopulation)} of total population
            </div>
          </div>

          <div className={styles.demographicCard}>
            <h4>Average Family Size</h4>
            <div className={styles.demographicValue}>{summary.demographics.averageFamilySize.toFixed(1)}</div>
            <div className={styles.demographicSubtext}>
              members per family
            </div>
          </div>
        </div>
      </div>

      {/* Education Overview */}
      <div className={styles.section}>
        <h3>📚 Education Overview</h3>
        <div className={styles.educationGrid}>
          <div className={styles.educationCard}>
            <h4>Children in School</h4>
            <div className={styles.educationValue}>{formatNumber(summary.education.childrenInSchool)}</div>
            <div className={styles.educationSubtext}>
              {formatPercentage(summary.education.childrenInSchool, summary.demographics.childrenUnder18)} of children
            </div>
          </div>

          <div className={styles.educationCard}>
            <h4>Children Dropped Out</h4>
            <div className={styles.educationValue}>{formatNumber(summary.education.childrenDroppedOut)}</div>
            <div className={styles.educationSubtext}>
              {formatPercentage(summary.education.childrenDroppedOut, summary.demographics.childrenUnder18)} of children
            </div>
          </div>

          <div className={styles.educationCard}>
            <h4>Education Help Needed</h4>
            <div className={styles.educationValue}>{formatNumber(summary.education.helpNeeded)}</div>
            <div className={styles.educationSubtext}>
              {formatPercentage(summary.education.helpNeeded, summary.totalSurveys)} of families
            </div>
          </div>
        </div>
      </div>

      {/* Health Overview */}
      <div className={styles.section}>
        <h3>🏥 Health Overview</h3>
        <div className={styles.healthGrid}>
          <div className={styles.healthCard}>
            <h4>Health Insurance</h4>
            <div className={styles.healthValue}>{formatNumber(summary.health.healthInsurance)}</div>
            <div className={styles.healthSubtext}>
              {formatPercentage(summary.health.healthInsurance, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.healthCard}>
            <h4>Chronic Diseases</h4>
            <div className={styles.healthValue}>{formatNumber(summary.health.chronicDiseases)}</div>
            <div className={styles.healthSubtext}>
              {formatPercentage(summary.health.chronicDiseases, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.healthCard}>
            <h4>Regular Medication</h4>
            <div className={styles.healthValue}>{formatNumber(summary.health.regularMedication)}</div>
            <div className={styles.healthSubtext}>
              {formatPercentage(summary.health.regularMedication, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.healthCard}>
            <h4>Health Help Needed</h4>
            <div className={styles.healthValue}>{formatNumber(summary.health.helpNeeded)}</div>
            <div className={styles.healthSubtext}>
              {formatPercentage(summary.health.helpNeeded, summary.totalSurveys)} of families
            </div>
          </div>
        </div>
      </div>

      {/* Elder Care Overview */}
      <div className={styles.section}>
        <h3>👴 Elder Care Overview</h3>
        <div className={styles.elderCareGrid}>
          <div className={styles.elderCareCard}>
            <h4>Elderly Care Needed</h4>
            <div className={styles.elderCareValue}>{formatNumber(summary.elderCare.careNeeded)}</div>
            <div className={styles.elderCareSubtext}>
              {formatPercentage(summary.elderCare.careNeeded, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.elderCareCard}>
            <h4>Elderly Pension</h4>
            <div className={styles.elderCareValue}>{formatNumber(summary.elderCare.pension)}</div>
            <div className={styles.elderCareSubtext}>
              {formatPercentage(summary.elderCare.pension, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.elderCareCard}>
            <h4>Average Pension Amount</h4>
            <div className={styles.elderCareValue}>₹{formatNumber(summary.elderCare.averagePensionAmount)}</div>
            <div className={styles.elderCareSubtext}>
              per month
            </div>
          </div>
        </div>
      </div>

      {/* Employment Overview */}
      <div className={styles.section}>
        <h3>💼 Employment Overview</h3>
        <div className={styles.employmentGrid}>
          <div className={styles.employmentCard}>
            <h4>Employment Help Needed</h4>
            <div className={styles.employmentValue}>{formatNumber(summary.employment.helpNeeded)}</div>
            <div className={styles.employmentSubtext}>
              {formatPercentage(summary.employment.helpNeeded, summary.totalSurveys)} of families
            </div>
          </div>

          <div className={styles.employmentCard}>
            <h4>Bank Account</h4>
            <div className={styles.employmentValue}>{formatNumber(summary.employment.bankAccount)}</div>
            <div className={styles.employmentSubtext}>
              {formatPercentage(summary.employment.bankAccount, summary.totalSurveys)} of families
            </div>
          </div>
        </div>
      </div>

      {/* Survey Status */}
      <div className={styles.section}>
        <h3>📊 Survey Status</h3>
        <div className={styles.statusGrid}>
          <div className={styles.statusCard}>
            <h4>Surveyed</h4>
            <div className={styles.statusValue}>{formatNumber(summary.status.surveyed)}</div>
            <div className={styles.statusSubtext}>
              {formatPercentage(summary.status.surveyed, summary.totalSurveys)} of surveys
            </div>
          </div>

          <div className={styles.statusCard}>
            <h4>Under Review</h4>
            <div className={styles.statusValue}>{formatNumber(summary.status.underReview)}</div>
            <div className={styles.statusSubtext}>
              {formatPercentage(summary.status.underReview, summary.totalSurveys)} of surveys
            </div>
          </div>

          <div className={styles.statusCard}>
            <h4>Assistance Provided</h4>
            <div className={styles.statusValue}>{formatNumber(summary.status.assistanceProvided)}</div>
            <div className={styles.statusSubtext}>
              {formatPercentage(summary.status.assistanceProvided, summary.totalSurveys)} of surveys
            </div>
          </div>

          <div className={styles.statusCard}>
            <h4>Follow-up Required</h4>
            <div className={styles.statusValue}>{formatNumber(summary.status.followUpRequired)}</div>
            <div className={styles.statusSubtext}>
              {formatPercentage(summary.status.followUpRequired, summary.totalSurveys)} of surveys
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.section}>
        <h3>🕒 Recent Activity</h3>
        <div className={styles.recentActivity}>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>📝</span>
            <span className={styles.activityText}>
              {summary.recentActivity.surveysThisWeek} new surveys this week
            </span>
          </div>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>🆘</span>
            <span className={styles.activityText}>
              {summary.recentActivity.highPriorityCases} high priority cases identified
            </span>
          </div>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>✅</span>
            <span className={styles.activityText}>
              {summary.recentActivity.assistanceProvided} families received assistance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 