import { useState, useEffect } from 'react';
import styles from '../styles/SurveyList.module.css';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    priorityLevel: '',
    search: ''
  });
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    fetchSurveys();
  }, [currentPage, filters]);

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
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <input
            type="text"
            name="search"
            placeholder="Search by family name, head of family, or BPL number..."
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
      </div>

      {/* Survey Table */}
      <div className={styles.tableContainer}>
        <table className={styles.surveyTable}>
          <thead>
            <tr>
              <th>Family Name</th>
              <th>Head of Family</th>
              <th>Contact</th>
              <th>Family Size</th>
              <th>Income (₹)</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Survey Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey._id} className={styles.surveyRow}>
                <td>
                  <div className={styles.familyInfo}>
                    <strong>{survey.familyName}</strong>
                    {survey.bplCardNumber && (
                      <small>BPL: {survey.bplCardNumber}</small>
                    )}
                  </div>
                </td>
                <td>{survey.headOfFamily}</td>
                <td>{survey.contactNumber}</td>
                <td>
                  <div className={styles.familyStats}>
                    <span>{survey.totalFamilyMembers}</span>
                    {survey.childrenUnder18 > 0 && (
                      <small>👶 {survey.childrenUnder18}</small>
                    )}
                    {survey.elderlyAbove60 > 0 && (
                      <small>👴 {survey.elderlyAbove60}</small>
                    )}
                  </div>
                </td>
                <td>{survey.monthlyIncome.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`${styles.priorityBadge} ${getPriorityColor(survey.priorityLevel)}`}>
                    {survey.priorityLevel}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusColor(survey.status)}`}>
                    {survey.status}
                  </span>
                </td>
                <td>{formatDate(survey.surveyDate)}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => {
                      setSelectedSurvey(survey);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
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
                  <div className={styles.detailItem}>
                    <label>Aadhar Number:</label>
                    <span>{selectedSurvey.aadharNumber || 'Not provided'}</span>
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
                    <label>Elderly Above 60:</label>
                    <span>{selectedSurvey.elderlyAbove60}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Disabled Members:</label>
                    <span>{selectedSurvey.disabledMembers}</span>
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div className={styles.detailSection}>
                <h3>📚 Education Details</h3>
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
                    <label>Education Schemes Aware:</label>
                    <span className={selectedSurvey.educationSchemesAware ? styles.yes : styles.no}>
                      {selectedSurvey.educationSchemesAware ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Education Schemes Applied:</label>
                    <span className={selectedSurvey.educationSchemesApplied ? styles.yes : styles.no}>
                      {selectedSurvey.educationSchemesApplied ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Education Schemes Received:</label>
                    <span className={selectedSurvey.educationSchemesReceived ? styles.yes : styles.no}>
                      {selectedSurvey.educationSchemesReceived ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.educationNeeds && selectedSurvey.educationNeeds.length > 0 && (
                    <div className={styles.detailItem}>
                      <label>Education Needs:</label>
                      <span>{selectedSurvey.educationNeeds.join(', ')}</span>
                    </div>
                  )}
                  {selectedSurvey.educationBarriers && selectedSurvey.educationBarriers.length > 0 && (
                    <div className={styles.detailItem}>
                      <label>Education Barriers:</label>
                      <span>{selectedSurvey.educationBarriers.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Health Details */}
              <div className={styles.detailSection}>
                <h3>🏥 Health Details</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Health Insurance:</label>
                    <span className={selectedSurvey.healthInsurance ? styles.yes : styles.no}>
                      {selectedSurvey.healthInsurance ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.healthInsurance && (
                    <div className={styles.detailItem}>
                      <label>Insurance Type:</label>
                      <span>{selectedSurvey.healthInsuranceType}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Chronic Diseases:</label>
                    <span className={selectedSurvey.chronicDiseases ? styles.yes : styles.no}>
                      {selectedSurvey.chronicDiseases ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.chronicDiseases && selectedSurvey.chronicDiseaseDetails && (
                    <div className={styles.detailItem}>
                      <label>Disease Details:</label>
                      <span>{selectedSurvey.chronicDiseaseDetails}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Regular Medication:</label>
                    <span className={selectedSurvey.regularMedication ? styles.yes : styles.no}>
                      {selectedSurvey.regularMedication ? 'Yes' : 'No'}
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
                    <label>Health Schemes Aware:</label>
                    <span className={selectedSurvey.healthSchemesAware ? styles.yes : styles.no}>
                      {selectedSurvey.healthSchemesAware ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Health Schemes Applied:</label>
                    <span className={selectedSurvey.healthSchemesApplied ? styles.yes : styles.no}>
                      {selectedSurvey.healthSchemesApplied ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Health Schemes Received:</label>
                    <span className={selectedSurvey.healthSchemesReceived ? styles.yes : styles.no}>
                      {selectedSurvey.healthSchemesReceived ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.healthNeeds && selectedSurvey.healthNeeds.length > 0 && (
                    <div className={styles.detailItem}>
                      <label>Health Needs:</label>
                      <span>{selectedSurvey.healthNeeds.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Elder Care Details */}
              <div className={styles.detailSection}>
                <h3>👴 Elder Care Details</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Elderly Care Needed:</label>
                    <span className={selectedSurvey.elderlyCareNeeded ? styles.yes : styles.no}>
                      {selectedSurvey.elderlyCareNeeded ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.elderlyCareNeeded && selectedSurvey.elderlyCareType && selectedSurvey.elderlyCareType.length > 0 && (
                    <div className={styles.detailItem}>
                      <label>Care Type:</label>
                      <span>{selectedSurvey.elderlyCareType.join(', ')}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Elderly Pension:</label>
                    <span className={selectedSurvey.elderlyPension ? styles.yes : styles.no}>
                      {selectedSurvey.elderlyPension ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.elderlyPension && (
                    <div className={styles.detailItem}>
                      <label>Pension Amount (₹):</label>
                      <span>{selectedSurvey.elderlyPensionAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <label>Elderly Schemes Aware:</label>
                    <span className={selectedSurvey.elderlySchemesAware ? styles.yes : styles.no}>
                      {selectedSurvey.elderlySchemesAware ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Elderly Schemes Applied:</label>
                    <span className={selectedSurvey.elderlySchemesApplied ? styles.yes : styles.no}>
                      {selectedSurvey.elderlySchemesApplied ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Elderly Schemes Received:</label>
                    <span className={selectedSurvey.elderlySchemesReceived ? styles.yes : styles.no}>
                      {selectedSurvey.elderlySchemesReceived ? 'Yes' : 'No'}
                    </span>
                  </div>
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
                    <label>Employment Schemes Aware:</label>
                    <span className={selectedSurvey.employmentSchemesAware ? styles.yes : styles.no}>
                      {selectedSurvey.employmentSchemesAware ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Employment Schemes Applied:</label>
                    <span className={selectedSurvey.employmentSchemesApplied ? styles.yes : styles.no}>
                      {selectedSurvey.employmentSchemesApplied ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className={styles.detailSection}>
                <h3>🏦 Bank Details</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Bank Account:</label>
                    <span className={selectedSurvey.bankAccount ? styles.yes : styles.no}>
                      {selectedSurvey.bankAccount ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {selectedSurvey.bankAccount && (
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
                    </>
                  )}
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