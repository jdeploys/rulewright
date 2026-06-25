import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const pagePath = path.resolve('site/src/pages/index.astro');
const astroConfigPath = path.resolve('site/astro.config.mjs');

describe('Rulewright landing page source', () => {
  it('contains the core hero, demo, and install links', async () => {
    const source = await fs.readFile(pagePath, 'utf8');

    assert.match(source, /Turn agent mistakes into rules/);
    assert.match(source, /Your agent messed up\. Keep the lesson\./);
    assert.match(source, /https:\/\/github\.com\/jdeploys\/rulewright/);
    assert.match(source, /demo-transcript/);
    assert.match(source, /npm run install:codex/);
  });

  it('configures Astro for the GitHub Pages project path', async () => {
    const source = await fs.readFile(astroConfigPath, 'utf8');

    assert.match(source, /site:\s*'https:\/\/jdeploys\.github\.io'/);
    assert.match(source, /base:\s*'\/rulewright'/);
  });

  it('adds restrained landing motion with reduced-motion support', async () => {
    const source = await fs.readFile(pagePath, 'utf8');

    assert.match(source, /@keyframes panel-rise/);
    assert.match(source, /@keyframes rule-reveal/);
    assert.match(source, /class="patch-line"/);
    assert.match(source, /prefers-reduced-motion:\s*reduce/);
    assert.match(source, /animation:\s*none\s*!important/);
  });
});
