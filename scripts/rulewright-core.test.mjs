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
    assert.equal(result.findings[0].language, 'ko');
    assert.match(result.findings[0].evidence, /전체 레이아웃/);
  });

  it('detects Korean verification corrections', () => {
    const result = analyzeSession({
      source: { kind: 'codex-thread', id: 'thread-789' },
      turns: [
        {
          role: 'user',
          text: '아니 확인도 안 하고 고쳤다고 하면 어떡해. 다음부터 테스트 결과 보고 말해.',
        },
      ],
    });

    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].category, 'verification');
    assert.equal(result.findings[0].language, 'ko');
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
  it('turns English scope-control findings into an English project instruction', () => {
    const rule = suggestRule({
      category: 'scope-control',
      evidence: 'This was a small UI bug, but the agent rewrote the whole layout.',
      confidence: 'high',
      language: 'en',
    });

    assert.match(rule.title, /Scope/);
    assert.match(rule.body, /Lock the smallest requested scope/);
    assert.match(rule.body, /Do not broaden/);
  });

  it('turns Korean scope-control findings into a Korean project instruction', () => {
    const rule = suggestRule({
      category: 'scope-control',
      evidence: '작은 UI 버그였는데 왜 전체 레이아웃을 갈아엎었어?',
      confidence: 'high',
      language: 'ko',
    });

    assert.match(rule.title, /범위/);
    assert.match(rule.body, /요청된 가장 작은 범위/);
    assert.match(rule.body, /사용자가 명시적으로 승인/);
  });

  it('keeps English suggestions in English when the evidence is English', () => {
    const rule = suggestRule({
      category: 'verification',
      evidence: 'Do not say it is fixed without running the test.',
      confidence: 'high',
    });

    assert.match(rule.title, /Verification/);
    assert.doesNotMatch(rule.body, /검증/);
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
