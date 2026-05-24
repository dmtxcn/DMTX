"use client";

import { useEffect, useRef, useState } from "react";

import { LOCALES, LocaleCode } from "../lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: LocaleCode;
  label: string;
  onChange: (locale: LocaleCode) => void;
};

export function LanguageSwitcher({
  currentLocale,
  label,
  onChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeLocale =
    LOCALES.find((locale) => locale.code === currentLocale) ?? LOCALES[0];

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className="language-switcher" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
        className="language-button"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <img
          alt=""
          className="language-flag"
          src={`https://flagcdn.com/w40/${activeLocale.flagCode}.png`}
        />
        <span>{activeLocale.label}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="M5.5 7.5 10 12l4.5-4.5" />
        </svg>
      </button>

      {isOpen ? (
        <div className="language-menu" role="menu">
          {LOCALES.map((locale) => (
            <button
              aria-current={locale.code === currentLocale ? "true" : undefined}
              className="language-option"
              key={locale.code}
              onClick={() => {
                onChange(locale.code);
                setIsOpen(false);
              }}
              role="menuitem"
              type="button"
            >
              <img
                alt=""
                className="language-flag"
                src={`https://flagcdn.com/w40/${locale.flagCode}.png`}
              />
              <span>{locale.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
