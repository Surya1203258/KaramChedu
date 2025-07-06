import mongoose from 'mongoose';

// TODO: Replace with your actual MongoDB connection string
const uri = 'mongodb://localhost:27017/YOUR_DB_NAME';

async function cleanup() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const SurveyInfo = mongoose.connection.collection('SurveyInfo');
    const result = await SurveyInfo.updateMany(
      {},
      { $unset: { headOfFamily: '', familyName: '' } }
    );
    console.log('Documents updated:', result.modifiedCount);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Cleanup failed:', err);
    process.exit(1);
  }
}

cleanup(); 