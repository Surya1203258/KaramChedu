import dbConnect from '../../../lib/dbConnect';
import KaramCheduSurvey from '../../../models/KaramCheduSurvey';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const surveyData = req.body;
      
      // Set default values for new fields
      const survey = new KaramCheduSurvey({
        ...surveyData,
        surveyDate: new Date()
      });

      const savedSurvey = await survey.save();
      res.status(201).json({ success: true, data: savedSurvey });
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ success: false, error: error?.message || JSON.stringify(error) || 'Failed to create survey' });
    }
  } else if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, search = '', status = '', priorityLevel = '', needsImmediateHelp = '', helpPriority = '' } = req.query;
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build filter object
      const filter = {};
      
      if (search) {
        filter.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { contactNumber: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (status) {
        filter.status = status;
      }
      
      if (priorityLevel) {
        filter.priorityLevel = priorityLevel;
      }
      
      if (needsImmediateHelp) {
        filter.needsImmediateHelp = needsImmediateHelp;
      }
      
      if (helpPriority) {
        filter.helpPriority = helpPriority;
      }

      const surveys = await KaramCheduSurvey.find(filter)
        .sort({ surveyDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await KaramCheduSurvey.countDocuments(filter);
      const totalPages = Math.ceil(total / parseInt(limit));

      res.status(200).json({
        success: true,
        data: surveys,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          total,
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error fetching surveys:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch surveys' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 