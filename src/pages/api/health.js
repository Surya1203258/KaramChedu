import connectDB from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    // Test database connection
    await connectDB();
    
    res.status(200).json({ 
      status: 'healthy',
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 