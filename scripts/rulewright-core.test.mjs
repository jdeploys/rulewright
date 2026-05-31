import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeSession,
  routeRuleTarget,
  suggestRule,
} from './rulewright-core.mjs';

describe('analyzeSession', () => {
  it('detects Codex session corrections that complain about broad changes', () => {
    const result = analyzeSession({
      source: { kind: 'codex-thread', id: 'thread-123' },
      turns: [
        {
          role: 'user',
          text: '작은 UI 버그였는데 왜 전체 레이아웃을 갈아엎었어? 다음부터 범위 넓히지 마.',
        },
      ],
    });

    assert.equal(result.source.id, 'thread-123');
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].category, 'scope-control');
    assert.match(result.findings[0].evidence, /전체 레이아웃/);
  });

  it('ignores ordinary user requests that are not corrections', () => {
    const result = analyzeSession({
      source: { kind: 'codex-thread', id: 'thread-456' },
      turns: [
        {
          role: 'user',
          text: 'Codex 세션을 읽어서 규칙을 제안하는 플러그인을 만들어줘.',
        },
      ],
    });

    assert.deepEqual(result.findings, []);
  });
});

describe('suggestRule', () => {
  it('turns scope-control findings into a durable project instruction', () => {
    const rule = suggestRule({
      category: 'scope-control',
      evidence: '작은 UI 버그였는데 왜 전체 레이아웃을 갈아엎었어?',
      confidence: 'high',
    });

    assert.match(rule.title, /Scope/);
    assert.match(rule.body, /Lock the smallest requested scope/);
    assert.match(rule.body, /Do not broaden/);
  });
});

describe('routeRuleTarget', () => {
  it('routes Codex behavior rules to AGENTS.md first', () => {
    const target = routeRuleTarget({
      category: 'scope-control',
      availableRuleFiles: ['CLAUDE.md', 'AGENTS.md'],
    });

    assert.equal(target, 'AGENTS.md');
  });

  it('falls back to CLAUDE.md when AGENTS.md is unavailable', () => {
    const target = routeRuleTarget({
      category: 'scope-control',
      availableRuleFiles: ['CLAUDE.md'],
    });

    assert.equal(target, 'CLAUDE.md');
  });
});
