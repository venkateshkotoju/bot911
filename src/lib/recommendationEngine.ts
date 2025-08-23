import productsData from '@/data/products.json';

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  keywords: string[];
  affiliateUrl: string;
  hotDeal?: boolean;
  specifications?: {
    compatibility?: string;
    powerGains?: string;
    features?: string[];
  };
  installationDifficulty?: string;
  installationTime?: string;
  pros?: string[];
  cons?: string[];
};

type RecommendationContext = {
  carModel?: string; // "996", "997", "991", "992"
  carVariant?: string; // "Turbo", "GT3", "Carrera", etc.
  performanceGoal?: string; // "power", "handling", "sound", "aesthetics"
  budgetRange?: string; // "low", "medium", "high"
  experienceLevel?: string; // "beginner", "intermediate", "expert"
  previousPurchases?: string[];
  query: string;
};

type ScoredProduct = Product & {
  relevanceScore: number;
  matchReasons: string[];
};

class ProductRecommendationEngine {
  private products: Product[] = productsData;

  /**
   * Extract context from user query using keyword analysis
   */
  extractContext(query: string): RecommendationContext {
    const lowerQuery = query.toLowerCase();
    
    // Extract car model
    let carModel = '';
    if (lowerQuery.includes('996')) carModel = '996';
    else if (lowerQuery.includes('997')) carModel = '997';
    else if (lowerQuery.includes('991')) carModel = '991';
    else if (lowerQuery.includes('992')) carModel = '992';

    // Extract car variant
    let carVariant = '';
    if (lowerQuery.includes('turbo')) carVariant = 'Turbo';
    else if (lowerQuery.includes('gt3')) carVariant = 'GT3';
    else if (lowerQuery.includes('gt2')) carVariant = 'GT2';
    else if (lowerQuery.includes('carrera')) carVariant = 'Carrera';

    // Extract performance goal
    let performanceGoal = '';
    if (lowerQuery.includes('power') || lowerQuery.includes('hp') || lowerQuery.includes('torque')) {
      performanceGoal = 'power';
    } else if (lowerQuery.includes('handling') || lowerQuery.includes('suspension') || lowerQuery.includes('coilover')) {
      performanceGoal = 'handling';
    } else if (lowerQuery.includes('sound') || lowerQuery.includes('exhaust') || lowerQuery.includes('noise')) {
      performanceGoal = 'sound';
    }

    // Extract budget hints
    let budgetRange = 'medium';
    if (lowerQuery.includes('budget') || lowerQuery.includes('cheap') || lowerQuery.includes('affordable')) {
      budgetRange = 'low';
    } else if (lowerQuery.includes('premium') || lowerQuery.includes('best') || lowerQuery.includes('top')) {
      budgetRange = 'high';
    }

    // Extract experience level
    let experienceLevel = 'intermediate';
    if (lowerQuery.includes('beginner') || lowerQuery.includes('first time') || lowerQuery.includes('easy')) {
      experienceLevel = 'beginner';
    } else if (lowerQuery.includes('expert') || lowerQuery.includes('advanced') || lowerQuery.includes('complex')) {
      experienceLevel = 'expert';
    }

    return {
      carModel,
      carVariant,
      performanceGoal,
      budgetRange,
      experienceLevel,
      query
    };
  }

  /**
   * Calculate relevance score for a product based on context
   */
  calculateRelevanceScore(product: Product, context: RecommendationContext): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // Base keyword matching (most important)
    const queryWords = context.query.toLowerCase().split(' ');
    const productKeywords = product.keywords.map(k => k.toLowerCase());
    
    for (const word of queryWords) {
      for (const keyword of productKeywords) {
        if (keyword.includes(word) || word.includes(keyword.split(' ')[0])) {
          score += 10;
          reasons.push(`Matches "${word}" query`);
          break;
        }
      }
    }

    // Car model compatibility
    if (context.carModel && product.specifications?.compatibility) {
      const compatibility = product.specifications.compatibility.toLowerCase();
      if (compatibility.includes(context.carModel)) {
        score += 8;
        reasons.push(`Compatible with ${context.carModel}`);
      }
    }

    // Performance goal matching
    if (context.performanceGoal) {
      if (context.performanceGoal === 'power' && product.category === 'ECU') {
        score += 7;
        reasons.push('Perfect for power gains');
      } else if (context.performanceGoal === 'handling' && product.category === 'Suspension') {
        score += 7;
        reasons.push('Ideal for handling improvements');
      } else if (context.performanceGoal === 'sound' && product.category === 'Exhaust') {
        score += 7;
        reasons.push('Great for sound enhancement');
      }
    }

