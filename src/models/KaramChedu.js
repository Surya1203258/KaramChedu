import mongoose from 'mongoose';

const KaramCheduSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  
  // Family Composition
  totalFamilyMembers: {
    type: Number,
    default: 1
  },
  childrenUnder18: {
    type: Number,
    default: 0
  },
  elderlyAbove65: {
    type: Number,
    default: 0
  },
  disabledMembers: {
    type: Number,
    default: 0
  },
  
  // Education Information
  childrenInSchool: {
    type: Number,
    default: 0
  },
  childrenDroppedOut: {
    type: Number,
    default: 0
  },
  educationHelpNeeded: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  educationHelpType: {
    type: String,
    enum: ['School Fees', 'Books & Stationery', 'Uniform', 'Transportation', 'Dinner', 'Breakfast', 'Tuition', 'Scholarship', 'Other', 'None'],
    default: 'None'
  },
  
  // Health Information
  healthInsurance: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  healthInsuranceType: {
    type: String,
    enum: ['Ayushman Bharat', 'PM-JAY', 'State Health Insurance', 'Private Insurance', 'Argyo Shree', 'None'],
    default: 'None'
  },
  chronicDiseases: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  chronicDiseaseDetails: {
    type: String,
    trim: true
  },
  regularMedication: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  nearestHospital: {
    type: String,
    trim: true
  },
  hospitalDistance: {
    type: Number,
    default: 0
  },
  healthHelpNeeded: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  healthHelpType: {
    type: String,
    enum: ['Medical Checkup', 'Medicines', 'Surgery', 'Dental Care', 'Eye Care', 'Maternal Care', 'Child Vaccination', 'Other', 'None'],
    default: 'None'
  },
  
  // Elder Care Information
  elderlyCareNeeded: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  elderlyCareType: {
    type: String,
    enum: ['Medical Care', 'Financial Support', 'Home Care', 'Day Care', 'Pension', 'Other', 'None'],
    default: 'None'
  },
  elderlyPension: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  
  // Employment & Income Information
  primaryOccupation: {
    type: String,
    trim: true
  },
  monthlyIncome: {
    type: Number,
    default: 0
  },
  employmentHelpNeeded: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  employmentHelpType: {
    type: String,
    enum: ['None', 'Job Search', 'Skill Training', 'Financial Support', 'Other'],
    default: 'None'
  },
  
  // Bank Information
  bankAccount: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  
  // Survey Metadata
  surveyDate: {
    type: Date,
    default: Date.now
  },
  surveyorName: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  
  // Priority Level (for government assistance)
  priorityLevel: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  
  // Status
  status: {
    type: String,
    enum: ['Surveyed', 'Under Review', 'Assistance Provided', 'Follow-up Required'],
    default: 'Surveyed'
  },
  
  // Overall Help Assessment
  needsImmediateHelp: {
    type: String,
    enum: ['Yes', 'No', 'Maybe'],
    default: 'No'
  },
  helpPriority: {
    type: String,
    enum: ['Very High', 'High', 'Medium', 'Low', 'None'],
    default: 'None'
  },
  
  // Additional fields
  caste: {
    type: String,
    enum: ['FC', 'BC', 'SC']
  },
  profession: {
    type: String,
    enum: ['Agriculture', 'Job', 'Not working']
  },
  monthlyIncomeBracket: {
    type: String,
    enum: ['<10,000', '10,000-20,000', '20,000-30,000', '30,000-50,000', '50,000+']
  },
  attendsPrivateSchool: {
    type: String,
    enum: ['Yes', 'No']
  },
  attendsTuitionOrOtherClasses: {
    type: String,
    enum: ['Yes', 'No']
  },
  overallEducationCostBracket: {
    type: String,
    enum: ['<10,000', '10,000-20,000', '20,000-30,000', '30,000-50,000', '50,000+']
  },
  hasLifeInsurance: {
    type: String,
    enum: ['Yes', 'No']
  },
  numberOfElderlyAbove65: {
    type: Number,
    default: 0
  },
  willTakeFoodDelivery: {
    type: String,
    enum: ['Yes', 'No']
  },
  willPayForFoodDelivery: {
    type: String,
    enum: ['Yes', 'No']
  },
  willTakeFoodIfFree: {
    type: String,
    enum: ['Yes', 'No']
  },
  needsMedicineDeliveryHelp: {
    type: String,
    enum: ['Yes', 'No']
  },
  needsHospitalVisitHelp: {
    type: String,
    enum: ['Yes', 'No']
  },
  needsHealthCheckupHelp: {
    type: String,
    enum: ['Yes', 'No']
  },
  helpOpeningFixedDeposit: {
    type: String,
    enum: ['Yes', 'No']
  },
  helpTakingLoan: {
    type: String,
    enum: ['Yes', 'No']
  },
  helpWithDigitalPayments: {
    type: String,
    enum: ['Yes', 'No']
  },
  familyMemberNames: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Create indexes for better query performance
KaramCheduSchema.index({ fullName: 1 });
KaramCheduSchema.index({ priorityLevel: 1 });
KaramCheduSchema.index({ status: 1 });
KaramCheduSchema.index({ surveyDate: -1 });
KaramCheduSchema.index({ needsImmediateHelp: 1 });
KaramCheduSchema.index({ helpPriority: 1 });

// Change the collection name to 'SurveyInfo' while keeping the database as 'KaramChedu'
export default mongoose.models.SurveyInfo || mongoose.model('SurveyInfo', KaramCheduSchema, 'SurveyInfo'); 