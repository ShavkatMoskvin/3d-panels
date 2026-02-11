export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    specifications: {
        width: number;
        height: number;
        depth: number;
        material: string;
    };
    variations?: {
        size: string;
        price: number;
    }[];
    colors?: string[];
  isHidden?: boolean;
  bundleItems?: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    slug?: string;
  }[];
}

export type Category = 
    | 'gypsum' 
    | 'accessories' 
    | 'flexible-stone' 
    | 'profiles' 
    | 'travertine';
