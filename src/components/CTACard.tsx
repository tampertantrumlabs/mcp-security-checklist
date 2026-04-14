import { ITEMS_BY_SEVERITY } from "../lib/loadChecklist";

interface Props {
  checked: Set<string>;
}

export function CTACard({ checked }: Props) {
  const criticals = ITEMS_BY_SEVERITY.critical;
  const openCriticals = criticals.filter((i) => !checked.has(i.id)).length;
  const openHighs = ITEMS_BY_SEVERITY.high.filter((i) => !checked.has(i.id)).length;

  const headline =
    openCriticals > 0
      ? `You have ${openCriticals} unchecked critical item${openCriticals === 1 ? "" : "s"}.`
      : openHighs > 0
        ? `${openHighs} high-severity item${openHighs === 1 ? "" : "s"} still need attention.`
        : "Critical and high items look covered.";

  const body =
    openCriticals > 0
      ? "Critical items represent exploitable risk. We do MCP security assessments and can verify these are actually addressed in your implementation, not just checked off."
      : openHighs > 0
        ? "High items are where attackers often find a foothold. We can run a focused review and pressure-test the controls you have in place."
        : "Want a second set of eyes? We do independent MCP security assessments and can validate your controls hold up against real attacks.";

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-golden-2xl)] border border-[rgba(211,46,32,0.35)] bg-gradient-to-br from-[rgba(211,46,32,0.18)] via-[rgba(194,65,12,0.10)] to-transparent px-6 py-7 sm:px-9 sm:py-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-tamper-red/30 blur-[120px]"
      />
      <div className="relative">
        <div className="font-jetbrains text-[10px] font-bold uppercase tracking-[0.2em] text-icon-red">
          TamperTantrum Labs
        </div>
        <h2 className="mt-3 font-space text-2xl font-bold text-soft-white sm:text-3xl">
          {headline}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-soft-white/80 sm:text-base">
          {body}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://tampertantrumlabs.com/contact"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-700 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-red)] transition-all hover:shadow-[var(--shadow-glow-red-hover)]"
          >
            Talk to us about an assessment
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M6 3 L11 8 L6 13 Z" />
            </svg>
          </a>
          <a
            href="https://tampertantrumlabs.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-soft-white/70 underline-offset-4 hover:text-soft-white hover:underline"
          >
            tampertantrumlabs.com
          </a>
        </div>
      </div>
    </div>
  );
}
