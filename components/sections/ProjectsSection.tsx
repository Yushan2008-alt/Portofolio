"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Ruang Teduh",
    category: "Web App",
    description:
      "A calming web experience designed for mental wellness. Clean UI, soft aesthetics, and smooth visual transitions create a peaceful digital space.",
    tech: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    id: 2,
    title: "Prop Vila",
    category: "Landing Page",
    description:
      "Elegant property showcase website for a villa rental service. Features a modern layout with booking information and a refined visual presentation.",
    tech: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    id: 3,
    title: "Library Management System",
    category: "Desktop App",
    description:
      "Full-featured library system handling book cataloging, member registration, and transaction tracking — built with an emphasis on clean data management.",
    tech: ["Java", "MySQL", "OOP"],
  },
  {
    id: 4,
    title: "Landing Page Builder",
    category: "Tool",
    description:
      "An intuitive tool for creating custom landing pages with a clean interface and live-style preview, lowering the barrier for non-technical users.",
    tech: ["HTML5", "CSS3", "JavaScript"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        className="mb-16 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs tracking-[0.22em] text-violet-400 uppercase">
          Work
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Featured Projects
        </h2>
        <p className="max-w-xl text-lg text-neutral-400">
          A selection of projects I&apos;ve built while learning and pushing my
          skills further.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.id}
            variants={item}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/5"
          >
            {/* Abstract preview strip */}
            <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-violet-950/60 to-obsidian-800">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(168,85,247,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.06) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <span className="absolute bottom-3 right-4 font-mono text-3xl font-bold text-white/5 select-none">
                0{p.id}
              </span>
              <span className="absolute left-4 top-4 rounded-full border border-white/[0.07] bg-black/30 px-3 py-1 font-mono text-xs text-neutral-500 backdrop-blur-sm">
                {p.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-violet-200">
                {p.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 font-mono text-xs text-neutral-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="ml-3 shrink-0 font-mono text-xs text-neutral-700">
                  Private
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
