import dbConnect from '../../../lib/dbConnect';
import KaramCheduSurvey from '../../../models/KaramCheduSurvey';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleted = await KaramCheduSurvey.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Survey not found' });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to delete survey' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 