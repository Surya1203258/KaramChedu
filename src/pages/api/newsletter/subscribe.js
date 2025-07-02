import connectDB from '../../../lib/mongodb';
import Newsletter from '../../../models/Newsletter';

const defaultPreferences = {
  debateTips: false,
  caseUpdates: false,
  eventAnnouncements: false,
  communityHighlights: false
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { email, firstName, lastName, preferences } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ 
        error: 'Email, first name, and last name are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please enter a valid email address' 
      });
    }

    // Ensure all preferences keys are present (default to false if missing)
    const normalizedPreferences = { ...defaultPreferences, ...preferences };

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(409).json({ 
          error: 'This email is already subscribed to our newsletter' 
        });
      } else {
        // Reactivate subscription and update preferences
        existingSubscriber.isActive = true;
        existingSubscriber.firstName = firstName;
        existingSubscriber.lastName = lastName;
        existingSubscriber.preferences = normalizedPreferences;
        await existingSubscriber.save();
        
        return res.status(200).json({ 
          message: 'Welcome back! Your subscription has been reactivated.',
          subscriber: existingSubscriber
        });
      }
    }

    // Create new subscription
    const subscriber = new Newsletter({
      email: email.toLowerCase(),
      firstName,
      lastName,
      preferences: normalizedPreferences
    });

    await subscriber.save();

    res.status(201).json({ 
      message: 'Successfully subscribed to our newsletter!',
      subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      error: 'Failed to subscribe. Please try again.' 
    });
  }
} 