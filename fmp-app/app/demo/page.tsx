"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  locations: string;
  websiteUrl: string;
  phone: string;
  improvements: string[];
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    locations: "1",
    websiteUrl: "",
    phone: "",
    improvements: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const improvementsOptions = [
    "Aucun module de réservation",
    "Taux de conversion de réservation faible",
    "Mise à jour des modèles/prix trop longue",
    "Design/fonctionnalités limités",
    "Je suis une agence cherchant une solution pour mon client",
    "Aucun des éléments ci-dessus",
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ce champ est requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Ce champ est requis";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Ce champ est requis";
    }
    if (!formData.locations || formData.locations === "0") {
      newErrors.locations = "Ce champ est requis";
    }
    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = "Ce champ est requis";
    } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = "Veuillez fournir une URL valide";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Ce champ est requis";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Veuillez fournir un numéro de téléphone valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCurrentStep(3);
      } else {
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleImprovementToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      improvements: prev.improvements.includes(option)
        ? prev.improvements.filter((item) => item !== option)
        : [...prev.improvements, option],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-8">
            <div className="text-center">
              <p className="text-violet-100 text-sm font-semibold uppercase tracking-wide mb-2">
                DEMANDER UNE DÉMO
              </p>
              <h1 className="text-4xl font-bold text-white mb-3">
                Découvrez FMP en action
              </h1>
              <p className="text-violet-100 text-lg max-w-2xl mx-auto">
                Nous serions ravis de vous montrer comment FMP peut aider à attirer de nouveaux clients
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">
                      Prénom *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: "" });
                      }}
                      className={`mt-2 ${errors.firstName ? "border-red-500" : ""}`}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">
                      Nom *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        if (errors.lastName) setErrors({ ...errors, lastName: "" });
                      }}
                      className={`mt-2 ${errors.lastName ? "border-red-500" : ""}`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {(errors.firstName || errors.lastName) && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">
                      Ce champ est requis. Veuillez compléter les champs suivants : Prénom, Nom.
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="company" className="text-gray-700 font-medium">
                    Entreprise *
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      if (errors.company) setErrors({ ...errors, company: "" });
                    }}
                    className={`mt-2 ${errors.company ? "border-red-500" : ""}`}
                    placeholder="Nom de votre entreprise"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="locations" className="text-gray-700 font-medium">
                    Emplacements *
                  </Label>
                  <Input
                    id="locations"
                    type="number"
                    min="1"
                    value={formData.locations}
                    onChange={(e) => {
                      setFormData({ ...formData, locations: e.target.value });
                      if (errors.locations) setErrors({ ...errors, locations: "" });
                    }}
                    className={`mt-2 text-gray-700  ${errors.locations ? "border-red-500" : ""}`}
                  />
                  {errors.locations && (
                    <p className="text-red-500 text-sm mt-1">{errors.locations}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="websiteUrl" className="text-gray-700 font-medium">
                    URL du site web *
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, websiteUrl: e.target.value });
                      if (errors.websiteUrl) setErrors({ ...errors, websiteUrl: "" });
                    }}
                    className={`mt-2 text-gray-700  ${errors.websiteUrl ? "border-red-500" : ""}`}
                    placeholder="https://votre-site.com"
                  />
                  {errors.websiteUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`mt-2 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Que souhaitez-vous améliorer ou corriger ? -
                  </h3>
                  <p className="text-gray-600 mb-6">Sélectionnez toutes les options qui s&apos;appliquent</p>
                  <div className="space-y-3">
                    {improvementsOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 cursor-pointer transition-all duration-200"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={formData.improvements.includes(option)}
                            onChange={() => handleImprovementToggle(option)}
                            className="sr-only"
                          />
                          <div
                            className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${
                              formData.improvements.includes(option)
                                ? "bg-violet-600 border-violet-600"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.improvements.includes(option) && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 flex-1 font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Demande envoyée avec succès !
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Nous vous contacterons sous peu pour organiser votre démonstration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        company: "",
                        locations: "1",
                        websiteUrl: "",
                        phone: "",
                        improvements: [],
                      });
                      setErrors({});
                    }}
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    Nouvelle demande
                  </Button>
                  <Button 
                    asChild
                    className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto px-8 py-6 text-white"
                  >
                    <Link href="/">Retour à l&apos;accueil</Link>
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep !== 3 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-6 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-violet-600 hover:bg-violet-700 flex items-center gap-2 px-8 py-6 text-white"
                >
                  {currentStep === 2 ? "Envoyer la demande" : "Suivant"}
                  {currentStep === 1 && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-8 text-center">
              En soumettant ce formulaire, vous recevrez des informations, des conseils et des promotions de FMP.{" "}
              <Link href="/privacy" className="text-violet-600 hover:underline">
                Pour en savoir plus, consultez notre Déclaration de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
