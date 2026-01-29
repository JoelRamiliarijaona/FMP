export interface ProductFeature {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface ProductAddon {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  features?: ProductFeature[];
  image?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  icon?: string;
  category: "product" | "addon";
  order?: number;
  isActive: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductAddonsData {
  data: ProductAddon[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
