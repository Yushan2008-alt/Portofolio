"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "4+", label: "Projects Shipped" },
  { value: "3+", label: "Tech Stacks" },
  { value: "∞", label: "Lines of Code" },
];

const learning = [
  "Node.js & REST APIs",
  "Database Design",
  "Clean Architecture",
  "Version Control (Git)",
  "UI/UX Fundamentals",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        className="mb-16 space-y-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs tracking-[0.22em] text-violet-400 uppercase"
        >
          About
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Behind The Code
        </motion.h2>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1fr_200px]">
        <motion.div
          className="space-y-7"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p className="text-xl leading-relaxed text-neutral-300">
            I&apos;m{" "}
            <span className="font-semibold text-white">Yushan</span>, a backend
            developer in the making — currently a student at{" "}
            <span className="text-violet-400">SMK Telkom Malang</span>{" "}
            jurusan Rekayasa Perangkat Lunak, building the technical foundation
            to ship real-world products.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            I&apos;m drawn to the logic behind systems — how data flows, how
            services communicate, and how to write code that&apos;s clean,
            maintainable, and built to scale. When I&apos;m not coding,
            I&apos;m studying new patterns and challenging myself with side
            projects.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            My goal: join a team that ships products that matter, and keep
            growing as an engineer every single day.
          </p>

          <div className="pt-2">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
              Currently Learning
            </p>
            <div className="flex flex-wrap gap-2">
              {learning.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-neutral-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-row gap-3 lg:flex-col"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center lg:flex-none lg:p-6"
            >
              <span className="font-display text-3xl font-bold text-violet-400 lg:text-4xl">
                {value}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-wide text-neutral-600">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
