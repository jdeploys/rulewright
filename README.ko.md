# Rulewright

[English](README.md)

Rulewright는 실패한 에이전트 세션을 재사용 가능한 프로젝트 지침으로 바꾸는 도구입니다.

세션을 먼저 읽는 방식으로 설계되어 있습니다. Codex thread 기록에서 사용자가 에이전트의 행동을 수정하거나 거절한 지점을 찾고, 그 교훈을 `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, `.github/copilot-instructions.md` 같은 지침 파일에 넣을 수 있는 좁은 패치로 제안합니다.

```text
사용자 교정
  "전체 레이아웃을 바꾸라고 한 게 아니라 crop 버튼만 고치라고 했어."

Rulewright 분석
  category: scope-control
  confidence: high
  language: ko

생성되는 규칙 패치
  동작을 변경하기 전에 요청된 가장 작은 범위를 먼저 고정한다.
  바뀌면 안 되는 인접 파일, 모드, 흐름을 명시한다.
```

- 세션 우선: 추상적인 조언이 아니라 실제로 실패한 대화에서 규칙을 뽑습니다.
- 패치 우선: 지침 파일을 조용히 고치지 않고 작은 diff를 먼저 제안합니다.
- 여러 에이전트 지원: Codex, Claude Code, Cursor, GitHub Copilot 흐름에 맞춥니다.
- 언어 보존: 한국어 교정은 한국어 규칙으로, 영어 교정은 영어 규칙으로 유지합니다.

## 데모

- [demo transcript와 generated rule patch](docs/demo-transcript.md)를 읽어보세요.
- 터미널 데모는 `asciinema play docs/demo.cast`로 재생할 수 있습니다.

## 상태

초기 프로토타입입니다. 첫 번째 대상은 Codex thread/session 분석입니다.

## Codex에 설치하기

repo를 clone한 뒤 로컬 Codex installer를 실행합니다.

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:codex
```

installer는 Rulewright를 개인 Codex 플러그인 디렉터리에 복사하고, 개인 marketplace에 등록합니다.

```text
~/.agents/plugins/plugins/rulewright
~/.agents/plugins/marketplace.json
```

Windows에서는 사용자 프로필 아래에 생성됩니다.

```text
C:\Users\<you>\.agents\plugins\plugins\rulewright
C:\Users\<you>\.agents\plugins\marketplace.json
```

설치 후 Codex를 열고 개인 marketplace에서 `Rulewright` 플러그인을 찾으면 됩니다. Codex가 이미 실행 중이었다면 앱을 재시작하거나 플러그인 목록을 새로고침하세요.

나중에 업데이트하려면 repo를 pull한 뒤 installer를 다시 실행합니다.

```bash
git pull
npm run install:codex
```

## Claude Code에 설치하기

repo를 clone한 뒤 Claude Code skill installer를 실행합니다.

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:claude
```

installer는 Rulewright skill을 아래 위치에 복사합니다.

```text
~/.claude/skills/rulewright
```

Windows에서는 사용자 프로필 아래에 생성됩니다.

```text
C:\Users\<you>\.claude\skills\rulewright
```

설치 후 새 Claude Code 세션을 시작하고 `rulewright`를 사용해 실패한 에이전트 세션을 분석하거나 프로젝트 지침을 개선하라고 요청하면 됩니다.

## Cursor 또는 GitHub Copilot에 설치하기

Cursor와 GitHub Copilot은 repository 지침 파일을 사용합니다. 설치할 때 대상 프로젝트 경로를 넘겨주세요.

```bash
git clone https://github.com/jdeploys/rulewright.git
cd rulewright
npm run install:cursor -- /path/to/your/project
npm run install:copilot -- /path/to/your/project
```

Cursor installer는 아래 파일을 생성합니다.

```text
/path/to/your/project/.cursor/rules/rulewright.mdc
```

GitHub Copilot installer는 아래 파일에 Rulewright 블록을 생성하거나 갱신합니다.

```text
/path/to/your/project/.github/copilot-instructions.md
```

경로를 생략하면 installer는 현재 작업 디렉터리를 대상으로 사용합니다.

## 하는 일

- 사용자가 선택한 Codex thread 또는 session을 읽습니다.
- 범위를 넓힌 수정, 검증 누락, 커뮤니케이션 불일치 같은 교정 신호를 찾습니다.
- 제안할 규칙을 가장 적절한 프로젝트 지침 파일로 라우팅합니다.
- 지침 파일을 조용히 다시 쓰지 않고, 먼저 패치를 제안합니다.

## 플러그인 구조

```text
.codex-plugin/plugin.json
skills/rulewright/SKILL.md
scripts/rulewright-core.mjs
scripts/rulewright-core.test.mjs
```

## 개발

```bash
npm test
```

## 핵심 아이디어

대부분의 에이전트 실수는 기억으로 남을 때만 쓸모가 있습니다. Rulewright는 나쁜 세션을 postmortem처럼 다루고, 그 교훈을 재사용 가능한 프로젝트 규칙으로 바꿉니다.
