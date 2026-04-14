import type { Severity } from "../lib/types";

const STYLES: Record<Severity, string> = {
  critical:
    "bg-[rgba(248,113,113,0.12)] text-[var(--color-sev-critical)] border-[rgba(248,113,113,0.35)]",
  high: "bg-[rgba(251,146,60,0.12)] text-[var(--color-sev-high)] border-[rgba(251,146,60,0.35)]",
  medium:
    "bg-[rgba(251,191,36,0.12)] text-[var(--color-sev-medium)] border-[rgba(251,191,36,0.35)]",
  low: "bg-[rgba(56,189,248,0.12)] text-[var(--color-sev-low)] border-[rgba(56,189,248,0.35)]",
};

const LABELS: Record<Severity, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 font-jetbrains text-[10px] font-bold tracking-wider ${STYLES[severity]}`}
    >
      {LABELS[severity]}
    </span>
  );
}
