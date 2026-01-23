'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SubscriptionPlan } from "@/data/types/subscription-plan.types";

interface PlanCardProps {
  plan: SubscriptionPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [loading, setLoading] = useState(false);

  const formatPeriod = (period: string) => {
    return period === "year" ? "an" : "mois";
  };

  const handleChoose = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:1337/api/subscription-plans/${plan.id}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Erreur lors de la création de la session de paiement. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const priceDisplay = plan.price === 0 || !plan.price ? "Sur devis" : `${plan.price}€`;
  const periodDisplay = plan.price === 0 || !plan.price ? "" : `/${formatPeriod(plan.period || "month")}`;
  
  const includedFeatures = plan.features?.filter((f) => f.included).map((f) => f.name) || [];
  const planKey = plan.id?.toString() || plan.name;

  return (
    <Card
      key={planKey}
      className={`relative border-0 flex flex-col h-full ${
        plan.popular
          ? "shadow-xl scale-105 ring-2 ring-violet-600/20"
          : "shadow-md hover:shadow-lg"
      } transition-all duration-300`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-violet-600 text-white px-4 py-1">Le plus choisi</Badge>
        </div>
      )}
      <CardHeader className="text-center pt-8">
        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-violet-600">{priceDisplay}</span>
          {periodDisplay && <span className="text-gray-600">{periodDisplay}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 flex-1 flex flex-col">
        <div className="flex-1">
          {includedFeatures.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 text-base mb-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-violet-600" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        <Button
          className={`mt-6 w-full rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ${
            plan.popular
              ? "bg-violet-600 hover:bg-violet-700"
              : "border-violet-600 text-violet-600 hover:bg-violet-50"
          }`}
          variant={plan.popular ? "default" : "outline"}
          onClick={handleChoose}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            'Choisir'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
