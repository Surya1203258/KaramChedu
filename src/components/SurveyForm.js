import { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../styles/SurveyForm.module.css';

export default function SurveyForm({ setIsLoading }) {
  const { data: session } = useSession();
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
    elderlyAbove60: 0,
    disabledMembers: 0,
    
    // Education Details
    childrenInSchool: 0,
    childrenDroppedOut: 0,
    educationSchemesAware: false,
    educationSchemesApplied: false,
    educationSchemesReceived: false,
    educationNeeds: [],
    educationBarriers: [],
    
    // Health Details
    healthInsurance: false,
    healthInsuranceType: 'None',
    chronicDiseases: false,
    chronicDiseaseDetails: '',
    regularMedication: false,
    nearestHospital: '',
    hospitalDistance: 0,
    healthSchemesAware: false,
    healthSchemesApplied: false,
    healthSchemesReceived: false,
    healthNeeds: [],
    
    // Elder Care Details
    elderlyCareNeeded: false,
    elderlyCareType: [],
    elderlyPension: false,
    elderlyPensionAmount: 0,
    elderlySchemesAware: false,
    elderlySchemesApplied: false,
    elderlySchemesReceived: false,
    
    // Employment & Income
    primaryOccupation: '',
    monthlyIncome: 0,
    employmentSchemesAware: false,
    employmentSchemesApplied: false,
    
    // Additional Information
    bankAccount: false,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Survey Metadata
    surveyorName: session?.user?.name || '',
    notes: '',
    priorityLevel: 'Medium',
    status: 'Surveyed'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
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
          elderlyAbove60: 0,
          disabledMembers: 0,
          childrenInSchool: 0,
          childrenDroppedOut: 0,
          educationSchemesAware: false,
          educationSchemesApplied: false,
          educationSchemesReceived: false,
          educationNeeds: [],
          educationBarriers: [],
          healthInsurance: false,
          healthInsuranceType: 'None',
          chronicDiseases: false,
          chronicDiseaseDetails: '',
          regularMedication: false,
          nearestHospital: '',
          hospitalDistance: 0,
          healthSchemesAware: false,
          healthSchemesApplied: false,
          healthSchemesReceived: false,
          healthNeeds: [],
          elderlyCareNeeded: false,
          elderlyCareType: [],
          elderlyPension: false,
          elderlyPensionAmount: 0,
          elderlySchemesAware: false,
          elderlySchemesApplied: false,
          elderlySchemesReceived: false,
          primaryOccupation: '',
          monthlyIncome: 0,
          employmentSchemesAware: false,
          employmentSchemesApplied: false,
          bankAccount: false,
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          surveyorName: session?.user?.name || '',
          notes: '',
          priorityLevel: 'Medium',
          status: 'Surveyed'
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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
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
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.formSection}>
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
          <label>Elderly Above 60</label>
          <input
            type="number"
            name="elderlyAbove60"
            value={formData.elderlyAbove60}
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

      <h3>Education Details</h3>
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
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="educationSchemesAware"
            checked={formData.educationSchemesAware}
            onChange={handleInputChange}
          />
          Aware of Education Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="educationSchemesApplied"
            checked={formData.educationSchemesApplied}
            onChange={handleInputChange}
          />
          Applied for Education Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="educationSchemesReceived"
            checked={formData.educationSchemesReceived}
            onChange={handleInputChange}
          />
          Received Education Schemes
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>Education Needs (Select all that apply)</label>
        <div className={styles.checkboxGrid}>
          {['School Fees', 'Books & Stationery', 'Uniform', 'Transportation', 'Mid-day Meals', 'Scholarship', 'Other'].map(need => (
            <label key={need}>
              <input
                type="checkbox"
                checked={formData.educationNeeds.includes(need)}
                onChange={(e) => handleArrayChange('educationNeeds', need, e.target.checked)}
              />
              {need}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.formSection}>
      <h3>Health Details</h3>
      <div className={styles.formGrid}>
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
      </div>

      <div className={styles.formGroup}>
        <label>Health Insurance Type</label>
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

      <div className={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="healthInsurance"
            checked={formData.healthInsurance}
            onChange={handleInputChange}
          />
          Has Health Insurance
        </label>
        <label>
          <input
            type="checkbox"
            name="chronicDiseases"
            checked={formData.chronicDiseases}
            onChange={handleInputChange}
          />
          Has Chronic Diseases
        </label>
        <label>
          <input
            type="checkbox"
            name="regularMedication"
            checked={formData.regularMedication}
            onChange={handleInputChange}
          />
          Takes Regular Medication
        </label>
        <label>
          <input
            type="checkbox"
            name="healthSchemesAware"
            checked={formData.healthSchemesAware}
            onChange={handleInputChange}
          />
          Aware of Health Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="healthSchemesApplied"
            checked={formData.healthSchemesApplied}
            onChange={handleInputChange}
          />
          Applied for Health Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="healthSchemesReceived"
            checked={formData.healthSchemesReceived}
            onChange={handleInputChange}
          />
          Received Health Schemes
        </label>
      </div>

      {formData.chronicDiseases && (
        <div className={styles.formGroup}>
          <label>Chronic Disease Details</label>
          <textarea
            name="chronicDiseaseDetails"
            value={formData.chronicDiseaseDetails}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label>Health Needs (Select all that apply)</label>
        <div className={styles.checkboxGrid}>
          {['Medical Checkup', 'Medicines', 'Surgery', 'Dental Care', 'Eye Care', 'Maternal Care', 'Child Vaccination', 'Other'].map(need => (
            <label key={need}>
              <input
                type="checkbox"
                checked={formData.healthNeeds.includes(need)}
                onChange={(e) => handleArrayChange('healthNeeds', need, e.target.checked)}
              />
              {need}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={styles.formSection}>
      <h3>Elder Care Details</h3>
      <div className={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="elderlyCareNeeded"
            checked={formData.elderlyCareNeeded}
            onChange={handleInputChange}
          />
          Elderly Care Needed
        </label>
        <label>
          <input
            type="checkbox"
            name="elderlyPension"
            checked={formData.elderlyPension}
            onChange={handleInputChange}
          />
          Receives Elderly Pension
        </label>
        <label>
          <input
            type="checkbox"
            name="elderlySchemesAware"
            checked={formData.elderlySchemesAware}
            onChange={handleInputChange}
          />
          Aware of Elderly Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="elderlySchemesApplied"
            checked={formData.elderlySchemesApplied}
            onChange={handleInputChange}
          />
          Applied for Elderly Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="elderlySchemesReceived"
            checked={formData.elderlySchemesReceived}
            onChange={handleInputChange}
          />
          Received Elderly Schemes
        </label>
      </div>

      {formData.elderlyPension && (
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

      <div className={styles.formGroup}>
        <label>Elder Care Type (Select all that apply)</label>
        <div className={styles.checkboxGrid}>
          {['Medical Care', 'Financial Support', 'Home Care', 'Day Care', 'Pension', 'Other'].map(type => (
            <label key={type}>
              <input
                type="checkbox"
                checked={formData.elderlyCareType.includes(type)}
                onChange={(e) => handleArrayChange('elderlyCareType', type, e.target.checked)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <h3>Employment & Income</h3>
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
      </div>

      <div className={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="employmentSchemesAware"
            checked={formData.employmentSchemesAware}
            onChange={handleInputChange}
          />
          Aware of Employment Schemes
        </label>
        <label>
          <input
            type="checkbox"
            name="employmentSchemesApplied"
            checked={formData.employmentSchemesApplied}
            onChange={handleInputChange}
          />
          Applied for Employment Schemes
        </label>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className={styles.formSection}>
      <h3>Bank Details</h3>
      <div className={styles.checkboxGroup}>
        <label>
          <input
            type="checkbox"
            name="bankAccount"
            checked={formData.bankAccount}
            onChange={handleInputChange}
          />
          Has Bank Account
        </label>
      </div>

      {formData.bankAccount && (
        <div className={styles.formGrid}>
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
        </div>
      )}

      <h3>Survey Details</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Priority Level</label>
          <select
            name="priorityLevel"
            value={formData.priorityLevel}
            onChange={handleInputChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className={styles.surveyForm}>
      <div className={styles.formHeader}>
        <h2>Family Survey Form - Step {currentStep} of 5</h2>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / 5) * 100}%` }}
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
          
          {currentStep < 5 ? (
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