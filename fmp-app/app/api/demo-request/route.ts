import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { firstName, lastName, company, locations, websiteUrl, phone, improvements } = body;

    if (!firstName || !lastName || !company || !websiteUrl || !phone) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      );
    }

    console.log("Nouvelle demande de démo reçue:", {
      firstName,
      lastName,
      company,
      locations,
      websiteUrl,
      phone,
      improvements,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true,
        message: "Votre demande a été envoyée avec succès. Nous vous contacterons sous peu." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire:", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de l'envoi de votre demande" },
      { status: 500 }
    );
  }
}
