export interface KeyFeature {
  id: number;
  title: string;
  description: string;
  iconName: "Search" | "Settings" | "BarChart3" | "Bell";
}

export interface WhyChooseItem {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface StatCard {
  id: number;
  title: string;
  description: string;
  iconName: "Users" | "Shield" | "Clock" | "Wrench";
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface FeatureListItem {
  id: number;
  text: string;
}

export interface HomePageData {
  data: {
    id: number;
    documentId: string;
    heroTitle: string;
    heroTitleHighlight?: string;
    heroSubtitle?: string;
    heroButtonPrimary?: string;
    heroButtonSecondary?: string;
    heroStats?: StatCard[];
    heroImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    keyFeaturesTitle?: string;
    keyFeaturesSubtitle?: string;
    keyFeatures?: KeyFeature[];
    whyChooseTitle?: string;
    whyChooseItems?: WhyChooseItem[];
    whyChooseImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    statsCards?: StatCard[];
    videoSectionTitle?: string;
    videoSectionDescription?: string;
    videoUrl?: string;
    featuresListTitle?: string;
    featuresListDescription?: string;
    featuresListItems?: FeatureListItem[];
    featuresListImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    testimonialsTitle?: string;
    testimonialsSubtitle?: string;
    testimonials?: Testimonial[];
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonPrimary?: string;
    ctaButtonSecondary?: string;
  };
}
