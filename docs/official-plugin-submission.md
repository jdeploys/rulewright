# Rulewright Official Plugin Submission Draft

This document is the prepared submission copy for Rulewright if self-serve
official Codex Plugin Directory publishing becomes available.

## Plugin Summary

Rulewright turns failed or frustrating Codex sessions into durable project
instructions.

## Directory Short Description

Convert agent corrections into reusable project rules.

## Directory Long Description

Rulewright helps developers preserve lessons from agent sessions that went off
track. It analyzes a user-selected Codex thread or session, looks for concrete
correction events, checks the project's existing instruction files, and proposes
narrow Markdown patches for files such as `AGENTS.md`, `CLAUDE.md`,
`.cursor/rules/*`, and `.github/copilot-instructions.md`.

Rulewright is intentionally conservative. It proposes patches before editing,
distinguishes repeated agent-behavior failures from one-off preferences, and
keeps every suggested rule tied to session evidence.

## Category

Productivity

## Keywords

codex, rules, instructions, agent-memory, postmortem, developer-tools,
project-instructions

## Primary Users

Developers and teams who use coding agents repeatedly in the same repositories
and want mistakes, corrections, and workflow preferences to become durable
project instructions.

## Core Use Cases

- Convert a rejected Codex behavior into a narrow `AGENTS.md` rule.
- Review a recent failed session and identify reusable workflow lessons.
- Check whether existing instruction files already cover an observed mistake.
- Propose project-rule patches for Codex, Claude Code, Cursor, or GitHub
  Copilot without silently rewriting the rule file.

## Example Prompts

- Analyze this Codex session and propose a rule patch.
- Turn my last correction into an AGENTS.md rule.
- Check whether our project instructions prevent this failure.

## Permissions And Data Handling

Rulewright is a local skill-based plugin. It works from user-selected Codex
thread/session context and local project instruction files. It should only read
the session and repository files needed for the requested analysis. It does not
require external network calls for its core workflow and should not send session
content to third-party services.

Rulewright proposes patches before applying them. It should not silently edit
project instruction files, and it should keep unrelated private session content
out of the final report.

## Review Notes

- The plugin is session-first and should prefer Codex thread/session sources
  over pasted transcript files.
- The plugin is conservative by design: it separates evidence-backed behavioral
  rules from low-confidence user preferences.
- The plugin has local installer scripts for Codex, Claude Code, Cursor, and
  GitHub Copilot instruction formats.
- The official directory path is not yet self-serve, so this file is a prepared
  submission draft rather than a live submission record.

