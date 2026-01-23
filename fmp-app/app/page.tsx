import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  Play,
  Search,
  Settings,
  Shield,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { HomePageData } from "@/data/types/home-page.types";
import { fallbackHomePageData } from "@/data/utils/fallback-data";
import { getIcon } from "@/data/utils/icon-mapper";
import { SubscriptionPlansData, SubscriptionPlan } from "@/data/types/subscription-plan.types";
import PlanCard from "@/components/subscription/PlanCard";

async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await getStrapiData("/home-page?populate=*");

    if (!data || !data.data) {
      return fallbackHomePageData;
    }
    
    return data;
  } catch (error) {
    console.error("❌ [PAGE] Error details:", error);
    return fallbackHomePageData;
  }
}

async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const data: SubscriptionPlansData = await getStrapiData("/subscription-plans?populate=*&sort=order:asc");
    
    if (!data || !data.data || data.data.length === 0) {
      return [];
    }
    
    const allPlans = data.data;
    const popularPlan = allPlans.find((p) => p.popular);
    const otherPlans = allPlans.filter((p) => !p.popular).slice(0, 2);
    
    if (popularPlan) {
      return [otherPlans[0] || null, popularPlan, otherPlans[1] || null].filter((p): p is SubscriptionPlan => p !== null);
    } else {
      return allPlans.slice(0, 3);
    }
  } catch (error) {
    console.error("❌ Failed to fetch subscription plans:", error);
    return [];
  }
}

