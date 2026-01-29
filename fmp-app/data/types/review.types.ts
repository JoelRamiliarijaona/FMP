export interface Review {
  id: number;
  documentId: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  rating: number;
  avatar?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  verified: boolean;
  featured: boolean;
  order?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewsData {
  data: Review[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
