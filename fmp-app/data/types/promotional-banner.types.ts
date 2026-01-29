export interface PromotionalBannerData {
  data: {
    id: number;
    documentId: string;
    isActive: boolean;
    message: string;
    promoCode?: string;
    discount?: number;
    country?: string;
    flagEmoji?: string;
    link?: string;
    backgroundColor?: string;
    textColor?: string;
  } | null;
}
