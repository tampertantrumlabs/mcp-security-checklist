import { useState } from "react";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { OverallProgress } from "./components/OverallProgress";
import { Controls } from "./components/Controls";
import { SectionCard } from "./components/SectionCard";
import { CTACard } from "./components/CTACard";
import { Footer } from "./components/Footer";
import { checklist, SEVERITY_ORDER } from "./lib/loadChecklist";
import { useChecked, useOpenSection } from "./lib/storage";
import type { Severity } from "./lib/types";

export default function App() {
  const { checked, toggle, reset } = useChecked();
  const {
    open: openSection,
    toggle: toggleSection,
    collapse: collapseSection,
  } = useOpenSection();
  const [severityFilter, setSeverityFilter] = useState<Set<Severity>>(
    () => new Set(SEVERITY_ORDER),
  );
  const [hideCompleted, setHideCompleted] = useState(false);

  const toggleSeverity = (s: Severity) => {
    setSeverityFilter((prev) => {
      const next = new Set(prev);
      if (next.has(s)) {
        if (next.size > 1) next.delete(s);
      } else {
        next.add(s);
      }
      return next;
    });
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset all checked items? This will clear your saved progress on this device.",
      )
    ) {
      reset();
    }
  };

  return (
    <>
      <Background />
      <Header
        title={checklist.title}
        tagline={checklist.tagline}
        version={checklist.version}
      />
      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-12">
        <OverallProgress checked={checked} severityFilter={severityFilter} />
        <Controls
          severityFilter={severityFilter}
          onToggleSeverity={toggleSeverity}
          hideCompleted={hideCompleted}
          onToggleHideCompleted={() => setHideCompleted((v) => !v)}
          onReset={handleReset}
          onCollapse={collapseSection}
          collapseDisabled={openSection === null}
        />
        {checklist.sections.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            index={i}
            checked={checked}
            onToggle={toggle}
            severityFilter={severityFilter}
            hideCompleted={hideCompleted}
            isOpen={openSection === section.id}
            onToggleOpen={toggleSection}
          />
        ))}
        <CTACard checked={checked} />
      </main>
      <Footer />
    </>
  );
}
