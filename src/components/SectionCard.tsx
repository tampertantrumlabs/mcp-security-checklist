import { useEffect, useRef } from "react";
import type { ChecklistSection, Severity } from "../lib/types";
import { ChecklistItemRow } from "./ChecklistItemRow";

interface Props {
  section: ChecklistSection;
  index: number;
  checked: Set<string>;
  onToggle: (id: string) => void;
  severityFilter: Set<Severity>;
  hideCompleted: boolean;
  isOpen: boolean;
  onToggleOpen: (id: string) => void;
}

export function SectionCard({
  section,
  index,
  checked,
  onToggle,
  severityFilter,
  hideCompleted,
  isOpen,
  onToggleOpen,
}: Props) {
  const allItems = section.groups.flatMap((g) => g.items);
  const totalInScope = allItems.filter((i) => severityFilter.has(i.severity));
  const doneCount = totalInScope.filter((i) => checked.has(i.id)).length;
  const totalCount = totalInScope.length;
  const pct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const headerId = `section-${section.id}-header`;
  const panelId = `section-${section.id}-panel`;

  const sectionRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      // Newly opened: bring the header into view if it's off-screen.
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < 80 || rect.top > window.innerHeight - 120) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="glass glass-hover scroll-mt-24 overflow-hidden"
    >
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggleOpen(section.id)}
        className="group flex w-full items-start gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
      >
        <Chevron open={isOpen} />
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-jetbrains text-xs text-icon-red">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-space text-xl font-semibold text-soft-white sm:text-2xl">
                {section.title}
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-zinc">
              {section.description}
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <div className="font-jetbrains text-2xl font-bold text-soft-white">
              {doneCount}
              <span className="text-muted-zinc">/{totalCount}</span>
            </div>
            <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="border-t border-white/5 px-6 pb-7 pt-5 sm:px-8"
        >
          <SectionBody
            section={section}
            checked={checked}
            onToggle={onToggle}
            severityFilter={severityFilter}
            hideCompleted={hideCompleted}
          />
        </div>
      )}
    </section>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 text-muted-zinc transition-all duration-300 group-hover:border-white/25 group-hover:text-soft-white ${
        open ? "rotate-90" : ""
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
        <path d="M5 3 L11 8 L5 13 Z" />
      </svg>
    </span>
  );
}

function SectionBody({
  section,
  checked,
  onToggle,
  severityFilter,
  hideCompleted,
}: {
  section: ChecklistSection;
  checked: Set<string>;
  onToggle: (id: string) => void;
  severityFilter: Set<Severity>;
  hideCompleted: boolean;
}) {
  const renderedGroups = section.groups
    .map((group) => ({
      group,
      visible: group.items.filter(
        (i) => severityFilter.has(i.severity) && !(hideCompleted && checked.has(i.id)),
      ),
    }))
    .filter((g) => g.visible.length > 0);

  if (renderedGroups.length === 0) {
    return (
      <p className="text-sm text-muted-zinc">
        No items match your current filters in this section.
      </p>
    );
  }

  return (
    <div className="space-y-7">
      {renderedGroups.map(({ group, visible }) => (
        <div key={group.title}>
          <h3 className="font-space text-xs font-semibold uppercase tracking-[0.18em] text-muted-zinc">
            {group.title}
          </h3>
          <ul className="mt-3 space-y-2">
            {visible.map((item) => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                checked={checked.has(item.id)}
                onToggle={onToggle}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
