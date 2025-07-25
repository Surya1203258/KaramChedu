import mongoose from 'mongoose';

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  age: { type: Number },
  contact: { type: String, trim: true },
  employed: { type: String, enum: ['Yes', 'No'], default: 'No' }
}, { _id: false });

const KaramCheduSurveySchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  contactNumber: { type: String, trim: true },
  address: { type: String, trim: true },
  totalFamilyMembers: { type: Number, default: 1 },
  childrenUnder18: { type: Number, default: 0 },
  elderlyAbove65: { type: Number, default: 0 },
  disabledMembers: { type: Number, default: 0 },
  familyMembers: [FamilyMemberSchema],
  childrenInSchool: { type: Number, default: 0 },
  childrenDroppedOut: { type: Number, default: 0 },
  educationHelpNeeded: { type: String, default: 'No' },
  educationHelpType: { type: String, default: 'None' },
  healthInsurance: { type: String, default: 'No' },
  healthInsuranceType: { type: String, default: 'None' },
  chronicDiseases: { type: String, default: 'No' },
  chronicDiseaseDetails: { type: String, trim: true },
  regularMedication: { type: String, default: 'No' },
  nearestHospital: { type: String, trim: true },
  hospitalDistance: { type: Number, default: 0 },
  healthHelpNeeded: { type: String, default: 'No' },
  healthHelpType: { type: String, default: 'None' },
  elderlyCareNeeded: { type: String, default: 'No' },
  elderlyCareType: { type: String, default: 'None' },
  elderlyPension: { type: String, default: 'No' },
  primaryOccupation: { type: String, trim: true },
  monthlyIncome: { type: Number, default: 0 },
  employmentHelpNeeded: { type: String, default: 'No' },
  employmentHelpType: { type: String, default: 'None' },
  openToSkillsDevelopment: { type: String },
  openToVocationalTraining: { type: String },
  willingToRelocate: { type: String },
  bankAccount: { type: String, default: 'No' },
  surveyorName: { type: String, trim: true },
  notes: { type: String, trim: true },
  priorityLevel: { type: String, default: 'Medium' },
  status: { type: String, default: 'Surveyed' },
  helpPriority: { type: String, default: 'None' },
  caste: { type: String },
  profession: { type: String },
  monthlyIncomeBracket: { type: String },
  attendsPrivateSchool: { type: String },
  attendsTuitionOrOtherClasses: { type: String },
  overallEducationCostBracket: { type: String },
  hasLifeInsurance: { type: String },
  numberOfElderlyAbove65: { type: Number, default: 0 },
  willTakeFoodDelivery: { type: String },
  willPayForFoodDelivery: { type: String },
  needsMedicineDeliveryHelp: { type: String },
  needsHospitalVisitHelp: { type: String },
  needsHealthCheckupHelp: { type: String },
  helpOpeningFixedDeposit: { type: String },
  helpTakingLoan: { type: String },
  helpWithDigitalPayments: { type: String }
}, { timestamps: true });

export default mongoose.models.KaramCheduSurvey || mongoose.model('KaramCheduSurvey', KaramCheduSurveySchema, 'VillageSurvey2024'); 