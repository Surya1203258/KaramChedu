import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from '../../../lib/mongodb';
import Evidence from '../../../models/Evidence';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Evidence ID is required' });
    }

    if (req.method === 'GET') {
      const evidence = await Evidence.findById(id);
      if (!evidence) {
        return res.status(404).json({ message: 'Evidence not found' });
      }
      return res.status(200).json(evidence);
    }

    if (req.method === 'PUT') {
      const updatedEvidence = await Evidence.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      
      if (!updatedEvidence) {
        return res.status(404).json({ message: 'Evidence not found' });
      }
      
      return res.status(200).json(updatedEvidence);
    }

    if (req.method === 'DELETE') {
      const deletedEvidence = await Evidence.findByIdAndDelete(id);
      if (!deletedEvidence) {
        return res.status(404).json({ message: 'Evidence not found' });
      }
      return res.status(200).json({ message: 'Evidence deleted successfully' });
    }
  } catch (error) {
    console.error('Error handling evidence:', error);
    return res.status(500).json({ message: 'Error handling evidence' });
  }
} 