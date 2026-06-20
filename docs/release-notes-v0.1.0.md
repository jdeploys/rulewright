# Rulewright v0.1.0

Rulewright turns failed agent sessions into durable project instructions.

This first public prototype focuses on a simple workflow: read a corrected
agent session, identify the behavioral lesson, and propose a narrow patch for
the instruction files your agents already read.

## Highlights

- Codex plugin and Rulewright skill.
- Local Codex and Claude Code installers.
- Cursor and GitHub Copilot instruction installers.
- Correction detection for scope-control, verification, and communication issues.
- Korean-aware rule suggestions.
- Demo transcript and asciinema-ready terminal demo.

## Install

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:codex
```

Other targets:

```bash
npm run install:claude
npm run install:cursor -- /path/to/your/project
npm run install:copilot -- /path/to/your/project
```

## Demo

- [Demo transcript](https://github.com/jdeploys/rulewright/blob/main/docs/demo-transcript.md)
- [Anonymized real-session example](https://github.com/jdeploys/rulewright/blob/main/docs/real-session-example.md)
- `asciinema play docs/demo.cast`

## Notes

This is an early prototype. Rulewright proposes instruction patches first; it is
not meant to silently rewrite your project rules.
