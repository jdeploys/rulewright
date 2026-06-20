import fs from 'node:fs/promises';
import path from 'node:path';

const RULEWRIGHT_START = '<!-- rulewright:start -->';
const RULEWRIGHT_END = '<!-- rulewright:end -->';

export function getCursorRuleContent() {
  return [
    '---',
    'description: Use Rulewright to turn failed agent sessions into durable project instructions',
    'alwaysApply: true',
    '---',
    '',
    '# Rulewright',
    '',
    'Use Rulewright when a user wants to learn from failed agent sessions, repeated corrections, or unsatisfactory AI behavior.',
    '',
    '- Treat the failed session as a postmortem, not as a generic prompt-improvement task.',
    '- Identify the exact agent behavior the user rejected or corrected.',
    '- Propose narrow patches for project instruction files such as AGENTS.md, CLAUDE.md, .cursor/rules, or .github/copilot-instructions.md.',
    '- Preserve existing stronger rules and avoid broad rewrites unless the user explicitly asks.',
    '- Prefer evidence-backed diffs over silent edits.',
    '- Preserve the user\'s language when drafting proposed rules unless the target project explicitly requires another language.',
    '',
  ].join('\n');
}

export function getCopilotInstructionBlock() {
  return [
    RULEWRIGHT_START,
    '## Rulewright',
    '',
    'Use Rulewright when a user wants to analyze failed agent sessions, repeated corrections, or unsatisfactory AI behavior and turn the lesson into durable project instructions.',
    '',
    '- Identify the exact rejected agent behavior before proposing a rule.',
    '- Prefer narrow, evidence-backed patches to AGENTS.md, CLAUDE.md, Cursor rules, or Copilot instructions.',
    '- Do not generalize one-off preferences into broad rules without saying confidence is low.',
    '- Preserve existing stronger instructions and propose a diff before editing.',
    '- Preserve the user\'s language when drafting proposed rules unless the target repository explicitly requires another language.',
    RULEWRIGHT_END,
  ].join('\n');
}

export async function installCursorRule({ targetRepo = process.cwd() } = {}) {
  const cursorRulePath = path.join(path.resolve(targetRepo), '.cursor', 'rules', 'rulewright.mdc');
  await fs.mkdir(path.dirname(cursorRulePath), { recursive: true });
  await fs.writeFile(cursorRulePath, getCursorRuleContent());
  return { cursorRulePath };
}

export async function installCopilotInstructions({ targetRepo = process.cwd() } = {}) {
  const copilotInstructionsPath = path.join(path.resolve(targetRepo), '.github', 'copilot-instructions.md');
  await fs.mkdir(path.dirname(copilotInstructionsPath), { recursive: true });

  let existing = '';
  try {
    existing = await fs.readFile(copilotInstructionsPath, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  await fs.writeFile(copilotInstructionsPath, upsertRulewrightBlock(existing));
  return { copilotInstructionsPath };
}

export function upsertRulewrightBlock(existingContent = '') {
  const block = getCopilotInstructionBlock();
  const normalized = String(existingContent ?? '').trimEnd();
  const pattern = new RegExp(`${escapeRegExp(RULEWRIGHT_START)}[\\s\\S]*?${escapeRegExp(RULEWRIGHT_END)}`);

  if (pattern.test(normalized)) {
    return `${normalized.replace(pattern, block)}\n`;
  }

  if (!normalized) {
    return `${block}\n`;
  }

  return `${normalized}\n\n${block}\n`;
}

export function getTargetRepoFromArgv(argv = process.argv) {
  return argv[2] ? path.resolve(argv[2]) : process.cwd();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
