"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench, Settings } from "lucide-react";

interface AnimatedHeroProps {
  imageUrl: string;
  imageAlt: string;
}

export default function AnimatedHero({ imageUrl, imageAlt }: AnimatedHeroProps) {
  return (
    <div className="relative flex justify-center lg:justify-end">
      <motion.div
        className="absolute -right-10 top-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-40 blur-3xl lg:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={460}
            height={560}
            className="relative z-10 w-full max-w-md"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute -left-8 top-20 z-0"
          initial={{ opacity: 0, x: -50, rotate: -180 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            x: [0, -10, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center shadow-lg">
            <Wrench className="h-8 w-8 text-violet-600" />
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-8 bottom-20 z-0"
          initial={{ opacity: 0, x: 50, rotate: 180 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
            <Settings className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-violet-400/20 to-blue-400/20 blur-2xl z-0"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300/20 to-violet-300/20 blur-2xl z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        />
      </motion.div>
    </div>
  );
}
