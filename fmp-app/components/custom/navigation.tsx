"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/subscription", label: "Tarifs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
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
