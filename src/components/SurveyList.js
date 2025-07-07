import { useState, useEffect } from 'react';
import styles from '../styles/SurveyList.module.css';
import { saveAs } from 'file-saver';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    priorityLevel: '',
    needsImmediateHelp: '',
    helpPriority: '',
    search: ''
  });
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '121212') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...filters
      });

      const response = await fetch(`/api/survey?${params}`);
      const result = await response.json();

      if (result.success) {
        setSurveys(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSurveys();
    }
  }, [currentPage, filters, isAuthenticated]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return styles.highPriority;
      case 'Medium': return styles.mediumPriority;
      case 'Low': return styles.lowPriority;
      default: return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Surveyed': return styles.statusSurveyed;
      case 'Under Review': return styles.statusReview;
      case 'Assistance Provided': return styles.statusProvided;
      case 'Follow-up Required': return styles.statusFollowup;
      default: return '';
    }
  };

  const getHelpPriorityColor = (priority) => {
    switch (priority) {
      case 'Very High': return styles.highPriority;
      case 'High': return styles.highPriority;
      case 'Medium': return styles.mediumPriority;
      case 'Low': return styles.lowPriority;
      default: return '';
    }
  };

  const exportToCSV = () => {
    if (!surveys.length) return;
    const replacer = (key, value) => (value === null || value === undefined ? '' : value);
    const header = Object.keys(surveys[0]);
    const csv = [
      header.join(','),
      ...surveys.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'survey_results.csv');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this survey?')) return;
    try {
      const res = await fetch(`/api/survey/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSurveys(surveys.filter(s => s._id !== id));
      } else {
        alert('Failed to delete survey.');
      }
    } catch (err) {
      alert('Error deleting survey.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2>🔒 Access Survey Data</h2>
          <p>Please enter the password to view survey responses</p>
          <form onSubmit={handlePasswordSubmit} className={styles.authForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={styles.passwordInput}
              required
            />
            {passwordError && <div className={styles.passwordError}>{passwordError}</div>}
            <button type="submit" className={styles.authButton}>
              Access Data
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading survey data...</p>
      </div>
    );
  }

  return (
    <div className={styles.surveyList}>
      <div className={styles.listHeader}>
        <h2>Survey Responses</h2>
        <div className={styles.stats}>
          <span>Total: {surveys.length}</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className={styles.logoutButton}
        >
          🔒 Logout
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <input
            type="text"
            name="search"
            placeholder="Search by family name, head of family..."
            value={filters.search}
            onChange={handleFilterChange}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            <option value="Surveyed">Surveyed</option>
            <option value="Under Review">Under Review</option>
            <option value="Assistance Provided">Assistance Provided</option>
            <option value="Follow-up Required">Follow-up Required</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <select
            name="priorityLevel"
            value={filters.priorityLevel}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <select
            name="needsImmediateHelp"
            value={filters.needsImmediateHelp}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Help Status</option>
            <option value="Yes">Needs Immediate Help</option>
            <option value="Maybe">Maybe Needs Help</option>
            <option value="No">No Help Needed</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <select
            name="helpPriority"
            value={filters.helpPriority}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Help Priorities</option>
            <option value="Very High">Very High Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
            <option value="None">No Priority</option>
          </select>
        </div>
      </div>

      {/* Export Button */}
      <button onClick={exportToCSV} className={styles.exportButton}>Export to CSV</button>

      {/* Survey Table */}
      <div className={styles.tableContainer}>
        <table className={styles.surveyTable}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Family Size</th>
              <th>Monthly Income</th>
              <th>Help Priority</th>
              <th>Status</th>
              <th>Survey Date</th>
              <th>Caste</th>
              <th>Profession</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey._id} className={styles.surveyRow}>
                <td>{survey.fullName}</td>
                <td>{survey.contactNumber}</td>
                <td>{survey.totalFamilyMembers}</td>
                <td>{survey.monthlyIncome}</td>
                <td>{survey.helpPriority}</td>
                <td>{survey.status}</td>
                <td>{formatDate(survey.surveyDate)}</td>
                <td>{survey.caste}</td>
                <td>{survey.profession}</td>
                <td>
                  <button className={styles.viewButton} onClick={() => { setSelectedSurvey(survey); setShowModal(true); }}>View</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(survey._id)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {surveys.length === 0 && (
          <div className={styles.emptyState}>
            <p>No survey data found. Start by adding a new survey.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}

      {showModal && selectedSurvey && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Survey Details - {selectedSurvey.familyName}</h2>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              {/* Basic Information */}
              <div className={styles.detailSection}>
                <h3>📋 Basic Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Family Name:</label>
                    <span>{selectedSurvey.familyName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Head of Family:</label>
                    <span>{selectedSurvey.headOfFamily}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Contact Number:</label>
                    <span>{selectedSurvey.contactNumber}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Address:</label>
                    <span>{selectedSurvey.address}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>BPL Card Number:</label>
                    <span>{selectedSurvey.bplCardNumber || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Family Composition */}
              <div className={styles.detailSection}>
                <h3>👨‍👩‍👧‍👦 Family Composition</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Total Family Members:</label>
                    <span>{selectedSurvey.totalFamilyMembers}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Children Under 18:</label>
                    <span>{selectedSurvey.childrenUnder18}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Elderly Above 85:</label>
                    <span>{selectedSurvey.elderlyAbove85}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Disabled Members:</label>
                    <span>{selectedSurvey.disabledMembers}</span>
                  </div>
                </div>
              </div>

              {/* Education Information */}
              <div className={styles.detailSection}>
                <h3>📚 Education Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Children in School:</label>
                    <span>{selectedSurvey.childrenInSchool}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Children Dropped Out:</label>
                    <span>{selectedSurvey.childrenDroppedOut}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Education Help Needed:</label>
                    <span className={selectedSurvey.educationHelpNeeded === 'Yes' ? styles.yes : selectedSurvey.educationHelpNeeded === 'Maybe' ? styles.maybe : styles.no}>
                      {selectedSurvey.educationHelpNeeded}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Education Help Type:</label>
                    <span>{selectedSurvey.educationHelpType}</span>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className={styles.detailSection}>
                <h3>🏥 Health Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Health Insurance:</label>
                    <span className={selectedSurvey.healthInsurance === 'Yes' ? styles.yes : styles.no}>
                      {selectedSurvey.healthInsurance}
                    </span>
                  </div>
                  {selectedSurvey.healthInsurance === 'Yes' && (
                    <div className={styles.detailItem}>
                      <label>Insurance Type:</label>
                      <span>{selectedSurvey.healthInsuranceType}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Chronic Diseases:</label>
                    <span className={selectedSurvey.chronicDiseases === 'Yes' ? styles.yes : styles.no}>
                      {selectedSurvey.chronicDiseases}
                    </span>
                  </div>
                  {selectedSurvey.chronicDiseases === 'Yes' && selectedSurvey.chronicDiseaseDetails && (
                    <div className={styles.detailItem}>
                      <label>Disease Details:</label>
                      <span>{selectedSurvey.chronicDiseaseDetails}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Regular Medication:</label>
                    <span className={selectedSurvey.regularMedication === 'Yes' ? styles.yes : styles.no}>
                      {selectedSurvey.regularMedication}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Nearest Hospital:</label>
                    <span>{selectedSurvey.nearestHospital || 'Not specified'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Hospital Distance (km):</label>
                    <span>{selectedSurvey.hospitalDistance}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Health Help Needed:</label>
                    <span className={selectedSurvey.healthHelpNeeded === 'Yes' ? styles.yes : selectedSurvey.healthHelpNeeded === 'Maybe' ? styles.maybe : styles.no}>
                      {selectedSurvey.healthHelpNeeded}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Health Help Type:</label>
                    <span>{selectedSurvey.healthHelpType}</span>
                  </div>
                </div>
              </div>

              {/* Elder Care Information */}
              <div className={styles.detailSection}>
                <h3>👴 Elder Care Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Elderly Care Needed:</label>
                    <span className={selectedSurvey.elderlyCareNeeded === 'Yes' ? styles.yes : selectedSurvey.elderlyCareNeeded === 'Maybe' ? styles.maybe : styles.no}>
                      {selectedSurvey.elderlyCareNeeded}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Elder Care Type:</label>
                    <span>{selectedSurvey.elderlyCareType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Elderly Pension:</label>
                    <span className={selectedSurvey.elderlyPension === 'Yes' ? styles.yes : styles.no}>
                      {selectedSurvey.elderlyPension}
                    </span>
                  </div>
                  {selectedSurvey.elderlyPension === 'Yes' && (
                    <div className={styles.detailItem}>
                      <label>Pension Amount (₹):</label>
                      <span>{selectedSurvey.elderlyPensionAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Employment & Income */}
              <div className={styles.detailSection}>
                <h3>💼 Employment & Income</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Primary Occupation:</label>
                    <span>{selectedSurvey.primaryOccupation || 'Not specified'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Monthly Income (₹):</label>
                    <span>{selectedSurvey.monthlyIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Employment Help Needed:</label>
                    <span className={selectedSurvey.employmentHelpNeeded === 'Yes' ? styles.yes : selectedSurvey.employmentHelpNeeded === 'Maybe' ? styles.maybe : styles.no}>
                      {selectedSurvey.employmentHelpNeeded}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Employment Help Type:</label>
                    <span>{selectedSurvey.employmentHelpType}</span>
                  </div>
                </div>
              </div>

              {/* Financial Services */}
              <div className={styles.detailSection}>
                <h3>🏦 Financial Services</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Bank Account:</label>
                    <span className={selectedSurvey.bankAccount === 'Yes' ? styles.yes : styles.no}>
                      {selectedSurvey.bankAccount}
                    </span>
                  </div>
                  {selectedSurvey.bankAccount === 'Yes' && (
                    <>
                      <div className={styles.detailItem}>
                        <label>Bank Name:</label>
                        <span>{selectedSurvey.bankName}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <label>Account Number:</label>
                        <span>{selectedSurvey.accountNumber}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <label>IFSC Code:</label>
                        <span>{selectedSurvey.ifscCode}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <label>Help Opening Fixed Deposit:</label>
                        <span>{selectedSurvey.helpOpeningFixedDeposit}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <label>Help Taking Loan:</label>
                        <span>{selectedSurvey.helpTakingLoan}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <label>Help With Digital Payments:</label>
                        <span>{selectedSurvey.helpWithDigitalPayments}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Help Assessment */}
              <div className={styles.detailSection}>
                <h3>🆘 Help Assessment</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Needs Immediate Help:</label>
                    <span className={selectedSurvey.needsImmediateHelp === 'Yes' ? styles.yes : selectedSurvey.needsImmediateHelp === 'Maybe' ? styles.maybe : styles.no}>
                      {selectedSurvey.needsImmediateHelp}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Help Priority:</label>
                    <span className={`${styles.helpPriorityBadge} ${getHelpPriorityColor(selectedSurvey.helpPriority)}`}>
                      {selectedSurvey.helpPriority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Survey Information */}
              <div className={styles.detailSection}>
                <h3>📊 Survey Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Surveyor Name:</label>
                    <span>{selectedSurvey.surveyorName}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Survey Date:</label>
                    <span>{formatDate(selectedSurvey.surveyDate)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Priority Level:</label>
                    <span className={`${styles.priorityBadge} ${getPriorityColor(selectedSurvey.priorityLevel)}`}>
                      {selectedSurvey.priorityLevel}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Status:</label>
                    <span className={`${styles.statusBadge} ${getStatusColor(selectedSurvey.status)}`}>
                      {selectedSurvey.status}
                    </span>
                  </div>
                  {selectedSurvey.notes && (
                    <div className={styles.detailItem}>
                      <label>Notes:</label>
                      <span>{selectedSurvey.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 