import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Subscriber = {
  email: string;
  subscribedAt: string;
  interests: string[];
  verified: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, interests = [] } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const filePath = path.resolve('./subscribers.json');
    
    // Read existing subscribers
    let subscribers: Subscriber[] = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      subscribers = JSON.parse(fileData);
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    
    if (existingSubscriber) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      interests: interests,
      verified: false // In a real app, you'd send a verification email
    };

    subscribers.push(newSubscriber);

    // Save to file (only in development)
    if (process.env.NODE_ENV === 'development') {
      fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
    }

    // In production, you'd integrate with email services like:
    // - Mailchimp
    // - SendGrid
    // - ConvertKit
    // - etc.

    console.log('New subscriber:', newSubscriber);

    res.status(200).json({ 
      message: 'Successfully subscribed!',
      subscriber: {
        email: newSubscriber.email,
        interests: newSubscriber.interests
      }
    });

  } catch (error: unknown) {
    console.error('Subscription error:', error);
    
    res.status(500).json({
      error: 'Failed to process subscription. Please try again.',
    });
  }
}