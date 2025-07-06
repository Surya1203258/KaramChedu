export default async function handler(req, res) {
  console.log('=== DEBUG ENVIRONMENT VARIABLES ===');
  
  // Check if MongoDB URI is set (without exposing the actual value)
  const hasMongoDBUri = !!process.env.MONGODB_URI;
  const mongoDBUriLength = process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0;
  
  console.log('MONGODB_URI exists:', hasMongoDBUri);
  console.log('MONGODB_URI length:', mongoDBUriLength);
  
  res.status(200).json({
    success: true,
    message: 'Environment variables debug',
    hasMongoDBUri,
    mongoDBUriLength,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    // Don't expose actual values for security
    environmentVariables: {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI_SET: hasMongoDBUri,
      NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL_SET: !!process.env.NEXTAUTH_URL
    }
  });
} 