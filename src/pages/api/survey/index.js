import dbConnect from '../../../lib/dbConnect';
import KaramCheduSurvey from '../../../models/KaramCheduSurvey';

export default async function handler(req, res) {
  console.log('=== SURVEY API CALLED ON RENDER ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Environment:', process.env.NODE_ENV);

  try {
    console.log('Connecting to database on Render...');
    await dbConnect();
    console.log('Database connected successfully on Render');
  } catch (error) {
    console.error('Database connection failed on Render:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database connection failed on Render',
      details: error.message,
      platform: 'Render'
    });
  }

  if (req.method === 'POST') {
    try {
      console.log('Processing survey submission on Render...');
      const surveyData = req.body;
      
      // Set default values for new fields
      const survey = new KaramCheduSurvey({
        ...surveyData,
        surveyDate: new Date()
      });

      console.log('Saving survey to database on Render...');
      const savedSurvey = await survey.save();
      console.log('Survey saved successfully on Render:', savedSurvey._id);
      
      res.status(201).json({ 
        success: true, 
        data: savedSurvey,
        platform: 'Render'
      });
    } catch (error) {
      console.error('Error creating survey on Render:', error);
      res.status(500).json({ 
        success: false, 
        error: error?.message || 'Failed to create survey on Render',
        details: error.toString(),
        platform: 'Render'
      });
    }
  } else if (req.method === 'GET') {
    try {
      console.log('Fetching surveys on Render...');
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

      console.log(`Found ${surveys.length} surveys out of ${total} total on Render`);

      res.status(200).json({
        success: true,
        data: surveys,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          total,
          limit: parseInt(limit)
        },
        platform: 'Render'
      });
    } catch (error) {
      console.error('Error fetching surveys on Render:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch surveys on Render',
        details: error.message,
        platform: 'Render'
      });
    }
  } else {
    console.log('Method not allowed on Render:', req.method);
    res.status(405).json({ 
      success: false, 
      error: 'Method not allowed on Render',
      allowedMethods: ['GET', 'POST'],
      receivedMethod: req.method,
      platform: 'Render'
    });
  }
} 