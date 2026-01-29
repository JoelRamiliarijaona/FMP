import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, Star } from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { ProductAddonsData } from "@/data/types/product-addon.types";

async function getProduct() {
  try {
    const data: ProductAddonsData = await getStrapiData(
      `/product-addons?filters[slug][$eq]=fmp-pro&populate=*`
    );
    return data?.data?.[0] || null;
  } catch {
    return null;
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

const defaultFeatures = [
  { name: "Gestion complète des réparations", description: "Suivez chaque réparation de A à Z" },
  { name: "Base de données clients", description: "Historique complet de chaque client" },
  { name: "Gestion des stocks", description: "Suivez vos pièces et accessoires" },
  { name: "Rapports et statistiques", description: "Analysez vos performances" },
  { name: "Notifications automatiques", description: "Alertes par email et SMS" },
  { name: "Interface intuitive", description: "Facile à utiliser pour toute l'équipe" },
  { name: "Multi-utilisateurs", description: "Gérez les permissions par rôle" },
  { name: "API complète", description: "Intégrez avec vos outils existants" },
];

export default async function FMPProPage() {
  const product = await getProduct();

  const imageUrl = product?.image ? getImageUrl(product.image) : null;
  const features = product?.features && product.features.length > 0 
    ? product.features 
    : defaultFeatures;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-violet-600"
            asChild
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="bg-violet-100 text-violet-700">Produit Principal</Badge>
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                {product?.name || "FMP Pro"}
              </h1>
              <p className="text-lg text-gray-600">
                {product?.description || "La solution complète pour gérer votre atelier de réparation de téléphones. Toutes les fonctionnalités dont vous avez besoin en un seul endroit."}
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 rounded-full px-8"
                  asChild
                >
                  <Link href="/subscription">Voir les tarifs</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  asChild
                >
                  <Link href="/contact">Demander une démo</Link>
                </Button>
              </div>
            </div>
            {imageUrl && (
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100">
                <Image
                  src={imageUrl}
                  alt={product?.name || "FMP Pro"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Fonctionnalités incluses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-violet-600" />
                    {feature.name}
                  </CardTitle>
                </CardHeader>
                {feature.description && (
                  <CardContent>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {product?.longDescription && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        </div>
      </section>
      )}

      <section className="py-16 md:py-20 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer avec FMP Pro ?
          </h2>
          <p className="text-lg text-white/95 mb-8">
            Découvrez nos tarifs et choisissez le plan adapté à votre atelier.
          </p>
          <Button
            size="lg"
            className="bg-white text-violet-600 hover:bg-gray-50 rounded-full px-8"
            asChild
          >
            <Link href="/subscription">Voir les tarifs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
