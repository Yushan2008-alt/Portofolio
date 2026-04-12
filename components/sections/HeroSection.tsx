"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const techStack = ["HTML5", "CSS3", "JavaScript", "Java", "MySQL", "Git"];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-1/4 h-80 w-80 animate-glow-pulse rounded-full bg-violet-600/8 blur-[120px] md:h-[480px] md:w-[480px]" />
        <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-violet-800/5 blur-[90px] md:h-[320px] md:w-[320px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">

          {/* ── Left: Text ── */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-violet-400 uppercase sm:text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                SMK Telkom Malang · Open to Collaborate
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeUp}>
              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                  Yushan
                </span>
                <br />
                Backend
                <br />
                Developer.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-base leading-relaxed text-neutral-400 sm:text-lg"
            >
              Crafting clean, scalable backend solutions. SMK Telkom Malang
              student building real-world projects and leveling up every day.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
              >
                View My Work
                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#"
                aria-label="Download CV (coming soon)"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all duration-200 hover:border-violet-500/30 hover:bg-white/5 hover:text-white"
                title="Replace href with your CV link"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
              <Link
                href="#contact"
                className="inline-flex items-center rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all duration-200 hover:border-violet-500/30 hover:bg-white/5 hover:text-white"
              >
                Contact Me
              </Link>
            </motion.div>

            {/* Stack chips */}
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="font-mono text-[9px] tracking-[0.2em] text-neutral-600 uppercase">
                Current Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-neutral-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="animate-float relative">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/10 via-violet-600/5 to-transparent blur-2xl" />

              {/* Photo frame */}
              <div className="relative h-[220px] w-[175px] overflow-hidden rounded-2xl border border-violet-500/15 sm:h-[270px] sm:w-[215px] md:h-[310px] md:w-[245px] lg:h-[360px] lg:w-[285px]">
                <Image
                  src="/yushanpose.jpg"
                  alt="Yushan — Backend Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent" />
              </div>

              {/* Badge bottom-left */}
              <div className="absolute -bottom-3 -left-3 rounded-lg border border-violet-500/20 bg-[#0f0f1a]/90 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[10px] text-violet-400">Backend Dev</p>
                <p className="font-mono text-[9px] text-neutral-600">Software Engineering</p>
              </div>

              {/* Badge top-right */}
              <div className="absolute -right-3 -top-3 rounded-lg border border-white/8 bg-[#0f0f1a]/90 px-2.5 py-1.5 backdrop-blur-sm">
                <span className="font-mono text-[10px] font-bold tracking-wider text-white">Yushan</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
