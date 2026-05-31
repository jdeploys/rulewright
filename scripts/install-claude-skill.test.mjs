import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  getClaudeDefaultPaths,
  installClaudeSkill,
} from './install-claude-skill.mjs';
import { getDefaultPaths as getCodexDefaultPaths } from './install-codex-plugin.mjs';

describe('getClaudeDefaultPaths', () => {
  it('targets the Claude Code skill directory', () => {
    const paths = getClaudeDefaultPaths({
      homeDir: '/home/example',
      repoRoot: '/repo/rulewright',
    });

    assert.equal(paths.skillTargetPath, path.join('/home/example', '.claude', 'skills', 'rulewright'));
    assert.equal(paths.skillSourcePath, path.join('/repo/rulewright', 'skills', 'rulewright'));
  });

  it('does not change the Codex marketplace installer target', () => {
    const codexPaths = getCodexDefaultPaths({
      homeDir: '/home/example',
      repoRoot: '/repo/rulewright',
    });

    assert.equal(
      codexPaths.marketplacePath,
      path.join('/home/example', '.agents', 'plugins', '.agents', 'plugins', 'marketplace.json'),
    );
    assert.equal(codexPaths.pluginTargetPath, path.join('/home/example', '.agents', 'plugins', 'plugins', 'rulewright'));
  });
});

describe('installClaudeSkill', () => {
  it('copies the Rulewright skill into the Claude Code skill folder', async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'rulewright-claude-'));
    const repoRoot = path.join(tempRoot, 'repo');
    const homeDir = path.join(tempRoot, 'home');
    const sourceSkill = path.join(repoRoot, 'skills', 'rulewright');

    await fs.mkdir(sourceSkill, { recursive: true });
    await fs.writeFile(path.join(sourceSkill, 'SKILL.md'), '---\nname: rulewright\ndescription: test\n---\n');

    const paths = await installClaudeSkill({ homeDir, repoRoot });
    const installedSkill = await fs.readFile(path.join(paths.skillTargetPath, 'SKILL.md'), 'utf8');

    assert.match(installedSkill, /name: rulewright/);
  });
});
