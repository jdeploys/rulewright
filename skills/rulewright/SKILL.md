---
name: rulewright
description: Turn Codex sessions or thread IDs into durable project instruction patches. Use when the user asks to analyze a Codex session, learn from a failed agent run, improve AGENTS.md/CLAUDE.md/Cursor/Copilot rules from chat history, or run Rulewright.
---

# Rulewright

Rulewright turns a failed or corrected agent session into a small, durable rule.
Prefer Codex thread/session sources over transcript files.

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
   - Separate user preference from objective bug. Mark one-off taste as low confidence.
   - Prefer evidence from repeated corrections, explicit user instructions, or visible failures.

4. Choose the smallest rule destination.
   - Read existing rule files before proposing anything: `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/**`, `.github/copilot-instructions.md`, and relevant user/global instruction files when the lesson is cross-project.
   - Prefer tightening or replacing an existing section over appending a new section.
   - Do not create a new `.md` file for one rule unless no suitable rule file exists and the user approves.
   - If existing instructions are already long or repetitive, propose a compact replacement that removes duplication instead of adding more text.

5. Propose a compact patch, not silent edits.
   - State the detected failure.
   - Quote or paraphrase only the minimum evidence.
   - Name the target rule file.
   - Provide the exact Markdown block to add, replace, or delete.
   - Explain why the rule is narrow enough and what adjacent behavior it must not affect.
   - Keep the proposed rule under 120 words unless the user asks for detail.

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
- short enough that future agents will actually read them

Avoid rules that say only "be careful", "do better", "don't make mistakes", or "always ask first" unless the session evidence justifies that strength.

## Suggested Output Shape

```markdown
Detected failure:
The agent claimed an integration was available after checking files, but before runtime verification.

Evidence:
User objected that no real test had been run; the first smoke test then failed.

Target:
~/.codex/AGENTS.md, existing verification section

Proposed patch:
Add one bullet: "For runtime-loaded integrations, do not claim visible/available until a fresh runtime path confirms it."

Confidence:
High
```
