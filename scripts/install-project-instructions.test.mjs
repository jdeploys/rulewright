import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  installCopilotInstructions,
  installCursorRule,
  upsertRulewrightBlock,
} from './install-project-instructions.mjs';
import { getDefaultPaths as getCodexDefaultPaths } from './install-codex-plugin.mjs';
import { getClaudeDefaultPaths } from './install-claude-skill.mjs';

describe('installCursorRule', () => {
  it('writes a Cursor MDC rule into the target repository', async () => {
    const targetRepo = await fs.mkdtemp(path.join(os.tmpdir(), 'rulewright-cursor-'));

    const result = await installCursorRule({ targetRepo });
    const content = await fs.readFile(result.cursorRulePath, 'utf8');

    assert.equal(result.cursorRulePath, path.join(targetRepo, '.cursor', 'rules', 'rulewright.mdc'));
    assert.match(content, /alwaysApply: true/);
    assert.match(content, /Rulewright/);
    assert.match(content, /failed agent sessions/);
    assert.match(content, /Preserve the user's language/);
  });
});

describe('installCopilotInstructions', () => {
  it('creates repository-wide GitHub Copilot instructions in the target repository', async () => {
    const targetRepo = await fs.mkdtemp(path.join(os.tmpdir(), 'rulewright-copilot-'));

    const result = await installCopilotInstructions({ targetRepo });
    const content = await fs.readFile(result.copilotInstructionsPath, 'utf8');

    assert.equal(result.copilotInstructionsPath, path.join(targetRepo, '.github', 'copilot-instructions.md'));
    assert.match(content, /<!-- rulewright:start -->/);
    assert.match(content, /Use Rulewright/);
    assert.match(content, /Preserve the user's language/);
    assert.match(content, /<!-- rulewright:end -->/);
  });

  it('replaces an existing Rulewright block without duplicating it', () => {
    const updated = upsertRulewrightBlock([
      '# Existing Copilot Instructions',
      '',
      '<!-- rulewright:start -->',
      'old text',
      '<!-- rulewright:end -->',
      '',
      'Keep this line.',
    ].join('\n'));

    assert.equal((updated.match(/<!-- rulewright:start -->/g) ?? []).length, 1);
    assert.match(updated, /Keep this line/);
    assert.doesNotMatch(updated, /old text/);
  });
});

describe('project instruction installers do not change existing global installers', () => {
  it('keeps Codex and Claude installer targets separate', () => {
    const homeDir = '/home/example';
    const repoRoot = '/repo/rulewright';

    assert.equal(
      getCodexDefaultPaths({ homeDir, repoRoot }).pluginTargetPath,
      path.join(homeDir, '.agents', 'plugins', 'plugins', 'rulewright'),
    );
    assert.equal(
      getClaudeDefaultPaths({ homeDir, repoRoot }).skillTargetPath,
      path.join(homeDir, '.claude', 'skills', 'rulewright'),
    );
  });
});
