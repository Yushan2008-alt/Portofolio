"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",      sectionId: "home",      routePath: "/" },
  { label: "About",     sectionId: "about",     routePath: "/about" },
  { label: "Skills",    sectionId: "skills",    routePath: "/skills" },
  { label: "Projects",  sectionId: "projects",  routePath: "/projects" },
  { label: "Education", sectionId: "education", routePath: "/education" },
  { label: "Contact",   sectionId: "contact",   routePath: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll progress bar
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setScrollProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Active section detection
  useEffect(() => {
    if (!isHome) {
      // On standalone pages, derive active from pathname
      const match = navLinks.find((l) => l.routePath === pathname);
      setActiveSection(match?.sectionId ?? "home");
      return;
    }

    // On home page, use IntersectionObserver to track scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      // Section is "active" when it occupies the middle 10% of the viewport
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // On home page: hash links for smooth scroll.
  // On other pages: route links for navigation.
  const getHref = (link: (typeof navLinks)[0]) =>
    isHome ? `#${link.sectionId}` : link.routePath;

  const isActive = (link: (typeof navLinks)[0]) =>
    activeSection === link.sectionId;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-[#0a0a0f]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={isHome ? "#home" : "/"}
          className="font-mono text-sm font-bold tracking-[0.28em] text-violet-400 uppercase transition-colors hover:text-violet-300"
        >
          YS
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={getHref(link)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg border border-violet-500/20 bg-violet-500/8"
                    transition={{ type: "spring", stiffness: 380, damping: 38 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="relative flex h-8 w-8 items-center justify-center text-neutral-400 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`absolute h-px w-5 bg-current transition-all duration-300 ${menuOpen ? "top-4 rotate-45" : "top-3"}`} />
          <span className={`absolute top-4 h-px bg-current transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`absolute h-px w-5 bg-current transition-all duration-300 ${menuOpen ? "top-4 -rotate-45" : "top-5"}`} />
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-violet-500 to-violet-700 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/[0.04] md:hidden"
          >
            <nav className="flex flex-col gap-1 bg-[#0a0a0f]/95 px-6 py-3 backdrop-blur-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={getHref(link)}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link)
                      ? "bg-violet-500/8 text-violet-300"
                      : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
