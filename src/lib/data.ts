import { Product, Category } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Dolomitic Travertine",
    slug: "dolomitic-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Dolomitic Travertine.png",
      "/images/products/Dolomitic Travertine-Andean white.png",
      "/images/products/Dolomitic Travertine-Claybank.jpg",
      "/images/products/Dolomitic Travertine-Dark grey.png",
      "/images/products/Dolomitic Travertine-Andean red.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: ["Andean white", "Claybank", "Dark grey", "Andean red"]
  },
  {
    id: "2",
    name: "Linear Travertine",
    slug: "linear-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Linear Travertine.png",
      "/images/products/Linear Travertine-Roman white.png",
      "/images/products/Linear Travertine-Claybank.png",
      "/images/products/Linear Travertine-Light grey.png",
      "/images/products/Linear Travertine-Roman yellow.png",
      "/images/products/Linear Travertine-Red.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: ["Roman white", "Claybank", "Light grey", "Roman yellow", "Red"]
  },
  {
    id: "3",
    name: "Romanite",
    slug: "romanite",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Romanite.png",
      "/images/products/Romanite-Cloudy white.png",
      "/images/products/Romanite-Cloudy grey.png",
      "/images/products/Romantine-Cloudy White.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: ["Cloudy white", "Cloudy grey", "Cloudy White (Romantine)"]
  },
  {
    id: "4",
    name: "Milan Travertine",
    slug: "milan-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Milan Travertine.png",
      "/images/products/Milan Travertine-White.png",
      "/images/products/Milan Travertine-Yellow.png",
      "/images/products/Milan Travertine-Grey.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: ["White", "Yellow", "Grey"]
  },
  {
    id: "5",
    name: "Rowena Travertine",
    slug: "rowena-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Rowena Travertine.png",
      "/images/products/Rowena Travertine-Beige.png",
      "/images/products/Rowena Travertine-Creamy Yellow.png",
      "/images/products/Rowena Travertine-Grey.png",
      "/images/products/Rowena Travertine-Light brown.png",
      "/images/products/Rowena Travertine-Taupe.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: ["Beige", "Creamy Yellow", "Grey", "Light brown", "Taupe"]
  },
  {
    id: "6",
    name: "Ando Cement",
    slug: "ando-cement",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Ando Cement.png",
      "/images/products/Ando Cement-Cement grey.png",
      "/images/products/Ando Cement-Warm grey.jpg",
      "/images/products/Ando Cement-Sunset Glow.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5900 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: ["Cement grey", "Warm grey", "Sunset Glow"]
  },
  {
    id: "8",
    name: "Italian Travertine",
    slug: "italian-travertine",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Italian Travertine.png",
      "/images/products/Italian Travertine-Yellow Wood.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: ["Yellow Wood"]
  },
  {
    id: "9",
    name: "Golden Sunset Marble",
    slug: "golden-sunset-marble",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Golden Sunset Marble.png",
      "/images/products/Golden Sunset Marble-Red.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 }
    ],
    colors: ["Red"]
  },
  {
    id: "10",
    name: "Slate",
    slug: "slate",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Slate.png",
      "/images/products/Slate-Veil Dark Grey.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 2.5-3.5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*1200", price: 5900 }
    ],
    colors: ["Veil Dark Grey"]
  },
  {
    id: "11",
    name: "Terrazzo Rough Stone",
    slug: "terrazzo-rough-stone",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Terrazzo Rough Stone.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 5900 },
      { size: "3060*1180", price: 7400 }
    ],
    colors: []
  },
  {
    id: "12",
    name: "Classic Marble",
    slug: "classic-marble",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Classic Marble.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 2-3 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 5900 },
      { size: "3000*1200", price: 6900 }
    ],
    colors: []
  },
  {
    id: "13",
    name: "Rockcut Dolomitic Stone",
    slug: "rockcut-dolomitic-stone",
    category: "flexible-stone",
    price: 7900,
    images: [
      "/images/products/Rockcut Dolomitic Stone.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 2800, height: 600, depth: 4, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "2800*600", price: 7900 }
    ],
    colors: []
  },
  {
    id: "14",
    name: "Skyline stone",
    slug: "skyline-stone",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Skyline stone.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 5900 }
    ],
    colors: []
  },
  {
    id: "15",
    name: "Marble Pillar",
    slug: "marble-pillar",
    category: "flexible-stone",
    price: 7400,
    images: [
      "/images/products/Marble Pillar.png",
      "/images/products/Marble Pillar-Bulgari.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*600", price: 7400 },
      { size: "3000*1200", price: 7900 }
    ],
    colors: ["Bulgari"]
  },
  {
    id: "16",
    name: "Crude Wood Ripple Board",
    slug: "crude-wood-ripple-board",
    category: "flexible-stone",
    price: 7400,
    images: [
      "/images/products/Crude Wood Ripple Board.png",
      "/images/products/Crude Wood Ripple-Light Yellow.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*600", price: 7400 },
      { size: "3000*1200", price: 7900 }
    ],
    colors: ["Light Yellow"]
  },
  {
    id: "17",
    name: "Ancient Wood",
    slug: "ancient-wood",
    category: "flexible-stone",
    price: 6700,
    images: [
      "/images/products/Ancient Wood.png",
      "/images/products/Ancient Wood-Dark Brown.jpg"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 2400, height: 590, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "2400*590", price: 6700 },
      { size: "2400*1190", price: 6900 }
    ],
    colors: ["Dark Brown"]
  },
  {
    id: "18",
    name: "Poly wood Board",
    slug: "poly-wood-board",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Poly wood Board.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 590, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*590", price: 5900 },
      { size: "3000*1190", price: 6700 }
    ],
    colors: []
  },
  {
    id: "19",
    name: "Wood Grain",
    slug: "wood-grain",
    category: "flexible-stone",
    price: 6900,
    images: [
      "/images/products/Wood Grain.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 1.5-2 мм.",
    specifications: { width: 3000, height: 1050, depth: 2, material: "Кварцевый sand, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*1050", price: 6900 }
    ],
    colors: []
  },
  {
    id: "20",
    name: "Roman Pillar",
    slug: "roman-pillar",
    category: "flexible-stone",
    price: 8000,
    images: [
      "/images/products/Roman Pillar.png"
    ],
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-9 мм.",
    specifications: { width: 2980, height: 598, depth: 6, material: "Кварцевый sand, кальциевый порошок, эмульсия" },
    variations: [
      { size: "2980*598 (concave)", price: 8000 },
      { size: "3000*608 (convex)", price: 8000 }
    ],
    colors: []
  },
  {
    id: "21",
    name: "Гипсовая панель Relief",
    slug: "gypsum-relief",
    category: "gypsum",
    price: 1200,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Экологичная гипсовая 3D панель с уникальным рельефом. Создает неповторимую игру света и тени.",
    specifications: { width: 500, height: 500, depth: 25, material: "Гипс" }
  },
  {
    id: "24",
    name: "Профиль алюминиевый Gold",
    slug: "profile-gold",
    category: "profiles",
    price: 1200,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Декоративный профиль в золотом исполнении для стыковки панелей.",
    specifications: { width: 3000, height: 15, depth: 15, material: "Алюминий" }
  },
  {
    id: "25",
    name: "Профиль теневой Black",
    slug: "profile-shadow-black",
    category: "profiles",
    price: 950,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Создает эффект парящей стены. Матовый черный цвет.",
    specifications: { width: 2500, height: 20, depth: 40, material: "Алюминий" }
  },
  {
    id: "28",
    name: "Монтажный комплект Professional",
    slug: "mounting-kit-pro",
    category: "accessories",
    price: 2450,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Полный набор для монтажа: шпатель, уровень, крепежи и инструкция.",
    specifications: { width: 300, height: 200, depth: 100, material: "Пластик/Металл" },
    bundleItems: [
      { id: "b1", name: "Шпатель зубчатый", price: 450, quantity: 1, image: "/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png", slug: "notched-trowel" },
      { id: "b2", name: "Уровень строительный", price: 850, quantity: 1, image: "/images/products/{46ED9163-DE3C-4068-AC28-CA0863736AE6}.png", slug: "spirit-level" },
      { id: "b3", name: "Клей UltraFix (пробник)", price: 650, quantity: 2, image: "/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png", slug: "ultrafix-sample" },
      { id: "b4", name: "Набор крепежей", price: 500, quantity: 1, image: "/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png", slug: "mounting-hardware" }
    ]
  },
  // Товары для наборов (скрытые из общего каталога)
  {
    id: "b1",
    name: "Шпатель зубчатый",
    slug: "notched-trowel",
    category: "accessories",
    price: 450,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Профессиональный шпатель с зубьями для равномерного нанесения клея на поверхность панелей.",
    specifications: { width: 200, height: 100, depth: 2, material: "Сталь/Пластик" },
    isHidden: true
  },
  {
    id: "b3",
    name: "Клей UltraFix (пробник)",
    slug: "ultrafix-sample",
    category: "accessories",
    price: 650,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Высокоадгезивный клей UltraFix в удобной фасовке. Идеально подходит для монтажа 2-3 кв.м. панелей.",
    specifications: { width: 100, height: 150, depth: 50, material: "Клеевой состав" },
    isHidden: true
  },
  {
    id: "b4",
    name: "Набор крепежей",
    slug: "mounting-hardware",
    category: "accessories",
    price: 500,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    description: "Комплект скрытых крепежей для надежной фиксации панелей на различных типах поверхностей.",
    specifications: { width: 50, height: 50, depth: 10, material: "Металл" },
    isHidden: true
  },
  {
    id: "29",
    name: "Клей для панелей UltraFix",
    slug: "glue-ultrafix",
    category: "accessories",
    price: 1100,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Высокоадгезивный клей для всех типов 3D панелей. Расход: 1 туба на 3-4 панели.",
    specifications: { width: 50, height: 250, depth: 50, material: "Акрил" }
  },
  {
    id: "30",
    name: "Клей UltraFix 5кг",
    slug: "glue-ultrafix-5kg",
    category: "accessories",
    price: 3200,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    description: "Специализированный клей для тяжелых панелей. Расход: 5кг на 4-6 м2.",
    specifications: { width: 250, height: 250, depth: 250, material: "Акриловый состав" }
  },
  {
    id: "31",
    name: "Затирка Stone Finish 2кг",
    slug: "grout-stone-finish-2kg",
    category: "accessories",
    price: 1800,
    images: ["/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png"],
    description: "Декоративная затирка для швов. Влагостойкая, устойчивая к выцветанию.",
    specifications: { width: 150, height: 150, depth: 150, material: "Цементный состав" }
  },
  {
    id: "32",
    name: "Big Weaving",
    slug: "big-weaving",
    category: "flexible-stone",
    price: 5900,
    images: ["/images/products/Big Weaving-Jacinth.jpg"],
    description: "Гибкий камень NEO с текстурой крупного плетения.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок" },
    colors: ["Jacinth"]
  },
  {
    id: "33",
    name: "Cut Stone",
    slug: "cut-stone",
    category: "flexible-stone",
    price: 5900,
    images: ["/images/products/Cut Stone-Red.jpg"],
    description: "Гибкий камень NEO с текстурой колотого камня.",
    specifications: { width: 1200, height: 600, depth: 4, material: "Кварцевый песок" },
    colors: ["Red"]
  },
  {
    id: "34",
    name: "Gobi Rammed",
    slug: "gobi-rammed",
    category: "flexible-stone",
    price: 6500,
    images: ["/images/products/Gobi Rammed-Gradient B.jpg"],
    description: "Гибкий камень NEO с текстурой утрамбованной земли пустыни Гоби.",
    specifications: { width: 2400, height: 1200, depth: 3, material: "Кварцевый песок" },
    colors: ["Gradient B"]
  },
  {
    id: "35",
    name: "Ridged Stone",
    slug: "ridged-stone",
    category: "flexible-stone",
    price: 7200,
    images: ["/images/products/Ridged Stone-Pire White.jpg"],
    description: "Гибкий камень NEO с глубокой рифленой текстурой.",
    specifications: { width: 2800, height: 600, depth: 5, material: "Кварцевый песок" },
    colors: ["Pire White"]
  },
  {
    id: "36",
    name: "Round Line Stone",
    slug: "round-line-stone",
    category: "flexible-stone",
    price: 6800,
    images: ["/images/products/Round Line Stone-Dark Grey.jpg"],
    description: "Гибкий камень NEO с мягкими линейными формами.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок" },
    colors: ["Dark Grey"]
  },
  {
    id: "37",
    name: "Starmoon Stone",
    slug: "starmoon-stone",
    category: "flexible-stone",
    price: 7500,
    images: ["/images/products/Starmoon Stone-Dark Grey.jpg"],
    description: "Гибкий камень NEO с текстурой звездного неба.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок" },
    colors: ["Dark Grey"]
  }
];

export const CATEGORIES: { label: string; value: Category | 'all' }[] = [
  { label: "Все товары", value: "all" },
  { label: "Гибкий камень", value: "flexible-stone" },
  { label: "Гипсовые", value: "gypsum" },
  { label: "Профили", value: "profiles" },
  { label: "Аксессуары", value: "accessories" },
];
