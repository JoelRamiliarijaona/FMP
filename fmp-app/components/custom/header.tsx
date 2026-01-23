import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { SiteSettingsData } from "@/data/types/site-settings.types";
import Navigation from "./navigation";

async function getSiteSettings() {
  try {
    const data: SiteSettingsData = await getStrapiData("/site-settings?populate=*");
    return data?.data || null;
  } catch (error) {
    console.error("❌ Failed to fetch site settings:", error);
    return null;
  }
}

export default async function Header() {
  const settings = await getSiteSettings();

  const getImageUrl = (
    imageData: 
      | { url?: string; alternativeText?: string }
      | { data?: { attributes?: { url?: string; alternativeText?: string } } }
      | null
      | undefined
  ) => {
    if (!imageData) return null;
    
    if ("url" in imageData && imageData.url) {
      return getStrapiMedia(imageData.url);
    }
    
    if ("data" in imageData && imageData?.data?.attributes?.url) {
      return getStrapiMedia(imageData.data.attributes.url);
    }
    
    return null;
  };

  const logoUrl = settings?.logo ? getImageUrl(settings.logo) : null;
  const siteName = settings?.siteName || "Softeamg";

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            {logoUrl ? (
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <Image
                  src={logoUrl}
                  alt={settings?.logo?.alternativeText || "Logo Softeamg"}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center group-hover:bg-violet-700 transition-colors">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
            )}
            <span className="text-xl font-bold text-gray-900">{siteName}</span>
          </Link>
          
          <Navigation />
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/login">Connexion</Link>
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6"
              asChild
            >
              <Link href="/subscription">Commencer</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
