import type { Severity } from "../lib/types";
import { SEVERITY_ORDER } from "../lib/loadChecklist";
import { SEV_COLOR, SEV_LABEL } from "../lib/severity";

interface Props {
  severityFilter: Set<Severity>;
  onToggleSeverity: (s: Severity) => void;
  hideCompleted: boolean;
  onToggleHideCompleted: () => void;
  onReset: () => void;
  onCollapse: () => void;
  collapseDisabled: boolean;
}

export function Controls({
  severityFilter,
  onToggleSeverity,
  hideCompleted,
  onToggleHideCompleted,
  onReset,
  onCollapse,
  collapseDisabled,
}: Props) {
  return (
    <div className="glass px-5 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-jetbrains text-[10px] font-bold uppercase tracking-wider text-muted-zinc">
            Filter
          </span>
          {SEVERITY_ORDER.map((sev) => {
            const active = severityFilter.has(sev);
            return (
              <button
                key={sev}
                type="button"
                onClick={() => onToggleSeverity(sev)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
                  active
                    ? "border-white/25 bg-white/10 text-soft-white"
                    : "border-white/10 bg-transparent text-muted-zinc hover:border-white/20 hover:text-soft-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${SEV_COLOR[sev]}`} />
                {SEV_LABEL[sev]}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCollapse}
            disabled={collapseDisabled}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-muted-zinc transition-colors hover:border-white/25 hover:text-soft-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/10 disabled:hover:text-muted-zinc"
          >
            Collapse
          </button>
          <label className="flex items-center gap-2 text-xs text-muted-zinc hover:text-soft-white">
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={onToggleHideCompleted}
              className="h-3.5 w-3.5 accent-tamper-red"
            />
            Hide completed
          </label>
          <button
            type="button"
            onClick={onReset}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-muted-zinc transition-colors hover:border-white/25 hover:text-soft-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
