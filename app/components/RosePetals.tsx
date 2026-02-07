'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RosePetalsProps {
  trigger: boolean;
}

interface Petal {
  id: string;
  left: number;
  delay: number;
  size: number;
  rotation: number;
  color: string;
  xDrift: number;
  yDrift: number;
}

const petalColors = [
  'rgba(244, 63, 94, 0.85)',   // rose-500
  'rgba(251, 113, 133, 0.85)',  // rose-400
  'rgba(252, 165, 165, 0.85)',  // rose-300
  'rgba(254, 205, 211, 0.85)',  // rose-200
  'rgba(255, 228, 230, 0.85)',  // rose-100
];

export default function RosePetals({ trigger }: RosePetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Génère un nuage de pétales de rose
    const now = Date.now();
    const batch = Array.from({ length: 25 }).map((_, i) => ({
      id: `petal-${now}-${i}`,
      left: 15 + Math.random() * 70, // %
      delay: Math.random() * 0.3, // s
      size: 8 + Math.random() * 12, // px
      rotation: Math.random() * 360, // deg
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      xDrift: (Math.random() * 2 - 1) * 120, // px
      yDrift: -280 - Math.random() * 100, // px
    }));

    setPetals(batch);

    // Nettoyage après l'animation
    const t = setTimeout(() => setPetals([]), 2500);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            initial={{
              left: `${petal.left}%`,
              top: '50%',
              opacity: 0,
              scale: 0.3,
              rotate: petal.rotation,
            }}
            animate={{
              x: petal.xDrift,
              y: petal.yDrift,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0.3, 1, 1, 0.9, 0.7],
              rotate: petal.rotation + (Math.random() * 2 - 1) * 720,
            }}
            transition={{
              duration: 2.2,
              delay: petal.delay,
              ease: [0.22, 0.61, 0.36, 1],
              opacity: {
                times: [0, 0.15, 0.5, 0.8, 1],
              },
              scale: {
                times: [0, 0.2, 0.5, 0.8, 1],
              },
            }}
            style={{
              willChange: 'transform, opacity',
            }}
          >
            {/* Pétale de rose stylisé */}
            <div
              className="relative"
              style={{
                width: `${petal.size}px`,
                height: `${petal.size * 1.4}px`,
              }}
            >
              {/* Corps du pétale */}
              <div
                className="absolute inset-0 rounded-full blur-[0.5px]"
                style={{
                  background: petal.color,
                  clipPath: 'ellipse(50% 60% at 50% 40%)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}