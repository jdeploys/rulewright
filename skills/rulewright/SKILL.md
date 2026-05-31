---
name: rulewright
description: Turn Codex sessions or thread IDs into durable project instruction patches. Use when the user asks to analyze a Codex session, learn from a failed agent run, improve AGENTS.md/CLAUDE.md/Cursor/Copilot rules from chat history, or run Rulewright.
---

# Rulewright

Rulewright is session-first. Prefer Codex thread/session sources over transcript files.

## Workflow

1. Lock the requested session scope.
   - If the user provided a Codex thread ID, use that exact thread.
   - If they said "current", "last", or did not provide an ID, call `list_threads` and choose the most relevant recent thread. Ask only if multiple plausible threads match.
   - Do not analyze unrelated threads.

2. Read the Codex thread.
   - Call `read_thread` with `includeOutputs: true`, `turnLimit` between 20 and 40, and concise output limits.
   - Use older cursors only when the correction or failure appears to be earlier than the returned turns.
   - Keep private or unrelated content out of the final report.

3. Find agent-behavior correction events.
   - Look for user rejection, frustration, rollback requests, "don't do that", "too broad", "wrong", "not what I meant", or equivalent non-English correction language.
   - Separate user preference from objective bug. Do not turn a one-off taste into a universal rule without saying the confidence is low.
   - Prefer evidence from repeated corrections, explicit user instructions, or visible failures.

4. Read existing rule files in the target repo.
   - Prefer, in order: `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/**`, `.github/copilot-instructions.md`.
   - If none exist, propose creating `AGENTS.md` for Codex-first projects.
   - Check whether an existing instruction already covers the problem before proposing a new one.

5. Propose a patch, not silent edits.
   - State the detected failure.
   - Quote or paraphrase the minimal evidence from the session.
   - Name the target rule file.
   - Provide the exact Markdown block to add or replace.
   - Explain why the rule is narrow enough and what adjacent behavior it must not affect.

6. Apply only after approval.
   - If the user approves, edit the target rule file with the smallest patch.
   - Preserve existing stronger instructions.
   - Do not rewrite the whole rule file unless the user explicitly asks.

## Rule Quality Bar

Good Rulewright rules are:
- behavioral, not emotional
- specific enough to prevent the observed failure
- narrow enough to avoid blocking valid future work
- tied to session evidence
- compatible with existing project instructions

Avoid rules that say only "be careful", "do better", "don't make mistakes", or "always ask first" unless the session evidence justifies that strength.

## Suggested Output Shape

```markdown
Detected failure:
The agent treated a narrow UI bug as permission to change broader layout behavior.

Evidence:
User said the request was only about a small UI bug and objected to the broader layout change.

Target:
AGENTS.md

Proposed patch:
## UI Bug Fix Scope Rule
When fixing a reported UI bug, identify the exact visible element and state before editing. Do not refactor surrounding layout or adjacent flows unless the user explicitly approves the broader scope.

Confidence:
High
```
