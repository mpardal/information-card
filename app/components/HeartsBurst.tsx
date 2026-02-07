'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartsBurstProps {
  trigger: boolean;
}

interface Heart {
  id: string;
  left: number;
  delay: number;
  size: number;
  drift: number;
}

export default function HeartsBurst({ trigger }: HeartsBurstProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Génère un "burst" de cœurs à chaque ouverture
    const now = Date.now();
    const batch = Array.from({ length: 18 }).map((_, i) => ({
      id: `${now}-${i}`,
      left: 10 + Math.random() * 80, // %
      delay: Math.random() * 0.25, // s
      size: 14 + Math.random() * 18, // px
      drift: (Math.random() * 2 - 1) * 80, // px (gauche/droite)
    }));

    setHearts(batch);

    // Nettoyage après l'anim
    const t = setTimeout(() => setHearts([]), 1800);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute bottom-[48%]"
            initial={{
              left: `${h.left}%`,
              opacity: 0,
              scale: 0.9,
              filter: 'blur(0.2px)',
            }}
            animate={{
              y: -260,
              x: h.drift,
              opacity: [0, 1, 1, 0],
              scale: 1.2,
              filter: 'blur(0.8px)',
            }}
            transition={{
              duration: 1.6,
              delay: h.delay,
              ease: [0.2, 0.8, 0.2, 1],
              opacity: {
                times: [0, 0.1, 0.9, 1],
              },
            }}
            style={{
              fontSize: `${h.size}px`,
              color: 'rgba(190, 18, 60, 0.9)',
              textShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              willChange: 'transform, opacity',
            }}
          >
            ❤
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}