'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface PlanFeature {
  id: number;
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: number | string;
  documentId?: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: PlanFeature[];
  popular: boolean;
  order: number;
  stripePriceId?: string;
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPlanId, setLoadingPlanId] = useState<number | string | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch('http://localhost:1337/api/subscription-plans?populate=*&sort=order:asc');
        
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }

        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const allPlans = data.data;
          const popularPlan = allPlans.find((p: SubscriptionPlan) => p.popular);
          const otherPlans = allPlans.filter((p: SubscriptionPlan) => !p.popular);
          
          if (popularPlan && allPlans.length >= 3) {
            const sortedPlans = [otherPlans[0] || null, popularPlan, otherPlans[1] || null].filter((p): p is SubscriptionPlan => p !== null);
            setPlans(sortedPlans);
          } else {
            setPlans(allPlans);
          }
        } else {
          console.warn('No plans found in Strapi');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  const formatPeriod = (period: string) => {
    return period === "year" ? "an" : "mois";
  };

  const handleSubscribe = async (planId: number | string) => {
    setLoadingPlanId(planId);

    try {
      const response = await fetch(`http://localhost:1337/api/subscription-plans/${planId}/checkout`, {
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
      setLoadingPlanId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Aucun plan disponible</h2>
          <p className="text-muted-foreground mb-6">
            Les plans d&apos;abonnement ne sont pas encore configurés.
          </p>
          <Button asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Tarifs</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Des tarifs simples et transparents. Commencez gratuitement pendant 14 jours.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${plans.length === 2 ? 'lg:grid-cols-2' : plans.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 max-w-6xl mx-auto`}>
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col h-full ${
                plan.popular 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Plus populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                {plan.description && (
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                )}
                <div className="mt-6">
                  <span className="text-5xl font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground">/{formatPeriod(plan.period)}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-center gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-500 shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>

              <CardFooter className="pt-6 mt-auto">
                <Button 
                  className="w-full cursor-pointer hover:scale-105 transition-transform duration-200" 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loadingPlanId !== null}
                >
                  {loadingPlanId === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    'Commencer maintenant'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Puis-je changer de plan à tout moment ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, vous pouvez changer de plan à tout moment. Les changements prennent effet immédiatement 
                  et nous ajustons la facturation au prorata.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Proposez-vous un essai gratuit ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, tous nos plans incluent un essai gratuit de 14 jours. Aucune carte bancaire requise 
                  pour commencer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Quels moyens de paiement acceptez-vous ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous acceptons toutes les cartes bancaires principales (Visa, MasterCard, American Express) 
                  ainsi que les virements bancaires pour les abonnements annuels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Mes données sont-elles sécurisées ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolument. Nous utilisons un cryptage de niveau bancaire pour protéger toutes vos données. 
                  Nous sommes également conformes au RGPD et effectuons des sauvegardes quotidiennes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-4">
            Vous avez encore des questions ?
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contactez notre équipe</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
