"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, ArrowRight } from "lucide-react";
import { ResourcesData } from "@/data/types/resource.types";

async function getResources(): Promise<ResourcesData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${baseUrl}/api/resources?populate=*&sort=order:asc,publishedAt:desc`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      return { data: [] };
    }
    
    const data = await response.json();
    return data || { data: [] };
  } catch (error) {
    return { data: [] };
  }
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    "knowledge-base": "Knowledge Base",
    "changelog": "Changelog",
    "roadmap": "Roadmap",
    "feature-request": "Feature Request",
  };
  return labels[category] || category;
}

export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<ResourcesData["data"]>([]);
  const categoryParam = searchParams.get("category");
  const initialTab = categoryParam || "knowledge-base";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    async function loadResources() {
      const data = await getResources();
      setResources(data.data || []);
    }
    loadResources();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const categories = [
    "knowledge-base",
    "changelog",
    "roadmap",
    "feature-request",
  ];

  const filteredResources = resources.filter(
    (r) => r.category === activeTab
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Ressources
            </h1>
            <p className="text-lg text-gray-600">
              Documentation, mises à jour, roadmap et demandes de
              fonctionnalités pour vous aider à tirer le meilleur parti de FMP.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {getCategoryLabel(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {filteredResources.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => (
                      <Card
                        key={resource.id}
                        className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      >
                        <Link href={`/resources/${resource.slug}`}>
                          <CardHeader>
                            <CardTitle className="text-xl group-hover:text-violet-600 transition-colors">
                              {resource.title}
                            </CardTitle>
                            {resource.publishedAt && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                <Calendar className="h-4 w-4" />
                                {formatDate(resource.publishedAt)}
                              </div>
                            )}
                          </CardHeader>
                          <CardContent>
                            {resource.excerpt && (
                              <CardDescription className="text-base mb-4">
                                {resource.excerpt}
                              </CardDescription>
                            )}
                            <div className="flex items-center gap-2 text-violet-600 font-medium text-sm group-hover:gap-3 transition-all">
                              Lire la suite
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      Aucune ressource disponible dans cette catégorie pour le
                      moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
