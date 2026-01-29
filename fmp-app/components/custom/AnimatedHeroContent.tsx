"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AnimatedHeroContentProps {
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroButtonPrimary?: string;
  heroButtonSecondary?: string;
  heroStats?: Array<{ id: number; title: string }>;
}

export default function AnimatedHeroContent({
  heroTitle,
  heroTitleHighlight,
  heroSubtitle,
  heroButtonPrimary,
  heroButtonSecondary,
  heroStats,
}: AnimatedHeroContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };


  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
        variants={itemVariants}
      >
        {heroTitle || "Votre atelier de réparation avec"}{" "}
        {heroTitleHighlight ? (
          <motion.span
            className="text-violet-600"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const,
            }}
          >
            {heroTitleHighlight}
          </motion.span>
        ) : (
          <motion.span
            className="text-violet-600"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1] as const,
            }}
          >
            Créneaux de rendez-vous
          </motion.span>
        )}{" "}
        {!heroTitle && "sur votre site"}
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 md:text-xl"
        variants={itemVariants}
      >
        {heroSubtitle ||
          "Développer un atelier de réparation de smartphones est difficile. Nous rendons cela plus facile, plus attrayant, moins chronophage et plus rentable."}
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4 pt-4"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="rounded-full bg-violet-600 px-8 py-6 text-base hover:bg-violet-700"
            asChild
          >
            <Link href="/demo">{heroButtonPrimary || "Demander une démo"}</Link>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-semibold bg-white text-gray-900 border-2 border-none shadow-[0_10px_40px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.2),0_6px_15px_rgba(0,0,0,0.15)] hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            asChild
          >
            <Link href="/products">{heroButtonSecondary || "Essayer FMP Pro"}</Link>
          </Button>
        </motion.div>
      </motion.div>

      

      {heroStats && heroStats.length > 0 && (
        <motion.div
          className="flex items-center gap-4 pt-4 text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {heroStats.map((stat, i) => (
            <span key={stat.id}>
              {stat.title}
              {i < heroStats.length - 1 && <span className="mx-2">•</span>}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
