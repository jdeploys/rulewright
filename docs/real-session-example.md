# Anonymized Real-Session Example

This example is based on a real Rulewright development session, with project
details reduced to the behavior that mattered.

## What Happened

The project already supported rule suggestions, but the workflow assumed that
generated rules could be written in English. During a Korean-language session,
the user pointed out that the correction itself was in Korean and that the
resulting project rule should probably stay in Korean too.

## Correction Signal

```text
User:
근데 생각해보니까 이미 룰 수정이나 내용 파악들은 한국어 기준으로 작성되어 있을거 같은데...
그것도 수정해야 되는 부분 아냐?
```

## Extracted Lesson

```yaml
category: communication
confidence: high
language: ko
lesson: 교정을 규칙으로 바꿀 때 사용자의 언어를 보존한다.
```

## Resulting Patch Shape

Target: Rulewright skill and generated project-instruction installers.

```diff
 Find agent-behavior correction events.
   - Look for user rejection, frustration, rollback requests, "don't do that",
     "too broad", "wrong", "not what I meant", or equivalent non-English
     correction language.
+  - Preserve the user's language when drafting the proposed rule unless the
+    target rule file explicitly requires another language.
```

## Why This Became A Rule

This was not a one-off wording preference. It affected the core promise of the
tool: turning a real correction into a rule that future agents can understand
and follow in the same working context. A Korean correction should not quietly
become an English-only rule unless the target project requires English.
