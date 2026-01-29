"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import Navigation from "./navigation";
import { MenuItem } from "@/data/types/navigation-menu.types";

interface HeaderWithDemoProps {
  logoUrl?: string | null;
  siteName: string;
  menuItems?: MenuItem[] | null;
}

export default function HeaderWithDemo({ logoUrl, siteName, menuItems }: HeaderWithDemoProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky z-50 w-full bg-white transition-all duration-300 ${isScrolled ? "top-3" : "top-0"}`}>
      <div className={`mx-auto transition-all duration-300 ${
        isScrolled 
          ? "px-6 max-w-7xl bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] border-gray-100" 
          : "w-full px-4"
      }`}>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            {logoUrl ? (
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <Image
                  src={logoUrl}
                  alt="Logo Softeamg"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center group-hover:bg-violet-700 transition-colors">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
            )}
            <span className="text-xl font-bold text-gray-900">{siteName}</span>
          </Link>
          
          <Navigation menuItems={menuItems || undefined} />
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              asChild
            >
              <Link href="/login">Connexion</Link>
            </Button>
            <Button 
              asChild
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6"
            >
              <Link href="/demo">Demander une démo</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
