interface Props {
  title: string;
  tagline: string;
  version: number;
}

export function Header({ title, tagline, version }: Props) {
  return (
    <header className="relative pt-16 pb-10 sm:pt-24 sm:pb-14">
      <div className="mx-auto max-w-4xl px-6">
        <a
          href="https://tampertantrumlabs.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-jetbrains text-[10px] font-bold uppercase tracking-[0.25em] text-icon-red transition-colors hover:text-soft-white"
        >
          <span className="h-px w-6 bg-icon-red" />
          TamperTantrum Labs
        </a>

        <h1 className="mt-4 font-space text-4xl font-bold leading-[1.05] text-soft-white sm:text-6xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-zinc sm:text-lg">
          {tagline}
        </p>

        <p className="mt-3 font-jetbrains text-xs text-subtle-zinc">
          v{version} · progress saved to your browser
        </p>
      </div>
    </header>
  );
}
