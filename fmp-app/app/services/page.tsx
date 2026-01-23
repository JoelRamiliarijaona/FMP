import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Smartphone, 
  Battery, 
  Droplets, 
  Monitor, 
  Wifi, 
  Volume2,
  Camera,
  Zap,
  ArrowRight
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Monitor,
      title: "Réparation d'écran",
      description: "Remplacement d'écrans cassés, fissurés ou défectueux. Garantie sur toutes nos réparations.",
      price: "À partir de 49€",
      duration: "30-60 min",
    },
    {
      icon: Battery,
      title: "Changement de batterie",
      description: "Batterie qui se décharge rapidement ? Nous remplaçons votre batterie par une neuve.",
      price: "À partir de 39€",
      duration: "20-30 min",
    },
    {
      icon: Droplets,
      title: "Réparation dégâts des eaux",
      description: "Téléphone tombé dans l'eau ? Intervention rapide pour limiter les dégâts.",
      price: "À partir de 59€",
      duration: "1-2 heures",
    },
    {
      icon: Camera,
      title: "Réparation caméra",
      description: "Problème avec votre appareil photo ? Nous réparons ou remplaçons votre caméra.",
      price: "À partir de 69€",
      duration: "45-90 min",
    },
    {
      icon: Volume2,
      title: "Problèmes audio",
      description: "Haut-parleur, micro ou écouteur défectueux ? Nous trouvons la solution.",
      price: "À partir de 45€",
      duration: "30-60 min",
    },
    {
      icon: Zap,
      title: "Problème de charge",
      description: "Port de charge endommagé ? Nous réparons ou remplaçons le connecteur.",
      price: "À partir de 55€",
      duration: "40-60 min",
    },
    {
      icon: Wifi,
      title: "Problèmes de connectivité",
      description: "WiFi, Bluetooth ou réseau qui ne fonctionne pas ? Diagnostic et réparation.",
      price: "À partir de 65€",
      duration: "1-2 heures",
    },
    {
      icon: Smartphone,
      title: "Diagnostic complet",
      description: "Problème non identifié ? Nous effectuons un diagnostic complet de votre appareil.",
      price: "Gratuit",
      duration: "15-30 min",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Nos Services de Réparation
            </h1>
            <p className="text-xl text-muted-foreground">
              Réparations professionnelles pour tous types de téléphones. 
              Intervention rapide et garantie sur toutes nos prestations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prix :</span>
                      <span className="font-semibold">{service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Durée :</span>
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold">Diagnostic</h3>
                <p className="text-muted-foreground">
                  Apportez votre téléphone, nous effectuons un diagnostic gratuit et vous donnons un devis.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold">Réparation</h3>
                <p className="text-muted-foreground">
                  Une fois le devis accepté, nos techniciens effectuent la réparation rapidement.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold">Récupération</h3>
                <p className="text-muted-foreground">
                  Votre téléphone est réparé ! Récupérez-le avec une garantie sur la réparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">
                Besoin d&apos;une réparation ?
              </CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                Contactez-nous dès maintenant pour un diagnostic gratuit
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/subscription">Voir les abonnements</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
