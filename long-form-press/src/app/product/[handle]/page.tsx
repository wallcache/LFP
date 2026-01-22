import { notFound } from "next/navigation";
import { getProductByHandle, getRelatedProducts } from "@/lib/placeholder-data";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductDetails } from "./ProductDetails";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found | Long Form Press" };
  }

  return {
    title: `${product.title} | Long Form Press`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(handle, 3);

  return (
    <>
      <section className="py-12 md:py-20">
        <Container>
          <ProductDetails product={product} />
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F5F5F0]">
          <Container>
            <h2 className="font-serif text-2xl md:text-3xl mb-10">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      )}
    </>
  );
}
