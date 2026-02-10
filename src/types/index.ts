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
}

export type Category = 
    | 'gypsum' 
    | 'wood' 
    | 'soft' 
    | 'mdf' 
    | 'accessories' 
    | 'polyurethane' 
    | 'slatted' 
    | 'flexible-stone' 
    | 'hd-spc' 
    | 'profiles' 
    | 'travertine';
