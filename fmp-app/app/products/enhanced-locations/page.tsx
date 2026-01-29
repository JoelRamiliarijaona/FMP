import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft, MapPin, Users, Clock, Mail } from "lucide-react";
import { getStrapiData } from "@/data/services/strapi.service";
import { ProductAddonsData } from "@/data/types/product-addon.types";

async function getAddon() {
  try {
    const data: ProductAddonsData = await getStrapiData(
      `/product-addons?filters[slug][$eq]=enhanced-locations&populate=*`
    );
    return data?.data?.[0] || null;
  } catch {
    return null;
  }
}

const defaultFeatures = [
  { name: "Gestion multi-locations", description: "Gérez plusieurs ateliers depuis une seule interface" },
  { name: "Assignation automatique", description: "Assignez automatiquement les clients à la location la plus proche" },
  { name: "Gestionnaires par location", description: "Désignez un responsable pour chaque atelier" },
  { name: "Tarifs par location", description: "Définissez des prix différents selon la location" },
  { name: "Statistiques par site", description: "Analysez les performances de chaque location" },
  { name: "Transferts entre locations", description: "Transférez facilement les réparations" },
];

export default async function EnhancedLocationsPage() {
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
                {addon?.name || "Enhanced Locations Add-on"}
              </h1>
              <p className="text-lg text-gray-600">
                {addon?.description || "Gérez plusieurs ateliers de réparation depuis une seule plateforme. Assignez automatiquement les clients, gérez les stocks par location et analysez les performances de chaque site."}
              </p>
              <div className="flex items-center gap-2 text-violet-600">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Gérez un nombre illimité de locations</span>
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
              <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 to-blue-200/50 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-violet-100 to-blue-100 rounded-3xl p-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <MapPin className="h-12 w-12 text-violet-600" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-gray-900">Multi-locations</div>
                    <div className="text-lg text-gray-600">Gestion centralisée</div>
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

      <section className="py-16 md:py-20 bg-gradient-to-br from-violet-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-violet-600" />
                </div>
                <CardTitle>Gestionnaires par location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Désignez un responsable pour chaque atelier avec des permissions spécifiques.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Horaires par location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Définissez des horaires d'ouverture différents pour chaque atelier.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-violet-600" />
                </div>
                <CardTitle>Notifications par site</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Recevez les notifications spécifiques à chaque location.
                </p>
              </CardContent>
            </Card>
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

      <section className="py-16 md:py-20 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à gérer plusieurs locations ?
          </h2>
          <p className="text-lg text-white/95 mb-8">
            Ajoutez Enhanced Locations à votre abonnement FMP Pro.
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
