import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, TrendingUp, DollarSign, RefreshCw } from "lucide-react";
import { getStrapiData } from "@/data/services/strapi.service";
import { ProductAddonsData } from "@/data/types/product-addon.types";

async function getAddon() {
  try {
    const data: ProductAddonsData = await getStrapiData(
      `/product-addons?filters[slug][$eq]=dynamic-pricing&populate=*`
    );
    return data?.data?.[0] || null;
  } catch {
    return null;
  }
}

const defaultFeatures = [
  { name: "Tarification automatique", description: "Mise à jour des prix en temps réel" },
  { name: "Synchronisation fournisseurs", description: "Importez les prix de vos fournisseurs" },
  { name: "Calcul des marges", description: "Optimisez votre rentabilité" },
  { name: "Historique des prix", description: "Suivez l'évolution des tarifs" },
  { name: "Règles personnalisées", description: "Configurez vos propres règles de tarification" },
  { name: "Notifications de changement", description: "Soyez alerté des variations de prix" },
];

export default async function DynamicPricingPage() {
  const addon = await getAddon();
  const features = addon?.features && addon.features.length > 0 
    ? addon.features 
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
              <Badge className="bg-blue-100 text-blue-700">Add-on</Badge>
              <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                {addon?.name || "Dynamic Pricing Add-on"}
              </h1>
              <p className="text-lg text-gray-600">
                {addon?.description || "Automatisez la gestion de vos prix avec notre add-on de tarification dynamique. Synchronisez les prix de vos fournisseurs et optimisez vos marges automatiquement."}
              </p>
              <div className="flex items-center gap-2 text-violet-600">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Augmentez vos marges jusqu'à 30%</span>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 rounded-full px-8"
                  asChild
                >
                  <Link href="/subscription">Voir les tarifs</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-violet-200/50 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-violet-100 rounded-3xl p-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <DollarSign className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-gray-900">Prix dynamiques</div>
                    <div className="text-lg text-gray-600">Mise à jour automatique</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Fonctionnalités
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
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

      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-violet-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <RefreshCw className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Synchronisation automatique
                </h3>
                <p className="text-gray-600">
                  Connectez-vous à vos fournisseurs et synchronisez automatiquement les prix. 
                  Plus besoin de mettre à jour manuellement vos tarifs, l'add-on s'en charge pour vous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {addon?.longDescription && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: addon.longDescription }}
            />
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à optimiser vos prix ?
          </h2>
          <p className="text-lg text-white/95 mb-8">
            Ajoutez Dynamic Pricing à votre abonnement FMP Pro.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 rounded-full px-8"
            asChild
          >
            <Link href="/subscription">Voir les tarifs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
