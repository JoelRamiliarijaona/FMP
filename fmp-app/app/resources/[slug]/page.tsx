import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import { getStrapiData } from "@/data/services/strapi.service";
import { ResourcesData } from "@/data/types/resource.types";

async function getResource(slug: string) {
  try {
    const data: ResourcesData = await getStrapiData(
      `/resources?filters[slug][$eq]=${slug}&populate=*`
    );
    return data?.data?.[0] || null;
  } catch (error) {
    return null;
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

export default async function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resource = await getResource(params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-violet-600"
            asChild
          >
            <Link href="/resources">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux ressources
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-violet-100 text-violet-700">
                {getCategoryLabel(resource.category)}
              </Badge>
              {resource.publishedAt && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {formatDate(resource.publishedAt)}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              {resource.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="prose prose-lg prose-violet max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-violet-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />
        </div>
      </section>
    </div>
  );
}
