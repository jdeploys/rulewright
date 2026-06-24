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
