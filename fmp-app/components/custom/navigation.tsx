"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/data/types/navigation-menu.types";

interface NavigationProps {
  menuItems?: MenuItem[];
}

export default function Navigation({ menuItems }: NavigationProps) {
  const pathname = usePathname();

  const defaultLinks: MenuItem[] = [
    {
      id: 1,
      label: "Produit",
      href: "/products-add-ons",
      hasDropdown: false,
    },
    { id: 2, label: "Avis", href: "/reviews", hasDropdown: false },
    { id: 3, label: "Tarifs", href: "/subscription", hasDropdown: false },
    {
      id: 4,
      label: "Ressources",
      href: "/resources",
      hasDropdown: true,
      subItems: [
        { id: 41, label: "Base de connaissances", href: "/resources?category=knowledge-base", description: "Documentation complète", order: 1 },
        { id: 42, label: "Notes de version", href: "/resources?category=changelog", description: "Historique des mises à jour", order: 2 },
        { id: 43, label: "Feuille de route", href: "/resources?category=roadmap", description: "Fonctionnalités à venir", order: 3 },
        { id: 44, label: "Demander une fonctionnalité", href: "/resources?category=feature-request", description: "Proposer une fonctionnalité", order: 4 },
      ],
    },
  ];

  const links = menuItems && menuItems.length > 0 
    ? menuItems.sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultLinks;

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        if (link.hasDropdown && "subItems" in link && link.subItems && link.subItems.length > 0) {
          const sortedSubItems = [...link.subItems].sort((a, b) => (a.order || 0) - (b.order || 0));
          
          return (
            <DropdownMenu
              key={link.id}
              trigger={
                <span
                  className={`text-sm font-medium transition-colors hover:text-violet-600 ${
                    isActive ? "text-violet-600" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </span>
              }
            >
              {sortedSubItems.map((subItem) => (
                <DropdownMenuItem key={subItem.id} href={subItem.href}>
                  <div>
                    <div className="font-medium">{subItem.label}</div>
                    {subItem.description && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {subItem.description}
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          );
        }

        return (
          <Link
            key={link.id}
            href={link.href || "#"}
            className={`text-sm font-medium transition-colors hover:text-violet-600 ${
              isActive ? "text-violet-600" : "text-gray-600"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
