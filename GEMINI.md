# Project Context: 3D Panels Store (MoskWin)

This project is a modern e-commerce platform specializing in 3D decorative panels (Gypsum, Flexible Stone, Profiles, etc.), built with Next.js 15.

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API (`CartContext`)
- **Icons**: Lucide React
- **Analytics**: Yandex Metrika, Vercel Analytics

## 🏗️ Architecture & Key Components

### 🖼️ Image System (`src/components/ProductImage.tsx`)
- **Requirement**: Use `ProductImage` for ALL product-related images. Standard `next/image` is only for static UI assets.
- **Fallback**: Automatically shows a branded minimalist placeholder with the product name centered.
- **Loading**: Implements pulse animations and blur-in effects.

### 🌿 Eco-Passport System
- **Component**: `src/components/EcoPassport.tsx`.
- **Logic**: Renders environmental data (`ecoDetails`) in product cards.
- **Goal**: Highlight premium quality and health safety (Natural Carbon, Zero VOC, etc.).

### 🛡️ Security & Anti-Spam
- **Honeypot**: Mandatory for all public forms (`_honeypot` field).
- **Validation**: Server-side length checks and bot trapping in `/api/contact`.

### ⚖️ Legal & Trust
- **Entity**: IP Moskvin Stanislav Vladimirovich.
- **Placement**: Footer, Contacts (full details), About (Trust cards), Legal policies.

## 🛠️ Code Quality Standards
- **Zero Unused**: No unused imports or variables (enforced by ESLint). 
- **Fixed**: Corrected `Calculator.tsx` constructor error by restoring necessary imports and migrating to `ProductImage`.

## 📦 Data
- **Static Store**: `src/lib/data.ts`.
- **Calculations**: Interactive canvas engine in `Calculator.tsx` with waste optimization logic.
