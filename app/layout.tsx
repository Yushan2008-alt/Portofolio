import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Yushan — Backend Developer",
  description:
    "Backend developer & SMK RPL student crafting clean, scalable web solutions. View my projects and get in touch.",
  keywords: ["backend developer", "web developer", "portfolio", "SMK RPL", "Yushan"],
  openGraph: {
    title: "Yushan — Backend Developer",
    description:
      "Backend developer & SMK RPL student crafting clean, scalable web solutions.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yushan — Backend Developer",
    description: "Backend developer & SMK RPL student crafting clean, scalable web solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative font-sans bg-obsidian-900 text-slate-100 antialiased">
        <Navbar />
        <main className="relative z-10 pt-16">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
