import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { ProductAddonsData } from "@/data/types/product-addon.types";

async function getProducts(): Promise<ProductAddonsData> {
  try {
    const data: ProductAddonsData = await getStrapiData(
      "/product-addons?populate=*&sort=order:asc&filters[isActive][$eq]=true"
    );
    return data || { data: [] };
  } catch (error) {
    return { data: [] };
  }
}

function getImageUrl(
  imageData:
    | { url?: string; alternativeText?: string }
    | { data?: { attributes?: { url?: string; alternativeText?: string } } }
    | null
    | undefined
) {
  if (!imageData) return null;

  if ("url" in imageData && imageData.url) {
    return getStrapiMedia(imageData.url);
  }

  if ("data" in imageData && imageData?.data?.attributes?.url) {
    return getStrapiMedia(imageData.data.attributes.url);
  }

  return null;
}

export default async function ProductsPage() {
  const productsData = await getProducts();
  const allItems = productsData.data || [];
  const products = allItems.filter((p) => p.category === "product");
  const addons = allItems.filter((p) => p.category === "addon");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Votre atelier de réparation avec{" "}
              <span className="text-violet-600">2900+ modèles</span> sur votre
              site
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez nos solutions pour gérer efficacement votre atelier de
              réparation de téléphones. Des outils puissants et faciles à
              utiliser.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Produits
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const imageUrl = getImageUrl(product.image);
                return (
                  <Card
                    key={product.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge className="bg-violet-100 text-violet-700">
                          Produit
                        </Badge>
                      </div>
                      <CardDescription className="text-base mt-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {product.features && product.features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {product.features.slice(0, 3).map((feature) => (
                            <div
                              key={feature.id}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">
                                {feature.name}
                              </span>
                            </div>
                          ))}
                          {product.features.length > 3 && (
                            <p className="text-xs text-gray-500 pl-6">
                              +{product.features.length - 3} autres
                              fonctionnalités
                            </p>
                          )}
                        </div>
                      )}
                      <Button
                        className="w-full bg-violet-600 hover:bg-violet-700"
                        asChild
                      >
                        <Link href={`/products/${product.slug}`}>
                          En savoir plus
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Add-ons Section */}
      {addons.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Add-ons
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {addons.map((addon) => {
                const imageUrl = getImageUrl(addon.image);
                return (
                  <Card
                    key={addon.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-violet-100">
                        <Image
                          src={imageUrl}
                          alt={addon.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{addon.name}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-700">
                          Add-on
                        </Badge>
                      </div>
                      <CardDescription className="text-base mt-2">
                        {addon.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {addon.features && addon.features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {addon.features.slice(0, 3).map((feature) => (
                            <div
                              key={feature.id}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">
                                {feature.name}
                              </span>
                            </div>
                          ))}
                          {addon.features.length > 3 && (
                            <p className="text-xs text-gray-500 pl-6">
                              +{addon.features.length - 3} autres
                              fonctionnalités
                            </p>
                          )}
                        </div>
                      )}
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        asChild
                      >
                        <Link href={`/products/${addon.slug}`}>
                          En savoir plus
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
