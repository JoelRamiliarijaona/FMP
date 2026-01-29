import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Database, FileText, Wrench, Settings, Calendar, CreditCard, MapPin, Bell, Clock, ShoppingCart, Gift, Languages, Code, Zap, Package } from "lucide-react";
import ScrollAnimation from "@/components/custom/ScrollAnimation";

const features = [
  { icon: MapPin, name: "Service de ramassage" },
  { icon: Package, name: "Envoi d'appareil" },
  { icon: Wrench, name: "Réparation sur site" },
  { icon: Code, name: "Shortcodes personnalisés" },
  { icon: Zap, name: "Webhooks" },
  { icon: Calendar, name: "Google Calendar" },
  { icon: Bell, name: "Notifications email" },
  { icon: Clock, name: "Horaires spéciaux" },
  { icon: FileText, name: "Checklist pré-rendez-vous" },
  { icon: ShoppingCart, name: "Ventes additionnelles" },
  { icon: Gift, name: "Coupons" },
  { icon: Languages, name: "13 langues" },
  { icon: Settings, name: "Traductions personnalisables" },
  { icon: CreditCard, name: "Méthodes de paiement" },
  { icon: MapPin, name: "Multiples emplacements" },
  { icon: Database, name: "Listes de réparations globales" },
];

export default function ProductsAddOnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 md:text-6xl lg:text-7xl">
                Transformez les visiteurs en clients
              </h1>
              <p className="text-2xl text-violet-600 font-semibold">
                avec FMP Pro
              </p>
              <h2 className="text-4xl font-bold text-gray-900 md:text-5xl mt-8">
                Testez FMP Pro
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Permettez aux clients de réserver un service en ligne avec cette solution tout-en-un. Gérez les réservations, automatisez les notifications email, et générez des devis pour convertir les visiteurs en clients fidèles sans effort.
              </p>
              <Button 
                size="lg" 
                className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 py-6 text-lg mt-6"
                asChild
              >
                <Link href="/subscription">Commencer</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Essayez les Add-ons FMP
            </h3>
          </ScrollAnimation>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <ScrollAnimation delay={0.1}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Dynamic Pricing</h4>
                  <p className="text-gray-600">Tarification dynamique pour optimiser vos revenus</p>
                  <Link href="/products/dynamic-pricing" className="text-violet-600 hover:text-violet-700 font-semibold mt-4 inline-flex items-center gap-2">
                    En savoir plus <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enhanced Locations</h4>
                  <p className="text-gray-600">Gestion multi-emplacements avancée</p>
                  <Link href="/products/enhanced-locations" className="text-violet-600 hover:text-violet-700 font-semibold mt-4 inline-flex items-center gap-2">
                    En savoir plus <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Système de rendez-vous</h3>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Réservez en quelques clics
                </h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Permettez à vos visiteurs en ligne d&apos;utiliser un système de réservation convivial qui garde votre calendrier plein tout en économisant votre temps précieux.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Parfaitement visible sur tous les appareils, FMP offrira à vos clients la meilleure expérience et fera exploser vos réservations en ligne.
                </p>
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6"
                  asChild
                >
                  <Link href="/subscription">Commencer</Link>
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left">
              <div className="relative">
                <div className="absolute -right-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-violet-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-violet-600" />
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
            <ScrollAnimation direction="right">
              <div className="relative">
                <div className="absolute -left-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-violet-100 rounded-lg flex items-center justify-center">
                    <Database className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Base de données pré-configurée</h3>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Mettez à jour votre site en quelques secondes
                </h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ne vous inquiétez plus jamais des nouveaux lancements de produits. Économisez d&apos;innombrables heures à rechercher de nouveaux modèles et à mettre à jour votre site web avec l&apos;aide de FMP.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  La base de données de FMP contient plus de 2 600 modèles dans leurs couleurs uniques, plus de 70 réparations différentes, et des traductions en 13 langues. Choisissez simplement ce que vous voulez ajouter et importez en un seul clic.
                </p>
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6"
                  asChild
                >
                  <Link href="/subscription">Commencer</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Génération automatique de devis</h3>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Devis en mode automatique
                </h4>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Réduisez la barrière de la planification d&apos;un rendez-vous. Permettez à vos visiteurs de générer leurs propres devis, qui sont envoyés par email en PDF.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Pour augmenter les conversions, l&apos;email contient un lien qui amène les visiteurs à l&apos;étape finale de réservation d&apos;un rendez-vous, avec toutes les informations pré-remplies basées sur le devis.
                </p>
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6"
                  asChild
                >
                  <Link href="/subscription">Commencer</Link>
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left">
              <div className="relative">
                <div className="absolute -right-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-violet-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-16 w-16 text-violet-600" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Autres fonctionnalités</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous avons inventé une meilleure façon de générer de nouveaux leads pour les ateliers de réparation, et cela change la donne.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollAnimation key={feature.name} delay={index * 0.05}>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 group-hover:bg-violet-200 transition-colors mb-3">
                      <Icon className="h-6 w-6 text-violet-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{feature.name}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
          <ScrollAnimation delay={0.8} className="text-center mt-8">
            <p className="text-gray-600">
              <Link href="/resources?category=changelog" className="text-violet-600 hover:underline font-semibold">
                Notes de version
              </Link>
              {" • "}
              <Link href="/resources?category=roadmap" className="text-violet-600 hover:underline font-semibold">
                Feuille de route
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              +64 fonctionnalités que nous avons constamment ajoutées depuis le lancement en 2022
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollAnimation>
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                &quot;D&apos;accord, je suis partant — comment ça fonctionne ?&quot;
              </h3>
              <p className="text-lg text-gray-600">
                FMP peut être entièrement opérationnel en 10 minutes. Si vous n&apos;avez pas de site web, vous pouvez toujours l&apos;utiliser avec une installation dédiée.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid gap-8 md:grid-cols-3 mt-12">
            <ScrollAnimation delay={0.1}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Testez FMP</h4>
                  <p className="text-gray-600 mb-4">
                    Expérimentez FMP sur notre site entièrement configuré comme s&apos;il était déployé dans un vrai atelier de réparation.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full border-2 border-gray-300 hover:border-violet-600 hover:text-violet-600 transition-all duration-300" 
                    asChild
                  >
                    <Link href="/demo">Essayer maintenant</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Essayez FMP dans un Sandbox</h4>
                  <p className="text-gray-600 mb-4">
                    Si vous souhaitez essayer avant d&apos;acheter, nous pouvons configurer un sandbox dédié pour vous.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full border-2 border-gray-300 hover:border-violet-600 hover:text-violet-600 transition-all duration-300" 
                    asChild
                  >
                    <Link href="/demo">Générer un Sandbox</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation delay={0.3}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Réservez une démo de 20 minutes</h4>
                  <p className="text-gray-600 mb-4">
                    Nous serions ravis de vous montrer comment FMP peut vous aider à obtenir plus de rendez-vous.
                  </p>
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700 text-white w-full rounded-full shadow-[0_4px_14px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.5)] transition-all duration-300" 
                    asChild
                  >
                    <Link href="/demo">Demander une démo</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-600 to-blue-600 py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollAnimation>
            <div className="text-center text-white space-y-6">
              <h3 className="text-4xl font-bold">
                Conçu pour les techniciens. Par les techniciens.
              </h3>
              <p className="text-lg text-violet-100 max-w-2xl mx-auto">
                En tant que technicien, votre focus devrait être sur ce que vous faites de mieux : réparer les appareils, pas mettre à jour les listes de réparation, ajouter de nouveaux modèles après les lancements, ou changer les prix en raison des fluctuations de prix. Avec FMP, les mises à jour sont un jeu d&apos;enfant !
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button 
                  size="lg"
                  className="bg-white text-violet-600 hover:bg-gray-100 rounded-full px-8"
                  asChild
                >
                  <Link href="/subscription">Commencer</Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8"
                  asChild
                >
                  <Link href="/demo">Essayer maintenant</Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
