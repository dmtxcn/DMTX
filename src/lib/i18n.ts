export const DEFAULT_LOCALE = "zh-CN" as const;

export const LOCALES = [
  { code: "zh-CN", microsoftCode: "zh-Hans", flagCode: "cn", label: "简体中文" },
  { code: "zh-HK", microsoftCode: "zh-Hant", flagCode: "hk", label: "繁體中文" },
  { code: "en", microsoftCode: "en", flagCode: "us", label: "English" },
  { code: "ja", microsoftCode: "ja", flagCode: "jp", label: "日本語" },
  { code: "ko", microsoftCode: "ko", flagCode: "kr", label: "한국어" },
  { code: "fr", microsoftCode: "fr", flagCode: "fr", label: "Français" },
  { code: "es", microsoftCode: "es", flagCode: "es", label: "Español" },
  { code: "de", microsoftCode: "de", flagCode: "de", label: "Deutsch" },
  { code: "ru", microsoftCode: "ru", flagCode: "ru", label: "Русский" },
  { code: "vi", microsoftCode: "vi", flagCode: "vn", label: "Tiếng Việt" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export type PageCopy = {
  nav: {
    aria: string;
    home: string;
    brand: string;
    work: string;
    contact: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    workspaceLabel: string;
    workspaceStatus: string;
    terminalHost: string;
    terminalLabel: string;
    buildLog: string;
    signals: string[];
  };
  stack: string[];
  work: {
    eyebrow: string;
    title: string;
    body: string;
  };
  capabilities: Array<{ label: string; title: string; body: string }>;
  principlesIntro: {
    eyebrow: string;
    title: string;
    body: string;
    statusLabel: string;
    statusValue: string;
  };
  principles: Array<{ title: string; body: string; tag: string }>;
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    noteLabel: string;
    noteValue: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      captcha?: string;
      captchaQuestion?: string;
      captchaPlaceholder?: string;
      submitIdle: string;
      submitSending: string;
      requiredName: string;
      requiredEmail: string;
      invalidEmail: string;
      requiredSubject: string;
      requiredMessage: string;
      requiredCaptcha?: string;
      completeForm: string;
      sendFailed: string;
      sent: string;
      networkError: string;
    };
  };
};

const buildLog = `$ npm run build
✓ compiled successfully
✓ typecheck passed
✓ contact api wired

ship_when_ready({
  taste: "clean",
  detail: "sharp",
  fallback: "clear"
})`;

const stack = ["Next.js", "TypeScript", "React", "API Routes", "SMTP", "CSS"];

