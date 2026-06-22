import Link from "next/link";

const navLinks = [
  { href: "#facts-timeline", label: "Facts & Timeline" },
  { href: "#flood-impact", label: "Flood Impact Data" },
  { href: "#ai-assistant", label: "AI Civic Assistant" },
] as const;

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-tight"
        >
          <span className="text-sm font-semibold tracking-wide text-zinc-50 sm:text-base">
            Bhojpur Justice Monitor
          </span>
          <span className="hidden text-xs text-zinc-500 group-hover:text-zinc-400 sm:block">
            Civic transparency portal
          </span>
        </Link>

        <ul className="flex items-center gap-1 overflow-x-auto sm:gap-2">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className="block rounded-md px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-50 sm:px-4 sm:text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
