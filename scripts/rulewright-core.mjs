const CORRECTION_MARKERS = [
  /왜\s+/i,
  /왜\s+.+(했|한|해)/i,
  /하지\s*마/i,
  /그러지\s*마/i,
  /그게\s*아니/i,
  /마음에\s*안\s*들/i,
  /별로/i,
  /싫/i,
  /no[,.\s]/i,
  /not\s+that/i,
  /don't/i,
  /wrong/i,
  /too\s+\w+/i,
];

const CATEGORY_RULES = [
  {
    category: 'scope-control',
    patterns: [
      /전체\s*(레이아웃|구조|플로우)/i,
      /범위/i,
      /갈아엎/i,
      /건드리지\s*마/i,
      /scope/i,
      /unrelated/i,
      /refactor/i,
    ],
  },
  {
    category: 'verification',
    patterns: [/확인/i, /검증/i, /테스트/i, /screenshot/i, /verify/i, /test/i],
  },
  {
    category: 'communication',
    patterns: [/장황/i, /길/i, /verbose/i, /explain/i],
  },
];

const RULE_TEMPLATES = {
  'scope-control': {
    title: 'Scope Control Rule',
    body: [
      'When changing behavior, Lock the smallest requested scope before editing.',
      'Name adjacent files, modes, or flows that must not change.',
      'Do not broaden the fix into unrelated layout, architecture, or refactor work unless the user explicitly approves that broader scope.',
    ].join('\n'),
  },
  verification: {
    title: 'Verification Rule',
    body: [
      'Before claiming a fix is complete, verify the user-visible behavior that was reported.',
      'Prefer direct tests, screenshots, or command output over reasoning from wrapper or container changes alone.',
    ].join('\n'),
  },
  communication: {
    title: 'Concise Response Rule',
    body: [
      'Keep progress updates and final summaries concise unless the user asks for deeper explanation.',
      'Lead with the result, then include only the evidence needed to trust it.',
    ].join('\n'),
  },
};

const TARGET_PRIORITY = [
  'AGENTS.md',
  'CLAUDE.md',
  '.cursorrules',
  '.github/copilot-instructions.md',
];

export function analyzeSession(session) {
  const turns = Array.isArray(session?.turns) ? session.turns : [];
  const findings = turns
    .filter((turn) => normalizeRole(turn.role) === 'user')
    .map((turn) => normalizeText(turn.text ?? turn.summary ?? turn.content))
    .filter(Boolean)
    .filter(isCorrection)
    .map((text) => ({
      category: classifyCorrection(text),
      evidence: text,
      confidence: confidenceFor(text),
    }));

  return {
    source: session?.source ?? { kind: 'unknown' },
    findings,
  };
}

export function suggestRule(finding) {
  const template = RULE_TEMPLATES[finding?.category] ?? {
    title: 'Agent Behavior Rule',
    body: 'When a user corrects agent behavior, convert the correction into a specific, reusable project instruction before future work.',
  };

  return {
    title: template.title,
    body: template.body,
    confidence: finding?.confidence ?? 'medium',
    evidence: finding?.evidence ?? '',
  };
}

export function routeRuleTarget({ availableRuleFiles = [] } = {}) {
  const normalized = new Set(availableRuleFiles.map(normalizePath));
  return TARGET_PRIORITY.find((target) => normalized.has(normalizePath(target))) ?? null;
}

export function buildSuggestions({ session, availableRuleFiles = [] }) {
  const analysis = analyzeSession(session);
  const target = routeRuleTarget({ availableRuleFiles });

  return {
    source: analysis.source,
    target,
    suggestions: analysis.findings.map((finding) => ({
      finding,
      rule: suggestRule(finding),
      target,
    })),
  };
}

function isCorrection(text) {
  return CORRECTION_MARKERS.some((marker) => marker.test(text));
}

function classifyCorrection(text) {
  const matched = CATEGORY_RULES.find((rule) => {
    return rule.patterns.some((pattern) => pattern.test(text));
  });
  return matched?.category ?? 'agent-behavior';
}

function confidenceFor(text) {
  if (/하지\s*마|그러지\s*마|don't|wrong|왜/i.test(text)) {
    return 'high';
  }
  return 'medium';
}

function normalizeText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function normalizeRole(value) {
  return String(value ?? '').toLowerCase();
}

function normalizePath(value) {
  return String(value ?? '').replace(/\\/g, '/').toLowerCase();
}
