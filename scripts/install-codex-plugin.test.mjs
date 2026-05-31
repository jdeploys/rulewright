import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createOrUpdateMarketplace,
  getMarketplaceEntry,
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
