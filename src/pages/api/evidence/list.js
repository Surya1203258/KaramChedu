import connectDB from '../../../lib/mongodb';
import Evidence from '../../../models/Evidence';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const evidence = await Evidence.find({})
      .select('case title')
      .lean();

    return res.status(200).json(evidence);
  } catch (error) {
    console.error('Error fetching evidence:', error);
    return res.status(500).json({ message: 'Error fetching evidence' });
  }
} 