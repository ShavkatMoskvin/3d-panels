import { Product } from "@/types";

export const CATEGORIES = [
  { value: 'all', label: 'Все товары' },
  { value: 'gypsum', label: 'Панели' },
  { value: 'flexible-stone', label: 'Гибкий камень' },
  { value: 'profiles', label: 'Профили' },
  { value: 'accessories', label: 'Другое' },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Dolomitic Travertine",
    slug: "dolomitic-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Dolomitic Travertine-Claybank.jpg",
      "/images/products/Dolomitic Travertine.png",
      "/images/products/Dolomitic Travertine-Andean white.png",
      "/images/products/Dolomitic Travertine-Dark grey.png",
      "/images/products/Dolomitic Travertine-Andean red.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: [
      { name: "Claybank", inStock: true, stockCount: 100, image: "/images/products/Dolomitic Travertine-Claybank.jpg" },
      { name: "Andean white", inStock: false, stockCount: 0, image: "/images/products/Dolomitic Travertine-Andean white.png" },
      { name: "Dark grey", inStock: false, stockCount: 0, image: "/images/products/Dolomitic Travertine-Dark grey.png" },
      { name: "Andean red", inStock: false, stockCount: 0, image: "/images/products/Dolomitic Travertine-Andean red.png" }
    ]
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
    stockCount: 0,
    inStock: false,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: [
      { name: "Roman white", inStock: false, stockCount: 0, image: "/images/products/Linear Travertine-Roman white.png" },
      { name: "Claybank", inStock: false, stockCount: 0, image: "/images/products/Linear Travertine-Claybank.png" },
      { name: "Light grey", inStock: false, stockCount: 0, image: "/images/products/Linear Travertine-Light grey.png" },
      { name: "Roman yellow", inStock: false, stockCount: 0, image: "/images/products/Linear Travertine-Roman yellow.png" },
      { name: "Red", inStock: false, stockCount: 0, image: "/images/products/Linear Travertine-Red.png" }
    ]
  },
  {
    id: "3",
    name: "Romanite",
    slug: "romanite",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Romantine-Cloudy White.jpg",
      "/images/products/Romanite.png",
      "/images/products/Romanite-Cloudy white.png",
      "/images/products/Romanite-Cloudy grey.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: [
      { name: "Cloudy White", inStock: true, stockCount: 100, image: "/images/products/Romantine-Cloudy White.jpg" },
      { name: "Cloudy white", inStock: false, stockCount: 0, image: "/images/products/Romanite-Cloudy white.png" },
      { name: "Cloudy grey", inStock: false, stockCount: 0, image: "/images/products/Romanite-Cloudy grey.png" }
    ]
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
    stockCount: 0,
    inStock: false,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: [
      { name: "White", inStock: false, stockCount: 0, image: "/images/products/Milan Travertine-White.png" },
      { name: "Yellow", inStock: false, stockCount: 0, image: "/images/products/Milan Travertine-Yellow.png" },
      { name: "Grey", inStock: false, stockCount: 0, image: "/images/products/Milan Travertine-Grey.png" }
    ]
  },
  {
    id: "5",
    name: "Rowena Travertine",
    slug: "rowena-travertine",
    category: "flexible-stone",
    price: 4600,
    images: [
      "/images/products/Rowena Travertine-Taupe.jpg",
      "/images/products/Rowena Travertine.png",
      "/images/products/Rowena Travertine-Beige.png",
      "/images/products/Rowena Travertine-Creamy Yellow.png",
      "/images/products/Rowena Travertine-Grey.png",
      "/images/products/Rowena Travertine-Light brown.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4600 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 5900 },
      { size: "2900*1200", price: 6700 }
    ],
    colors: [
      { name: "Taupe", inStock: true, stockCount: 100, image: "/images/products/Rowena Travertine-Taupe.jpg" },
      { name: "Beige", inStock: false, stockCount: 0, image: "/images/products/Rowena Travertine-Beige.png" },
      { name: "Creamy Yellow", inStock: false, stockCount: 0, image: "/images/products/Rowena Travertine-Creamy Yellow.png" },
      { name: "Grey", inStock: false, stockCount: 0, image: "/images/products/Rowena Travertine-Grey.png" },
      { name: "Light brown", inStock: false, stockCount: 0, image: "/images/products/Rowena Travertine-Light brown.png" }
    ]
  },
  {
    id: "6",
    name: "Ando Cement",
    slug: "ando-cement",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Ando Cement-Warm grey.jpg",
      "/images/products/Ando Cement.png",
      "/images/products/Ando Cement-Cement grey.png",
      "/images/products/Ando Cement-Sunset Glow.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: [
      { name: "Warm grey", inStock: true, stockCount: 100, image: "/images/products/Ando Cement-Warm grey.jpg" },
      { name: "Cement grey", inStock: false, stockCount: 0, image: "/images/products/Ando Cement-Cement grey.png" },
      { name: "Sunset Glow", inStock: false, stockCount: 0, image: "/images/products/Ando Cement-Sunset Glow.png" }
    ]
  },
  {
    id: "7",
    name: "Slate",
    slug: "slate",
    category: "flexible-stone",
    price: 4800,
    images: [
      //"/images/products/Slate.png",
      "/images/products/Slate-Veil Dark Grey.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: [
      { name: "Veil Dark Grey", inStock: true, stockCount: 100, image: "/images/products/Slate-Veil Dark Grey.jpg" }
    ]
  },
  {
    id: "8",
    name: "Calacatta Gold",
    slug: "calacatta-gold",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Classic Marble.png"
    ],
    stockCount: 0,
    inStock: false,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: [
      { name: "White", inStock: true, stockCount: 100, image: "/images/products/Classic Marble.png" }
    ]
  },
  {
    id: "9",
    name: "Volakas",
    slug: "volakas",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Classic Marble.png"
    ],
    stockCount: 0,
    inStock: false,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: [
      { name: "White", inStock: true, stockCount: 100, image: "/images/products/Classic Marble.png" }
    ]
  },
  {
    id: "10",
    name: "Nero Marquina",
    slug: "nero-marquina",
    category: "flexible-stone",
    price: 4800,
    images: [
      "/images/products/Classic Marble.png"
    ],
    stockCount: 0,
    inStock: false,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 1200, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "1200*600", price: 4800 },
      { size: "2400*600", price: 5500 },
      { size: "2400*1200", price: 6700 },
      { size: "2900*1200", price: 6900 }
    ],
    colors: [
      { name: "Black", inStock: true, stockCount: 100, image: "/images/products/Classic Marble.png" }
    ]
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
      "/images/products/Marble Pillar-Bulgari.jpg",
      "/images/products/Marble Pillar.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*600", price: 7400 },
      { size: "3000*1200", price: 7900 }
    ],
    colors: [
      { name: "Bulgari", inStock: true, stockCount: 100, image: "/images/products/Marble Pillar-Bulgari.jpg" }
    ]
  },
  {
    id: "16",
    name: "Crude Wood Ripple Board",
    slug: "crude-wood-ripple-board",
    category: "flexible-stone",
    price: 7400,
    images: [
      "/images/products/Crude Wood Ripple-Light Yellow.jpg",
      "/images/products/Crude Wood Ripple Board.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*600", price: 7400 },
      { size: "3000*1200", price: 7900 }
    ],
    colors: [
      { name: "Light Yellow", inStock: true, stockCount: 100, image: "/images/products/Crude Wood Ripple-Light Yellow.jpg" }
    ]
  },
  {
    id: "17",
    name: "Ancient Wood",
    slug: "ancient-wood",
    category: "flexible-stone",
    price: 6700,
    images: [
      "/images/products/Ancient Wood-Dark Brown.jpg",
      "/images/products/Ancient Wood.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 2400, height: 590, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "2400*590", price: 6700 },
      { size: "2400*1190", price: 6900 }
    ],
    colors: [
      { name: "Dark Brown", inStock: true, stockCount: 100, image: "/images/products/Ancient Wood-Dark Brown.jpg" }
    ]
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
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
    stockCount: 0,
    inStock: false,
    description: "Теневой профиль черного цвета для создания эффекта парящих стен.",
    specifications: { width: 3000, height: 20, depth: 20, material: "Алюминий" }
  },
  {
    id: "28",
    name: "Монтажный комплект Professional",
    slug: "mounting-kit-pro",
    category: "accessories",
    price: 2450,
    images: ["/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png"],
    stockCount: 100,
    inStock: true,
    description: "Полный набор для монтажа: шпатель, уровень, крепежи и инструкция.",
    specifications: { width: 300, height: 200, depth: 100, material: "Пластик/Металл" },
    bundleItems: [
      { id: "b1", name: "Шпатель зубчатый", price: 450, quantity: 1, image: "/images/products/{B36328B4-8840-4A18-9166-DCD42EC55FD8}.png", slug: "notched-trowel", inStock: true, stockCount: 100 },
      { id: "b2", name: "Уровень строительный", price: 850, quantity: 1, image: "/images/products/uroven.jpg", slug: "spirit-level", inStock: true, stockCount: 100 },
      { id: "b3", name: "Клей UltraFix (пробник)", price: 650, quantity: 2, image: "/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png", slug: "ultrafix-sample", inStock: true, stockCount: 100 },
      { id: "b4", name: "Набор крепежей", price: 500, quantity: 1, image: "/images/products/{13C86AC8-07B5-40EE-A2AA-ECC9BA4E4621}.png", slug: "mounting-hardware", inStock: true, stockCount: 100 }
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
    stockCount: 100,
    inStock: true,
    description: "Профессиональный шпатель с зубьями для равномерного нанесения клея на поверхность панелей.",
    specifications: { width: 200, height: 100, depth: 2, material: "Сталь/Пластик" },
    isHidden: true
  },
  {
    id: "b2",
    name: "Уровень строительный",
    slug: "spirit-level",
    category: "accessories",
    price: 850,
    images: ["/images/products/uroven.jpg"],
    stockCount: 100,
    inStock: true,
    description: "Профессиональный строительный уровень для точного монтажа панелей.",
    specifications: { width: 600, height: 50, depth: 25, material: "Алюминий/Пластик" },
    isHidden: true
  },
  {
    id: "b3",
    name: "Клей UltraFix (пробник)",
    slug: "ultrafix-sample",
    category: "accessories",
    price: 650,
    images: ["/images/products/{91D6B128-7DCF-4DEA-9E2D-A1886ADA4044}.png"],
    stockCount: 100,
    inStock: true,
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
    stockCount: 100,
    inStock: true,
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
    stockCount: 100,
    inStock: true,
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
    stockCount: 100,
    inStock: true,
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
    stockCount: 100,
    inStock: true,
    description: "Декоративная затирка для швов. Влагостойкая, устойчивая к выцветанию.",
    specifications: { width: 150, height: 150, depth: 150, material: "Цементный состав" }
  },
  {
    id: "32",
    name: "Big Weaving",
    slug: "big-weaving",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Big Weaving-Jacinth.jpg",
      "/images/products/Big Weaving.png"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с UV-печатью. Толщина 3-5 мм.",
    specifications: { width: 3000, height: 600, depth: 3, material: "Кварцевый песок, кальциевый порошок, эмульсия" },
    variations: [
      { size: "3000*600", price: 5900 },
      { size: "3000*1200", price: 6900 }
    ],
    colors: [
      { name: "Jacinth", inStock: true, stockCount: 100, image: "/images/products/Big Weaving-Jacinth.jpg" }
    ]
  },
  {
    id: "33",
    name: "Cut Stone",
    slug: "cut-stone",
    category: "flexible-stone",
    price: 5900,
    images: [
      "/images/products/Cut Stone-Red.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с текстурой колотого камня.",
    specifications: { width: 1200, height: 600, depth: 4, material: "Кварцевый песок" },
    colors: [
      { name: "Red", inStock: true, stockCount: 100, image: "/images/products/Cut Stone-Red.jpg" }
    ]
  },
  {
    id: "34",
    name: "Gobi Rammed",
    slug: "gobi-rammed",
    category: "flexible-stone",
    price: 6500,
    images: [
      "/images/products/Gobi Rammed-Gradient B.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с текстурой утрамбованной земли пустыни Гоби.",
    specifications: { width: 2400, height: 1200, depth: 3, material: "Кварцевый песок" },
    colors: [
      { name: "Gradient B", inStock: true, stockCount: 100, image: "/images/products/Gobi Rammed-Gradient B.jpg" }
    ]
  },
  {
    id: "35",
    name: "Ridged Stone",
    slug: "ridged-stone",
    category: "flexible-stone",
    price: 7200,
    images: [
      "/images/products/Ridged Stone-Pire White.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с текстурой гребнистого камня.",
    specifications: { width: 1200, height: 600, depth: 5, material: "Кварцевый песок" },
    colors: [
      { name: "Pire White", inStock: true, stockCount: 100, image: "/images/products/Ridged Stone-Pire White.jpg" }
    ]
  },
  {
    id: "36",
    name: "Starmoon Stone",
    slug: "starmoon-stone",
    category: "flexible-stone",
    price: 7200,
    images: [
      "/images/products/Starmoon Stone-Dark Grey.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с текстурой 'Звездная луна'.",
    specifications: { width: 1200, height: 600, depth: 4, material: "Кварцевый песок" },
    colors: [
      { name: "Dark Grey", inStock: true, stockCount: 100, image: "/images/products/Starmoon Stone-Dark Grey.jpg" }
    ]
  },
  {
    id: "37",
    name: "Round Line Stone",
    slug: "round-line-stone",
    category: "flexible-stone",
    price: 6800,
    images: [
      "/images/products/Round Line Stone-Dark Grey.jpg"
    ],
    stockCount: 100,
    inStock: true,
    description: "Гибкий камень NEO с текстурой округлых линий.",
    specifications: { width: 1200, height: 600, depth: 4, material: "Кварцевый песок" },
    colors: [
      { name: "Dark Grey", inStock: true, stockCount: 100, image: "/images/products/Round Line Stone-Dark Grey.jpg" }
    ]
  }
];
