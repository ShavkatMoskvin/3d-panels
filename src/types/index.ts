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
  consumableDetails?: {
    coveragePerUnit: number; // Расход на единицу площади (м2) или количество штук
    unit: 'm2' | 'pcs';      // Единица измерения для расхода
    weightKg?: number;       // Вес упаковки
    description?: string;    // Подсказка для калькулятора
  };
  reviews?: {
    id: string;
    userName: string;
    date: string;
    rating: number;
    text: string;
    images?: string[];
  }[];
}

export type Category = 
    | 'gypsum' 
    | 'accessories' 
    | 'flexible-stone' 
    | 'profiles' 
    | 'travertine';
