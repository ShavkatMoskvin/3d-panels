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
    stockCount: number;
    inStock: boolean;
    variations?: {
        size: string;
        price: number;
    }[];
    colors?: {
        name: string;
        inStock: boolean;
        stockCount: number;
        image?: string;
    }[];
  isHidden?: boolean;
  bundleItems?: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    slug?: string;
    inStock: boolean;
    stockCount: number;
  }[];
}

export type Category = 
    | 'gypsum' 
    | 'accessories' 
    | 'flexible-stone' 
    | 'profiles' 
    | 'travertine';
