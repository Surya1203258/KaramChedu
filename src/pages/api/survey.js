import connectDB from '../../lib/mongodb';
import SurveyInfo from '../../models/KaramChedu';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }

  if (req.method === 'POST') {
    try {
      const surveyData = req.body;
      const survey = new SurveyInfo(surveyData);
      await survey.save();
      
      res.status(201).json({ 
        success: true, 
        message: 'Survey data saved successfully',
        data: survey 
      });
    } catch (error) {
      console.error('Error saving survey data:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error saving survey data',
        error: error.message 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, status, priorityLevel, search } = req.query;
      
      let query = {};
      
      // Add filters
      if (status) query.status = status;
      if (priorityLevel) query.priorityLevel = priorityLevel;
      if (search) {
        query.$or = [
          { familyName: { $regex: search, $options: 'i' } },
          { headOfFamily: { $regex: search, $options: 'i' } },
          { bplCardNumber: { $regex: search, $options: 'i' } }
        ];
      }
      
      const skip = (page - 1) * limit;
      
      const surveys = await SurveyInfo.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await SurveyInfo.countDocuments(query);
      
      res.status(200).json({
        success: true,
        data: surveys,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error fetching survey data:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching survey data',
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 