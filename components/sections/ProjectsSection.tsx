"use client";

import { motion } from "framer-motion";

const tagColors: Record<string, string> = {
  "HTML5":      "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "CSS3":       "bg-blue-500/10  text-blue-400  border-blue-500/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Java":       "bg-red-500/10   text-red-400   border-red-500/20",
  "MySQL":      "bg-cyan-500/10  text-cyan-400  border-cyan-500/20",
  "OOP":        "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const defaultTag = "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";

const projects = [
  {
    id: 1,
    title: "Ruang Teduh",
    category: "Web App",
    year: "2024",
    description:
      "A calming web experience designed for mental wellness. Clean UI, soft aesthetics, and smooth transitions create a peaceful digital space.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-emerald-500/8 to-teal-600/5",
    gridColor: "rgba(16,185,129,0.05)",
  },
  {
    id: 2,
    title: "Prop Vila",
    category: "Landing Page",
    year: "2024",
    description:
      "Elegant property showcase website for a villa rental service. Features a modern layout with booking information and refined visuals.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-violet-500/8 to-purple-600/5",
    gridColor: "rgba(168,85,247,0.05)",
  },
  {
    id: 3,
    title: "Library Management System",
    category: "Desktop App",
    year: "2023",
    description:
      "Full-featured library system handling book cataloging, member registration, and transaction tracking with clean data management.",
    tech: ["Java", "MySQL", "OOP"],
    accent: "from-red-500/8 to-orange-600/5",
    gridColor: "rgba(239,68,68,0.05)",
  },
  {
    id: 4,
    title: "Landing Page Builder",
    category: "Tool",
    year: "2024",
    description:
      "An intuitive tool for creating custom landing pages with a clean interface and live-style preview for non-technical users.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    accent: "from-blue-500/8 to-cyan-600/5",
    gridColor: "rgba(59,130,246,0.05)",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
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
          Selected Work
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
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/15 hover:shadow-2xl hover:shadow-violet-500/5"
          >
            {/* Abstract preview */}
            <div className={`relative h-36 w-full overflow-hidden bg-gradient-to-br ${p.accent}`}>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(${p.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${p.gridColor} 1px, transparent 1px)`,
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Large faded project number */}
              <span className="absolute bottom-2 right-4 select-none font-display text-5xl font-bold text-white/[0.04]">
                0{p.id}
              </span>
              {/* Category + year row */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-0.5 font-mono text-[10px] text-neutral-400 backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <span className="absolute right-4 top-4 font-mono text-xs text-white/20">
                {p.year}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-violet-200">
                {p.title}
              </h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">
                {p.description}
              </p>

              {/* Footer */}
              <div className="flex flex-wrap items-center gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded-md border px-2 py-0.5 font-mono text-xs ${tagColors[t] ?? defaultTag}`}
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto font-mono text-xs text-neutral-700">
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
