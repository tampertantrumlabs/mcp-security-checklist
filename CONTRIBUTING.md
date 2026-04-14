# Contributing

Thanks for helping make this checklist better. The content lives in a single YAML file, so most contributions are small and focused.

## Adding or changing a checklist item

1. Fork the repo.
2. Edit `src/data/checklist.yaml`.
3. Run `pnpm dev` to confirm your change renders.
4. Open a PR with a clear description of what you are adding and why. If the item comes from a real vulnerability or incident, mention it in the PR (anonymized is fine).

You should not need to touch any React code for content changes. If you do, something is structured wrong, please call it out in the PR.

## YAML structure

```yaml
sections:
  - id: auth                          # stable, kebab-case
    title: Authentication & Authorization
    description: One-sentence framing for the section.
    groups:
      - title: Server Authentication
        items:
          - id: auth-server-required  # stable, unique across the whole file
            severity: critical        # critical | high | medium | low
            text: MCP server requires authentication for all connections.
```

Rules:

- Every item needs a stable, unique `id`. Do not reuse or renumber existing ids, they are saved in users' browsers via localStorage and renaming them resets their progress.
- Pick the right severity (see below). Err on the side of lower severity unless you can justify higher.
- Keep `text` to a single sentence. State the control as a fact, not a question. "X is true" not "Is X true?"
- No em or en dashes. Use commas, periods, semicolons, parentheses, or colons instead.

## Item-writing guidelines

- Specific and actionable, not vague guidance. "Tools have execution timeouts" beats "Be careful with long-running tools."
- Direct phrasing. "Do X" not "Consider doing X" unless it is genuinely situational.
- One control per item. If you find yourself writing "and," it is probably two items.
- Avoid jargon and hustle-speak. No "leverage," "robust," "in today's threat landscape." Describe the actual thing.

## Severity definitions

- **Critical:** Exploitable vulnerability that should block deployment. If you skip this, an attacker can compromise your system.
- **High:** Significant risk that needs a remediation plan before production. Not immediately exploitable but creates serious exposure.
- **Medium:** Best practice that reduces attack surface. Skipping this will not get you popped tomorrow but weakens your posture.
- **Low:** Hardening measure for mature implementations. Nice to have, not urgent.

## Adding a new section or group

If your item does not fit any existing section, you can propose a new section in the same PR. Keep section ids stable once merged.

## Reporting security issues in MCP implementations

This repo is a checklist, not a vulnerability disclosure platform. If you find a real vulnerability in a third-party MCP server, work with the vendor directly.

If you find an issue with the checklist itself (bad advice, missing critical item), open an issue or PR.

## Code of conduct

Be helpful. Be specific. Do not be a jerk. That covers it.
