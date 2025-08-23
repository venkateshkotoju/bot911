import type { NextApiRequest, NextApiResponse } from 'next';
import { recommendationEngine } from '@/lib/recommendationEngine';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, limit = 3 } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const result = recommendationEngine.getSmartRecommendations(query, limit);
    
    res.status(200).json({
      success: true,
      query,
      ...result,
      metadata: {
        totalRecommendations: result.recommendations.length,
        topScore: result.recommendations[0]?.relevanceScore || 0,
        averageScore: result.recommendations.length > 0 
          ? result.recommendations.reduce((sum, r) => sum + r.relevanceScore, 0) / result.recommendations.length 
          : 0
      }
    });

  } catch (error) {
    console.error('Recommendation engine error:', error);
    res.status(500).json({
      error: 'Failed to generate recommendations',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}