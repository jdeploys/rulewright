# Rulewright

[한국어](README.ko.md)

Turn failed agent sessions into durable project instructions.

Rulewright reads a Codex thread or agent transcript, finds where the user
corrected the agent, and proposes a narrow rule patch for files such as
`AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, and
`.github/copilot-instructions.md`.

```text
User correction
  "You changed the whole layout. I only asked you to fix the crop button."

Rulewright finding
  category: scope-control
  confidence: high

Generated rule patch
  Before changing behavior, lock the smallest requested scope.
  Name adjacent modes and flows that must not change.
```

- Session-first: works from what actually went wrong, not from generic advice.
- Patch-first: proposes a small instruction diff before editing rule files.
- Multi-agent: supports Codex, Claude Code, Cursor, and GitHub Copilot workflows.
- Language-aware: keeps corrections in the detected language when a localized
  rule template is available.

## Demo

- Read the [demo transcript and generated rule patch](docs/demo-transcript.md).
- Read an [anonymized real-session example](docs/real-session-example.md).
- Play the terminal demo with `asciinema play docs/demo.cast`.

## Landing Site

The promotional landing site lives in `site/`.

Live site: <https://jdeploys.github.io/rulewright/>

```bash
cd site
npm install
npm run dev
npm run build
```

## Who Is This For?

Rulewright is for people who already keep project instructions for coding
agents and want those instructions to improve from real sessions:

- Codex, Claude Code, Cursor, or GitHub Copilot users who repeatedly correct
  the same agent behavior.
- Developers maintaining `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, or
  `.github/copilot-instructions.md`.
- Teams that want agent rules to come from concrete incidents instead of vague
  "be careful" advice.

## Status

Early prototype. The first target is Codex thread/session analysis.

## Prerequisites

- Git
- Node.js and npm
- Codex, Claude Code, Cursor, or GitHub Copilot, depending on where you want to
  use Rulewright

No package install step is required for the current scripts; clone the repo and
run the relevant `npm run install:*` command.

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

Quick verification prompt in a fresh Codex session:

```text
Use Rulewright to analyze my last corrected agent session and propose an AGENTS.md patch.
```

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

Quick verification prompt in a fresh Claude Code session:

```text
Use the rulewright skill to turn my last agent correction into a project rule.
```

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

Quick verification:

- Cursor: open the target repo and check `.cursor/rules/rulewright.mdc`.
- GitHub Copilot: check that `.github/copilot-instructions.md` contains a
  `rulewright` block.

## What It Does

- Reads a Codex thread or session selected by the user.
- Detects correction signals such as overly broad edits, missing verification,
  or communication mismatch.
- Detects English, Korean, Japanese, Chinese, and Spanish corrections for
  localized rule suggestions, with English fallback for unsupported languages.
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
