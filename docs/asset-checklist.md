# Rulewright Plugin Asset Checklist

Use this checklist before adding visual assets to `.codex-plugin/plugin.json`.
Only reference files in the manifest after the files exist in the repository.

## Required Later

- `assets/icon.png`: square composer icon, readable at small sizes.
- `assets/logo.png`: larger plugin logo for a details page.
- `assets/screenshot-session-analysis.png`: screenshot showing a selected
  Codex session analysis.
- `assets/screenshot-rule-proposal.png`: screenshot showing a proposed
  `AGENTS.md` patch.
- `assets/screenshot-approval-flow.png`: screenshot showing the approval-first
  edit flow.

## Visual Direction

- Tone: precise, developer-tool focused, evidence-first.
- Avoid generic robot or chat imagery.
- Favor a simple document/ruler/checkmark motif that communicates turning
  messy corrections into clean project rules.
- Keep text in screenshots readable and free of private session content.

## Manifest Fields To Add After Assets Exist

```json
{
  "interface": {
    "composerIcon": "./assets/icon.png",
    "logo": "./assets/logo.png",
    "screenshots": [
      "./assets/screenshot-session-analysis.png",
      "./assets/screenshot-rule-proposal.png",
      "./assets/screenshot-approval-flow.png"
    ]
  }
}
```
