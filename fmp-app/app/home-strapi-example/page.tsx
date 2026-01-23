import { getStrapiData } from "@/data/services/strapi.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface HomePageData {
  data: {
    id: number;
    documentId: string;
    title: string;
    subtitle: string;
    description: string;
    features: Feature[];
  };
}

export default async function HomeStrapiExample() {
  let homeData: HomePageData | null = null;
  let error: string | null = null;

  try {
    homeData = await getStrapiData("/home-page?populate=*");
  } catch (err) {
    error = "Impossible de charger les données depuis Strapi. Assurez-vous que le backend est démarré.";
    console.error(err);
  }

  if (error || !homeData) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erreur de connexion</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Vérifiez que :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Le backend Strapi est démarré (npm run develop)</li>
              <li>L&apos;URL est correcte dans .env.local</li>
              <li>Les permissions publiques sont configurées</li>
              <li>Le content type &quot;home-page&quot; existe et contient des données</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { title, subtitle, description, features } = homeData.data;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          )}
          {description && (
            <div 
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {features && features.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">
              Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon && <span>{feature.icon}</span>}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-sm">Données Strapi (Debug)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(homeData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
