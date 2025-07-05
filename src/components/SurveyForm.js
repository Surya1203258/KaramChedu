import { useState } from 'react';
import styles from '../styles/SurveyForm.module.css';

export default function SurveyForm({ setIsLoading }) {
  const [formData, setFormData] = useState({
    // Basic Information
    familyName: '',
    headOfFamily: '',
    contactNumber: '',
    address: '',
    bplCardNumber: '',
    aadharNumber: '',
    
    // Family Composition
    totalFamilyMembers: 1,
    childrenUnder18: 0,
    elderlyAbove85: 0,
    disabledMembers: 0,
    
    // Education Information
    childrenInSchool: 0,
    childrenDroppedOut: 0,
    educationHelpNeeded: 'No',
    educationHelpType: 'None',
    
    // Health Information
    healthInsurance: 'No',
    healthInsuranceType: 'None',
    chronicDiseases: 'No',
    chronicDiseaseDetails: '',
    regularMedication: 'No',
    nearestHospital: '',
    hospitalDistance: 0,
    healthHelpNeeded: 'No',
    healthHelpType: 'None',
    
    // Elder Care Information
    elderlyCareNeeded: 'No',
    elderlyCareType: 'None',
    elderlyPension: 'No',
    elderlyPensionAmount: 0,
    
    // Employment & Income Information
    primaryOccupation: '',
    monthlyIncome: 0,
    employmentHelpNeeded: 'No',
    employmentHelpType: 'None',
    
    // Bank Information
    bankAccount: 'No',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Survey Metadata
    surveyorName: '',
    notes: '',
    priorityLevel: 'Medium',
    status: 'Surveyed',
    
    // Overall Help Assessment
    needsImmediateHelp: 'No',
    helpPriority: 'None'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Survey data saved successfully!');
        // Reset form
        setFormData({
          familyName: '',
          headOfFamily: '',
          contactNumber: '',
          address: '',
          bplCardNumber: '',
          aadharNumber: '',
          totalFamilyMembers: 1,
          childrenUnder18: 0,
          elderlyAbove85: 0,
          disabledMembers: 0,
          childrenInSchool: 0,
          childrenDroppedOut: 0,
          educationHelpNeeded: 'No',
          educationHelpType: 'None',
          healthInsurance: 'No',
          healthInsuranceType: 'None',
          chronicDiseases: 'No',
          chronicDiseaseDetails: '',
          regularMedication: 'No',
          nearestHospital: '',
          hospitalDistance: 0,
          healthHelpNeeded: 'No',
          healthHelpType: 'None',
          elderlyCareNeeded: 'No',
          elderlyCareType: 'None',
          elderlyPension: 'No',
          elderlyPensionAmount: 0,
          primaryOccupation: '',
          monthlyIncome: 0,
          employmentHelpNeeded: 'No',
          employmentHelpType: 'None',
          bankAccount: 'No',
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          surveyorName: '',
          notes: '',
          priorityLevel: 'Medium',
          status: 'Surveyed',
          needsImmediateHelp: 'No',
          helpPriority: 'None'
        });
        setCurrentStep(1);
      } else {
        setMessage('Error saving survey data: ' + result.message);
      }
    } catch (error) {
      setMessage('Error saving survey data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep1 = () => (
    <div className={styles.formSection}>
      <h3>Basic Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Family Name *</label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Head of Family *</label>
          <input
            type="text"
            name="headOfFamily"
            value={formData.headOfFamily}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>BPL Card Number</label>
          <input
            type="text"
            name="bplCardNumber"
            value={formData.bplCardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h3>Family Composition</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Total Family Members *</label>
          <input
            type="number"
            name="totalFamilyMembers"
            value={formData.totalFamilyMembers}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Children Under 18</label>
          <input
            type="number"
            name="childrenUnder18"
            value={formData.childrenUnder18}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Elderly Above 85</label>
          <input
            type="number"
            name="elderlyAbove85"
            value={formData.elderlyAbove85}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Disabled Members</label>
          <input
            type="number"
            name="disabledMembers"
            value={formData.disabledMembers}
            onChange={handleInputChange}
            min="0"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.formSection}>
      <h3>Education Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Children in School</label>
          <input
            type="number"
            name="childrenInSchool"
            value={formData.childrenInSchool}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Children Dropped Out</label>
          <input
            type="number"
            name="childrenDroppedOut"
            value={formData.childrenDroppedOut}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Do they need education help?</label>
          <select
            name="educationHelpNeeded"
            value={formData.educationHelpNeeded}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Type of Education Help Needed</label>
          <select
            name="educationHelpType"
            value={formData.educationHelpType}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="School Fees">School Fees</option>
            <option value="Books & Stationery">Books & Stationery</option>
            <option value="Uniform">Uniform</option>
            <option value="Transportation">Transportation</option>
            <option value="Mid-day Meals">Mid-day Meals</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <h3>Health Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Do they have health insurance?</label>
          <select
            name="healthInsurance"
            value={formData.healthInsurance}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Type of Health Insurance</label>
          <select
            name="healthInsuranceType"
            value={formData.healthInsuranceType}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Ayushman Bharat">Ayushman Bharat</option>
            <option value="PM-JAY">PM-JAY</option>
            <option value="State Health Insurance">State Health Insurance</option>
            <option value="Private Insurance">Private Insurance</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do they have chronic diseases?</label>
          <select
            name="chronicDiseases"
            value={formData.chronicDiseases}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do they take regular medication?</label>
          <select
            name="regularMedication"
            value={formData.regularMedication}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Nearest Hospital</label>
          <input
            type="text"
            name="nearestHospital"
            value={formData.nearestHospital}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Distance to Hospital (km)</label>
          <input
            type="number"
            name="hospitalDistance"
            value={formData.hospitalDistance}
            onChange={handleInputChange}
            min="0"
            step="0.1"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Do they need health help?</label>
          <select
            name="healthHelpNeeded"
            value={formData.healthHelpNeeded}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Type of Health Help Needed</label>
          <select
            name="healthHelpType"
            value={formData.healthHelpType}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Medical Checkup">Medical Checkup</option>
            <option value="Medicines">Medicines</option>
            <option value="Surgery">Surgery</option>
            <option value="Dental Care">Dental Care</option>
            <option value="Eye Care">Eye Care</option>
            <option value="Maternal Care">Maternal Care</option>
            <option value="Child Vaccination">Child Vaccination</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {formData.chronicDiseases === 'Yes' && (
        <div className={styles.formGroup}>
          <label>Chronic Disease Details</label>
          <textarea
            name="chronicDiseaseDetails"
            value={formData.chronicDiseaseDetails}
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.formSection}>
      <h3>Elder Care Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Do they need elderly care?</label>
          <select
            name="elderlyCareNeeded"
            value={formData.elderlyCareNeeded}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Type of Elder Care Needed</label>
          <select
            name="elderlyCareType"
            value={formData.elderlyCareType}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Medical Care">Medical Care</option>
            <option value="Financial Support">Financial Support</option>
            <option value="Home Care">Home Care</option>
            <option value="Day Care">Day Care</option>
            <option value="Pension">Pension</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do they receive elderly pension?</label>
          <select
            name="elderlyPension"
            value={formData.elderlyPension}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.elderlyPension === 'Yes' && (
          <div className={styles.formGroup}>
            <label>Elderly Pension Amount (₹)</label>
            <input
              type="number"
              name="elderlyPensionAmount"
              value={formData.elderlyPensionAmount}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        )}
      </div>

      <h3>Employment & Income Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Primary Occupation</label>
          <input
            type="text"
            name="primaryOccupation"
            value={formData.primaryOccupation}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Monthly Income (₹)</label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Do they need employment help?</label>
          <select
            name="employmentHelpNeeded"
            value={formData.employmentHelpNeeded}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Type of Employment Help Needed</label>
          <select
            name="employmentHelpType"
            value={formData.employmentHelpType}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Job Training">Job Training</option>
            <option value="Financial Assistance">Financial Assistance</option>
            <option value="Equipment">Equipment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={styles.formSection}>
      <h3>Bank Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Do they have a bank account?</label>
          <select
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.bankAccount === 'Yes' && (
          <>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </div>

      <h3>Survey Details</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Surveyor Name</label>
          <input
            type="text"
            name="surveyorName"
            value={formData.surveyorName}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Priority Level</label>
          <select
            name="priorityLevel"
            value={formData.priorityLevel}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Surveyed">Surveyed</option>
            <option value="Under Review">Under Review</option>
            <option value="Assistance Provided">Assistance Provided</option>
            <option value="Follow-up Required">Follow-up Required</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do they need immediate help?</label>
          <select
            name="needsImmediateHelp"
            value={formData.needsImmediateHelp}
            onChange={handleInputChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Help Priority</label>
          <select
            name="helpPriority"
            value={formData.helpPriority}
            onChange={handleInputChange}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className={styles.surveyForm}>
      <div className={styles.formHeader}>
        <h2>Family Survey Form - Step {currentStep} of 4</h2>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepContent()}

        {message && (
          <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
            {message}
          </div>
        )}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className={styles.secondaryButton}>
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button type="button" onClick={nextStep} className={styles.primaryButton}>
              Next
            </button>
          ) : (
            <button type="submit" className={styles.primaryButton}>
              Submit Survey
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 