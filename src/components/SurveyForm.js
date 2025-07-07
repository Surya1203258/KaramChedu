import { useState } from 'react';
import styles from '../styles/SurveyForm.module.css';

export default function SurveyForm({ setIsLoading }) {
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    contactNumber: '',
    address: '',
    
    // Family Composition
    totalFamilyMembers: 1,
    childrenUnder18: 0,
    elderlyAbove65: 0,
    disabledMembers: 0,
    familyMembers: [
      { name: '', age: '', contact: '', employed: 'No' }
    ],
    
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
    
    // Employment & Income Information
    primaryOccupation: '',
    monthlyIncome: 0,
    employmentHelpNeeded: 'No',
    employmentHelpType: 'None',
    
    // New Employment Section
    openToSkillsDevelopment: '',
    openToVocationalTraining: '',
    willingToRelocate: '',
    
    // Bank Information
    bankAccount: 'No',
    
    // Survey Metadata
    surveyorName: '',
    notes: '',
    priorityLevel: 'Medium',
    status: 'Surveyed',
    
    // Overall Help Assessment
    helpPriority: 'None',
    
    // New fields
    caste: '',
    profession: '',
    monthlyIncomeBracket: '',
    attendsPrivateSchool: '',
    attendsTuitionOrOtherClasses: '',
    overallEducationCostBracket: '',
    hasLifeInsurance: '',
    numberOfElderlyAbove65: 0,
    willTakeFoodDelivery: '',
    willPayForFoodDelivery: '',
    needsMedicineDeliveryHelp: '',
    needsHospitalVisitHelp: '',
    needsHealthCheckupHelp: '',
    helpOpeningFixedDeposit: '',
    helpTakingLoan: '',
    helpWithDigitalPayments: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');
  const [step3Error, setStep3Error] = useState('');

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
    setStep3Error('');

    // Require helpOpeningFixedDeposit on submit
    if (!formData.helpOpeningFixedDeposit) {
      setStep3Error('Please select whether you need help opening a fixed deposit before submitting.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Submitting survey data...');
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let result;
      try {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        if (!responseText) {
          throw new Error('Empty response from server');
        }
        
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        console.error('Response was not valid JSON');
        setMessage(`Error saving survey data: Server returned invalid response (Status: ${response.status}). Please check the server logs.`);
        setIsLoading(false);
        return;
      }

      if (result.success) {
        setMessage('Survey data saved successfully!');
        // Reset form
        setFormData({
          fullName: '',
          contactNumber: '',
          address: '',
          totalFamilyMembers: 1,
          childrenUnder18: 0,
          elderlyAbove65: 0,
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
          primaryOccupation: '',
          monthlyIncome: 0,
          employmentHelpNeeded: 'No',
          employmentHelpType: 'None',
          openToSkillsDevelopment: '',
          openToVocationalTraining: '',
          willingToRelocate: '',
          bankAccount: 'No',
          surveyorName: '',
          notes: '',
          priorityLevel: 'Medium',
          status: 'Surveyed',
          helpPriority: 'None',
          caste: '',
          profession: '',
          monthlyIncomeBracket: '',
          attendsPrivateSchool: '',
          attendsTuitionOrOtherClasses: '',
          overallEducationCostBracket: '',
          hasLifeInsurance: '',
          numberOfElderlyAbove65: 0,
          willTakeFoodDelivery: '',
          willPayForFoodDelivery: '',
          needsMedicineDeliveryHelp: '',
          needsHospitalVisitHelp: '',
          needsHealthCheckupHelp: '',
          helpOpeningFixedDeposit: '',
          helpTakingLoan: '',
          helpWithDigitalPayments: '',
          familyMembers: [{ name: '', age: '', contact: '', employed: 'No' }]
        });
        setCurrentStep(1);
      } else {
        const errorMessage = result.error || result.details || 'Unknown error';
        console.error('Server error:', errorMessage);
        setMessage(`Error saving survey data: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      setMessage(`Error saving survey data: ${error.message || 'Network error - please check your connection'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setStep3Error('');
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep1 = () => (
    <div className={styles.formSection}>
      <h3>Basic Information</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
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
          <label>Elderly Above 65</label>
          <input
            type="number"
            name="elderlyAbove65"
            value={formData.elderlyAbove65}
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
      <h4>Family Members</h4>
      {formData.familyMembers.map((member, idx) => (
        <div key={idx} className={styles.formGrid} style={{ marginBottom: 8 }}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={member.name}
              onChange={e => {
                const updated = [...formData.familyMembers];
                updated[idx].name = e.target.value;
                setFormData(f => ({ ...f, familyMembers: updated }));
              }}
              placeholder={`Member ${idx + 1} Name`}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Age</label>
            <input
              type="number"
              value={member.age}
              onChange={e => {
                const updated = [...formData.familyMembers];
                updated[idx].age = e.target.value;
                setFormData(f => ({ ...f, familyMembers: updated }));
              }}
              placeholder="Age"
              min="0"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contact</label>
            <input
              type="text"
              value={member.contact}
              onChange={e => {
                const updated = [...formData.familyMembers];
                updated[idx].contact = e.target.value;
                setFormData(f => ({ ...f, familyMembers: updated }));
              }}
              placeholder="Contact"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Employed?</label>
            <select
              value={member.employed}
              onChange={e => {
                const updated = [...formData.familyMembers];
                updated[idx].employed = e.target.value;
                setFormData(f => ({ ...f, familyMembers: updated }));
              }}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <button type="button" onClick={() => {
            const updated = formData.familyMembers.filter((_, i) => i !== idx);
            setFormData(f => ({ ...f, familyMembers: updated.length ? updated : [{ name: '', age: '', contact: '', employed: 'No' }] }));
          }} style={{ marginLeft: 8 }} disabled={formData.familyMembers.length === 1}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => setFormData(f => ({ ...f, familyMembers: [...f.familyMembers, { name: '', age: '', contact: '', employed: 'No' }] }))}>Add Family Member</button>
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
            <option value="Dinner">Dinner</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Tuition">Tuition</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Are they going to private school?</label>
          <select name="attendsPrivateSchool" value={formData.attendsPrivateSchool} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Are they going to tuition or other classes?</label>
          <select name="attendsTuitionOrOtherClasses" value={formData.attendsTuitionOrOtherClasses} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Overall cost for kids (per year)</label>
          <select name="overallEducationCostBracket" value={formData.overallEducationCostBracket} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="<10,000">Less than 10,000</option>
            <option value="10,000-20,000">10,000 - 20,000</option>
            <option value="20,000-30,000">20,000 - 30,000</option>
            <option value="30,000-50,000">30,000 - 50,000</option>
            <option value="50,000+">50,000+</option>
          </select>
        </div>
      </div>

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
        <div className={styles.formGroup}>
          <label>Number of elderly (65+)</label>
          <input type="number" name="numberOfElderlyAbove65" value={formData.numberOfElderlyAbove65} min={0} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Will you take food delivered?</label>
          <select name="willTakeFoodDelivery" value={formData.willTakeFoodDelivery} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Will you pay for food delivery?</label>
          <select name="willPayForFoodDelivery" value={formData.willPayForFoodDelivery} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help with medicines delivery?</label>
          <select name="needsMedicineDeliveryHelp" value={formData.needsMedicineDeliveryHelp} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help with hospital visits?</label>
          <select name="needsHospitalVisitHelp" value={formData.needsHospitalVisitHelp} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help with checking BP/sugar, etc?</label>
          <select name="needsHealthCheckupHelp" value={formData.needsHealthCheckupHelp} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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
            <option value="Argyo Shree">Argyo Shree</option>
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
        <div className={styles.formGroup}>
          <label>Do you have life insurance?</label>
          <select name="hasLifeInsurance" value={formData.hasLifeInsurance} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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

      <h3>Employment Section</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Are you open to skills development course for Employment?</label>
          <select
            name="openToSkillsDevelopment"
            value={formData.openToSkillsDevelopment}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Are you open to Vocational training Programmes?</label>
          <select
            name="openToVocationalTraining"
            value={formData.openToVocationalTraining}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Are you willing to relocate to any other city for employment?</label>
          <select
            name="willingToRelocate"
            value={formData.willingToRelocate}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
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
      </div>

      <h3>Financial Services</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Caste</label>
          <select name="caste" value={formData.caste} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="OC">OC</option>
            <option value="BC">BC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="Minority">Minority</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Profession</label>
          <select name="profession" value={formData.profession} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Job">Job</option>
            <option value="Not working">Not working</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Monthly Income Bracket</label>
          <select name="monthlyIncomeBracket" value={formData.monthlyIncomeBracket} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="<10,000">Less than 10,000</option>
            <option value="10,000-20,000">10,000 - 20,000</option>
            <option value="20,000-30,000">20,000 - 30,000</option>
            <option value="30,000-50,000">30,000 - 50,000</option>
            <option value="50,000+">50,000+</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help opening a fixed deposit? <span style={{color:'red'}}>*</span></label>
          <select name="helpOpeningFixedDeposit" value={formData.helpOpeningFixedDeposit} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help taking a loan?</label>
          <select name="helpTakingLoan" value={formData.helpTakingLoan} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Do you need help with digital payments?</label>
          <select name="helpWithDigitalPayments" value={formData.helpWithDigitalPayments} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      {step3Error && <div className={styles.error}>{step3Error}</div>}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return renderStep1();
    }
  };

  return (
    <div className={styles.surveyForm}>
      <div className={styles.formHeader}>
        <h2>Family Survey Form - Step {currentStep} of 3</h2>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} onKeyDown={e => { if (e.key === 'Enter' && currentStep !== 3) e.preventDefault(); }}>
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
          
          {currentStep < 3 ? (
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