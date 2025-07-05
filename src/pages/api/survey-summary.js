import connectDB from '../../lib/mongodb';
import SurveyInfo from '../../models/KaramChedu';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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

  try {
    // Get total count
    const totalFamilies = await SurveyInfo.countDocuments();

    // Family composition statistics
    const familyStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          totalMembers: { $sum: '$totalFamilyMembers' },
          totalChildren: { $sum: '$childrenUnder18' },
          totalElderly: { $sum: '$elderlyAbove60' },
          totalDisabled: { $sum: '$disabledMembers' },
          avgFamilySize: { $avg: '$totalFamilyMembers' },
          avgIncome: { $avg: '$monthlyIncome' }
        }
      }
    ]);

    // Education statistics
    const educationStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          childrenInSchool: { $sum: '$childrenInSchool' },
          childrenDroppedOut: { $sum: '$childrenDroppedOut' },
          educationSchemesAware: { $sum: { $cond: ['$educationSchemesAware', 1, 0] } },
          educationSchemesApplied: { $sum: { $cond: ['$educationSchemesApplied', 1, 0] } },
          educationSchemesReceived: { $sum: { $cond: ['$educationSchemesReceived', 1, 0] } }
        }
      }
    ]);

    // Health statistics
    const healthStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          healthInsurance: { $sum: { $cond: ['$healthInsurance', 1, 0] } },
          chronicDiseases: { $sum: { $cond: ['$chronicDiseases', 1, 0] } },
          regularMedication: { $sum: { $cond: ['$regularMedication', 1, 0] } },
          healthSchemesAware: { $sum: { $cond: ['$healthSchemesAware', 1, 0] } },
          healthSchemesApplied: { $sum: { $cond: ['$healthSchemesApplied', 1, 0] } },
          healthSchemesReceived: { $sum: { $cond: ['$healthSchemesReceived', 1, 0] } }
        }
      }
    ]);

    // Elder care statistics
    const elderCareStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          elderlyCareNeeded: { $sum: { $cond: ['$elderlyCareNeeded', 1, 0] } },
          elderlyPension: { $sum: { $cond: ['$elderlyPension', 1, 0] } },
          elderlySchemesAware: { $sum: { $cond: ['$elderlySchemesAware', 1, 0] } },
          elderlySchemesApplied: { $sum: { $cond: ['$elderlySchemesApplied', 1, 0] } },
          elderlySchemesReceived: { $sum: { $cond: ['$elderlySchemesReceived', 1, 0] } }
        }
      }
    ]);

    // Priority level distribution
    const priorityStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: '$priorityLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    // Status distribution
    const statusStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Bank account statistics
    const bankStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          bankAccount: { $sum: { $cond: ['$bankAccount', 1, 0] } }
        }
      }
    ]);

    // Employment scheme statistics
    const employmentStats = await SurveyInfo.aggregate([
      {
        $group: {
          _id: null,
          employmentSchemesAware: { $sum: { $cond: ['$employmentSchemesAware', 1, 0] } },
          employmentSchemesApplied: { $sum: { $cond: ['$employmentSchemesApplied', 1, 0] } }
        }
      }
    ]);

    // Most common needs
    const educationNeeds = await SurveyInfo.aggregate([
      { $unwind: '$educationNeeds' },
      {
        $group: {
          _id: '$educationNeeds',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const healthNeeds = await SurveyInfo.aggregate([
      { $unwind: '$healthNeeds' },
      {
        $group: {
          _id: '$healthNeeds',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const elderCareNeeds = await SurveyInfo.aggregate([
      { $unwind: '$elderlyCareType' },
      {
        $group: {
          _id: '$elderlyCareType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const summary = {
      totalFamilies,
      familyComposition: familyStats[0] || {},
      education: educationStats[0] || {},
      health: healthStats[0] || {},
      elderCare: elderCareStats[0] || {},
      employment: employmentStats[0] || {},
      bankAccount: bankStats[0] || {},
      priorityLevels: priorityStats,
      statusDistribution: statusStats,
      topEducationNeeds: educationNeeds,
      topHealthNeeds: healthNeeds,
      topElderCareNeeds: elderCareNeeds
    };

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating summary',
      error: error.message
    });
  }
} 