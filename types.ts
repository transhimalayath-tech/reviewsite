
export type BlockType = 'headline' | 'text' | 'product';

export interface BlockPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ProductData {
  name: string;
  pros: string[];
  cons: string[];
  price: string;
  link: string;
  imageUrl?: string;
}

/**
 * Detailed product information for comparison results.
 */
export interface ProductDetails {
  name: string;
  pros: string[];
  cons: string[];
  priceRange: string;
  affiliateUrl: string;
  imageUrl?: string;
}

/**
 * Full editorial comparison data structure used by comparison components.
 */
export interface ComparisonData {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  productA: ProductDetails;
  productB: ProductDetails;
  verdict: string;
}

export interface EditorialBlock {
  id: string;
  type: BlockType;
  position: BlockPosition;
  content: string; // Used for text/headline
  product?: ProductData; // Used for product type
}
