# Rulewright

Rulewright turns failed Codex sessions into durable project instructions.

It is a session-first Codex plugin for reading agent thread history, spotting
where the user corrected or rejected agent behavior, and proposing narrow
patches for files such as `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and
`.github/copilot-instructions.md`.

## Status

Early prototype. The first target is Codex thread/session analysis.

## What It Does

- Reads a Codex thread or session selected by the user.
- Detects correction signals such as overly broad edits, missing verification,
  or communication mismatch.
- Routes suggested rules to the most appropriate project instruction file.
- Proposes patches first instead of silently rewriting rule files.

## Plugin Layout

```text
.codex-plugin/plugin.json
skills/rulewright/SKILL.md
scripts/rulewright-core.mjs
scripts/rulewright-core.test.mjs
```

## Development

```bash
npm test
```

## Core Idea

Most agent mistakes are only useful if they become memory. Rulewright treats a
bad session as a postmortem and turns the lesson into a reusable project rule.
