import type { Severity } from "./types";

export const SEV_LABEL: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const SEV_COLOR: Record<Severity, string> = {
  critical: "bg-[var(--color-sev-critical)]",
  high: "bg-[var(--color-sev-high)]",
  medium: "bg-[var(--color-sev-medium)]",
  low: "bg-[var(--color-sev-low)]",
};
