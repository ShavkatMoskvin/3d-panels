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
  },
  {
    id: "9",
    name: "Профиль алюминиевый Gold",
    slug: "profile-gold",
    category: "profiles",
    price: 1200,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Декоративный профиль в золотом исполнении для стыковки панелей.",
    specifications: { width: 3000, height: 15, depth: 15, material: "Алюминий" }
  },
  {
    id: "10",
    name: "Профиль теневой Black",
    slug: "profile-shadow-black",
    category: "profiles",
    price: 950,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Создает эффект парящей стены. Матовый черный цвет.",
    specifications: { width: 2500, height: 20, depth: 40, material: "Алюминий" }
  },
  {
    id: "11",
    name: "Монтажный комплект Professional",
    slug: "mounting-kit-pro",
    category: "accessories",
    price: 2450,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Полный набор для самостоятельного монтажа: шпатель, уровень, крепежи и инструкция.",
    specifications: { width: 300, height: 200, depth: 100, material: "Пластик/Металл" }
  },
  {
    id: "12",
    name: "Клей для панелей UltraFix",
    slug: "glue-ultrafix",
    category: "accessories",
    price: 1100,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Высокоадгезивный клей для всех типов 3D панелей. Расход: 1 туба на 3-4 панели.",
    specifications: { width: 50, height: 250, depth: 50, material: "Акрил" }
  },
  {
    id: "13",
    name: "Гипсовая панель Wave",
    slug: "gypsum-wave",
    category: "gypsum",
    price: 1350,
    images: ["/images/products/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png"],
    description: "Классическая волна. Создает бесшовное покрытие с эффектом движения.",
    specifications: { width: 500, height: 500, depth: 30, material: "Гипс" }
  },
  {
    id: "14",
    name: "Полиуретановая панель Hexagon",
    slug: "poly-hexagon",
    category: "polyurethane",
    price: 1950,
    images: ["/images/products/{7D2B5115-6E0A-4EFB-80D5-CC21ED300691}.png"],
    description: "Геометрический паттерн в стиле хай-тек. Легкий монтаж и возможность покраски.",
    specifications: { width: 600, height: 600, depth: 20, material: "Полиуретан" }
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
