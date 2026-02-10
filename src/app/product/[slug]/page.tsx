import { PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
