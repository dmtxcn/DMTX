"use client";

import { useEffect, useState } from "react";

import { ContactForm } from "../components/ContactForm";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { DEFAULT_LOCALE, getLocale, LocaleCode, pageTranslations } from "../lib/i18n";

export default function Home() {
  const [locale, setLocale] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [copiedContact, setCopiedContact] = useState<"wechat" | "qq" | null>(
    null,
  );
  const copy = pageTranslations[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("preferred-locale");
    if (savedLocale) {
      setLocale(getLocale(savedLocale));
    }
  }, []);

  useEffect(() => {
    function handleNativeCopy(event: MouseEvent) {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLButtonElement>("[data-copy-contact]");
      if (!button) return;

      const type = button.dataset.copyContact as "wechat" | "qq" | undefined;
      const value = button.dataset.copyValue;
      if (!type || !value) return;

      handleContactCopy(value, type);
    }

    document.addEventListener("click", handleNativeCopy);
    return () => document.removeEventListener("click", handleNativeCopy);
  }, []);

  function changeLocale(nextLocale: LocaleCode) {
    setLocale(nextLocale);
    window.localStorage.setItem("preferred-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  }

  function handleContactCopy(value: string, type: "wechat" | "qq") {
    setCopiedContact(type);
    window.setTimeout(() => setCopiedContact(null), 1600);
    void copyContact(value);
  }

  async function copyContact(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  }

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <nav className="topbar" aria-label={copy.nav.aria}>
          <a className="brand" href="#hero-title" aria-label={copy.nav.home}>
            <span className="brand-logo" aria-hidden="true">
              <img
                src="https://q1.qlogo.cn/g?b=qq&nk=2041226489&s=100"
                alt=""
              />
            </span>
            <span className="brand-copy">
              <strong>{copy.nav.brand}</strong>
              <small>Engineer workspace</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#work">{copy.nav.work}</a>
            <a className="nav-contact" href="#contact">
              {copy.nav.contact}
            </a>
            <LanguageSwitcher
              currentLocale={locale}
              label={copy.nav.language}
              onChange={changeLocale}
            />
          </div>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 id="hero-title">{copy.hero.title}</h1>
            <p className="hero-lede">{copy.hero.lede}</p>
            <div className="hero-contact" aria-label="Direct contact">
              <a className="contact-card" href="mailto:service@dmtx.cn">
                <span className="contact-icon contact-icon-mail" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M23.94 3.44 12.01 13.47.09 3.44z" />
                    <path d="M0 4.3 7.97 11.04 0 20.55z" />
                    <path d="M.92 20.56 8.52 11.58 12.01 14.45 15.51 11.49 23.11 20.56z" />
                    <path d="M24 20.55 16.03 11.04 24 4.3z" />
                  </svg>
                </span>
                <span className="contact-content">
                  <span className="contact-label">邮箱</span>
                  <strong>service@dmtx.cn</strong>
                </span>
                <span className="contact-action">写邮件</span>
              </a>
              <button
                aria-label="复制微信 dmtx_cn"
                className="contact-card"
                data-copy-contact="wechat"
                data-copy-value="dmtx_cn"
                type="button"
              >
                <span className="contact-icon" aria-hidden="true">
                  <svg className="wechat-icon" viewBox="0 0 1024 1024">
                    <path d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z" />
                    <path d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z" />
                  </svg>
                </span>
                <span className="contact-content">
                  <span className="contact-label">微信</span>
                  <strong>dmtx_cn</strong>
                </span>
                <em className="contact-action" data-copy-status>
                  {copiedContact === "wechat" ? "已复制" : "点击复制"}
                </em>
              </button>
              <button
                aria-label="复制 QQ 2041226489"
                className="contact-card"
                data-copy-contact="qq"
                data-copy-value="2041226489"
                type="button"
              >
                <span className="contact-icon" aria-hidden="true">
                  <svg className="qq-icon" viewBox="0 0 24 24">
                    <path className="qq-gold" d="M11.98 22.44c-1.88 0-3.6-.59-4.71-1.46-.56.16-1.28.41-1.74.72-.39.27-.34.54-.27.65.31.48 5.29.31 6.72.16v-.07z" />
                    <path className="qq-gold" d="M11.64 22.44c1.88 0 3.6-.59 4.71-1.46.56.16 1.28.41 1.74.72.39.27.34.54.27.65-.31.48-5.29.31-6.72.16v-.07z" />
                    <path className="qq-black" d="M11.65 11.12c3.09-.02 5.57-.6 6.41-.83.2-.05.31-.15.31-.15 0-.03.01-.49.01-.73 0-4.03-1.95-8.08-6.74-8.08-4.79 0-6.74 4.05-6.74 8.08 0 .24.01.7.01.73 0 0 .09.09.25.13.78.21 3.3.82 6.47.84h.02z" />
                    <path className="qq-black" d="M20.16 14.53c-.19-.61-.45-1.32-.71-2.01 0 0-.15-.02-.23 0-2.36.68-5.22 1.12-7.39 1.09h-.03c-2.17.03-5.01-.4-7.36-1.08-.09-.03-.27-.01-.27-.01-.26.68-.52 1.39-.71 2.01-.91 2.91-.61 4.12-.39 4.15.48.06 1.87-2.19 1.87-2.19 0 2.29 2.07 5.8 6.81 5.83h.13c4.74-.03 6.81-3.54 6.81-5.83 0 0 1.39 2.25 1.87 2.19.22-.03.52-1.23-.39-4.15z" />
                    <path className="qq-white" d="M10.18 7.43c-.65.03-1.21-.7-1.25-1.64-.04-.93.47-1.72 1.12-1.75.65-.03 1.21.7 1.25 1.64.04.93-.46 1.72-1.12 1.74m4.84-1.64c-.04.93-.59 1.67-1.25 1.64-.65-.03-1.15-.81-1.12-1.74.04-.93.59-1.67 1.25-1.64.65.03 1.15.81 1.12 1.74z" />
                    <path className="qq-gold" d="M16.02 8.64c-.17-.41-1.9-.87-4.04-.87h-.02c-2.14 0-3.87.46-4.04.87-.01.02-.01.04-.01.06 0 .03.01.06.02.08.14.23 2.06 1.36 4.03 1.36h.02c1.97 0 3.88-1.13 4.03-1.36.01-.02.02-.05.02-.08 0-.02 0-.04-.01-.06z" />
                    <path className="qq-black" d="M10.96 6.01c.03.37-.17.7-.45.74-.28.04-.53-.24-.56-.61-.03-.37.17-.7.45-.74.28-.04.53.24.56.61m1.71.19c.06-.1.46-.6 1.3-.42.22.05.32.12.34.15.03.04.04.1.01.18-.06.16-.2.15-.27.12-.05-.02-.63-.37-1.17.15-.04.04-.1.05-.17.01-.06-.04-.09-.13-.05-.19z" />
                    <path className="qq-white" d="M11.82 13.7h-.02c-1.49.02-3.3-.18-5.04-.51-.15.85-.24 1.92-.16 3.19.2 3.22 2.15 5.24 5.16 5.27h.12c3.01-.03 4.96-2.05 5.16-5.27.08-1.27-.01-2.34-.16-3.19-1.75.34-3.56.53-5.04.51z" />
                    <path className="qq-red" d="M7.58 13.53v3.22s1.52.3 3.05.09v-2.97c-.97-.05-2.01-.17-3.05-.34" />
                    <path className="qq-red" d="M18.47 10.14s-2.86.95-6.65.97h-.02c-3.78-.03-6.64-.97-6.64-.97l-.96 2.51c2.39.76 5.36 1.24 7.61 1.22h.02c2.24.03 5.21-.46 7.61-1.22l-.96-2.51z" />
                  </svg>
                </span>
                <span className="contact-content">
                  <span className="contact-label">QQ</span>
                  <strong>2041226489</strong>
                </span>
                <em className="contact-action" data-copy-status>
                  {copiedContact === "qq" ? "已复制" : "点击复制"}
                </em>
              </button>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.addEventListener("click", function(event) {
                      var button = event.target.closest("[data-copy-contact]");
                      if (!button) return;
                      var value = button.getAttribute("data-copy-value");
                      var status = button.querySelector("[data-copy-status]");
                      if (!value || !status) return;
                      status.textContent = "已复制";
                      window.clearTimeout(button.__copyTimer);
                      button.__copyTimer = window.setTimeout(function() {
                        status.textContent = "点击复制";
                      }, 1600);
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(value).catch(function() {});
                        return;
                      }
                      var textarea = document.createElement("textarea");
                      textarea.value = value;
                      textarea.setAttribute("readonly", "");
                      textarea.style.position = "fixed";
                      textarea.style.opacity = "0";
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand("copy");
                      textarea.remove();
                    });
                  `,
                }}
              />
            </div>
            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                {copy.hero.primary}
              </a>
              <a className="secondary-button" href="#work">
                {copy.hero.secondary}
              </a>
            </div>
            <div className="stack-row" aria-label="Tech stack">
              {copy.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="workspace-panel" aria-label="Engineer workspace preview">
            <div className="workspace-topline">
              <span>{copy.hero.workspaceLabel}</span>
              <span>{copy.hero.workspaceStatus}</span>
            </div>
            <div className="terminal-panel">
              <div className="terminal-header">
                <span>{copy.hero.terminalHost}</span>
                <span>{copy.hero.terminalLabel}</span>
              </div>
              <pre>
                <code>{copy.hero.buildLog}</code>
              </pre>
            </div>
            <div className="signal-grid">
              {copy.hero.signals.map((signal, index) => (
                <div key={signal}>
                  <span className="metric">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">{copy.work.eyebrow}</p>
          <h2 id="work-title">{copy.work.title}</h2>
          <p>{copy.work.body}</p>
        </div>
        <div className="capability-grid">
          {copy.capabilities.map((item) => (
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
          <p className="eyebrow">{copy.principlesIntro.eyebrow}</p>
          <h2 id="principles-title">{copy.principlesIntro.title}</h2>
          <p>{copy.principlesIntro.body}</p>
          <div className="system-status">
            <span>{copy.principlesIntro.statusLabel}</span>
            <strong>{copy.principlesIntro.statusValue}</strong>
          </div>
        </div>
        <div className="principle-list">
          {copy.principles.map((item, index) => (
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
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h2 id="contact-title">{copy.contact.title}</h2>
          <p>{copy.contact.body}</p>
          <div className="contact-note">
            <span>{copy.contact.noteLabel}</span>
            <strong>{copy.contact.noteValue}</strong>
          </div>
        </div>
        <ContactForm copy={copy.contact.form} />
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div>
              <strong>{copy.nav.brand}</strong>
              <p>Engineer workspace · Built with care</p>
            </div>
          </div>
          <div className="footer-meta">
            <span>verified contact page</span>
            <a
              href="https://beian.miit.gov.cn/"
              rel="noreferrer"
              target="_blank"
            >
              赣ICP备2022000232号-5
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
