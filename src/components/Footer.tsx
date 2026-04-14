export function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-4xl px-6 pb-16 text-center text-xs text-subtle-zinc">
      <p>
        Open source under the MIT License. Source on{" "}
        <a
          href="https://github.com/tampertantrum/mcp-security-checklist"
          target="_blank"
          rel="noreferrer"
          className="text-muted-zinc underline-offset-4 hover:text-soft-white hover:underline"
        >
          GitHub
        </a>
        . Improvements welcome via PR to{" "}
        <code className="font-jetbrains text-[11px] text-muted-zinc">
          src/data/checklist.yaml
        </code>
        .
      </p>
      <p className="mt-2">
        Built and maintained by{" "}
        <a
          href="https://tampertantrumlabs.com"
          target="_blank"
          rel="noreferrer"
          className="text-muted-zinc underline-offset-4 hover:text-soft-white hover:underline"
        >
          TamperTantrum Labs
        </a>
        .
      </p>
    </footer>
  );
}
