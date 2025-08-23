import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  affiliateUrl: string;
  keywords: string[];
  hotDeal: boolean;
};

type ComparisonContextType = {
  compareProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  canAddMore: boolean;
};

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const MAX_COMPARE = 3; // Maximum 3 products for comparison

  const addToCompare = (product: Product) => {
    setCompareProducts(prev => {
      if (prev.length >= MAX_COMPARE) {
        return prev; // Can't add more than MAX_COMPARE
      }
      if (prev.some(p => p.id === product.id)) {
        return prev; // Already in comparison
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setCompareProducts([]);
  };

  const isInComparison = (productId: string) => {
    return compareProducts.some(p => p.id === productId);
  };

  const canAddMore = compareProducts.length < MAX_COMPARE;

  return (
    <ComparisonContext.Provider 
      value={{ 
        compareProducts, 
        addToCompare, 
        removeFromCompare, 
        clearComparison, 
        isInComparison,
        canAddMore
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};