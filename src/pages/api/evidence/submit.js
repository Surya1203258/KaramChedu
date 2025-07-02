import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from '../../../lib/mongodb';
import Evidence from '../../../models/Evidence';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await connectDB();

    // Get the latest serial number
    const latestEvidence = await Evidence.findOne().sort({ serialNumber: -1 });
    const nextSerialNumber = latestEvidence ? latestEvidence.serialNumber + 1 : 1;

    const evidence = new Evidence({
      ...req.body,
      serialNumber: nextSerialNumber,
      createdBy: session.user.email
    });

    await evidence.save();

    res.status(201).json({ message: 'Evidence submitted successfully', evidence });
  } catch (error) {
    console.error('Error submitting evidence:', error);
    res.status(500).json({ error: 'Error submitting evidence' });
  }
} 