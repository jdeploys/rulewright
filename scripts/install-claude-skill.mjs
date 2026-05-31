import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_NAME = 'rulewright';

export function getClaudeDefaultPaths({ homeDir = os.homedir(), repoRoot = getRepoRoot() } = {}) {
  return {
    skillSourcePath: path.join(repoRoot, 'skills', SKILL_NAME),
    skillTargetPath: path.join(homeDir, '.claude', 'skills', SKILL_NAME),
    repoRoot,
  };
}

export async function installClaudeSkill(options = {}) {
  const paths = getClaudeDefaultPaths(options);
  await fs.mkdir(path.dirname(paths.skillTargetPath), { recursive: true });
  await copySkill(paths.skillSourcePath, paths.skillTargetPath);
  return paths;
}

async function copySkill(sourcePath, targetPath) {
  const source = path.resolve(sourcePath);
  const target = path.resolve(targetPath);

  if (source === target) {
    return;
  }

  await fs.rm(target, { recursive: true, force: true });
  await fs.cp(source, target, { recursive: true });
}

function getRepoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
}

async function main() {
  const paths = await installClaudeSkill();
  console.log(`Installed ${SKILL_NAME} Claude Code skill to ${paths.skillTargetPath}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
