import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PLUGIN_NAME = 'rulewright';
const MARKETPLACE_NAME = 'personal';

export function getMarketplaceEntry() {
  return {
    name: PLUGIN_NAME,
    source: {
      source: 'local',
      path: `./plugins/${PLUGIN_NAME}`,
    },
    policy: {
      installation: 'AVAILABLE',
      authentication: 'ON_INSTALL',
    },
    category: 'Productivity',
  };
}

export function createOrUpdateMarketplace(existingMarketplace) {
  const marketplace = existingMarketplace ?? {
    name: MARKETPLACE_NAME,
    interface: {
      displayName: 'Personal',
    },
    plugins: [],
  };

  if (!marketplace.interface) {
    marketplace.interface = { displayName: 'Personal' };
  }

  if (!Array.isArray(marketplace.plugins)) {
    marketplace.plugins = [];
  }

  const entry = getMarketplaceEntry();
  const index = marketplace.plugins.findIndex((plugin) => plugin?.name === PLUGIN_NAME);

  if (index === -1) {
    marketplace.plugins.push(entry);
  } else {
    marketplace.plugins[index] = entry;
  }

  return marketplace;
}

export function getDefaultPaths({ homeDir = os.homedir(), repoRoot = getRepoRoot() } = {}) {
  const marketplaceRoot = path.join(homeDir, '.agents', 'plugins');
  return {
    marketplaceRoot,
    marketplacePath: path.join(marketplaceRoot, 'marketplace.json'),
    pluginTargetPath: path.join(marketplaceRoot, 'plugins', PLUGIN_NAME),
    repoRoot,
  };
}

export async function installCodexPlugin(options = {}) {
  const paths = getDefaultPaths(options);
  await fs.mkdir(path.dirname(paths.pluginTargetPath), { recursive: true });
  await copyPlugin(paths.repoRoot, paths.pluginTargetPath);

  const existingMarketplace = await readJsonIfExists(paths.marketplacePath);
  const marketplace = createOrUpdateMarketplace(existingMarketplace);

  await fs.mkdir(path.dirname(paths.marketplacePath), { recursive: true });
  await fs.writeFile(paths.marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`);

  return paths;
}

async function copyPlugin(sourcePath, targetPath) {
  const source = path.resolve(sourcePath);
  const target = path.resolve(targetPath);

  if (source === target) {
    return;
  }

  const expectedParent = path.join(os.homedir(), '.agents', 'plugins', 'plugins');
  const relativeTarget = path.relative(expectedParent, target);
  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    throw new Error(`Refusing to install outside Codex plugin directory: ${target}`);
  }

  await fs.rm(target, { recursive: true, force: true });
  await fs.cp(source, target, {
    recursive: true,
    filter: (entry) => {
      const base = path.basename(entry);
      return !['.git', 'node_modules', 'coverage'].includes(base);
    },
  });
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
}

function getRepoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
}

async function main() {
  const paths = await installCodexPlugin();
  console.log(`Installed ${PLUGIN_NAME} to ${paths.pluginTargetPath}`);
  console.log(`Updated marketplace at ${paths.marketplacePath}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
