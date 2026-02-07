'use client';

import { motion } from 'framer-motion';

export interface ProgramItem {
  time: string;
  title: string;
  note?: string;
}

interface LetterProps {
  open: boolean;
  program: ProgramItem[];
}

export default function Letter({ open, program }: LetterProps) {
  return (
    <div style={{ perspective: '1200px' }}>
      <motion.article
        className={[
          'relative mx-auto rounded-3xl',
          'bg-gradient-to-br from-[#fbf7ef] via-[#fffaf2] to-[#f7efe2]',
          'shadow-2xl ring-1 ring-zinc-900/10',
          open ? 'overflow-y-auto scrollbar-hide' : 'overflow-hidden',
        ].join(' ')}
        initial={false}
        animate={{
          maxHeight: open ? 'min(520px, 70dvh)' : 160,
          scale: open ? 1 : 0.98,
          rotateX: open ? 0 : -12,
        }}
        transition={{
          duration: 0.7,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        style={{
          willChange: 'transform, max-height',
          transformStyle: 'preserve-3d',
          transformOrigin: 'top center',
        }}
      >
      <div className="relative">
        {/* texture papier */}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-multiply [background-image:linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:100%_22px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.07)_1px,transparent_0)] [background-size:12px_12px] pointer-events-none" />

        {/* marge "encre" avec cœur */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-b from-red-800/25 via-red-700/15 to-red-800/25" />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-red-700/40" />

        {/* Cœur décoratif dans la marge */}
        <div className="absolute left-5 top-8 -translate-x-1/2 text-2xl text-red-700/70">
          ❤
        </div>

      <div className="relative p-8 pl-14 md:p-10 md:pl-16">
        <motion.header
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
          transition={{ duration: 0.5, delay: open ? 0.3 : 0 }}
        >
          <p className="font-serif text-sm text-zinc-600">Mon amour,</p>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl">
            Voici le programme de notre journée
          </h2>
          <p className="mt-3 max-w-prose text-sm text-zinc-700">
            Une suite de petits actes, simples et précieux — pour te rappeler à quel point je tiens à toi.
          </p>
        </motion.header>

        {/* Liste "jolie" avec animation staggered */}
        <motion.ol
          className="grid gap-4"
          initial="hidden"
          animate={open ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.4,
              },
            },
            hidden: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            },
          }}
        >
          {program.map((item, idx) => (
            <motion.li
              key={idx}
              className="rounded-2xl bg-white/50 p-4 ring-1 ring-zinc-900/5 backdrop-blur"
              variants={{
                hidden: { opacity: 0, x: -20, scale: 0.95 },
                visible: { opacity: 1, x: 0, scale: 1 },
              }}
              transition={{
                duration: 0.4,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded-xl bg-rose-700/90 px-3 py-1 font-mono text-xs text-rose-50 shadow-sm">
                  {item.time}
                </div>
                <div>
                  <p className="font-serif text-lg">{item.title}</p>
                  {item.note ? (
                    <p className="mt-1 text-sm text-zinc-700">{item.note}</p>
                  ) : null}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* Signature */}
        <motion.footer
          className="mt-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.5, delay: open ? 0.8 : 0 }}
        >
          <p className="font-serif text-sm text-zinc-700">Je t'embrasse,</p>
          <p className="font-serif text-xl tracking-wide text-rose-800">M</p>
        </motion.footer>
      </div>
      </div>
    </motion.article>
    </div>
  );
}