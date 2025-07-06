export default async function handler(req, res) {
  console.log('=== TEST SURVEY API ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  res.status(200).json({
    success: true,
    message: 'Survey API test endpoint is working',
    method: req.method,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
} 