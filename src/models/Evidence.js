import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  resolution: {
    type: String,
    required: true
  },
  case: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  evidence: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  }
});

// Create a compound index for better query performance
evidenceSchema.index({ title: 1, resolution: 1 });

export default mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema); 