export interface Resource {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: "knowledge-base" | "changelog" | "roadmap" | "feature-request";
  publishedAt?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResourcesData {
  data: Resource[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
