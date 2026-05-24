import { ContactForm } from "../components/ContactForm";

const capabilities = [
  {
    label: "Frontend",
    title: "把体验做到可用、耐看、能维护",
    body: "关注组件边界、响应式布局、表单状态、细节反馈，也在意页面第一眼给人的专业感。",
  },
  {
    label: "Product",
    title: "先想清楚问题，再写漂亮代码",
    body: "不急着堆功能，先把目标、用户路径和关键取舍讲明白，让实现更稳。",
  },
  {
    label: "Delivery",
    title: "从想法到上线，少绕路",
    body: "能把需求拆成可执行步骤，写出清晰结构，并用测试和构建结果兜底。",
  },
];

const principles = [
  {
    title: "可读性优先",
    body: "变量、组件、文件结构都要让下一次修改更省力。",
    tag: "maintain",
  },
  {
    title: "接口边界清楚",
    body: "把输入、输出和失败状态说清楚，减少隐形耦合。",
    tag: "contract",
  },
  {
    title: "反馈及时明确",
    body: "按钮、表单、错误提示都要让用户知道发生了什么。",
    tag: "feedback",
  },
  {
    title: "移动端不将就",
    body: "小屏幕不是压缩桌面，而是重新整理优先级。",
    tag: "responsive",
  },
  {
    title: "上线前先验证",
    body: "用测试、构建和真实预览确认它确实能工作。",
    tag: "verify",
  },
];

const stack = ["Next.js", "TypeScript", "React", "API Routes", "Resend", "CSS"];

export default function Home() {
  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="主导航">
          <a className="brand" href="#hero-title" aria-label="回到首页">
            <span className="brand-logo" aria-hidden="true">
              <img
                src="https://q1.qlogo.cn/g?b=qq&nk=2041226489&s=100"
                alt=""
              />
            </span>
            <span className="brand-copy">
              <strong>大毛同学</strong>
              <small>Engineer workspace</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#work">能力</a>
            <a className="nav-contact" href="#contact">
              联系
            </a>
          </div>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Engineer / Builder / Classmate</p>
            <h1 id="hero-title">大毛同学</h1>
            <p className="hero-lede">
              我喜欢把复杂问题拆开，把界面做得清楚，把代码写到以后还愿意维护。
              这里不是一张名片，而是一张正在工作的工程师桌面。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                给我发邮件
              </a>
              <a className="secondary-button" href="#work">
                看看我怎么做事
              </a>
            </div>
            <div className="stack-row" aria-label="技术栈">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="workspace-panel" aria-label="工程师工作台预览">
            <div className="workspace-topline">
              <span>workspace</span>
              <span>status: ready</span>
            </div>
            <div className="terminal-panel">
              <div className="terminal-header">
                <span>da-mao.local</span>
                <span>build log</span>
              </div>
              <pre>
                <code>{`$ npm run build
✓ compiled successfully
✓ typecheck passed
✓ contact api wired

ship_when_ready({
  taste: "clean",
  detail: "sharp",
  fallback: "clear"
})`}</code>
              </pre>
            </div>
            <div className="signal-grid">
              <div>
                <span className="metric">01</span>
                <p>需求先落地成结构</p>
              </div>
              <div>
                <span className="metric">02</span>
                <p>界面兼顾审美和可用性</p>
              </div>
              <div>
                <span className="metric">03</span>
                <p>交付前跑测试和构建</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">How I Work</p>
          <h2 id="work-title">工程师的水平，应该体现在细节里</h2>
          <p>
            好看的页面不是装饰堆出来的，而是信息层级、交互反馈、工程结构一起站住。
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div className="principles-copy">
          <p className="eyebrow">Operating System</p>
          <h2 id="principles-title">我的默认工作方式</h2>
          <p>
            不靠玄学审美，也不靠临时发挥。每次做页面，我会把判断标准写进流程里。
          </p>
          <div className="system-status">
            <span>system health</span>
            <strong>stable</strong>
          </div>
        </div>
        <div className="principle-list">
          {principles.map((item, index) => (
            <article className="principle-card" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <strong>{item.tag}</strong>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">把想法发给大毛同学</h2>
          <p>
            表单会通过 Resend 发送到配置的收件邮箱。你可以聊项目、页面、合作，
            也可以只发一个开头，我会认真看。
          </p>
          <div className="contact-note">
            <span>Response</span>
            <strong>收到后尽快回复</strong>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
