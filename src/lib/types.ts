export type Severity = "critical" | "high" | "medium" | "low";

export interface ChecklistItem {
  id: string;
  severity: Severity;
  text: string;
}

export interface ChecklistGroup {
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  groups: ChecklistGroup[];
}

export interface SeverityMeta {
  label: string;
  description: string;
}

export interface Checklist {
  version: number;
  title: string;
  tagline: string;
  severities: Record<Severity, SeverityMeta>;
  sections: ChecklistSection[];
}
