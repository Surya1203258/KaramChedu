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
  elderlyAbove60: {
    type: Number,
    default: 0
  },
  disabledMembers: {
    type: Number,
    default: 0
  },
  
  // Education Details
  childrenInSchool: {
    type: Number,
    default: 0
  },
  childrenDroppedOut: {
    type: Number,
    default: 0
  },
  educationSchemesAware: {
    type: Boolean,
    default: false
  },
  educationSchemesApplied: {
    type: Boolean,
    default: false
  },
  educationSchemesReceived: {
    type: Boolean,
    default: false
  },
  educationNeeds: [{
    type: String,
    enum: ['School Fees', 'Books & Stationery', 'Uniform', 'Transportation', 'Mid-day Meals', 'Scholarship', 'Other']
  }],
  educationBarriers: [{
    type: String,
    enum: ['Financial Constraints', 'Distance to School', 'Lack of Awareness', 'Family Pressure', 'Health Issues', 'Other']
  }],
  
  // Health Details
  healthInsurance: {
    type: Boolean,
    default: false
  },
  healthInsuranceType: {
    type: String,
    enum: ['Ayushman Bharat', 'PM-JAY', 'State Health Insurance', 'Private Insurance', 'None']
  },
  chronicDiseases: {
    type: Boolean,
    default: false
  },
  chronicDiseaseDetails: {
    type: String,
    trim: true
  },
  regularMedication: {
    type: Boolean,
    default: false
  },
  nearestHospital: {
    type: String,
    trim: true
  },
  hospitalDistance: {
    type: Number, // in kilometers
    default: 0
  },
  healthSchemesAware: {
    type: Boolean,
    default: false
  },
  healthSchemesApplied: {
    type: Boolean,
    default: false
  },
  healthSchemesReceived: {
    type: Boolean,
    default: false
  },
  healthNeeds: [{
    type: String,
    enum: ['Medical Checkup', 'Medicines', 'Surgery', 'Dental Care', 'Eye Care', 'Maternal Care', 'Child Vaccination', 'Other']
  }],
  
  // Elder Care Details
  elderlyCareNeeded: {
    type: Boolean,
    default: false
  },
  elderlyCareType: [{
    type: String,
    enum: ['Medical Care', 'Financial Support', 'Home Care', 'Day Care', 'Pension', 'Other']
  }],
  elderlyPension: {
    type: Boolean,
    default: false
  },
  elderlyPensionAmount: {
    type: Number,
    default: 0
  },
  elderlySchemesAware: {
    type: Boolean,
    default: false
  },
  elderlySchemesApplied: {
    type: Boolean,
    default: false
  },
  elderlySchemesReceived: {
    type: Boolean,
    default: false
  },
  
  // Employment & Income
  primaryOccupation: {
    type: String,
    trim: true
  },
  monthlyIncome: {
    type: Number,
    default: 0
  },
  employmentSchemesAware: {
    type: Boolean,
    default: false
  },
  employmentSchemesApplied: {
    type: Boolean,
    default: false
  },
  
  // Additional Information
  bankAccount: {
    type: Boolean,
    default: false
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

// Change the collection name to 'SurveyInfo' while keeping the database as 'KaramChedu'
export default mongoose.models.SurveyInfo || mongoose.model('SurveyInfo', KaramCheduSchema, 'SurveyInfo'); 