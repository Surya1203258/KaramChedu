import connectDB from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    console.log('=== RENDER HEALTH CHECK ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    // Test database connection
    await connectDB();
    console.log('Database connection successful on Render');
    
    res.status(200).json({
      success: true,
      message: 'Render deployment is healthy',
      environment: process.env.NODE_ENV,
      database: 'Connected',
      timestamp: new Date().toISOString(),
      platform: 'Render'
    });
    
  } catch (error) {
    console.error('Render health check failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      platform: 'Render'
    });
  }
} 