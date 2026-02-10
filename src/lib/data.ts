import { Product, Category } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Dolomitic Travertine",
    slug: "dolomitic-travertine",
    category: "flexible-stone",
    price: 1850,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Премиальная 3D панель Dolomitic Travertine. Идеальная геометрия.",
    specifications: { width: 500, height: 500, depth: 20, material: "Полиуретан" }
  },
  {
    id: "2",
    name: "Linear Travertinee",
    slug: "linear-travertinee",
    category: "flexible-stone",
    price: 4400,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Современная реечная панель для акцентных стен.",
    specifications: { width: 600, height: 2800, depth: 15, material: "МДФ / Шпон" }
  },
  {
    id: "3",
    name: "Romanite",
    slug: "romanite",
    category: "flexible-stone",
    price: 1500,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Натуральный срез камня на гибкой основе. Однотонный.",
    specifications: { width: 600, height: 1200, depth: 3, material: "Натуральный камень" }
  },
  {
    id: "4",
    name: "SPC Панель с печатью",
    slug: "spc-print",
    category: "hd-spc",
    price: 3200,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Панель высокого разрешения с защитным слоем. Влагостойкая.",
    specifications: { width: 1200, height: 2400, depth: 4, material: "SPC" }
  },
  {
    id: "5",
    name: "Профиль декоративный P-02",
    slug: "profile-p-02",
    category: "profiles",
    price: 850,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Финишный профиль для обрамления панелей.",
    specifications: { width: 3000, height: 20, depth: 10, material: "Алюминий" }
  },
  {
    id: "6",
    name: "Demo Box Large",
    slug: "demo-box-large",
    category: "accessories",
    price: 3500,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Complete set of panel samples for interior designers.",
    specifications: { width: 400, height: 400, depth: 150, material: "Mixed" }
  },
  {
    id: "7",
    name: "Demo Box Mini",
    slug: "demo-box-mini",
    category: "accessories",
    price: 1500,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Essential sample kit featuring our top 5 patterns.",
    specifications: { width: 200, height: 200, depth: 100, material: "Mixed" }
  },
  {
    id: "8",
    name: "Гипсовая панель Relief",
    slug: "gypsum-relief",
    category: "gypsum",
    price: 1200,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Экологичная гипсовая 3D панель с уникальным рельефом. Создает неповторимую игру света и тени.",
    specifications: { width: 500, height: 500, depth: 25, material: "Гипс" }
  }
];

export const CATEGORIES: { label: string; value: Category | 'all' }[] = [
  { label: "Все товары", value: "all" },
  { label: "Гипсовые", value: "gypsum" },
  { label: "Полиуретан", value: "polyurethane" },
  { label: "Рифленые", value: "slatted" },
  { label: "Гибкий камень", value: "flexible-stone" },
  { label: "HD & SPC", value: "hd-spc" },
  { label: "Профили", value: "profiles" },
  { label: "Аксессуары", value: "accessories" },
];
