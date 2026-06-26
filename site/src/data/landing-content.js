export const locales = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

const installTargets = [
  {
    name: 'Codex',
    command: 'npm run install:codex',
  },
  {
    name: 'Claude Code',
    command: 'npm run install:claude',
  },
  {
    name: 'Cursor',
    command: 'npm run install:cursor -- /path/to/project',
  },
  {
    name: 'GitHub Copilot',
    command: 'npm run install:copilot -- /path/to/project',
  },
];

export const landingContent = {
  en: {
    lang: 'en',
    title: 'Rulewright - Turn agent mistakes into rules',
    description:
      'Rulewright turns failed agent sessions into durable project instructions for Codex, Claude Code, Cursor, and GitHub Copilot.',
    nav: {
      examples: 'Examples',
      install: 'Install',
      github: 'GitHub',
    },
    languageSwitcherLabel: 'Language',
    hero: {
      eyebrow: 'Your agent messed up. Keep the lesson.',
      title: 'Turn agent mistakes into rules',
      lede:
        'Rulewright reads corrected Codex, Claude, Cursor, and Copilot sessions, then proposes durable instruction patches in the language your team already used to correct the agent.',
      languageLabel: 'Localized rule templates',
      primaryAction: 'View on GitHub',
      secondaryAction: 'Read the demo',
    },
    terminal: {
      userLabel: 'User:',
      correction: '"You changed the whole layout.\nI only asked for crop edit."',
      rulewrightLabel: 'Rulewright:',
      category: 'scope-control',
      language: 'en',
      confidence: 'high',
      patchTarget: 'AGENTS.md',
      patchLabel: 'patch',
      patchLines: [
        'Lock the smallest requested scope.',
        'Name adjacent modes that must not change.',
        'Do not broaden the fix without approval.',
      ],
    },
    problem: {
      kicker: 'The failure mode',
      title: 'Corrections disappear inside chat history.',
      body:
        'Every useful correction is a tiny postmortem. Rulewright turns those moments into reusable project instructions before the lesson fades into another session transcript.',
    },
    steps: {
      kicker: 'How it works',
      title: 'From corrected session to project rule.',
      items: [
        {
          title: 'Read the session',
          body: 'Start from the Codex thread or transcript where the agent was corrected.',
        },
        {
          title: 'Detect the lesson',
          body: 'Classify scope, verification, communication, and localized language-profile signals.',
        },
        {
          title: 'Propose the patch',
          body: 'Route a narrow rule to AGENTS.md, CLAUDE.md, Cursor rules, or Copilot instructions.',
        },
      ],
    },
    examples: {
      kicker: 'Examples',
      title: 'Rules grounded in actual corrections.',
      items: [
        {
          label: 'Scope control',
          correction: 'You changed the whole layout. I only asked for crop edit.',
          rule: 'Lock the smallest requested scope before editing.',
        },
        {
          label: 'Verification',
          correction: 'Do not say it is fixed without running the test.',
          rule: 'Verify the reported behavior before claiming the fix is complete.',
        },
        {
          label: 'Language profiles',
          correction: '違う、全体のレイアウトを変えないで。',
          rule: '要求された最小範囲を固定する。',
        },
      ],
    },
    install: {
      kicker: 'Install',
      title: 'Use it where your agents already read rules.',
      body: 'Clone once, then install Rulewright into your preferred agent workflow.',
      targets: installTargets.map((target) => ({
        ...target,
        detail:
          target.name === 'Codex'
            ? 'Installs Rulewright as a personal Codex plugin and marketplace entry.'
            : target.name === 'Claude Code'
              ? 'Copies the Rulewright skill into your Claude Code skills folder.'
              : target.name === 'Cursor'
                ? 'Adds a repository rule at .cursor/rules/rulewright.mdc.'
                : 'Updates .github/copilot-instructions.md with a Rulewright block.',
      })),
    },
    closing: {
      kicker: 'Open source',
      title: 'Stop losing the fixes you already paid for.',
      body:
        'Rulewright is an early open-source prototype for teams that want agent behavior to improve through concrete session evidence.',
      primaryAction: 'Star the project',
      secondaryAction: 'View v0.1.0',
    },
  },
  ko: {
    lang: 'ko',
    title: 'Rulewright - 에이전트 실수를 규칙으로 바꾸기',
    description:
      'Rulewright는 실패한 에이전트 세션을 Codex, Claude Code, Cursor, GitHub Copilot이 따를 수 있는 지속 가능한 프로젝트 지침으로 바꿉니다.',
    nav: {
      examples: '예시',
      install: '설치',
      github: 'GitHub',
    },
    languageSwitcherLabel: '언어',
    hero: {
      eyebrow: '에이전트가 삐끗했다면, 교훈은 남기세요.',
      title: '에이전트 실수를 규칙으로 바꾸기',
      lede:
        'Rulewright는 교정된 Codex, Claude, Cursor, Copilot 세션을 읽고, 팀이 에이전트를 교정한 바로 그 언어로 오래 남는 지침 패치를 제안합니다.',
      languageLabel: '로컬라이즈된 규칙 템플릿',
      primaryAction: 'GitHub에서 보기',
      secondaryAction: '데모 읽기',
    },
    terminal: {
      userLabel: '사용자:',
      correction: '"전체 레이아웃을 바꾸라고 한 게 아니라\ncrop 편집만 고치라고 했어."',
      rulewrightLabel: 'Rulewright:',
      category: 'scope-control',
      language: 'ko',
      confidence: 'high',
      patchTarget: 'AGENTS.md',
      patchLabel: 'patch',
      patchLines: [
        '요청된 가장 작은 범위를 먼저 고정한다.',
        '바뀌면 안 되는 인접 모드를 명시한다.',
        '승인 없이 수정 범위를 넓히지 않는다.',
      ],
    },
    problem: {
      kicker: '실패 패턴',
      title: '교정은 채팅 기록 속에서 사라집니다.',
      body:
        '쓸모 있는 교정은 작은 postmortem입니다. Rulewright는 그 순간을 세션 기록 속에서 사라지기 전에 재사용 가능한 프로젝트 지침으로 바꿉니다.',
    },
    steps: {
      kicker: '작동 방식',
      title: '교정된 세션에서 프로젝트 규칙까지.',
      items: [
        {
          title: '세션 읽기',
          body: '에이전트가 교정받은 Codex thread 또는 transcript에서 시작합니다.',
        },
        {
          title: '교훈 감지',
          body: '범위, 검증, 커뮤니케이션, 로컬라이즈된 언어 프로필 신호를 분류합니다.',
        },
        {
          title: '패치 제안',
          body: 'AGENTS.md, CLAUDE.md, Cursor rules, Copilot instructions에 들어갈 좁은 규칙을 라우팅합니다.',
        },
      ],
    },
    examples: {
      kicker: '예시',
      title: '실제 교정에서 나온 규칙.',
      items: [
        {
          label: '범위 제어',
          correction: '전체 레이아웃을 바꾼 게 문제야. crop 편집만 고치라고 했어.',
          rule: '수정 전에 요청된 가장 작은 범위를 고정한다.',
        },
        {
          label: '검증',
          correction: '테스트도 안 돌리고 고쳤다고 말하지 마.',
          rule: '완료라고 말하기 전에 보고된 동작을 검증한다.',
        },
        {
          label: '언어 프로필',
          correction: '한국어로 교정했으면 규칙도 한국어로 남겨야지.',
          rule: '감지한 사용자 언어로 규칙을 작성한다.',
        },
      ],
    },
    install: {
      kicker: '설치',
      title: '에이전트가 이미 읽는 규칙 위치에서 쓰세요.',
      body: '한 번 clone한 뒤 원하는 에이전트 워크플로에 Rulewright를 설치합니다.',
      targets: installTargets.map((target) => ({
        ...target,
        detail:
          target.name === 'Codex'
            ? 'Rulewright를 개인 Codex 플러그인과 marketplace 항목으로 설치합니다.'
            : target.name === 'Claude Code'
              ? 'Rulewright skill을 Claude Code skills 폴더로 복사합니다.'
              : target.name === 'Cursor'
                ? '.cursor/rules/rulewright.mdc에 repository rule을 추가합니다.'
                : '.github/copilot-instructions.md의 Rulewright 블록을 갱신합니다.',
      })),
    },
    closing: {
      kicker: '오픈소스',
      title: '이미 비용을 치른 수정 사항을 잃어버리지 마세요.',
      body:
        'Rulewright는 에이전트 행동을 실제 세션 증거로 개선하고 싶은 팀을 위한 초기 오픈소스 프로토타입입니다.',
      primaryAction: '프로젝트 Star',
      secondaryAction: 'v0.1.0 보기',
    },
  },
  ja: {
    lang: 'ja',
    title: 'Rulewright - エージェントの失敗をルールに変える',
    description:
      'Rulewrightは失敗したエージェントセッションを、Codex、Claude Code、Cursor、GitHub Copilotが従える永続的なプロジェクト指示に変換します。',
    nav: {
      examples: '例',
      install: 'インストール',
      github: 'GitHub',
    },
    languageSwitcherLabel: '言語',
    hero: {
      eyebrow: 'エージェントが間違えたら、その教訓を残す。',
      title: 'エージェントの失敗をルールに変える',
      lede:
        'Rulewrightは修正済みのCodex、Claude、Cursor、Copilotセッションを読み、チームがエージェントを修正した言語で永続的な指示パッチを提案します。',
      languageLabel: 'ローカライズ済みルールテンプレート',
      primaryAction: 'GitHubで見る',
      secondaryAction: 'デモを読む',
    },
    terminal: {
      userLabel: 'ユーザー:',
      correction: '"全体のレイアウトを変えないで。\ncrop編集だけ直してほしかった。"',
      rulewrightLabel: 'Rulewright:',
      category: 'scope-control',
      language: 'ja',
      confidence: 'high',
      patchTarget: 'AGENTS.md',
      patchLabel: 'patch',
      patchLines: [
        '要求された最小範囲を固定する。',
        '変更してはいけない隣接モードを明示する。',
        '承認なしに修正範囲を広げない。',
      ],
    },
    problem: {
      kicker: '失敗パターン',
      title: '修正はチャット履歴の中で消えていきます。',
      body:
        '有用な修正は小さなポストモーテムです。Rulewrightは、その教訓が別のセッション履歴に埋もれる前に、再利用できるプロジェクト指示へ変換します。',
    },
    steps: {
      kicker: '仕組み',
      title: '修正済みセッションからプロジェクトルールへ。',
      items: [
        {
          title: 'セッションを読む',
          body: 'エージェントが修正されたCodexスレッドまたはトランスクリプトから始めます。',
        },
        {
          title: '教訓を検出する',
          body: 'スコープ、検証、コミュニケーション、ローカライズ言語プロファイルの信号を分類します。',
        },
        {
          title: 'パッチを提案する',
          body: 'AGENTS.md、CLAUDE.md、Cursor rules、Copilot instructionsに入る狭いルールを提案します。',
        },
      ],
    },
    examples: {
      kicker: '例',
      title: '実際の修正に基づくルール。',
      items: [
        {
          label: 'スコープ制御',
          correction: '全体のレイアウトを変えたのが問題です。crop編集だけ直してほしかった。',
          rule: '編集前に要求された最小範囲を固定する。',
        },
        {
          label: '検証',
          correction: 'テストを実行せずに直ったと言わないで。',
          rule: '完了と言う前に報告された動作を検証する。',
        },
        {
          label: '言語プロファイル',
          correction: '日本語で修正したなら、ルールも日本語で残すべきです。',
          rule: '検出したユーザーの言語でルールを書く。',
        },
      ],
    },
    install: {
      kicker: 'インストール',
      title: 'エージェントがすでに読むルールの場所で使う。',
      body: '一度cloneしてから、使いたいエージェントワークフローにRulewrightをインストールします。',
      targets: installTargets.map((target) => ({
        ...target,
        detail:
          target.name === 'Codex'
            ? 'Rulewrightを個人用Codexプラグインとmarketplace項目としてインストールします。'
            : target.name === 'Claude Code'
              ? 'Rulewright skillをClaude Code skillsフォルダへコピーします。'
              : target.name === 'Cursor'
                ? '.cursor/rules/rulewright.mdcにrepository ruleを追加します。'
                : '.github/copilot-instructions.mdのRulewrightブロックを更新します。',
      })),
    },
    closing: {
      kicker: 'オープンソース',
      title: 'すでに支払った修正を失わない。',
      body:
        'Rulewrightは、具体的なセッション証拠からエージェントの振る舞いを改善したいチーム向けの初期オープンソースプロトタイプです。',
      primaryAction: 'プロジェクトをStar',
      secondaryAction: 'v0.1.0を見る',
    },
  },
  zh: {
    lang: 'zh',
    title: 'Rulewright - 把代理错误变成规则',
    description:
      'Rulewright 将失败的代理会话转换为 Codex、Claude Code、Cursor 和 GitHub Copilot 可以长期遵循的项目指令。',
    nav: {
      examples: '示例',
      install: '安装',
      github: 'GitHub',
    },
    languageSwitcherLabel: '语言',
    hero: {
      eyebrow: '代理出错了，就把教训留下来。',
      title: '把代理错误变成规则',
      lede:
        'Rulewright 会读取已纠正的 Codex、Claude、Cursor 和 Copilot 会话，并用团队纠正代理时使用的语言生成持久的指令补丁。',
      languageLabel: '本地化规则模板',
      primaryAction: '在 GitHub 查看',
      secondaryAction: '阅读演示',
    },
    terminal: {
      userLabel: '用户:',
      correction: '"不要改整个布局。\n我只是让你修 crop 编辑。"',
      rulewrightLabel: 'Rulewright:',
      category: 'scope-control',
      language: 'zh',
      confidence: 'high',
      patchTarget: 'AGENTS.md',
      patchLabel: 'patch',
      patchLines: [
        '先锁定最小请求范围。',
        '明确说明不能改变的相邻模式。',
        '未经批准不要扩大修复范围。',
      ],
    },
    problem: {
      kicker: '失败模式',
      title: '纠正会消失在聊天记录里。',
      body:
        '每一次有用的纠正都是一次小型复盘。Rulewright 会在教训被新的会话记录淹没之前，把它转成可复用的项目指令。',
    },
    steps: {
      kicker: '工作方式',
      title: '从已纠正会话到项目规则。',
      items: [
        {
          title: '读取会话',
          body: '从代理被纠正的 Codex thread 或 transcript 开始。',
        },
        {
          title: '检测教训',
          body: '分类范围、验证、沟通和本地化语言配置相关信号。',
        },
        {
          title: '提出补丁',
          body: '把窄范围规则路由到 AGENTS.md、CLAUDE.md、Cursor rules 或 Copilot instructions。',
        },
      ],
    },
    examples: {
      kicker: '示例',
      title: '来自真实纠正的规则。',
      items: [
        {
          label: '范围控制',
          correction: '问题是你改了整个布局。我只让你修 crop 编辑。',
          rule: '编辑前先锁定最小请求范围。',
        },
        {
          label: '验证',
          correction: '不要没跑测试就说已经修好了。',
          rule: '声称完成前验证用户报告的行为。',
        },
        {
          label: '语言配置',
          correction: '如果用户用中文纠正，规则也应该保留中文。',
          rule: '用检测到的用户语言编写规则。',
        },
      ],
    },
    install: {
      kicker: '安装',
      title: '在代理已经读取规则的地方使用。',
      body: 'clone 一次，然后把 Rulewright 安装到你偏好的代理工作流。',
      targets: installTargets.map((target) => ({
        ...target,
        detail:
          target.name === 'Codex'
            ? '将 Rulewright 安装为个人 Codex 插件和 marketplace 条目。'
            : target.name === 'Claude Code'
              ? '把 Rulewright skill 复制到 Claude Code skills 文件夹。'
              : target.name === 'Cursor'
                ? '在 .cursor/rules/rulewright.mdc 添加 repository rule。'
                : '更新 .github/copilot-instructions.md 中的 Rulewright block。',
      })),
    },
    closing: {
      kicker: '开源',
      title: '不要丢掉你已经付出代价得到的修复。',
      body:
        'Rulewright 是一个早期开源原型，面向希望用具体会话证据改进代理行为的团队。',
      primaryAction: 'Star 项目',
      secondaryAction: '查看 v0.1.0',
    },
  },
  es: {
    lang: 'es',
    title: 'Rulewright - Convierte errores de agentes en reglas',
    description:
      'Rulewright convierte sesiones fallidas de agentes en instrucciones duraderas para Codex, Claude Code, Cursor y GitHub Copilot.',
    nav: {
      examples: 'Ejemplos',
      install: 'Instalar',
      github: 'GitHub',
    },
    languageSwitcherLabel: 'Idioma',
    hero: {
      eyebrow: 'Tu agente se equivoco. Conserva la leccion.',
      title: 'Convierte errores de agentes en reglas',
      lede:
        'Rulewright lee sesiones corregidas de Codex, Claude, Cursor y Copilot, y propone parches de instrucciones duraderas en el idioma que tu equipo ya uso para corregir al agente.',
      languageLabel: 'Plantillas de reglas localizadas',
      primaryAction: 'Ver en GitHub',
      secondaryAction: 'Leer la demo',
    },
    terminal: {
      userLabel: 'Usuario:',
      correction: '"Cambiaste todo el layout.\nSolo pedi arreglar la edicion crop."',
      rulewrightLabel: 'Rulewright:',
      category: 'scope-control',
      language: 'es',
      confidence: 'high',
      patchTarget: 'AGENTS.md',
      patchLabel: 'patch',
      patchLines: [
        'Fija el alcance solicitado mas pequeno.',
        'Nombra los modos cercanos que no deben cambiar.',
        'No amplias la correccion sin aprobacion.',
      ],
    },
    problem: {
      kicker: 'El fallo',
      title: 'Las correcciones desaparecen dentro del historial de chat.',
      body:
        'Cada correccion util es un pequeno postmortem. Rulewright convierte esos momentos en instrucciones reutilizables antes de que la leccion se pierda en otra transcripcion.',
    },
    steps: {
      kicker: 'Como funciona',
      title: 'De una sesion corregida a una regla de proyecto.',
      items: [
        {
          title: 'Lee la sesion',
          body: 'Empieza desde el thread de Codex o transcript donde el agente fue corregido.',
        },
        {
          title: 'Detecta la leccion',
          body: 'Clasifica senales de alcance, verificacion, comunicacion y perfiles de idioma localizados.',
        },
        {
          title: 'Propone el patch',
          body: 'Dirige una regla estrecha a AGENTS.md, CLAUDE.md, Cursor rules o Copilot instructions.',
        },
      ],
    },
    examples: {
      kicker: 'Ejemplos',
      title: 'Reglas basadas en correcciones reales.',
      items: [
        {
          label: 'Control de alcance',
          correction: 'Cambiaste todo el layout. Solo pedi arreglar la edicion crop.',
          rule: 'Fija el alcance solicitado mas pequeno antes de editar.',
        },
        {
          label: 'Verificacion',
          correction: 'No digas que esta arreglado sin ejecutar el test.',
          rule: 'Verifica el comportamiento reportado antes de declarar la correccion completa.',
        },
        {
          label: 'Perfiles de idioma',
          correction: 'Si la correccion fue en espanol, la regla tambien deberia quedar en espanol.',
          rule: 'Escribe la regla en el idioma detectado del usuario.',
        },
      ],
    },
    install: {
      kicker: 'Instalar',
      title: 'Usalo donde tus agentes ya leen reglas.',
      body: 'Clona una vez y luego instala Rulewright en tu flujo de agente preferido.',
      targets: installTargets.map((target) => ({
        ...target,
        detail:
          target.name === 'Codex'
            ? 'Instala Rulewright como plugin personal de Codex y entrada de marketplace.'
            : target.name === 'Claude Code'
              ? 'Copia la skill de Rulewright en tu carpeta de skills de Claude Code.'
              : target.name === 'Cursor'
                ? 'Agrega una regla de repositorio en .cursor/rules/rulewright.mdc.'
                : 'Actualiza .github/copilot-instructions.md con un bloque de Rulewright.',
      })),
    },
    closing: {
      kicker: 'Open source',
      title: 'No pierdas las correcciones que ya pagaste.',
      body:
        'Rulewright es un prototipo open-source temprano para equipos que quieren mejorar el comportamiento de agentes con evidencia concreta de sesiones.',
      primaryAction: 'Dar Star',
      secondaryAction: 'Ver v0.1.0',
    },
  },
};
