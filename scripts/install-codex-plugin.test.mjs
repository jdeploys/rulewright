import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  createOrUpdateMarketplace,
  getMarketplaceEntry,
  installCodexPlugin,
} from './install-codex-plugin.mjs';

describe('createOrUpdateMarketplace', () => {
  it('creates a personal marketplace with the Rulewright plugin entry', () => {
    const marketplace = createOrUpdateMarketplace();

    assert.equal(marketplace.name, 'personal');
    assert.equal(marketplace.interface.displayName, 'Personal');
    assert.deepEqual(marketplace.plugins, [
      {
        name: 'rulewright',
        source: {
          source: 'local',
          path: './plugins/rulewright',
        },
        policy: {
          installation: 'AVAILABLE',
          authentication: 'ON_INSTALL',
        },
        category: 'Productivity',
      },
    ]);
  });

  it('updates an existing Rulewright marketplace entry without duplicating it', () => {
    const marketplace = createOrUpdateMarketplace({
      name: 'personal',
      interface: {
        displayName: 'My Plugins',
      },
      plugins: [
        {
          name: 'rulewright',
          source: {
            source: 'local',
            path: './old/rulewright',
          },
          policy: {
            installation: 'NOT_AVAILABLE',
            authentication: 'ON_USE',
          },
          category: 'Other',
        },
      ],
    });

    assert.equal(marketplace.interface.displayName, 'My Plugins');
    assert.equal(marketplace.plugins.length, 1);
    assert.deepEqual(marketplace.plugins[0], getMarketplaceEntry());
  });
});

describe('installCodexPlugin', () => {
  it('creates a Codex CLI-compatible local marketplace root for Rulewright', async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'rulewright-codex-'));
    const homeDir = path.join(tempRoot, 'home');
    const repoRoot = path.join(tempRoot, 'repo');

    await fs.mkdir(path.join(repoRoot, '.codex-plugin'), { recursive: true });
    await fs.writeFile(path.join(repoRoot, '.codex-plugin', 'plugin.json'), '{"name":"rulewright"}\n');
    const staleCacheManifest = path.join(
      homeDir,
      '.codex',
      'plugins',
      'cache',
      'personal',
      'rulewright',
      '.codex-plugin',
      'plugin.json',
    );
    await fs.mkdir(path.dirname(staleCacheManifest), { recursive: true });
    await fs.writeFile(staleCacheManifest, '{"name":"stale-rulewright"}\n');

    const paths = await installCodexPlugin({ homeDir, repoRoot });
    const marketplace = JSON.parse(await fs.readFile(paths.marketplacePath, 'utf8'));
    const installedManifest = await fs.readFile(
      path.join(paths.pluginTargetPath, '.codex-plugin', 'plugin.json'),
      'utf8',
    );
    const cachedManifest = await fs.readFile(
      path.join(paths.cachePluginPath, '.codex-plugin', 'plugin.json'),
      'utf8',
    );

    assert.equal(paths.marketplaceRoot, path.join(homeDir, '.agents', 'plugins'));
    assert.equal(paths.marketplacePath, path.join(paths.marketplaceRoot, 'marketplace.json'));
    assert.equal(paths.pluginTargetPath, path.join(paths.marketplaceRoot, 'plugins', 'rulewright'));
    assert.equal(paths.cachePluginRoot, path.join(homeDir, '.codex', 'plugins', 'cache', 'personal', 'rulewright'));
    assert.equal(paths.cachePluginPath, path.join(homeDir, '.codex', 'plugins', 'cache', 'personal', 'rulewright', '0.1.0'));
    assert.deepEqual(marketplace.plugins, [getMarketplaceEntry()]);
    assert.equal(await pathExists(staleCacheManifest), false);
    assert.match(installedManifest, /"name":"rulewright"/);
    assert.match(cachedManifest, /"name":"rulewright"/);
  });
});

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}
