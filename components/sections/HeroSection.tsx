"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const spring = { type: "spring" as const, stiffness: 420, damping: 26 };

const techStack = ["HTML5", "CSS3", "JavaScript", "Java", "MySQL", "Git"];

/* Thin L-shaped corner bracket component */
function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute h-4 w-4 border-violet-500/50";
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return <span className={`${base} ${map[pos]}`} />;
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-1/4 h-72 w-72 animate-glow-pulse rounded-full bg-violet-600/6 blur-[110px] md:h-[400px] md:w-[400px]" />
        <div className="absolute bottom-1/3 left-1/4 h-40 w-40 rounded-full bg-violet-900/5 blur-[80px] md:h-[260px] md:w-[260px]" />
      </div>

      {/* Thin horizontal accent line across full width */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

          {/* ── Left: Text ── */}
          <motion.div
            className="space-y-7"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Status badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-violet-400 uppercase">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]" />
                SMK Telkom Malang · Open to Collaborate
              </span>
            </motion.div>

            {/* Heading — reduced size, more line spacing */}
            <motion.div variants={fadeUp}>
              <h1 className="font-display text-[1.9rem] font-bold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-500 bg-clip-text text-transparent">
                  Yushan
                </span>
                <br />
                <span className="text-neutral-200/90">Backend Developer.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-[1.8] text-neutral-500 sm:text-base"
            >
              Crafting clean, scalable backend solutions. SMK Telkom Malang
              student building real-world projects and leveling up every day.
            </motion.p>

            {/* CTA buttons — spring animations on hover + tap */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <MotionLink
                href="#projects"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
                className="group inline-flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/15 hover:bg-violet-400"
              >
                View My Work
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MotionLink>

              <motion.a
                href="#"
                aria-label="Download CV"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-neutral-300 hover:border-violet-500/25 hover:bg-white/[0.03] hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </motion.a>

              <MotionLink
                href="#contact"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
                className="inline-flex items-center rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-neutral-300 hover:border-violet-500/25 hover:bg-white/[0.03] hover:text-white"
              >
                Contact Me
              </MotionLink>
            </motion.div>

            {/* Stack chips — terminal style */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="font-mono text-[9px] tracking-[0.25em] text-neutral-700 uppercase">
                / Current Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/[0.05] bg-white/[0.015] px-2.5 py-1 font-mono text-[10px] text-neutral-600 transition-colors hover:border-violet-500/20 hover:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <div className="animate-float relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-violet-500/8 via-violet-700/4 to-transparent blur-2xl" />

              {/* Photo frame with cyber corner brackets */}
              <div className="relative h-[210px] w-[167px] overflow-hidden rounded-xl border border-violet-500/12 sm:h-[260px] sm:w-[207px] md:h-[300px] md:w-[238px] lg:h-[350px] lg:w-[278px]">
                <Image
                  src="/yushanpose.jpg"
                  alt="Yushan — Backend Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080f]/50 via-transparent to-transparent" />
              </div>

              {/* Cyber corner brackets — outside the frame */}
              <div className="absolute -inset-2 pointer-events-none">
                <Corner pos="tl" />
                <Corner pos="tr" />
                <Corner pos="bl" />
                <Corner pos="br" />
              </div>

              {/* Badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-violet-500/15 bg-[#07080f]/95 px-3 py-2 backdrop-blur-md">
                <p className="font-mono text-[10px] text-violet-400">Backend Dev</p>
                <p className="font-mono text-[9px] text-neutral-700">Software Engineering</p>
              </div>

              {/* Badge — top right */}
              <div className="absolute -right-4 -top-3 rounded-lg border border-white/[0.07] bg-[#07080f]/95 px-3 py-1.5 backdrop-blur-md">
                <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-300">Yushan</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
