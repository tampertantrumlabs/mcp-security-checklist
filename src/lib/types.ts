import { z } from "zod";

export const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);

export const ChecklistItemSchema = z.object({
  id: z.string().min(1),
  severity: SeveritySchema,
  text: z.string().min(1),
});

export const ChecklistGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(ChecklistItemSchema).min(1),
});

export const ChecklistSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  groups: z.array(ChecklistGroupSchema).min(1),
});

export const SeverityMetaSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
});

export const ChecklistSchema = z.object({
  version: z.number().int().positive(),
  title: z.string().min(1),
  tagline: z.string().min(1),
  severities: z.record(SeveritySchema, SeverityMetaSchema),
  sections: z.array(ChecklistSectionSchema).min(1),
});

export type Severity = z.infer<typeof SeveritySchema>;
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
export type ChecklistGroup = z.infer<typeof ChecklistGroupSchema>;
export type ChecklistSection = z.infer<typeof ChecklistSectionSchema>;
export type SeverityMeta = z.infer<typeof SeverityMetaSchema>;
export type Checklist = z.infer<typeof ChecklistSchema>;
