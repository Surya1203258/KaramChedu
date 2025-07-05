import mongoose from 'mongoose';

const KaramCheduSchema = new mongoose.Schema({
  // Basic Information
  familyName: {
    type: String,
    required: true,
    trim: true
  },
  headOfFamily: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  bplCardNumber: {
    type: String,
    trim: true
  },
  aadharNumber: {
    type: String,
    trim: true
  },
  
  // Family Composition
  totalFamilyMembers: {
    type: Number,
    required: true,
    min: 1
  },
  childrenUnder18: {
    type: Number,
    default: 0
  },
  elderlyAbove85: {
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
    enum: ['School Fees', 'Books & Stationery', 'Uniform', 'Transportation', 'Mid-day Meals', 'Scholarship', 'Other', 'None'],
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
    enum: ['Ayushman Bharat', 'PM-JAY', 'State Health Insurance', 'Private Insurance', 'None'],
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
  elderlyPensionAmount: {
    type: Number,
    default: 0
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
    enum: ['Job Training', 'Financial Assistance', 'Equipment', 'Other', 'None'],
    default: 'None'
  },
  
  // Bank Information
  bankAccount: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  bankName: {
    type: String,
    trim: true
  },
  accountNumber: {
    type: String,
    trim: true
  },
  ifscCode: {
    type: String,
    trim: true
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
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
KaramCheduSchema.index({ familyName: 1 });
KaramCheduSchema.index({ bplCardNumber: 1 });
KaramCheduSchema.index({ priorityLevel: 1 });
KaramCheduSchema.index({ status: 1 });
KaramCheduSchema.index({ surveyDate: -1 });
KaramCheduSchema.index({ needsImmediateHelp: 1 });
KaramCheduSchema.index({ helpPriority: 1 });

// Change the collection name to 'SurveyInfo' while keeping the database as 'KaramChedu'
export default mongoose.models.SurveyInfo || mongoose.model('SurveyInfo', KaramCheduSchema, 'SurveyInfo'); 