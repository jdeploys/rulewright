# Rulewright Demo Transcript

This demo shows the smallest useful loop: a user corrects an agent, Rulewright
extracts the behavioral lesson, and the lesson becomes a reusable project rule.

## Input Session

```text
User:
Fix the crop button in layout slot crop edit. It should only cancel the current
crop edit, not change normal layout playback.

Agent:
I updated the whole layout editing flow and changed the playback transition.

User:
No, that is too broad. I asked about layout slot crop edit only. Normal layout
playback should not change.
```

## Rulewright Analysis

```yaml
source:
  kind: codex-thread
  id: demo-layout-crop
findings:
  - category: scope-control
    confidence: high
    language: en
    evidence: "No, that is too broad. I asked about layout slot crop edit only. Normal layout playback should not change."
```

## Generated Rule Patch

Target: `AGENTS.md`

```diff
 ## Change Execution Protocol
+
+Before changing behavior, lock the smallest requested scope before editing.
+Name adjacent files, modes, or flows that must not change.
+Do not broaden the fix into unrelated layout, architecture, or refactor work
+unless the user explicitly approves that broader scope.
```

## Korean Example

```text
User:
아니 확인도 안 하고 고쳤다고 하면 어떡해. 다음부터 테스트 결과 보고 말해.
```

Rulewright keeps the generated rule in Korean:

```markdown
## 검증 규칙

수정이 끝났다고 말하기 전에 사용자가 보고한 동작이 실제로 바뀌었는지 검증한다.
추론만으로 완료를 주장하지 말고 테스트 결과, 스크린샷, 명령 출력처럼 직접 확인 가능한 근거를 우선한다.
```
