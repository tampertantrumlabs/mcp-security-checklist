import yaml from "js-yaml";
import checklistYaml from "../data/checklist.yaml?raw";
import {
  ChecklistSchema,
  type Checklist,
  type ChecklistItem,
  type Severity,
} from "./types";

export const checklist: Checklist = ChecklistSchema.parse(
  yaml.load(checklistYaml),
);

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];

export function flattenItems(c: Checklist): ChecklistItem[] {
  return c.sections.flatMap((s) => s.groups.flatMap((g) => g.items));
}

export const ALL_ITEMS = flattenItems(checklist);

export const ITEMS_BY_SEVERITY: Record<Severity, ChecklistItem[]> = {
  critical: ALL_ITEMS.filter((i) => i.severity === "critical"),
  high: ALL_ITEMS.filter((i) => i.severity === "high"),
  medium: ALL_ITEMS.filter((i) => i.severity === "medium"),
  low: ALL_ITEMS.filter((i) => i.severity === "low"),
};
