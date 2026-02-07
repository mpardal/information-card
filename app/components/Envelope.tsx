'use client';

import { motion } from 'framer-motion';

interface EnvelopeProps {
  open: boolean;
  onToggle: () => void;
}

export default function Envelope({ open, onToggle }: EnvelopeProps) {
  return (
    <div className="relative z-20 w-[min(560px,92vw)]">
      <div className="relative mx-auto aspect-[16/10] w-full">
        {/* Corps enveloppe */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-xl ring-1 ring-zinc-900/10" />

        {/* Texture papier légère */}
        <div className="absolute inset-0 rounded-3xl opacity-[0.35] mix-blend-multiply [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] [background-size:10px_10px]" />

        {/* Rabat du bas (triangle) */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] overflow-hidden rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-200/70 to-transparent" />
          <div
            className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-2xl bg-amber-100/80 ring-1 ring-zinc-900/5"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}
          />
        </div>

        {/* Rabat du haut (s'ouvre) avec Framer Motion */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[62%] origin-top overflow-hidden rounded-t-3xl"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 70%)',
          }}
          animate={{
            rotateX: open ? 180 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-100 ring-1 ring-zinc-900/10" />
        </motion.div>

        {/* Lueur pulsante autour du sceau */}
        {!open && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="h-28 w-28 rounded-full bg-rose-500/40 blur-2xl" />
          </motion.div>
        )}

        {/* Sceau de cire en forme de cœur avec Framer Motion */}
        <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
          <motion.button
            type="button"
            onClick={onToggle}
            className="group relative grid place-items-center"
            style={{
              width: '88px',
              height: '80px',
            }}
            animate={{
              scale: open ? 0.95 : 1,
              opacity: open ? 0.9 : 1,
            }}
            whileHover={
              !open
                ? {
                    scale: 1.03,
                  }
                : undefined
            }
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            aria-pressed={open}
            aria-label={open ? 'Refermer la lettre' : 'Ouvrir la lettre'}
          >
            {/* Forme de cœur en arrière-plan */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Corps du cœur */}
              <div className="relative" style={{ width: '80px', height: '72px' }}>
                {/* Partie gauche du cœur */}
                <div
                  className="absolute bg-gradient-to-br from-rose-700 via-rose-600 to-rose-800 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)]"
                  style={{
                    width: '40px',
                    height: '64px',
                    borderRadius: '40px 40px 0 0',
                    left: '0px',
                    top: '0px',
                    transform: 'rotate(45deg)',
                    transformOrigin: '100% 100%',
                  }}
                />
                {/* Partie droite du cœur */}
                <div
                  className="absolute bg-gradient-to-br from-rose-700 via-rose-600 to-rose-800 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)]"
                  style={{
                    width: '40px',
                    height: '64px',
                    borderRadius: '40px 40px 0 0',
                    left: '40px',
                    top: '0px',
                    transform: 'rotate(-45deg)',
                    transformOrigin: '0% 100%',
                  }}
                />
                {/* Relief */}
                <div
                  className="absolute rounded-full bg-white/10 blur-[0.5px]"
                  style={{
                    width: '30px',
                    height: '30px',
                    left: '25px',
                    top: '15px',
                  }}
                />
              </div>
            </div>

            {/* Lettre M au-dessus */}
            <span className="relative z-10 font-serif text-3xl font-semibold tracking-wide text-rose-50 drop-shadow-lg" style={{ marginTop: '-8px' }}>
              M
            </span>

            {/* texte hint */}
            <motion.span
              className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-800 shadow-sm ring-1 ring-zinc-900/10 backdrop-blur"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {open ? 'Re-scellé ? (clic)' : 'Clic pour ouvrir'}
            </motion.span>
          </motion.button>
        </div>

        {/* Petit liseré interne */}
        <div className="absolute inset-4 rounded-2xl ring-1 ring-zinc-900/10" />
      </div>
    </div>
  );
}