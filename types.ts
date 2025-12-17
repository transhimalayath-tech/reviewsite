
export interface ProductDetails {
  name: string;
  pros: string[];
  cons: string[];
  priceRange: string;
  affiliateUrl: string;
  rating: number;
  imageUrl?: string;
}

export interface ComparisonData {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  summary: string;
  productA: ProductDetails;
  productB: ProductDetails;
  verdict: string;
  author: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
