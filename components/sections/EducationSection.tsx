"use client";

import { motion } from "framer-motion";

const subjects = [
  "Programming Fundamentals",
  "Database (MySQL)",
  "Java",
  "Web Development",
  "Object-Oriented Programming",
  "Software Engineering",
  "UI/UX Design Basics",
];

export default function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        className="mb-16 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs tracking-[0.22em] text-violet-400 uppercase">
          Education
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Academic Path
        </h2>
        <p className="max-w-xl text-lg text-neutral-400">
          Where I build the foundation — formally and in the real world.
        </p>
      </motion.div>

      <div className="relative pl-6 md:pl-10">
        <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-violet-500/40 via-violet-500/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-violet-500/15 md:-left-[41px]" />

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Software Engineering
                </h3>
                <p className="mt-1 text-violet-400">
                  SMK Telkom Malang
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 font-mono text-xs text-violet-400">
                In Progress
              </span>
            </div>

            <p className="mb-6 leading-relaxed text-neutral-400">
              Studying software engineering at the vocational high school level.
              Covering programming fundamentals, database design,
              object-oriented development, and real-world project execution.
              Building the technical skills and discipline to work as a
              professional developer.
            </p>

            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-xs text-neutral-500"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          <div className="absolute -left-[25px] top-5 h-2.5 w-2.5 rounded-full border-2 border-neutral-700 bg-obsidian-900 md:-left-[41px]" />
          <div className="rounded-2xl border border-dashed border-white/[0.05] p-7">
            <p className="font-mono text-sm text-neutral-700">
              Certifications &amp; achievements — coming soon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