    // Budget considerations
    if (context.budgetRange) {
      if (context.budgetRange === 'low' && product.price <= 200) {
        score += 5;
        reasons.push('Budget-friendly option');
      } else if (context.budgetRange === 'high' && product.price >= 300) {
        score += 5;
        reasons.push('Premium quality choice');
      } else if (context.budgetRange === 'medium' && product.price > 200 && product.price < 300) {
        score += 5;
        reasons.push('Great value for money');
      }
    }

    // Installation difficulty matching
    if (context.experienceLevel && product.installationDifficulty) {
      const difficulty = product.installationDifficulty.toLowerCase();
      if (context.experienceLevel === 'beginner' && difficulty === 'easy') {
        score += 6;
        reasons.push('Easy installation for beginners');
      } else if (context.experienceLevel === 'expert' && difficulty === 'hard') {
        score += 4;
        reasons.push('Complex install suitable for experts');
      }
    }

    // Hot deal bonus
    if (product.hotDeal) {
      score += 3;
      reasons.push('Currently on hot deal');
    }

    // Rating bonus
    if (product.rating >= 4.5) {
      score += 2;
      reasons.push('Highly rated product');
    }

    // Brand reputation (subjective scoring)
    const premiumBrands = ['Cobb', 'Bilstein', 'KW', 'Akrapovič'];
    if (premiumBrands.includes(product.brand)) {
      score += 2;
      reasons.push('Trusted premium brand');
    }

    return { score, reasons };
  }

  /**
   * Get smart product recommendations based on query
   */
  getRecommendations(query: string, limit: number = 3): ScoredProduct[] {
    const context = this.extractContext(query);
    
    const scoredProducts: ScoredProduct[] = this.products.map(product => {
      const { score, reasons } = this.calculateRelevanceScore(product, context);
      return {
        ...product,
        relevanceScore: score,
        matchReasons: reasons
      };
    });

    // Sort by relevance score and return top matches
    return scoredProducts
      .filter(p => p.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  /**
   * Generate explanation for why products were recommended
   */
  generateRecommendationExplanation(recommendations: ScoredProduct[], context: RecommendationContext): string {
    if (recommendations.length === 0) {
      return "I couldn't find specific products matching your query, but I can help you with general Porsche 911 modding advice.";
    }

    let explanation = "";
    
    if (context.carModel) {
      explanation += `For your ${context.carModel}${context.carVariant ? ` ${context.carVariant}` : ''}, `;
    }

    if (context.performanceGoal) {
      const goalDescriptions = {
        power: "to increase power output",
        handling: "to improve handling and suspension",
        sound: "to enhance exhaust sound"
      };
      explanation += goalDescriptions[context.performanceGoal as keyof typeof goalDescriptions] + ", ";
    }

    explanation += "here are my top recommendations:\n\n";

    recommendations.forEach((product, index) => {
      explanation += `${index + 1}. **${product.name}** by ${product.brand}\n`;
      explanation += `   - $${product.price} | ⭐ ${product.rating}/5\n`;
      
      if (product.matchReasons.length > 0) {
        explanation += `   - Why: ${product.matchReasons.slice(0, 2).join(', ')}\n`;
      }
      
      if (product.specifications?.powerGains) {
        explanation += `   - Gains: ${product.specifications.powerGains}\n`;
      }
      
      if (product.installationDifficulty) {
        explanation += `   - Install: ${product.installationDifficulty}`;
        if (product.installationTime) {
          explanation += ` (${product.installationTime})`;
        }
        explanation += "\n";
      }
      
      explanation += "\n";
    });

    return explanation.trim();
  }

  /**
   * Main method to get smart recommendations with explanation
   */
  getSmartRecommendations(query: string, limit: number = 3): { recommendations: ScoredProduct[]; explanation: string } {
    const context = this.extractContext(query);
    const recommendations = this.getRecommendations(query, limit);
    const explanation = this.generateRecommendationExplanation(recommendations, context);

    return { recommendations, explanation };
  }
}

// Export singleton instance
export const recommendationEngine = new ProductRecommendationEngine();

// Export types for use in other files
export type { Product, RecommendationContext, ScoredProduct };