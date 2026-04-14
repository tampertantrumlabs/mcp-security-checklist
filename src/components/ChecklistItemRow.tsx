import type { ChecklistItem } from "../lib/types";
import { SeverityBadge } from "./SeverityBadge";

interface Props {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItemRow({ item, checked, onToggle }: Props) {
  return (
    <li>
      <label
        className={`group flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition-all duration-200 ${
          checked
            ? "border-white/5 bg-white/[0.02] opacity-60"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            checked
              ? "border-tamper-red bg-tamper-red"
              : "border-white/30 bg-transparent group-hover:border-white/60"
          }`}
        >
          {checked && (
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8.5 L7 12.5 L13 4.5" />
            </svg>
          )}
        </span>

        <span className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
          <SeverityBadge severity={item.severity} />
          <span
            className={`text-sm leading-relaxed text-soft-white ${
              checked ? "line-through decoration-white/30" : ""
            }`}
          >
            {item.text}
          </span>
        </span>
      </label>
    </li>
  );
}
