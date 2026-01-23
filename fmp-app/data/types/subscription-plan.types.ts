export interface PlanFeature {
  id: number;
  name: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  period: "month" | "year";
  features?: PlanFeature[];
  popular: boolean;
  order: number;
}

export interface SubscriptionPlansData {
  data: SubscriptionPlan[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