export default async function Home() {
  const strapiData = await getHomePageData();
  const data = strapiData.data;
  const plans = await getSubscriptionPlans();

  const getImageUrl = (
    imageData: 
      | { url?: string; alternativeText?: string }
      | { data?: { attributes?: { url?: string; alternativeText?: string } } }
      | null
      | undefined,
    fallback: string
  ) => {
    if (!imageData) {
      console.log("🖼️ [IMAGE] No image data, using fallback:", fallback);
      return fallback;
    }
    
    if ("url" in imageData && imageData.url) {
      const url = getStrapiMedia(imageData.url);
      return url || fallback;
    }
    
    if ("data" in imageData && imageData?.data?.attributes?.url) {
      const url = getStrapiMedia(imageData.data.attributes.url);
      return url || fallback;
    }
    
    return fallback;
  };
  
  const getImageAlt = (
    imageData: 
      | { url?: string; alternativeText?: string }
      | { data?: { attributes?: { url?: string; alternativeText?: string } } }
      | null
      | undefined,
    fallback: string
  ) => {
    if (!imageData) return fallback;
    
    if ("alternativeText" in imageData && imageData.alternativeText) {
      return imageData.alternativeText;
    }
    
    if ("data" in imageData && imageData?.data?.attributes?.alternativeText) {
      return imageData.data.attributes.alternativeText;
    }
    
    return fallback;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                {data.heroTitle || "Votre application Softeamg pour des réparations"}{" "}
                {data.heroTitleHighlight && (
                  <span className="text-violet-600">{data.heroTitleHighlight}</span>
                )}
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                {data.heroSubtitle ||
                  "Automatisez la gestion, suivez les dossiers clients et pilotez vos réparations en un seul endroit."}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-full bg-violet-600 px-8 py-6 text-base hover:bg-violet-700"
                  asChild
                >
                  <Link href="/subscription">{data.heroButtonPrimary || "Commencer"}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base border-2 border-gray-400 text-gray-900 hover:bg-gray-100 hover:border-gray-500"
                  asChild
                >
                  <Link href="/demo">{data.heroButtonSecondary || "Voir la démo"}</Link>
                </Button>
              </div>
              {data.heroStats && data.heroStats.length > 0 && (
                <div className="flex items-center gap-4 pt-4 text-sm text-gray-500">
                  {data.heroStats.map((stat, i) => (
                    <span key={stat.id}>
                      {stat.title}
                      {i < data.heroStats!.length - 1 && <span className="mx-2">•</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -right-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block" />
              <Image
                src={getImageUrl(data.heroImage, "/mockups/hero-hand-phone.svg")}
                alt={getImageAlt(data.heroImage, "Mockup application Softeamg")}
                width={460}
                height={560}
                className="relative z-10 w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {data.keyFeaturesTitle || "Fonctionnalités clés"}
            </h2>
            {data.keyFeaturesSubtitle && (
              <p className="mt-3 text-lg text-gray-600">{data.keyFeaturesSubtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.keyFeatures && data.keyFeatures.length > 0
              ? data.keyFeatures.map((feature) => {
                  const Icon = getIcon(feature.iconName);
                  return (
                    <div key={feature.id} className="text-center group cursor-pointer">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 group-hover:bg-violet-200 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <Icon className="h-8 w-8 text-violet-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="mt-5 text-base font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })
              : [
                  { icon: Search, title: "Recherche", desc: "Clients et réparations" },
                  { icon: Settings, title: "Paramètres", desc: "Atelier sur mesure" },
                  { icon: BarChart3, title: "Stats", desc: "Performance claire" },
                  { icon: Bell, title: "Alertes", desc: "Rendez-vous" },
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="text-center group cursor-pointer">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 group-hover:bg-violet-200 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <Icon className="h-8 w-8 text-violet-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="mt-5 text-base font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 to-blue-200/50 rounded-3xl blur-2xl transform translate-x-4 translate-y-4"></div>
                <Image
                  src={getImageUrl(data.whyChooseImage, "/mockups/phone-screen.svg")}
                  alt={getImageAlt(data.whyChooseImage, "Écran de l'application")}
                  width={380}
                  height={520}
                  className="relative w-full max-w-sm drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.whyChooseTitle || "Pourquoi choisir Softeamg pour votre atelier ?"}
              </h2>
              <div className="space-y-6">
                {data.whyChooseItems && data.whyChooseItems.length > 0
                  ? data.whyChooseItems.map((item) => (
                      <div key={item.id} className="flex gap-4 group cursor-pointer p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-violet-200 text-sm font-bold text-violet-700 shadow-sm group-hover:border-violet-600 group-hover:bg-violet-50 group-hover:scale-110 transition-all duration-300">
                          {item.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                          <p className="mt-1 text-base text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))
                  : [
                      {
                        num: "01",
                        title: "Interface intuitive",
                        desc: "Prise en main rapide pour toute l'équipe.",
                      },
                      {
                        num: "02",
                        title: "Process fluide",
                        desc: "Chaque réparation suit un parcours clair.",
                      },
                      {
                        num: "03",
                        title: "Support prioritaire",
                        desc: "Une équipe dispo quand vous en avez besoin.",
                      },
                    ].map((item) => (
                      <div key={item.num} className="flex gap-4 group cursor-pointer p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-violet-200 text-sm font-bold text-violet-700 shadow-sm group-hover:border-violet-600 group-hover:bg-violet-50 group-hover:scale-110 transition-all duration-300">
                          {item.num}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                          <p className="mt-1 text-base text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.statsCards && data.statsCards.length > 0
              ? data.statsCards.map((item) => {
                  const Icon = getIcon(item.iconName);
                  return (
                    <Card
                      key={item.id}
                      className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <CardHeader className="text-center pt-8 pb-8">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                          <Icon className="h-10 w-10 text-violet-600 stroke-2" />
                        </div>
                        <CardTitle className="text-base font-normal text-gray-500">{item.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm text-gray-400">{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })
              : [
                  { icon: Users, title: "500+ Ateliers", desc: "Nous font confiance" },
                  { icon: Shield, title: "Données sécurisées", desc: "Chiffrement SSL" },
                  { icon: Clock, title: "Support 24/7", desc: "Toujours disponible" },
                  { icon: Wrench, title: "Rapide & efficace", desc: "Workflow fluide" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={i}
                      className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <CardHeader className="text-center pt-8 pb-8">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                          <Icon className="h-10 w-10 text-violet-600 stroke-2" />
                        </div>
                        <CardTitle className="text-base font-normal text-gray-500">{item.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm text-gray-400">{item.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-violet-50/50 via-violet-50 to-blue-50/50 p-8 md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {data.videoSectionTitle || "Voyez comment Softeamg simplifie votre quotidien"}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  {data.videoSectionDescription ||
                    "Un parcours clair, un suivi visuel, et des notifications automatiques pour vos clients."}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-blue-400/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-violet-600 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <Play className="h-6 w-6 text-violet-600 ml-1 fill-violet-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.featuresListTitle || "Les fonctions qui font la différence"}
              </h2>
              <p className="text-lg text-gray-600">
                {data.featuresListDescription ||
                  "Une interface claire, des checklists par réparation, et un suivi client automatique."}
              </p>
              <div className="mt-6 space-y-4">
                {data.featuresListItems && data.featuresListItems.length > 0
                  ? data.featuresListItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-violet-600" />
                        <span className="text-base text-gray-700">{item.text}</span>
                      </div>
                    ))
                  : [
                      "Dossiers clients complets",
                      "État des réparations en temps réel",
                      "Historique des interventions",
                      "Inventaire des pièces",
                      "Notifications automatiques",
                      "Rapports détaillés",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-violet-600" />
                        <span className="text-base text-gray-700">{item}</span>
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={getImageUrl(data.featuresListImage, "/mockups/phone-screen.svg")}
                alt={getImageAlt(data.featuresListImage, "Écran Softeamg")}
                width={360}
                height={520}
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Plans simples</h2>
            <p className="mt-3 text-lg text-gray-600">Choisissez le plan adapté à votre atelier.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <PlanCard key={plan.id?.toString() || plan.name} plan={plan} />
              ))
            ) : (
              [
                {
                  id: 1,
                  name: "Lite",
                  price: 29,
                  period: "month",
                  features: [{ id: 1, name: "50 réparations/mois", included: true }, { id: 2, name: "Base clients", included: true }, { id: 3, name: "Support email", included: true }],
                  popular: false,
                },
                {
                  id: 2,
                  name: "Premium",
                  price: 79,
                  period: "month",
                  popular: true,
                  features: [
                    { id: 4, name: "Réparations illimitées", included: true },
                    { id: 5, name: "Support prioritaire", included: true },
                    { id: 6, name: "Statistiques avancées", included: true },
                    { id: 7, name: "API complète", included: true },
                  ],
                },
                {
                  id: 3,
                  name: "Entreprise",
                  price: 0,
                  period: "month",
                  popular: false,
                  features: [{ id: 8, name: "Multi-ateliers", included: true }, { id: 9, name: "Formation dédiée", included: true }, { id: 10, name: "API complète", included: true }, { id: 11, name: "Support 24/7", included: true }],
                },
              ].map((plan) => (
                <PlanCard key={plan.id} plan={plan as SubscriptionPlan} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {data.testimonialsTitle || "Avis clients"}
            </h2>
            {data.testimonialsSubtitle && (
              <p className="mt-3 text-lg text-gray-600">{data.testimonialsSubtitle}</p>
            )}
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {data.testimonials && data.testimonials.length > 0
              ? data.testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-base text-gray-700 leading-relaxed">
                        {testimonial.text}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                ))
              : [
                  {
                    name: "Marc D.",
                    role: "Atelier PhoneFix",
                    text: "Simple à mettre en place, résultat immédiat.",
                  },
                  {
                    name: "Sophie M.",
                    role: "ReparTech",
                    text: "Une interface claire, l'équipe adore.",
                  },
                  {
                    name: "Ahmed B.",
                    role: "MobileCare",
                    text: "Le meilleur outil pour suivre les réparations.",
                  },
                ].map((testimonial, i) => (
                  <Card key={i} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-base text-gray-700 leading-relaxed">
                        {testimonial.text}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
              {data.ctaTitle || "Prêt à mieux gérer votre atelier ?"}
            </h2>
            <p className="text-lg text-white/95 max-w-xl mx-auto">
              {data.ctaDescription || "Essai gratuit de 14 jours, sans engagement."}
            </p>
            <div className="flex flex-wrap justify-center gap-5 pt-4">
              <Button
                size="lg"
                className="rounded-full bg-white text-violet-600 px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gray-50"
                asChild
              >
                <Link href="/subscription">{data.ctaButtonPrimary || "Essai gratuit"}</Link>
              </Button>
              <Button
                size="lg"
                className="rounded-full bg-black text-white px-10 py-7 text-lg font-semibold shadow-lg hover:bg-gray-900 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/contact">{data.ctaButtonSecondary || "Nous contacter"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
