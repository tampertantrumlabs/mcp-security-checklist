import type { Severity } from "../lib/types";
import { ITEMS_BY_SEVERITY, SEVERITY_ORDER } from "../lib/loadChecklist";
import { SEV_COLOR, SEV_LABEL } from "../lib/severity";

interface Props {
  checked: Set<string>;
  severityFilter: Set<Severity>;
}

export function OverallProgress({ checked, severityFilter }: Props) {
  const inScope = SEVERITY_ORDER.flatMap((s) =>
    severityFilter.has(s) ? ITEMS_BY_SEVERITY[s] : [],
  );
  const total = inScope.length;
  const done = inScope.filter((i) => checked.has(i.id)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="glass px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-jetbrains text-[10px] font-bold uppercase tracking-wider text-muted-zinc">
            Overall coverage
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-jetbrains text-5xl font-bold text-soft-white">
              {pct}
              <span className="text-2xl text-muted-zinc">%</span>
            </span>
            <span className="text-sm text-muted-zinc">
              {done} of {total} items
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
          {SEVERITY_ORDER.map((sev) => {
            const items = ITEMS_BY_SEVERITY[sev];
            const sDone = items.filter((i) => checked.has(i.id)).length;
            const sTotal = items.length;
            const sPct = sTotal === 0 ? 0 : (sDone / sTotal) * 100;
            const dimmed = !severityFilter.has(sev);
            return (
              <div
                key={sev}
                className={`min-w-[120px] ${dimmed ? "opacity-40" : ""}`}
              >
                <div className="flex items-baseline justify-between font-jetbrains text-[10px] font-bold uppercase tracking-wider text-muted-zinc">
                  <span>{SEV_LABEL[sev]}</span>
                  <span className="text-soft-white">
                    {sDone}/{sTotal}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full ${SEV_COLOR[sev]} transition-all duration-500`}
                    style={{ width: `${sPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
