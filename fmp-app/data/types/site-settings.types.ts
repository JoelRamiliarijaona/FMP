export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  logo?: {
    url?: string;
    alternativeText?: string;
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

export interface SiteSettingsData {
  data: SiteSettings;
}
