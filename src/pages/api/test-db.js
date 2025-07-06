import connectDB from '../../lib/dbConnect';
import KaramCheduSurvey from '../../models/KaramCheduSurvey';

export default async function handler(req, res) {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await connectDB();
    console.log('Database connection successful');
    
    // Test model creation
    const testSurvey = new KaramCheduSurvey({
      fullName: 'Test User',
      contactNumber: '1234567890',
      address: 'Test Address',
      totalFamilyMembers: 1
    });
    
    console.log('Test survey model created successfully');
    
    // Test collection access
    const count = await KaramCheduSurvey.countDocuments();
    console.log(`Current survey count: ${count}`);
    
    res.status(200).json({
      success: true,
      message: 'Database connection and model test successful',
      surveyCount: count,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
} 