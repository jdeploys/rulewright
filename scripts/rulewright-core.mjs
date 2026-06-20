const CORRECTION_MARKERS = [
  /왜\s+/i,
  /왜\s+.+(했|한|해)/i,
  /아니\s+/i,
  /하지\s*마/i,
  /하지\s*말/i,
  /그러지\s*마/i,
  /그게\s*아니/i,
  /마음에\s*안\s*들/i,
  /별로/i,
  /싫/i,
  /확인도?\s*안/i,
  /검증도?\s*안/i,
  /테스트도?\s*안/i,
  /고쳤다고\s*하/i,
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
    patterns: [/확인/i, /검증/i, /테스트/i, /고쳤다고\s*하/i, /screenshot/i, /verify/i, /test/i],
  },
  {
    category: 'communication',
    patterns: [/장황/i, /길/i, /verbose/i, /explain/i],
  },
];

const RULE_TEMPLATES = {
  en: {
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
    'agent-behavior': {
      title: 'Agent Behavior Rule',
      body: 'When a user corrects agent behavior, convert the correction into a specific, reusable project instruction before future work.',
    },
  },
  ko: {
    'scope-control': {
      title: '범위 제어 규칙',
      body: [
        '동작을 변경하기 전에 요청된 가장 작은 범위를 먼저 고정한다.',
        '바뀌면 안 되는 인접 파일, 모드, 흐름을 명시한다.',
        '사용자가 명시적으로 승인하지 않는 한 수정 범위를 관련 없는 레이아웃, 아키텍처, 리팩터링 작업으로 넓히지 않는다.',
      ].join('\n'),
    },
    verification: {
      title: '검증 규칙',
      body: [
        '수정이 끝났다고 말하기 전에 사용자가 보고한 동작이 실제로 바뀌었는지 검증한다.',
        '추론만으로 완료를 주장하지 말고 테스트 결과, 스크린샷, 명령 출력처럼 직접 확인 가능한 근거를 우선한다.',
      ].join('\n'),
    },
    communication: {
      title: '응답 간결성 규칙',
      body: [
        '사용자가 자세한 설명을 요청하지 않는 한 진행 보고와 최종 요약은 간결하게 작성한다.',
        '먼저 결과를 말하고, 신뢰에 필요한 근거만 덧붙인다.',
      ].join('\n'),
    },
    'agent-behavior': {
      title: '에이전트 행동 규칙',
      body: '사용자가 에이전트 행동을 교정하면, 그 교정을 다음 작업에서 재사용할 수 있는 구체적인 프로젝트 지침으로 바꾼다.',
    },
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
      language: detectLanguage(text),
    }));

  return {
    source: session?.source ?? { kind: 'unknown' },
    findings,
  };
}

export function suggestRule(finding) {
  const language = finding?.language ?? detectLanguage(finding?.evidence ?? '');
  const templates = RULE_TEMPLATES[language] ?? RULE_TEMPLATES.en;
  const template = templates[finding?.category] ?? templates['agent-behavior'];

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
  if (/하지\s*마|하지\s*말|그러지\s*마|확인도?\s*안|검증도?\s*안|테스트도?\s*안|don't|wrong|왜/i.test(text)) {
    return 'high';
  }
  return 'medium';
}

function detectLanguage(text) {
  return /[가-힣]/.test(String(text ?? '')) ? 'ko' : 'en';
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
