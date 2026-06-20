# Rulewright

[한국어](README.ko.md)

Rulewright turns failed Codex sessions into durable project instructions.

It is a session-first Codex plugin for reading agent thread history, spotting
where the user corrected or rejected agent behavior, and proposing narrow
patches for files such as `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and
`.github/copilot-instructions.md`.

## Status

Early prototype. The first target is Codex thread/session analysis.

## Install In Codex

Clone the repo, then run the local Codex installer:

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:codex
```

The installer copies Rulewright into your personal Codex plugin directory and
adds it to your personal marketplace:

```text
~/.agents/plugins/plugins/rulewright
~/.agents/plugins/marketplace.json
```

On Windows, those paths live under your user profile:

```text
C:\Users\<you>\.agents\plugins\plugins\rulewright
C:\Users\<you>\.agents\plugins\marketplace.json
```

After installing, open Codex and look for the `Rulewright` plugin in your
personal marketplace. If Codex is already running, restart the app or reload the
plugin list.

To update later, pull the repo and run the installer again:

```bash
git pull
npm run install:codex
```

## Install In Claude Code

Clone the repo, then run the Claude Code skill installer:

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:claude
```

The installer copies the Rulewright skill to:

```text
~/.claude/skills/rulewright
```

On Windows, that path lives under your user profile:

```text
C:\Users\<you>\.claude\skills\rulewright
```

After installing, start a fresh Claude Code session and ask it to use
`rulewright` to analyze a failed agent session or improve your project
instructions.

## Install In Cursor Or GitHub Copilot

Cursor and GitHub Copilot use repository instruction files, so pass the target
project path when installing:

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:cursor -- /path/to/your/project
npm run install:copilot -- /path/to/your/project
```

Cursor installs:

```text
/path/to/your/project/.cursor/rules/rulewright.mdc
```

GitHub Copilot installs or updates the Rulewright block in:

```text
/path/to/your/project/.github/copilot-instructions.md
```

If you omit the path, the installers target the current working directory.

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