export const pageTranslations: Record<LocaleCode, PageCopy> = {
  "zh-CN": {
    nav: {
      aria: "主导航",
      home: "回到首页",
      brand: "大毛同学",
      work: "能力",
      contact: "联系",
      language: "切换语言",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "大毛同学",
      lede:
        "我喜欢把复杂问题拆开，把界面做得清楚，把代码写到以后还愿意维护。这里不是一张名片，而是一张正在工作的工程师桌面。",
      primary: "给我发邮件",
      secondary: "看看我怎么做事",
      workspaceLabel: "workspace",
      workspaceStatus: "status: ready",
      terminalHost: "da-mao.local",
      terminalLabel: "build log",
      buildLog,
      signals: ["需求先落地成结构", "界面兼顾审美和可用性", "交付前跑测试和构建"],
    },
    stack,
    work: {
      eyebrow: "How I Work",
      title: "工程师的水平，应该体现在细节里",
      body:
        "好看的页面不是装饰堆出来的，而是信息层级、交互反馈、工程结构一起站住。",
    },
    capabilities: [
      {
        label: "Frontend",
        title: "把体验做到可用、耐看、能维护",
        body:
          "关注组件边界、响应式布局、表单状态、细节反馈，也在意页面第一眼给人的专业感。",
      },
      {
        label: "Product",
        title: "先想清楚问题，再写漂亮代码",
        body:
          "不急着堆功能，先把目标、用户路径和关键取舍讲明白，让实现更稳。",
      },
      {
        label: "Delivery",
        title: "从想法到上线，少绕路",
        body: "能把需求拆成可执行步骤，写出清晰结构，并用测试和构建结果兜底。",
      },
    ],
    principlesIntro: {
      eyebrow: "Operating System",
      title: "我的默认工作方式",
      body:
        "不靠玄学审美，也不靠临时发挥。每次做页面，我会把判断标准写进流程里。",
      statusLabel: "system health",
      statusValue: "stable",
    },
    principles: [
      { title: "可读性优先", body: "变量、组件、文件结构都要让下一次修改更省力。", tag: "maintain" },
      { title: "接口边界清楚", body: "把输入、输出和失败状态说清楚，减少隐形耦合。", tag: "contract" },
      { title: "反馈及时明确", body: "按钮、表单、错误提示都要让用户知道发生了什么。", tag: "feedback" },
      { title: "移动端不将就", body: "小屏幕不是压缩桌面，而是重新整理优先级。", tag: "responsive" },
      { title: "上线前先验证", body: "用测试、构建和真实预览确认它确实能工作。", tag: "verify" },
    ],
    contact: {
      eyebrow: "Contact",
      title: "把想法发给大毛同学",
      body:
        "表单会通过 SMTP 发送到配置的收件邮箱。你可以聊项目、页面、合作，也可以只发一个开头，我会认真看。",
      noteLabel: "Response",
      noteValue: "收到后尽快回复",
      form: {
        name: "你的名字",
        email: "邮箱地址",
        subject: "邮件主题",
        message: "内容",
        namePlaceholder: "比如：小林",
        subjectPlaceholder: "想聊聊一个页面、合作或普通交流",
        messagePlaceholder: "写下你想说的事，我会认真看。",
        submitIdle: "发送邮件",
        submitSending: "发送中...",
        requiredName: "请填写你的名字",
        requiredEmail: "请填写邮箱地址",
        invalidEmail: "邮箱格式不正确",
        requiredSubject: "请填写邮件主题",
        requiredMessage: "请写下想说的内容",
        completeForm: "请先补全表单内容。",
        sendFailed: "邮件发送失败，请稍后再试。",
        sent: "邮件已发送，我会尽快回复你。",
        networkError: "网络暂时不稳定，请稍后再试。",
      },
    },
  },
  "zh-HK": {
    nav: {
      aria: "主導覽",
      home: "回到首頁",
      brand: "大毛同學",
      work: "能力",
      contact: "聯絡",
      language: "切換語言",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "大毛同學",
      lede:
        "我喜歡把複雜問題拆開，把介面做得清楚，把程式碼寫到以後仍願意維護。這裡不是一張名片，而是一張正在工作的工程師桌面。",
      primary: "給我發郵件",
      secondary: "看看我怎樣做事",
      workspaceLabel: "工作區",
      workspaceStatus: "狀態：就緒",
      terminalHost: "da-mao.local",
      terminalLabel: "建置紀錄",
      buildLog,
      signals: ["需求先落地成結構", "介面兼顧審美和可用性", "交付前跑測試和建置"],
    },
    stack,
    work: {
      eyebrow: "工作方式",
      title: "工程師的水平，應該體現在細節裡",
      body:
        "好看的頁面不是裝飾堆出來的，而是資訊層級、互動回饋、工程結構一起站住。",
    },
    capabilities: [
      {
        label: "前端",
        title: "把體驗做到可用、耐看、能維護",
        body:
          "關注元件邊界、響應式版面、表單狀態、細節回饋，也在意頁面第一眼的專業感。",
      },
      {
        label: "產品",
        title: "先想清楚問題，再寫漂亮程式碼",
        body:
          "不急著堆功能，先把目標、使用者路徑和關鍵取捨講明白，讓實作更穩。",
      },
      {
        label: "交付",
        title: "從想法到上線，少繞路",
        body: "能把需求拆成可執行步驟，寫出清晰結構，並用測試和建置結果兜底。",
      },
    ],
    principlesIntro: {
      eyebrow: "作業系統",
      title: "我的預設工作方式",
      body: "不靠玄學審美，也不靠臨時發揮。每次做頁面，我會把判斷標準寫進流程裡。",
      statusLabel: "系統狀態",
      statusValue: "穩定",
    },
    principles: [
      { title: "可讀性優先", body: "變數、元件、檔案結構都要讓下一次修改更省力。", tag: "維護" },
      { title: "介面邊界清楚", body: "把輸入、輸出和失敗狀態說清楚，減少隱形耦合。", tag: "契約" },
      { title: "回饋及時明確", body: "按鈕、表單、錯誤提示都要讓使用者知道發生了什麼。", tag: "回饋" },
      { title: "行動端不將就", body: "小螢幕不是壓縮桌面，而是重新整理優先級。", tag: "響應式" },
      { title: "上線前先驗證", body: "用測試、建置和真實預覽確認它確實能工作。", tag: "驗證" },
    ],
    contact: {
      eyebrow: "聯絡",
      title: "把想法發給大毛同學",
      body:
        "表單會透過 SMTP 發送到配置的收件信箱。你可以聊專案、頁面、合作，也可以只發一個開頭，我會認真看。",
      noteLabel: "回覆",
      noteValue: "收到後盡快回覆",
      form: {
        name: "你的名字",
        email: "信箱地址",
        subject: "郵件主旨",
        message: "內容",
        namePlaceholder: "例如：小林",
        subjectPlaceholder: "想聊聊一個頁面、合作或普通交流",
        messagePlaceholder: "寫下你想說的事，我會認真看。",
        submitIdle: "發送郵件",
        submitSending: "發送中...",
        requiredName: "請填寫你的名字",
        requiredEmail: "請填寫信箱地址",
        invalidEmail: "信箱格式不正確",
        requiredSubject: "請填寫郵件主旨",
        requiredMessage: "請寫下想說的內容",
        completeForm: "請先補全表單內容。",
        sendFailed: "郵件發送失敗，請稍後再試。",
        sent: "郵件已發送，我會盡快回覆你。",
        networkError: "網路暫時不穩定，請稍後再試。",
      },
    },
  },
  en: {
    nav: {
      aria: "Main navigation",
      home: "Back to home",
      brand: "Da Mao",
      work: "Work",
      contact: "Contact",
      language: "Change language",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Da Mao",
      lede:
        "I like breaking complex problems into clear parts, shaping interfaces people can understand, and writing code that remains pleasant to maintain.",
      primary: "Email me",
      secondary: "See how I work",
      workspaceLabel: "workspace",
      workspaceStatus: "status: ready",
      terminalHost: "da-mao.local",
      terminalLabel: "build log",
      buildLog,
      signals: ["Requirements become structure", "Usability meets visual care", "Tests and builds before delivery"],
    },
    stack,
    work: {
      eyebrow: "How I Work",
      title: "Engineering quality should show up in the details",
      body: "A good page is not decoration piled on top. It is hierarchy, feedback, and engineering structure working together.",
    },
    capabilities: [
      { label: "Frontend", title: "Usable, durable, maintainable experiences", body: "I care about component boundaries, responsive layouts, form states, feedback, and the professional feeling of the first glance." },
      { label: "Product", title: "Understand the problem before polishing the code", body: "I clarify goals, user paths, and trade-offs before adding features, so implementation lands more steadily." },
      { label: "Delivery", title: "From idea to launch with fewer detours", body: "I turn requirements into executable steps, clear structure, and verification through tests and builds." },
    ],
    principlesIntro: {
      eyebrow: "Operating System",
      title: "My default way of working",
      body: "I do not rely on mystical taste or last-minute improvisation. I put judgment criteria into the process.",
      statusLabel: "system health",
      statusValue: "stable",
    },
    principles: [
      { title: "Readability first", body: "Names, components, and file structure should make the next change easier.", tag: "maintain" },
      { title: "Clear interfaces", body: "Inputs, outputs, and failure states should be explicit.", tag: "contract" },
      { title: "Timely feedback", body: "Buttons, forms, and errors should tell users what happened.", tag: "feedback" },
      { title: "Mobile is first-class", body: "Small screens need reordered priorities, not compressed desktop layouts.", tag: "responsive" },
      { title: "Verify before launch", body: "Tests, builds, and real previews confirm that the page works.", tag: "verify" },
    ],
    contact: {
      eyebrow: "Contact",
      title: "Send your idea to Da Mao",
      body: "The form sends mail through SMTP to the configured inbox. Projects, pages, collaborations, or a simple hello are all welcome.",
      noteLabel: "Response",
      noteValue: "I will reply soon",
      form: {
        name: "Your name",
        email: "Email address",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "e.g. Lin",
        subjectPlaceholder: "A page, collaboration, or quick hello",
        messagePlaceholder: "Write what you want to share. I will read it carefully.",
        submitIdle: "Send email",
        submitSending: "Sending...",
        requiredName: "Please enter your name",
        requiredEmail: "Please enter your email",
        invalidEmail: "Email format is invalid",
        requiredSubject: "Please enter a subject",
        requiredMessage: "Please write your message",
        completeForm: "Please complete the form first.",
        sendFailed: "Email failed to send. Please try again later.",
        sent: "Email sent. I will reply soon.",
        networkError: "The network is unstable. Please try again later.",
      },
    },
  },
  ja: {
    nav: {
      aria: "メインナビゲーション",
      home: "ホームへ戻る",
      brand: "大毛同学",
      work: "できること",
      contact: "連絡",
      language: "言語を切り替え",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "大毛同学",
      lede:
        "複雑な問題を分解し、わかりやすい画面を作り、あとから保守しやすいコードを書くことが好きです。ここは名刺ではなく、作業中のエンジニアのデスクです。",
      primary: "メールする",
      secondary: "働き方を見る",
      workspaceLabel: "ワークスペース",
      workspaceStatus: "状態：準備完了",
      terminalHost: "da-mao.local",
      terminalLabel: "ビルドログ",
      buildLog,
      signals: ["要件を構造に落とす", "美しさと使いやすさを両立", "納品前にテストとビルド"],
    },
    stack,
    work: {
      eyebrow: "仕事の進め方",
      title: "エンジニアリングの質は細部に表れる",
      body: "良いページは装飾ではなく、情報設計、操作フィードバック、実装構造が一体になって支えます。",
    },
    capabilities: [
      { label: "フロントエンド", title: "使いやすく、見やすく、保守できる体験", body: "コンポーネントの境界、レスポンシブレイアウト、フォーム状態、細かな反応、最初に伝わる専門性を大切にします。" },
      { label: "プロダクト", title: "きれいなコードの前に問題を理解する", body: "機能を急いで積むのではなく、目的、ユーザー導線、重要な判断を先に明確にします。" },
      { label: "デリバリー", title: "アイデアから公開まで遠回りを減らす", body: "要件を実行可能な手順に分け、明確な構造を書き、テストとビルドで確認します。" },
    ],
    principlesIntro: {
      eyebrow: "行動原則",
      title: "私の基本的な働き方",
      body: "感覚だけの美意識やその場のひらめきに頼りません。ページを作るたび、判断基準を流れの中に入れます。",
      statusLabel: "システム状態",
      statusValue: "安定",
    },
    principles: [
      { title: "可読性を優先", body: "変数、コンポーネント、ファイル構造は次の変更を楽にするべきです。", tag: "保守" },
      { title: "境界を明確にする", body: "入力、出力、失敗状態を明確にして、見えない結合を減らします。", tag: "契約" },
      { title: "反応は早く明確に", body: "ボタン、フォーム、エラー表示は何が起きたかを伝える必要があります。", tag: "反応" },
      { title: "モバイルも妥協しない", body: "小さな画面はデスクトップの圧縮ではなく、優先順位の再整理です。", tag: "レスポンシブ" },
      { title: "公開前に検証", body: "テスト、ビルド、実機プレビューで本当に動くことを確認します。", tag: "検証" },
    ],
    contact: {
      eyebrow: "連絡",
      title: "アイデアを大毛同学へ送る",
      body: "フォームは SMTP を通じて設定済みの受信箱へ送信されます。プロジェクト、ページ、協業、短い挨拶でも歓迎です。",
      noteLabel: "返信",
      noteValue: "できるだけ早く返信します",
      form: {
        name: "お名前",
        email: "メールアドレス",
        subject: "件名",
        message: "内容",
        namePlaceholder: "例：林さん",
        subjectPlaceholder: "ページ、協業、または簡単な相談",
        messagePlaceholder: "伝えたいことを書いてください。丁寧に読みます。",
        submitIdle: "メールを送信",
        submitSending: "送信中...",
        requiredName: "お名前を入力してください",
        requiredEmail: "メールアドレスを入力してください",
        invalidEmail: "メール形式が正しくありません",
        requiredSubject: "件名を入力してください",
        requiredMessage: "内容を入力してください",
        completeForm: "フォームを先に入力してください。",
        sendFailed: "メール送信に失敗しました。後でもう一度お試しください。",
        sent: "メールを送信しました。できるだけ早く返信します。",
        networkError: "ネットワークが一時的に不安定です。後でもう一度お試しください。",
      },
    },
  },
  ko: {
    nav: {
      aria: "기본 내비게이션",
      home: "홈으로 돌아가기",
      brand: "대모 동학",
      work: "역량",
      contact: "연락",
      language: "언어 변경",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "대모 동학",
      lede:
        "복잡한 문제를 나누고, 명확한 화면을 만들고, 나중에도 유지하기 좋은 코드를 쓰는 일을 좋아합니다. 이곳은 명함이 아니라 일하는 엔지니어의 책상입니다.",
      primary: "메일 보내기",
      secondary: "작업 방식 보기",
      workspaceLabel: "작업 공간",
      workspaceStatus: "상태: 준비됨",
      terminalHost: "da-mao.local",
      terminalLabel: "빌드 로그",
      buildLog,
      signals: ["요구사항을 구조로 정리", "미감과 사용성을 함께 고려", "전달 전 테스트와 빌드"],
    },
    stack,
    work: {
      eyebrow: "작업 방식",
      title: "엔지니어의 수준은 디테일에 드러납니다",
      body: "좋은 페이지는 장식이 아니라 정보 구조, 상호작용 피드백, 엔지니어링 구조가 함께 서 있는 결과입니다.",
    },
    capabilities: [
      { label: "프론트엔드", title: "쓸 수 있고 보기 좋으며 유지보수 가능한 경험", body: "컴포넌트 경계, 반응형 레이아웃, 폼 상태, 세밀한 피드백, 첫인상의 전문성을 중요하게 봅니다." },
      { label: "제품", title: "예쁜 코드보다 먼저 문제를 이해합니다", body: "기능을 서둘러 쌓기보다 목표, 사용자 흐름, 핵심 선택을 먼저 명확히 해서 구현을 더 안정적으로 만듭니다." },
      { label: "전달", title: "아이디어에서 출시까지 돌아가는 길을 줄입니다", body: "요구사항을 실행 가능한 단계로 나누고, 명확한 구조를 만들며, 테스트와 빌드로 확인합니다." },
    ],
    principlesIntro: {
      eyebrow: "운영 방식",
      title: "나의 기본 작업 방식",
      body: "감각적인 취향이나 즉흥에 기대지 않습니다. 페이지를 만들 때마다 판단 기준을 과정 안에 넣습니다.",
      statusLabel: "시스템 상태",
      statusValue: "안정",
    },
    principles: [
      { title: "가독성 우선", body: "변수, 컴포넌트, 파일 구조는 다음 수정을 더 쉽게 만들어야 합니다.", tag: "유지보수" },
      { title: "명확한 경계", body: "입력, 출력, 실패 상태를 분명히 하여 숨은 결합을 줄입니다.", tag: "계약" },
      { title: "빠르고 명확한 피드백", body: "버튼, 폼, 오류 안내는 무슨 일이 일어났는지 알려야 합니다.", tag: "피드백" },
      { title: "모바일도 제대로", body: "작은 화면은 데스크톱을 압축하는 것이 아니라 우선순위를 다시 정리하는 것입니다.", tag: "반응형" },
      { title: "출시 전 검증", body: "테스트, 빌드, 실제 미리보기로 정말 동작하는지 확인합니다.", tag: "검증" },
    ],
    contact: {
      eyebrow: "연락",
      title: "아이디어를 대모 동학에게 보내 주세요",
      body: "폼은 SMTP를 통해 설정된 받은 편지함으로 전송됩니다. 프로젝트, 페이지, 협업, 짧은 인사도 모두 좋습니다.",
      noteLabel: "응답",
      noteValue: "받는 대로 빠르게 답장하겠습니다",
      form: {
        name: "이름",
        email: "이메일 주소",
        subject: "메일 제목",
        message: "내용",
        namePlaceholder: "예: 린",
        subjectPlaceholder: "페이지, 협업 또는 간단한 인사",
        messagePlaceholder: "전하고 싶은 내용을 적어 주세요. 꼼꼼히 읽겠습니다.",
        submitIdle: "메일 보내기",
        submitSending: "보내는 중...",
        requiredName: "이름을 입력해 주세요",
        requiredEmail: "이메일 주소를 입력해 주세요",
        invalidEmail: "이메일 형식이 올바르지 않습니다",
        requiredSubject: "메일 제목을 입력해 주세요",
        requiredMessage: "내용을 입력해 주세요",
        completeForm: "먼저 폼을 완성해 주세요.",
        sendFailed: "메일 전송에 실패했습니다. 나중에 다시 시도해 주세요.",
        sent: "메일을 보냈습니다. 곧 답장하겠습니다.",
        networkError: "네트워크가 일시적으로 불안정합니다. 나중에 다시 시도해 주세요.",
      },
    },
  },
  fr: {
    nav: {
      aria: "Navigation principale",
      home: "Retour à l'accueil",
      brand: "Da Mao",
      work: "Compétences",
      contact: "Contact",
      language: "Changer de langue",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Da Mao",
      lede:
        "J'aime découper les problèmes complexes, créer des interfaces claires et écrire du code agréable à maintenir. Ce n'est pas une carte de visite, mais le bureau d'un ingénieur au travail.",
      primary: "M'envoyer un e-mail",
      secondary: "Voir ma méthode",
      workspaceLabel: "espace de travail",
      workspaceStatus: "statut : prêt",
      terminalHost: "da-mao.local",
      terminalLabel: "journal de build",
      buildLog,
      signals: ["Les besoins deviennent une structure", "Clarté visuelle et utilisabilité", "Tests et build avant livraison"],
    },
    stack,
    work: {
      eyebrow: "Ma méthode",
      title: "La qualité d'un ingénieur se voit dans les détails",
      body: "Une bonne page ne repose pas sur la décoration, mais sur la hiérarchie, le retour utilisateur et une structure technique solide.",
    },
    capabilities: [
      { label: "Frontend", title: "Des expériences utiles, élégantes et maintenables", body: "Je soigne les frontières de composants, les mises en page responsives, les états de formulaire, les retours précis et l'impression professionnelle dès le premier regard." },
      { label: "Produit", title: "Comprendre le problème avant de polir le code", body: "Je clarifie les objectifs, les parcours utilisateurs et les compromis clés avant d'ajouter des fonctionnalités." },
      { label: "Livraison", title: "De l'idée à la mise en ligne avec moins de détours", body: "Je transforme les besoins en étapes exécutables, en structure lisible et en vérification par tests et builds." },
    ],
    principlesIntro: {
      eyebrow: "Système de travail",
      title: "Ma façon de travailler par défaut",
      body: "Je ne m'appuie ni sur le goût mystique ni sur l'improvisation. J'intègre les critères de jugement dans le processus.",
      statusLabel: "état du système",
      statusValue: "stable",
    },
    principles: [
      { title: "Lisibilité d'abord", body: "Les noms, composants et fichiers doivent rendre la prochaine modification plus simple.", tag: "maintenance" },
      { title: "Interfaces claires", body: "Les entrées, sorties et échecs doivent être explicites.", tag: "contrat" },
      { title: "Retours rapides", body: "Boutons, formulaires et erreurs doivent expliquer ce qui se passe.", tag: "retour" },
      { title: "Mobile sans compromis", body: "Un petit écran demande une nouvelle priorité, pas un bureau compressé.", tag: "responsive" },
      { title: "Vérifier avant lancement", body: "Tests, builds et aperçu réel confirment que la page fonctionne.", tag: "vérifier" },
    ],
    contact: {
      eyebrow: "Contact",
      title: "Envoyez votre idée à Da Mao",
      body: "Le formulaire envoie le message via SMTP vers la boîte configurée. Projets, pages, collaborations ou simple bonjour sont bienvenus.",
      noteLabel: "Réponse",
      noteValue: "Je répondrai bientôt",
      form: {
        name: "Votre nom",
        email: "Adresse e-mail",
        subject: "Objet",
        message: "Message",
        namePlaceholder: "ex. Lin",
        subjectPlaceholder: "Une page, une collaboration ou un bonjour",
        messagePlaceholder: "Écrivez ce que vous voulez partager. Je le lirai attentivement.",
        submitIdle: "Envoyer l'e-mail",
        submitSending: "Envoi...",
        requiredName: "Veuillez saisir votre nom",
        requiredEmail: "Veuillez saisir votre e-mail",
        invalidEmail: "Le format de l'e-mail est invalide",
        requiredSubject: "Veuillez saisir un objet",
        requiredMessage: "Veuillez écrire votre message",
        completeForm: "Veuillez d'abord compléter le formulaire.",
        sendFailed: "L'e-mail n'a pas pu être envoyé. Réessayez plus tard.",
        sent: "E-mail envoyé. Je répondrai bientôt.",
        networkError: "Le réseau est instable. Réessayez plus tard.",
      },
    },
  },
  es: {
    nav: {
      aria: "Navegación principal",
      home: "Volver al inicio",
      brand: "Da Mao",
      work: "Capacidades",
      contact: "Contacto",
      language: "Cambiar idioma",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Da Mao",
      lede:
        "Me gusta dividir problemas complejos, crear interfaces claras y escribir código fácil de mantener. Esto no es una tarjeta: es el escritorio de un ingeniero trabajando.",
      primary: "Enviarme un correo",
      secondary: "Ver cómo trabajo",
      workspaceLabel: "espacio de trabajo",
      workspaceStatus: "estado: listo",
      terminalHost: "da-mao.local",
      terminalLabel: "registro de build",
      buildLog,
      signals: ["Requisitos convertidos en estructura", "Usabilidad y criterio visual", "Pruebas y compilación antes de entregar"],
    },
    stack,
    work: {
      eyebrow: "Cómo trabajo",
      title: "La calidad de ingeniería vive en los detalles",
      body: "Una buena página no nace de acumular decoración, sino de unir jerarquía, retroalimentación e ingeniería sólida.",
    },
    capabilities: [
      { label: "Frontend", title: "Experiencias útiles, agradables y mantenibles", body: "Cuido límites de componentes, diseño adaptable, estados de formularios, respuestas claras y una primera impresión profesional." },
      { label: "Producto", title: "Entender el problema antes de pulir el código", body: "Aclaro objetivos, recorridos de usuario y decisiones clave antes de agregar funciones." },
      { label: "Entrega", title: "De la idea al lanzamiento con menos desvíos", body: "Convierto requisitos en pasos ejecutables, estructura clara y verificación con pruebas y builds." },
    ],
    principlesIntro: {
      eyebrow: "Sistema operativo",
      title: "Mi forma predeterminada de trabajar",
      body: "No dependo de gustos misteriosos ni de improvisación. Pongo los criterios de decisión dentro del proceso.",
      statusLabel: "estado del sistema",
      statusValue: "estable",
    },
    principles: [
      { title: "Legibilidad primero", body: "Nombres, componentes y archivos deben facilitar el próximo cambio.", tag: "mantener" },
      { title: "Interfaces claras", body: "Entradas, salidas y fallos deben ser explícitos.", tag: "contrato" },
      { title: "Respuesta oportuna", body: "Botones, formularios y errores deben explicar qué ocurrió.", tag: "respuesta" },
      { title: "Móvil sin atajos", body: "Una pantalla pequeña reorganiza prioridades, no comprime el escritorio.", tag: "adaptable" },
      { title: "Verificar antes de lanzar", body: "Pruebas, builds y vista real confirman que funciona.", tag: "verificar" },
    ],
    contact: {
      eyebrow: "Contacto",
      title: "Envía tu idea a Da Mao",
      body: "El formulario envía el mensaje con SMTP al buzón configurado. Proyectos, páginas, colaboraciones o un simple saludo son bienvenidos.",
      noteLabel: "Respuesta",
      noteValue: "Responderé pronto",
      form: {
        name: "Tu nombre",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        namePlaceholder: "por ejemplo: Lin",
        subjectPlaceholder: "Una página, colaboración o saludo",
        messagePlaceholder: "Escribe lo que quieres compartir. Lo leeré con atención.",
        submitIdle: "Enviar correo",
        submitSending: "Enviando...",
        requiredName: "Introduce tu nombre",
        requiredEmail: "Introduce tu correo",
        invalidEmail: "El formato del correo no es válido",
        requiredSubject: "Introduce un asunto",
        requiredMessage: "Escribe tu mensaje",
        completeForm: "Completa primero el formulario.",
        sendFailed: "No se pudo enviar el correo. Inténtalo más tarde.",
        sent: "Correo enviado. Responderé pronto.",
        networkError: "La red está inestable. Inténtalo más tarde.",
      },
    },
  },
  de: {
    nav: {
      aria: "Hauptnavigation",
      home: "Zur Startseite",
      brand: "Da Mao",
      work: "Fähigkeiten",
      contact: "Kontakt",
      language: "Sprache wechseln",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Da Mao",
      lede:
        "Ich zerlege komplexe Probleme gern, gestalte klare Oberflächen und schreibe Code, der wartbar bleibt. Das ist keine Visitenkarte, sondern der Arbeitstisch eines Engineers.",
      primary: "E-Mail senden",
      secondary: "Arbeitsweise ansehen",
      workspaceLabel: "Arbeitsbereich",
      workspaceStatus: "Status: bereit",
      terminalHost: "da-mao.local",
      terminalLabel: "Build-Protokoll",
      buildLog,
      signals: ["Anforderungen werden Struktur", "Nutzbarkeit und Gestaltung", "Tests und Build vor Lieferung"],
    },
    stack,
    work: {
      eyebrow: "Arbeitsweise",
      title: "Technische Qualität zeigt sich im Detail",
      body: "Eine gute Seite entsteht nicht durch Dekoration, sondern durch Hierarchie, Feedback und saubere technische Struktur.",
    },
    capabilities: [
      { label: "Frontend", title: "Nutzbare, elegante und wartbare Erlebnisse", body: "Ich achte auf Komponenten-Grenzen, responsive Layouts, Formularzustände, klare Rückmeldungen und einen professionellen ersten Eindruck." },
      { label: "Produkt", title: "Das Problem verstehen, bevor der Code glänzt", body: "Ich kläre Ziele, Nutzerwege und wichtige Kompromisse, bevor Funktionen hinzukommen." },
      { label: "Lieferung", title: "Von der Idee zum Launch mit weniger Umwegen", body: "Ich mache Anforderungen zu ausführbaren Schritten, klarer Struktur und überprüfbaren Tests und Builds." },
    ],
    principlesIntro: {
      eyebrow: "Betriebssystem",
      title: "Meine Standard-Arbeitsweise",
      body: "Ich verlasse mich nicht auf mystischen Geschmack oder Improvisation. Entscheidungskriterien gehören in den Prozess.",
      statusLabel: "Systemzustand",
      statusValue: "stabil",
    },
    principles: [
      { title: "Lesbarkeit zuerst", body: "Namen, Komponenten und Dateien sollen die nächste Änderung leichter machen.", tag: "Wartung" },
      { title: "Klare Schnittstellen", body: "Eingaben, Ausgaben und Fehlerzustände müssen eindeutig sein.", tag: "Vertrag" },
      { title: "Schnelles Feedback", body: "Buttons, Formulare und Fehler sollen erklären, was passiert ist.", tag: "Feedback" },
      { title: "Mobile ohne Kompromiss", body: "Kleine Bildschirme brauchen neue Prioritäten, keinen komprimierten Desktop.", tag: "responsive" },
      { title: "Vor dem Launch prüfen", body: "Tests, Builds und echte Vorschau bestätigen, dass es funktioniert.", tag: "prüfen" },
    ],
    contact: {
      eyebrow: "Kontakt",
      title: "Sende deine Idee an Da Mao",
      body: "Das Formular sendet die Nachricht über SMTP an das konfigurierte Postfach. Projekte, Seiten, Kooperationen oder ein kurzes Hallo sind willkommen.",
      noteLabel: "Antwort",
      noteValue: "Ich antworte bald",
      form: {
        name: "Dein Name",
        email: "E-Mail-Adresse",
        subject: "Betreff",
        message: "Nachricht",
        namePlaceholder: "z. B. Lin",
        subjectPlaceholder: "Eine Seite, Zusammenarbeit oder ein kurzes Hallo",
        messagePlaceholder: "Schreib, was du teilen möchtest. Ich lese es aufmerksam.",
        submitIdle: "E-Mail senden",
        submitSending: "Wird gesendet...",
        requiredName: "Bitte gib deinen Namen ein",
        requiredEmail: "Bitte gib deine E-Mail ein",
        invalidEmail: "Das E-Mail-Format ist ungültig",
        requiredSubject: "Bitte gib einen Betreff ein",
        requiredMessage: "Bitte schreibe deine Nachricht",
        completeForm: "Bitte fülle zuerst das Formular aus.",
        sendFailed: "E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen.",
        sent: "E-Mail gesendet. Ich antworte bald.",
        networkError: "Das Netzwerk ist instabil. Bitte später erneut versuchen.",
      },
    },
  },
  ru: {
    nav: {
      aria: "Главная навигация",
      home: "Вернуться на главную",
      brand: "Да Мао",
      work: "Навыки",
      contact: "Контакты",
      language: "Сменить язык",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Да Мао",
      lede:
        "Мне нравится разбирать сложные задачи, делать понятные интерфейсы и писать код, который удобно поддерживать. Это не визитка, а рабочий стол инженера.",
      primary: "Написать письмо",
      secondary: "Как я работаю",
      workspaceLabel: "рабочая область",
      workspaceStatus: "статус: готово",
      terminalHost: "da-mao.local",
      terminalLabel: "журнал сборки",
      buildLog,
      signals: ["Требования превращаются в структуру", "Удобство и визуальная точность", "Тесты и сборка перед сдачей"],
    },
    stack,
    work: {
      eyebrow: "Как я работаю",
      title: "Качество инженера видно в деталях",
      body: "Хорошая страница держится не на декоре, а на иерархии, обратной связи и надежной инженерной структуре.",
    },
    capabilities: [
      { label: "Фронтенд", title: "Полезный, аккуратный и поддерживаемый опыт", body: "Я слежу за границами компонентов, адаптивной версткой, состояниями форм, точной обратной связью и профессиональным первым впечатлением." },
      { label: "Продукт", title: "Сначала понять проблему, потом полировать код", body: "Я уточняю цели, пути пользователя и ключевые компромиссы до добавления функций." },
      { label: "Поставка", title: "От идеи до запуска с меньшим количеством обходов", body: "Я превращаю требования в выполнимые шаги, понятную структуру и проверку тестами и сборкой." },
    ],
    principlesIntro: {
      eyebrow: "Рабочая система",
      title: "Мой стандартный способ работы",
      body: "Я не полагаюсь на мистический вкус или импровизацию. Критерии решения должны быть встроены в процесс.",
      statusLabel: "состояние системы",
      statusValue: "стабильно",
    },
    principles: [
      { title: "Сначала читаемость", body: "Имена, компоненты и структура файлов должны упрощать следующее изменение.", tag: "поддержка" },
      { title: "Ясные интерфейсы", body: "Входы, выходы и состояния ошибок должны быть явными.", tag: "контракт" },
      { title: "Быстрая обратная связь", body: "Кнопки, формы и ошибки должны объяснять, что произошло.", tag: "отклик" },
      { title: "Мобильный без компромиссов", body: "Малый экран требует новых приоритетов, а не сжатого десктопа.", tag: "адаптив" },
      { title: "Проверка перед запуском", body: "Тесты, сборка и реальный предпросмотр подтверждают, что все работает.", tag: "проверка" },
    ],
    contact: {
      eyebrow: "Контакты",
      title: "Отправьте идею Да Мао",
      body: "Форма отправляет сообщение через SMTP в настроенный почтовый ящик. Подойдут проекты, страницы, сотрудничество или простое приветствие.",
      noteLabel: "Ответ",
      noteValue: "Я скоро отвечу",
      form: {
        name: "Ваше имя",
        email: "Адрес электронной почты",
        subject: "Тема",
        message: "Сообщение",
        namePlaceholder: "например: Лин",
        subjectPlaceholder: "Страница, сотрудничество или короткое приветствие",
        messagePlaceholder: "Напишите, чем хотите поделиться. Я внимательно прочитаю.",
        submitIdle: "Отправить письмо",
        submitSending: "Отправка...",
        requiredName: "Введите ваше имя",
        requiredEmail: "Введите адрес электронной почты",
        invalidEmail: "Неверный формат электронной почты",
        requiredSubject: "Введите тему",
        requiredMessage: "Напишите сообщение",
        completeForm: "Сначала заполните форму.",
        sendFailed: "Не удалось отправить письмо. Попробуйте позже.",
        sent: "Письмо отправлено. Я скоро отвечу.",
        networkError: "Сеть временно нестабильна. Попробуйте позже.",
      },
    },
  },
  vi: {
    nav: {
      aria: "Điều hướng chính",
      home: "Về trang đầu",
      brand: "Đại Mao",
      work: "Năng lực",
      contact: "Liên hệ",
      language: "Đổi ngôn ngữ",
    },
    hero: {
      eyebrow: "Engineer / Builder / Classmate",
      title: "Đại Mao",
      lede:
        "Tôi thích tách vấn đề phức tạp, làm giao diện rõ ràng và viết mã dễ bảo trì về sau. Đây không phải là danh thiếp, mà là bàn làm việc của một kỹ sư.",
      primary: "Gửi email",
      secondary: "Xem cách tôi làm việc",
      workspaceLabel: "không gian làm việc",
      workspaceStatus: "trạng thái: sẵn sàng",
      terminalHost: "da-mao.local",
      terminalLabel: "nhật ký build",
      buildLog,
      signals: ["Yêu cầu thành cấu trúc", "Thẩm mỹ đi cùng khả dụng", "Kiểm thử và build trước khi giao"],
    },
    stack,
    work: {
      eyebrow: "Cách tôi làm việc",
      title: "Chất lượng kỹ sư nằm trong từng chi tiết",
      body: "Một trang tốt không đến từ trang trí, mà từ phân cấp thông tin, phản hồi tương tác và cấu trúc kỹ thuật vững.",
    },
    capabilities: [
      { label: "Giao diện", title: "Trải nghiệm dùng được, đẹp lâu và dễ bảo trì", body: "Tôi chú ý ranh giới component, bố cục responsive, trạng thái form, phản hồi chi tiết và cảm giác chuyên nghiệp từ cái nhìn đầu tiên." },
      { label: "Sản phẩm", title: "Hiểu rõ vấn đề trước khi làm đẹp mã", body: "Tôi làm rõ mục tiêu, đường đi của người dùng và các đánh đổi quan trọng trước khi thêm chức năng." },
      { label: "Bàn giao", title: "Từ ý tưởng đến ra mắt ít vòng vèo hơn", body: "Tôi tách yêu cầu thành các bước thực thi, cấu trúc rõ ràng và xác nhận bằng test cùng build." },
    ],
    principlesIntro: {
      eyebrow: "Hệ điều hành",
      title: "Cách làm việc mặc định của tôi",
      body: "Tôi không dựa vào gu thẩm mỹ mơ hồ hay ứng biến nhất thời. Mỗi lần làm trang, tôi đưa tiêu chí đánh giá vào quy trình.",
      statusLabel: "sức khỏe hệ thống",
      statusValue: "ổn định",
    },
    principles: [
      { title: "Ưu tiên dễ đọc", body: "Tên biến, component và cấu trúc file phải giúp lần sửa tiếp theo nhẹ hơn.", tag: "bảo trì" },
      { title: "Ranh giới rõ ràng", body: "Đầu vào, đầu ra và trạng thái lỗi cần được nói rõ.", tag: "hợp đồng" },
      { title: "Phản hồi kịp thời", body: "Nút, form và lỗi phải cho người dùng biết điều gì đã xảy ra.", tag: "phản hồi" },
      { title: "Không xem nhẹ mobile", body: "Màn hình nhỏ là sắp xếp lại ưu tiên, không phải nén desktop.", tag: "responsive" },
      { title: "Xác minh trước khi ra mắt", body: "Test, build và xem trước thật xác nhận trang thực sự hoạt động.", tag: "xác minh" },
    ],
    contact: {
      eyebrow: "Liên hệ",
      title: "Gửi ý tưởng cho Đại Mao",
      body: "Form sẽ gửi qua SMTP đến hộp thư đã cấu hình. Bạn có thể nói về dự án, trang web, hợp tác hoặc chỉ gửi một lời chào.",
      noteLabel: "Phản hồi",
      noteValue: "Tôi sẽ phản hồi sớm",
      form: {
        name: "Tên của bạn",
        email: "Địa chỉ email",
        subject: "Chủ đề",
        message: "Nội dung",
        namePlaceholder: "ví dụ: Lin",
        subjectPlaceholder: "Một trang, hợp tác hoặc lời chào nhanh",
        messagePlaceholder: "Viết điều bạn muốn chia sẻ. Tôi sẽ đọc kỹ.",
        submitIdle: "Gửi email",
        submitSending: "Đang gửi...",
        requiredName: "Vui lòng nhập tên của bạn",
        requiredEmail: "Vui lòng nhập email",
        invalidEmail: "Định dạng email không hợp lệ",
        requiredSubject: "Vui lòng nhập chủ đề",
        requiredMessage: "Vui lòng viết nội dung",
        completeForm: "Vui lòng hoàn thành form trước.",
        sendFailed: "Gửi email thất bại. Vui lòng thử lại sau.",
        sent: "Email đã được gửi. Tôi sẽ phản hồi sớm.",
        networkError: "Mạng tạm thời không ổn định. Vui lòng thử lại sau.",
      },
    },
  },
};

export function getLocale(code: string): LocaleCode {
  return LOCALES.some((locale) => locale.code === code)
    ? (code as LocaleCode)
    : DEFAULT_LOCALE;
}
