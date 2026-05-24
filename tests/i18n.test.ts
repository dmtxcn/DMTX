import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_LOCALE, LOCALES, pageTranslations } from "../src/lib/i18n.ts";

test("language selector includes the requested countries and languages", () => {
  assert.deepEqual(
    LOCALES.map((locale) => ({
      code: locale.code,
      flagCode: locale.flagCode,
      label: locale.label,
    })),
    [
      { code: "zh-CN", flagCode: "cn", label: "简体中文" },
      { code: "zh-HK", flagCode: "hk", label: "繁體中文" },
      { code: "en", flagCode: "us", label: "English" },
      { code: "ja", flagCode: "jp", label: "日本語" },
      { code: "ko", flagCode: "kr", label: "한국어" },
      { code: "fr", flagCode: "fr", label: "Français" },
      { code: "es", flagCode: "es", label: "Español" },
      { code: "de", flagCode: "de", label: "Deutsch" },
      { code: "ru", flagCode: "ru", label: "Русский" },
      { code: "vi", flagCode: "vn", label: "Tiếng Việt" },
    ],
  );
});

test("every supported language has complete page copy", () => {
  for (const locale of LOCALES) {
    const copy = pageTranslations[locale.code];

    assert.ok(copy.hero.title, `${locale.code} has hero title`);
    assert.equal(copy.capabilities.length, 3);
    assert.equal(copy.principles.length, 5);
    assert.equal(copy.stack.length, 6);
    assert.ok(copy.contact.form.submitIdle, `${locale.code} has form copy`);
  }
});

test("non-default languages translate all user-facing sections", () => {
  const source = pageTranslations[DEFAULT_LOCALE];

  for (const locale of LOCALES) {
    if (locale.code === DEFAULT_LOCALE) continue;

    const copy = pageTranslations[locale.code];
    assert.notEqual(copy.work.title, source.work.title, `${locale.code} work title`);
    assert.notEqual(copy.work.body, source.work.body, `${locale.code} work body`);
    assert.notEqual(
      copy.capabilities.map((item) => item.title).join("|"),
      source.capabilities.map((item) => item.title).join("|"),
      `${locale.code} capability titles`,
    );
    assert.notEqual(
      copy.capabilities.map((item) => item.body).join("|"),
      source.capabilities.map((item) => item.body).join("|"),
      `${locale.code} capability bodies`,
    );
    assert.notEqual(
      copy.principles.map((item) => item.title).join("|"),
      source.principles.map((item) => item.title).join("|"),
      `${locale.code} principle titles`,
    );
    assert.notEqual(
      copy.principles.map((item) => item.body).join("|"),
      source.principles.map((item) => item.body).join("|"),
      `${locale.code} principle bodies`,
    );
    assert.notEqual(copy.contact.body, source.contact.body, `${locale.code} contact body`);
    assert.notEqual(
      Object.values(copy.contact.form).join("|"),
      Object.values(source.contact.form).join("|"),
      `${locale.code} form copy`,
    );
  }
});

test("default locale is simplified Chinese", () => {
  assert.equal(DEFAULT_LOCALE, "zh-CN");
});
