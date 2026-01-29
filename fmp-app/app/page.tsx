import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedHero from "@/components/custom/AnimatedHero";
import AnimatedHeroContent from "@/components/custom/AnimatedHeroContent";
import ScrollAnimation from "@/components/custom/ScrollAnimation";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Play,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { HomePageData } from "@/data/types/home-page.types";
import { fallbackHomePageData } from "@/data/utils/fallback-data";
import { getIcon } from "@/data/utils/icon-mapper";
import { SubscriptionPlansData, SubscriptionPlan } from "@/data/types/subscription-plan.types";
import { ProductAddonsData } from "@/data/types/product-addon.types";
import { ReviewsData } from "@/data/types/review.types";
import PlanCard from "@/components/subscription/PlanCard";

async function getHomePageData(): Promise<HomePageData> {
  try {
    const data = await getStrapiData("/home-page?populate=*");

    if (!data || !data.data) {
      return fallbackHomePageData;
    }
    
    return data;
  } catch {
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
  } catch {
    return [];
  }
}

async function getProducts(): Promise<ProductAddonsData> {
  try {
    const data: ProductAddonsData = await getStrapiData(
      "/product-addons?populate=*&sort=order:asc&filters[isActive][$eq]=true&pagination[limit]=3"
    );
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

async function getReviews(): Promise<ReviewsData> {
  try {
    const data: ReviewsData = await getStrapiData(
      "/reviews?populate=*&sort=featured:desc,order:asc&pagination[limit]=3&filters[featured][$eq]=true"
    );
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export default async function Home() {
  const strapiData = await getHomePageData();
  const data = strapiData.data;
  const plans = await getSubscriptionPlans();
  const productsData = await getProducts();
  const reviewsData = await getReviews();
  const products = productsData.data || [];
  const reviews = reviewsData.data || [];

  const getImageUrl = (
    imageData: 
      | { url?: string; alternativeText?: string }
      | { data?: { attributes?: { url?: string; alternativeText?: string } } }
      | null
      | undefined,
    fallback: string
  ) => {
    if (!imageData) {
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
            <AnimatedHeroContent
              heroTitle={data.heroTitle}
              heroTitleHighlight={data.heroTitleHighlight}
              heroSubtitle={data.heroSubtitle}
              heroButtonPrimary={data.heroButtonPrimary}
              heroButtonSecondary={data.heroButtonSecondary}
              heroStats={data.heroStats}
            />
            <AnimatedHero
              imageUrl={getImageUrl(data.heroImage, "/mockups/hero-hand-phone.svg")}
              imageAlt={getImageAlt(data.heroImage, "Mockup application Softeamg")}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="right" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-600">#1 solution dans l&apos;industrie de la réparation</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl leading-tight">
                FMP Pro
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Donnez à vos visiteurs en ligne tout ce dont ils ont besoin pour réserver un rendez-vous en toute confiance.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                En un seul clic, vous pouvez ajouter plus de 2 800 modèles à votre plugin de réservation, présenter toutes les marques et modèles que vous réparez, les pièces de qualité que vous utilisez, et votre tarification transparente.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-medium">
                L&apos;objectif est simple : Attirez plus de clients dans votre magasin.
              </p>
              <Link href="/subscription" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold text-lg group">
                Voir les tarifs
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollAnimation>
            <ScrollAnimation direction="left" className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -right-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block" />
                <div className="relative flex gap-4">
                  <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-64 h-[500px] bg-white rounded-[2.5rem] shadow-2xl p-4 border-8 border-gray-900">
                      <div className="w-full h-full bg-gradient-to-br from-violet-50 to-blue-50 rounded-[2rem] p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-gray-900">9:41</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Filtrer par série</h3>
                        <div className="flex gap-2 mb-4 overflow-x-auto">
                          <div className="flex-shrink-0 w-32 bg-white rounded-lg p-2 shadow-sm">
                            <div className="w-16 h-20 bg-gray-200 rounded mb-2 mx-auto"></div>
                            <p className="text-xs font-semibold text-gray-900">Galaxy S</p>
                            <p className="text-xs text-gray-500">49 modèles</p>
                          </div>
                          <div className="flex-shrink-0 w-32 bg-violet-100 rounded-lg p-2 shadow-sm border-2 border-violet-300">
                            <div className="w-16 h-20 bg-gray-300 rounded mb-2 mx-auto"></div>
                            <p className="text-xs font-semibold text-violet-700">Galaxy</p>
                            <p className="text-xs text-violet-600">97 modèles</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Tous les modèles 286</p>
                        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                          <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Search className="h-4 w-4" />
                            <span className="text-xs">Rechercher un modèle</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
                            <div className="w-12 h-16 bg-gray-200 rounded"></div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">Trouver mon modèle</p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
                            <div className="w-12 h-16 bg-blue-500 rounded"></div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">Galaxy M55</p>
                              <p className="text-xs text-gray-500">SM-M556B</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 transform hover:scale-105 transition-transform duration-300 mt-8">
                    <div className="w-64 h-[500px] bg-white rounded-[2.5rem] shadow-2xl p-4 border-8 border-gray-900">
                      <div className="w-full h-full bg-gradient-to-br from-violet-50 to-blue-50 rounded-[2rem] p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-gray-900">9:41</span>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-900"></div>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Sélectionner la couleur</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg">BLEU GLACE</button>
                          <button className="px-3 py-1.5 bg-yellow-400 text-white text-xs font-semibold rounded-lg">CITRON</button>
                          <button className="px-3 py-1.5 bg-purple-400 text-white text-xs font-semibold rounded-lg">LILAS</button>
                          <button className="px-3 py-1.5 bg-blue-700 text-white text-xs font-semibold rounded-lg">MARINE</button>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Sélectionner la réparation</h3>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-gray-600" />
                                <span className="text-xs font-semibold text-gray-900">Investigation</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">30 MIN</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">GRATUIT</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">Une investigation plus approfondie est nécessaire lorsque vous n&apos;êtes pas sûr du problème de votre appareil.</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                <span className="text-xs font-semibold text-gray-900">Dommages liés à l&apos;eau</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">30 MIN</span>
                                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded">49,95 €</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">Votre appareil a été en contact avec de l&apos;eau ou un autre liquide.</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                <span className="text-xs font-semibold text-gray-900">Écran et verre</span>
                              </div>
                              <span className="text-xs text-violet-600">3 réparations</span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                                <span className="text-xs font-semibold text-gray-900">Batterie et charge</span>
                              </div>
                              <span className="text-xs text-violet-600">3 réparations</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="left" className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-6 border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <ShoppingBag className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">Passez à notre magasin</span>
                            <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">GRATUIT</Badge>
                          </div>
                          <p className="text-xs text-gray-500">Fait pendant que vous attendez</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 bg-violet-600 rounded flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-900">Sélectionner <span className="font-normal">l&apos;emplacement</span></span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
                          <MapPin className="h-4 w-4" />
                          Emplacement actuel
                        </button>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Rechercher par adresse"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-sm font-semibold text-gray-900">Jabots</p>
                          <p className="text-xs text-gray-600">123 Rue de la Réparation, Paris</p>
                        </div>
                      </div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-1 h-16 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right" className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Enhanced Locations</h2>
                <Badge className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold">Add-on</Badge>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                La gestion de plusieurs magasins vient de devenir plus facile. Avec ce add-on, vous pouvez assigner des gestionnaires de magasin, définir des tarifs spécifiques par emplacement, transférer les notifications, et permettre aux clients de rechercher facilement parmi des dizaines d&apos;emplacements.
              </p>
              <Link href="/products/enhanced-locations" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold text-lg group">
                En savoir plus
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.keyFeaturesTitle || "Fonctionnalités clés"}
              </h2>
              {data.keyFeaturesSubtitle && (
                <p className="mt-3 text-lg text-gray-600">{data.keyFeaturesSubtitle}</p>
              )}
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.keyFeatures && data.keyFeatures.length > 0
              ? data.keyFeatures.map((feature, index) => {
                  const Icon = getIcon(feature.iconName);
                  return (
                    <ScrollAnimation key={feature.id} delay={index * 0.1}>
                      <div className="text-center group cursor-pointer">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 group-hover:bg-violet-200 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                          <Icon className="h-8 w-8 text-violet-600 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{feature.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </ScrollAnimation>
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
                    <ScrollAnimation key={i} delay={i * 0.1}>
                      <div className="text-center group cursor-pointer">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 group-hover:bg-violet-200 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                          <Icon className="h-8 w-8 text-violet-600 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{feature.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </ScrollAnimation>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="right" className="flex justify-center order-2 lg:order-1">
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
            </ScrollAnimation>
            <ScrollAnimation direction="left" className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.whyChooseTitle || "Pourquoi choisir Softeamg pour votre atelier ?"}
              </h2>
              <div className="space-y-6">
                {data.whyChooseItems && data.whyChooseItems.length > 0
                  ? data.whyChooseItems.map((item, index) => (
                      <ScrollAnimation key={item.id} delay={index * 0.15}>
                        <div className="flex gap-4 group cursor-pointer p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-violet-200 text-sm font-bold text-violet-700 shadow-sm group-hover:border-violet-600 group-hover:bg-violet-50 group-hover:scale-110 transition-all duration-300">
                            {item.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                            <p className="mt-1 text-base text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </ScrollAnimation>
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
                    ].map((item, index) => (
                      <ScrollAnimation key={item.num} delay={index * 0.15}>
                        <div className="flex gap-4 group cursor-pointer p-3 rounded-lg hover:bg-white/60 transition-all duration-300">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 border-violet-200 text-sm font-bold text-violet-700 shadow-sm group-hover:border-violet-600 group-hover:bg-violet-50 group-hover:scale-110 transition-all duration-300">
                            {item.num}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                            <p className="mt-1 text-base text-gray-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </ScrollAnimation>
                    ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.statsCards && data.statsCards.length > 0
              ? data.statsCards.map((item, index) => {
                  const Icon = getIcon(item.iconName);
                  return (
                    <ScrollAnimation key={item.id} delay={index * 0.1}>
                      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="text-center pt-8 pb-8">
                          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                            <Icon className="h-10 w-10 text-violet-600 stroke-2" />
                          </div>
                          <CardTitle className="text-base font-normal text-gray-500">{item.title}</CardTitle>
                          <CardDescription className="mt-2 text-sm text-gray-400">{item.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </ScrollAnimation>
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
                    <ScrollAnimation key={i} delay={i * 0.1}>
                      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <CardHeader className="text-center pt-8 pb-8">
                          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                            <Icon className="h-10 w-10 text-violet-600 stroke-2" />
                          </div>
                          <CardTitle className="text-base font-normal text-gray-500">{item.title}</CardTitle>
                          <CardDescription className="mt-2 text-sm text-gray-400">{item.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </ScrollAnimation>
                  );
                })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-violet-50/50 via-violet-50 to-blue-50/50 p-8 md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <ScrollAnimation direction="right">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                    {data.videoSectionTitle || "Voyez comment Softeamg simplifie votre quotidien"}
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {data.videoSectionDescription ||
                      "Un parcours clair, un suivi visuel, et des notifications automatiques pour vos clients."}
                  </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation direction="left" className="flex justify-center">
                <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-blue-400/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-violet-600 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <Play className="h-6 w-6 text-violet-600 ml-1 fill-violet-600" />
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="right" className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.featuresListTitle || "Les fonctions qui font la différence"}
              </h2>
              <p className="text-lg text-gray-600">
                {data.featuresListDescription ||
                  "Une interface claire, des checklists par réparation, et un suivi client automatique."}
              </p>
              <div className="mt-6 space-y-4">
                {data.featuresListItems && data.featuresListItems.length > 0
                  ? data.featuresListItems.map((item, index) => (
                      <ScrollAnimation key={item.id} delay={index * 0.1}>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-violet-600" />
                          <span className="text-base text-gray-700">{item.text}</span>
                        </div>
                      </ScrollAnimation>
                    ))
                  : [
                      "Dossiers clients complets",
                      "État des réparations en temps réel",
                      "Historique des interventions",
                      "Inventaire des pièces",
                      "Notifications automatiques",
                      "Rapports détaillés",
                    ].map((item, index) => (
                      <ScrollAnimation key={item} delay={index * 0.1}>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-violet-600" />
                          <span className="text-base text-gray-700">{item}</span>
                        </div>
                      </ScrollAnimation>
                    ))}
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left" className="flex justify-center lg:justify-end">
              <Image
                src={getImageUrl(data.featuresListImage, "/mockups/phone-screen.svg")}
                alt={getImageAlt(data.featuresListImage, "Écran Softeamg")}
                width={360}
                height={520}
                className="w-full max-w-sm"
              />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Plans simples</h2>
              <p className="mt-3 text-lg text-gray-600">Choisissez le plan adapté à votre atelier.</p>
            </div>
          </ScrollAnimation>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <ScrollAnimation key={plan.id?.toString() || plan.name} delay={index * 0.15}>
                  <PlanCard plan={plan} />
                </ScrollAnimation>
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
              ].map((plan, index) => (
                <ScrollAnimation key={plan.id} delay={index * 0.15}>
                  <PlanCard plan={plan as SubscriptionPlan} />
                </ScrollAnimation>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Nos Solutions
                </h2>
                <p className="mt-3 text-lg text-gray-600">
                  Découvrez nos produits et add-ons pour optimiser votre atelier.
                </p>
              </div>
            </ScrollAnimation>
            <div className="grid gap-8 md:grid-cols-3">
              {products.map((product, index) => {
                const imageUrl = product.image
                  ? getImageUrl(
                      product.image as
                        | { url?: string; alternativeText?: string }
                        | { data?: { attributes?: { url?: string; alternativeText?: string } } }
                        | null
                        | undefined,
                      ""
                    )
                  : null;
                return (
                  <ScrollAnimation key={product.id} delay={index * 0.15}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    {imageUrl ? (
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 w-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
                        <div className="text-violet-600 text-4xl font-bold">
                          {product.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge
                          className={
                            product.category === "product"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {product.category === "product" ? "Produit" : "Add-on"}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mt-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {product.features && product.features.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {product.features.slice(0, 2).map((feature) => (
                            <div
                              key={feature.id}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{feature.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="w-full border-violet-200 text-violet-600 hover:bg-violet-50"
                        asChild
                      >
                        <Link href={`/products/${product.slug}`}>
                          En savoir plus
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
            <ScrollAnimation delay={0.3} className="text-center mt-8">
              <Button
                variant="ghost"
                className="text-violet-600 hover:text-violet-700"
                asChild
              >
                <Link href="/products">
                  Voir tous les produits
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
                <span className="text-3xl font-bold text-violet-600">
                  {reviewsData.meta?.pagination?.total || reviews.length}+
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Satisfied Repairshop owners have already increased their conversion rates with FMP
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Découvrez ce que nos clients disent de notre solution.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {reviews.map((review, index) => {
                const avatarUrl = review.avatar
                  ? getImageUrl(
                      review.avatar as
                        | { url?: string; alternativeText?: string }
                        | { data?: { attributes?: { url?: string; alternativeText?: string } } }
                        | null
                        | undefined,
                      ""
                    )
                  : null;
                return (
                  <ScrollAnimation key={review.id} delay={index * 0.15}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <CardDescription className="text-base text-gray-700 leading-relaxed">
                        {review.text}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        {avatarUrl ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={avatarUrl}
                              alt={review.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-violet-600 font-semibold text-sm">
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {review.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {review.role}
                            {review.company && ` - ${review.company}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
            <ScrollAnimation delay={0.3} className="text-center mt-8">
              <Button
                variant="ghost"
                className="text-violet-600 hover:text-violet-700"
                asChild
              >
                <Link href="/reviews">
                  Voir tous les avis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>
        </section>
      )}

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.testimonialsTitle || "Avis clients"}
              </h2>
              {data.testimonialsSubtitle && (
                <p className="mt-3 text-lg text-gray-600">{data.testimonialsSubtitle}</p>
              )}
            </div>
          </ScrollAnimation>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {data.testimonials && data.testimonials.length > 0
              ? data.testimonials.map((testimonial, index) => (
                  <ScrollAnimation key={testimonial.id} delay={index * 0.15}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
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
                  </ScrollAnimation>
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
                ].map((testimonial, index) => (
                  <ScrollAnimation key={index} delay={index * 0.15}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
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
                  </ScrollAnimation>
                ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-violet-500 to-blue-600 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <ScrollAnimation>
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
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
