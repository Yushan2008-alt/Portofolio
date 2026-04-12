"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "⬡",
    title: "Backend Development",
    desc: "Building robust server-side logic, APIs, and services that power reliable digital products.",
  },
  {
    icon: "◈",
    title: "Database Design",
    desc: "Designing clean MySQL schemas, optimizing queries, and structuring data for scalability.",
  },
  {
    icon: "◎",
    title: "API Integration",
    desc: "Connecting systems and third-party services with well-documented, secure REST APIs.",
  },
];

export default function MissionSection() {
  return (
    <section id="mission" className="mx-auto max-w-6xl px-6 py-16">
      {/* Large mission card — inspired by the teal card in reference */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-violet-900/10 to-obsidian-800/60 p-10 md:p-14"
      >
        {/* Inner glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-700/8 blur-3xl" />

        <div className="relative">
          <p className="mb-6 font-mono text-[10px] tracking-[0.25em] text-violet-400/70 uppercase">
            / Mission Statement
          </p>

          {/* Split into 2 paragraphs for breathing room */}
          <div className="space-y-5 max-w-3xl">
            <p className="font-display text-xl font-medium leading-relaxed text-white/90 sm:text-2xl md:text-[1.65rem]">
              My mission is to build clean, efficient backend systems
              that power exceptional digital experiences.
            </p>
            <p className="font-sans text-base font-normal leading-loose text-neutral-400 sm:text-lg">
              From school projects to real-world solutions — I focus on writing
              code that is readable, scalable, and{" "}
              <span className="text-violet-400/80">makes a difference.</span>
            </p>
          </div>

          {/* Tech stack row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            {["Node.js", "Java", "MySQL", "REST APIs", "Git", "OOP"].map((t) => (
              <span key={t} className="font-mono text-xs text-violet-300/40 tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* "How Can I Help?" */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="mb-8 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How Can I Help?
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5 font-mono text-lg text-violet-400">
                {icon}
              </div>
              <h3 className="mb-2 font-display text-base font-semibold text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
