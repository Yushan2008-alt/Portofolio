import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-violet-600/8 blur-[100px]" />

      <div className="relative space-y-6">
        <p className="font-mono text-xs tracking-[0.22em] text-violet-400 uppercase">
          Error 404
        </p>
        <h1 className="font-display text-6xl font-bold tracking-tight sm:text-8xl">
          <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <p className="text-lg text-neutral-400">
          This page doesn&apos;t exist — or it was moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-400"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
