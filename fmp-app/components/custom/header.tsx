import { getStrapiData, getStrapiMedia } from "@/data/services/strapi.service";
import { SiteSettingsData } from "@/data/types/site-settings.types";
import { NavigationMenuData } from "@/data/types/navigation-menu.types";
import HeaderWithDemo from "./HeaderWithDemo";

async function getSiteSettings() {
  try {
    const data: SiteSettingsData = await getStrapiData("/site-settings?populate=*");
    return data?.data || null;
  } catch {
    return null;
  }
}

async function getNavigationMenu() {
  try {
    const data: NavigationMenuData = await getStrapiData("/navigation-menu?populate=*");
    return data?.data?.mainMenuItems || null;
  } catch {
    return null;
  }
}

export default async function Header() {
  const settings = await getSiteSettings();
  const menuItems = await getNavigationMenu();

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
    <HeaderWithDemo 
      logoUrl={logoUrl}
      siteName={siteName}
      menuItems={menuItems || undefined}
    />
  );
}
