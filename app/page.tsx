'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import HeartsBurst from './components/HeartsBurst';
import RosePetals from './components/RosePetals';
import Envelope from './components/Envelope';
import Letter, { ProgramItem } from './components/Letter';
import { useMouseParallax } from './hooks/useMouseParallax';

export default function Page() {
  const [open, setOpen] = useState(false);
  const mousePosition = useMouseParallax(15);

  const program: ProgramItem[] = useMemo(
    () => [
      { time: '09:30', title: 'Petit-déj doux', note: 'Café + viennoiseries, en mode tranquille.' },
      { time: '11:00', title: 'Balade main dans la main', note: 'Un spot joli + quelques photos.' },
      { time: '13:00', title: 'Déjeuner surprise', note: 'Un endroit que tu vas adorer.' },
      { time: '16:30', title: 'Pause cocooning', note: 'Film / plaid / chocolat.' },
      { time: '20:00', title: 'Dîner romantique', note: 'Toi + moi + vibes.' },
      { time: '22:30', title: 'Dernier acte', note: 'Une surprise… (et un bisou scellé).' },
    ],
    []
  );

  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-pink-50 to-amber-50 text-zinc-900">
      <div className="mx-auto flex min-h-dvh max-w-5xl items-center justify-center px-4 py-10">
        <div className="w-full">
          {/* Titre */}
          <motion.header
            className="mx-auto mb-8 max-w-xl text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="text-sm tracking-[0.35em] text-zinc-600">SAINT-VALENTIN</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-love">
              Une lettre scellée, rien que pour toi
            </h1>
            <p className="mt-3 text-sm text-zinc-600">
              Clique sur le sceau de cire <span className="font-semibold">M</span> pour ouvrir l'enveloppe.
            </p>
          </motion.header>

          {/* Overlay pour fermer en cliquant en dehors */}
          {open && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
              aria-label="Fermer la lettre"
            />
          )}

          {/* Scène */}
          <motion.section
            className="relative mx-auto flex max-w-3xl items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x,
              y: mousePosition.y + (open ? 60 : 0),
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1],
              x: { type: 'spring', stiffness: 100, damping: 20 },
              y: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: open ? 0.7 : 0.6,
              },
            }}
            style={{
              willChange: 'transform',
            }}
          >
            <HeartsBurst trigger={open} />
            <RosePetals trigger={open} />

            {/* Ombre douce */}
            <div className="pointer-events-none absolute -bottom-6 h-16 w-[min(520px,92vw)] rounded-full bg-zinc-900/10 blur-2xl" />

            {/* Lettre (derrière l'enveloppe, qui sort + se déplie) */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={{
                zIndex: open ? 30 : 0,
                y: open ? '-42%' : '-42%',
                opacity: open ? 1 : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              aria-hidden={!open}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <Letter open={open} program={program} />
            </motion.div>

            {/* Enveloppe */}
            <Envelope open={open} onToggle={() => setOpen((v) => !v)} />
          </motion.section>
        </div>
      </div>
    </main>
  );
}