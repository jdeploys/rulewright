# Rulewright Landing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Astro landing site that explains Rulewright and sends developers to GitHub, demos, and install instructions.

**Architecture:** Add an isolated `site/` Astro project with one static landing page. Keep the main Rulewright package and installers unchanged. Add a small Node test that verifies the landing source contains the core product claims and links.

**Tech Stack:** Astro, vanilla CSS, Node test runner, Playwright screenshot verification.

---

### Task 1: Lock Landing Content With Tests

**Files:**
- Create: `scripts/site-landing-content.test.mjs`

- [ ] **Step 1: Write the failing content test**

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const pagePath = path.resolve('site/src/pages/index.astro');

describe('Rulewright landing page source', () => {
  it('contains the core hero, demo, and install links', async () => {
    const source = await fs.readFile(pagePath, 'utf8');

    assert.match(source, /Turn agent mistakes into rules/);
    assert.match(source, /Your agent messed up\. Keep the lesson\./);
    assert.match(source, /https:\/\/github\.com\/jdeploys\/rulewright/);
    assert.match(source, /demo-transcript/);
    assert.match(source, /npm run install:codex/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test scripts/site-landing-content.test.mjs`

Expected: fail with `ENOENT` because `site/src/pages/index.astro` does not exist yet.

### Task 2: Create Astro Site

**Files:**
- Create: `site/package.json`
- Create: `site/astro.config.mjs`
- Create: `site/tsconfig.json`
- Create: `site/src/pages/index.astro`

- [ ] **Step 1: Add a minimal Astro package**

Create `site/package.json` with `dev`, `build`, and `preview` scripts and an Astro dependency.

- [ ] **Step 2: Add the landing page**

Create `site/src/pages/index.astro` with a dark developer-tool landing page, a session-to-rule visual, examples, install tabs as static panels, and GitHub/demo calls to action.

- [ ] **Step 3: Run the content test**

Run: `node --test scripts/site-landing-content.test.mjs`

Expected: pass.

### Task 3: Verify Build And Visuals

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Install site dependencies**

Run: `cd site && npm install`

- [ ] **Step 2: Build the site**

Run: `cd site && npm run build`

Expected: Astro creates `site/dist`.

- [ ] **Step 3: Screenshot verify**

Run a local preview server and use Playwright to capture desktop and mobile screenshots. Confirm the hero, code panels, CTAs, and install sections are visible without overlap.

- [ ] **Step 4: Link the site from README**

Add a short `Landing Site` section with local development commands.
