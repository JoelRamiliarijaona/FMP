"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PromotionalBannerData } from "@/data/types/promotional-banner.types";

async function getPromotionalBanner(): Promise<PromotionalBannerData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(`${baseUrl}/api/promotional-banner?populate=*`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      return { data: null };
    }
    
    const data = await response.json();
    return data || { data: null };
  } catch (error) {
    return { data: null };
  }
}

export default function PromotionalBanner() {
  const [banner, setBanner] = useState<PromotionalBannerData["data"]>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function loadBanner() {
      const data = await getPromotionalBanner();
      if (data?.data?.isActive) {
        const isDismissed = localStorage.getItem("promo-banner-dismissed");
        if (!isDismissed) {
          setBanner(data.data);
          setIsVisible(true);
        }
      }
    }
    loadBanner();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("promo-banner-dismissed", "true");
  };

  if (!isVisible || !banner) return null;

  const bgColor = banner.backgroundColor || "#7c3aed";
  const textColor = banner.textColor || "#ffffff";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 shadow-lg"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {banner.flagEmoji && (
            <span className="text-2xl flex-shrink-0">{banner.flagEmoji}</span>
          )}
          <p className="text-sm md:text-base font-medium flex-1 min-w-0">
            {banner.message}
            {banner.promoCode && (
              <span className="font-bold ml-1">{banner.promoCode}</span>
            )}
            {banner.discount && (
              <span className="font-bold ml-1">{banner.discount}% OFF</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {banner.link && (
            <Link
              href={banner.link}
              className="text-sm font-semibold underline hover:opacity-80 transition-opacity"
              style={{ color: textColor }}
            >
              En savoir plus
            </Link>
          )}
          <button
            onClick={handleClose}
            className="p-1 hover:opacity-80 transition-opacity rounded-full"
            aria-label="Fermer la bannière"
            style={{ color: textColor }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
