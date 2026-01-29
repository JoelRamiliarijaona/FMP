import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2 } from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { ReviewsData } from "@/data/types/review.types";
import Image from "next/image";

async function getReviews(): Promise<ReviewsData> {
  try {
    const data: ReviewsData = await getStrapiData(
      "/reviews?populate=*&sort=order:asc,createdAt:desc"
    );
    return data || { data: [] };
  } catch (error) {
    return { data: [] };
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

export default async function ReviewsPage() {
  const reviewsData = await getReviews();
  const reviews = reviewsData.data || [];
  const featuredReviews = reviews.filter((r) => r.featured);
  const regularReviews = reviews.filter((r) => !r.featured);

  const totalReviews = reviews.length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full">
              <span className="text-4xl md:text-5xl font-bold text-violet-600">
                {totalReviews}+
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Satisfied Repairshop owners have already increased their conversion
              rates with FMP
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de notre solution de gestion
              d'atelier de réparation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Avis mis en avant
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredReviews.map((review) => {
                const avatarUrl = getImageUrl(review.avatar);
                return (
                  <Card
                    key={review.id}
                    className="border-0 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {avatarUrl ? (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={avatarUrl}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-violet-600 font-semibold text-lg">
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {review.name}
                            </h3>
                            {review.verified && (
                              <CheckCircle2 className="h-4 w-4 text-violet-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {review.role}
                            {review.company && ` - ${review.company}`}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {review.text}
                      </p>
                      {review.verified && (
                        <Badge
                          variant="outline"
                          className="mt-4 text-xs border-violet-200 text-violet-600"
                        >
                          Verified Buyer
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Tous les avis
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularReviews.map((review) => {
              const avatarUrl = getImageUrl(review.avatar);
              return (
                <Card
                  key={review.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
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
                          <span className="text-violet-600 font-semibold">
                            {review.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {review.name}
                          </h3>
                          {review.verified && (
                            <CheckCircle2 className="h-3 w-3 text-violet-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          {review.role}
                          {review.company && ` - ${review.company}`}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
