"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    icon: "◈",
    description: "Building responsive, visually engaging interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend & Logic",
    icon: "⬡",
    description: "Designing systems, business logic, and data flows.",
    skills: ["Java", "Node.js", "MySQL", "REST APIs", "OOP"],
  },
  {
    title: "Tools & Workflow",
    icon: "◎",
    description: "The tools and practices that keep work clean.",
    skills: ["Git", "GitHub", "VS Code", "Figma", "CLI"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        className="mb-16 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs tracking-[0.22em] text-violet-400 uppercase">
          Skills
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Technical Arsenal
        </h2>
        <p className="max-w-xl text-lg text-neutral-400">
          Tools and technologies I use to turn ideas into working software.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {categories.map(({ title, icon, description, skills }) => (
          <motion.div
            key={title}
            variants={card}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.035]"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-violet-500/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5 font-mono text-xl text-violet-400">
              {icon}
            </div>
            <h3 className="mb-1.5 font-display text-lg font-semibold text-white">
              {title}
            </h3>
            <p className="mb-5 text-sm text-neutral-500">{description}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-neutral-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
