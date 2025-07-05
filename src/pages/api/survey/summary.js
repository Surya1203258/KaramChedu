import dbConnect from '../../../lib/dbConnect';
import KaramChedu from '../../../models/KaramChedu';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { period = 'all' } = req.query;
    
    // Build date filter based on period
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'this_month':
        dateFilter = {
          surveyDate: {
            $gte: new Date(now.getFullYear(), now.getMonth(), 1),
            $lte: now
          }
        };
        break;
      case 'last_month':
        dateFilter = {
          surveyDate: {
            $gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
            $lt: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        };
        break;
      case 'this_week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = {
          surveyDate: {
            $gte: weekAgo,
            $lte: now
          }
        };
        break;
      default:
        // all time - no date filter
        break;
    }

    // Get all surveys for the period
    const surveys = await KaramChedu.find(dateFilter);
    const totalSurveys = surveys.length;

    if (totalSurveys === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalSurveys: 0,
          totalFamilies: 0,
          totalPopulation: 0,
          averageFamilySize: 0,
          familiesNeedingHelp: 0,
          averageMonthlyIncome: 0,
          belowPovertyLine: 0,
          helpAssessment: {
            immediateHelp: { yes: 0, maybe: 0, no: 0 },
            priorityLevels: { veryHigh: 0, high: 0, medium: 0, low: 0, none: 0 }
          },
          demographics: {
            childrenUnder18: 0,
            elderlyAbove85: 0,
            disabledMembers: 0,
            averageFamilySize: 0
          },
          education: {
            childrenInSchool: 0,
            childrenDroppedOut: 0,
            helpNeeded: 0
          },
          health: {
            healthInsurance: 0,
            chronicDiseases: 0,
            regularMedication: 0,
            helpNeeded: 0
          },
          elderCare: {
            careNeeded: 0,
            pension: 0,
            averagePensionAmount: 0
          },
          employment: {
            helpNeeded: 0,
            bankAccount: 0
          },
          status: {
            surveyed: 0,
            underReview: 0,
            assistanceProvided: 0,
            followUpRequired: 0
          },
          recentActivity: {
            surveysThisWeek: 0,
            highPriorityCases: 0,
            assistanceProvided: 0
          }
        }
      });
    }

    // Calculate basic statistics
    const totalFamilies = totalSurveys;
    const totalPopulation = surveys.reduce((sum, survey) => sum + (survey.totalFamilyMembers || 0), 0);
    const averageFamilySize = totalPopulation / totalFamilies;
    const familiesNeedingHelp = surveys.filter(s => s.needsImmediateHelp === 'Yes').length;
    const averageMonthlyIncome = surveys.reduce((sum, survey) => sum + (survey.monthlyIncome || 0), 0) / totalSurveys;
    const belowPovertyLine = surveys.filter(s => s.bplCardNumber).length;

    // Help Assessment
    const helpAssessment = {
      immediateHelp: {
        yes: surveys.filter(s => s.needsImmediateHelp === 'Yes').length,
        maybe: surveys.filter(s => s.needsImmediateHelp === 'Maybe').length,
        no: surveys.filter(s => s.needsImmediateHelp === 'No').length
      },
      priorityLevels: {
        veryHigh: surveys.filter(s => s.helpPriority === 'Very High').length,
        high: surveys.filter(s => s.helpPriority === 'High').length,
        medium: surveys.filter(s => s.helpPriority === 'Medium').length,
        low: surveys.filter(s => s.helpPriority === 'Low').length,
        none: surveys.filter(s => s.helpPriority === 'None').length
      }
    };

    // Demographics
    const demographics = {
      childrenUnder18: surveys.reduce((sum, survey) => sum + (survey.childrenUnder18 || 0), 0),
      elderlyAbove85: surveys.reduce((sum, survey) => sum + (survey.elderlyAbove85 || 0), 0),
      disabledMembers: surveys.reduce((sum, survey) => sum + (survey.disabledMembers || 0), 0),
      averageFamilySize
    };

    // Education
    const education = {
      childrenInSchool: surveys.reduce((sum, survey) => sum + (survey.childrenInSchool || 0), 0),
      childrenDroppedOut: surveys.reduce((sum, survey) => sum + (survey.childrenDroppedOut || 0), 0),
      helpNeeded: surveys.filter(s => s.educationHelpNeeded === 'Yes').length
    };

    // Health
    const health = {
      healthInsurance: surveys.filter(s => s.healthInsurance === 'Yes').length,
      chronicDiseases: surveys.filter(s => s.chronicDiseases === 'Yes').length,
      regularMedication: surveys.filter(s => s.regularMedication === 'Yes').length,
      helpNeeded: surveys.filter(s => s.healthHelpNeeded === 'Yes').length
    };

    // Elder Care
    const elderCare = {
      careNeeded: surveys.filter(s => s.elderlyCareNeeded === 'Yes').length,
      pension: surveys.filter(s => s.elderlyPension === 'Yes').length,
      averagePensionAmount: surveys
        .filter(s => s.elderlyPension === 'Yes' && s.elderlyPensionAmount)
        .reduce((sum, survey) => sum + (survey.elderlyPensionAmount || 0), 0) / 
        Math.max(surveys.filter(s => s.elderlyPension === 'Yes').length, 1)
    };

    // Employment
    const employment = {
      helpNeeded: surveys.filter(s => s.employmentHelpNeeded === 'Yes').length,
      bankAccount: surveys.filter(s => s.bankAccount === 'Yes').length
    };

    // Status
    const status = {
      surveyed: surveys.filter(s => s.status === 'Surveyed').length,
      underReview: surveys.filter(s => s.status === 'Under Review').length,
      assistanceProvided: surveys.filter(s => s.status === 'Assistance Provided').length,
      followUpRequired: surveys.filter(s => s.status === 'Follow-up Required').length
    };

    // Recent Activity (last 7 days)
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentSurveys = await KaramChedu.find({
      surveyDate: { $gte: weekAgo, $lte: now }
    });

    const recentActivity = {
      surveysThisWeek: recentSurveys.length,
      highPriorityCases: recentSurveys.filter(s => s.helpPriority === 'Very High' || s.helpPriority === 'High').length,
      assistanceProvided: recentSurveys.filter(s => s.status === 'Assistance Provided').length
    };

    const summary = {
      totalSurveys,
      totalFamilies,
      totalPopulation,
      averageFamilySize,
      familiesNeedingHelp,
      averageMonthlyIncome,
      belowPovertyLine,
      helpAssessment,
      demographics,
      education,
      health,
      elderCare,
      employment,
      status,
      recentActivity
    };

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ success: false, error: 'Failed to generate summary' });
  }
} 