import assert from "node:assert/strict";
import test from "node:test";

import {
  createContactEmail,
  sendContactEmail,
  validateContactPayload,
} from "../src/lib/contact.ts";

test("validateContactPayload returns field errors for empty input", () => {
  const result = validateContactPayload({});

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.deepEqual(result.fieldErrors, {
      name: "请填写你的名字",
      email: "请填写邮箱地址",
      subject: "请填写邮件主题",
      message: "请写下想说的内容",
    });
  }
});

test("validateContactPayload rejects invalid email addresses", () => {
  const result = validateContactPayload({
    name: "测试用户",
    email: "not-an-email",
    subject: "合作咨询",
    message: "想聊聊一个页面设计需求。",
  });

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.fieldErrors.email, "邮箱格式不正确");
  }
});

test("createContactEmail builds a Resend payload without leaking raw html", () => {
  const email = createContactEmail(
    {
      name: "<大毛>",
      email: "hello@example.com",
      subject: "页面合作",
      message: "我想了解 <script>alert(1)</script>。",
    },
    {
      from: "Da Mao <onboarding@example.com>",
      to: "owner@example.com",
    },
  );

  assert.equal(email.from, "Da Mao <onboarding@example.com>");
  assert.deepEqual(email.to, ["owner@example.com"]);
  assert.equal(email.reply_to, "hello@example.com");
  assert.equal(email.subject, "来自大毛同学页面：页面合作");
  assert.match(email.html, /&lt;大毛&gt;/);
  assert.match(email.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("sendContactEmail reports missing server configuration", async () => {
  const result = await sendContactEmail(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "你好",
      message: "想认识一下。",
    },
    {
      apiKey: "",
      from: "",
      to: "",
      fetcher: async () => new Response(null, { status: 200 }),
    },
  );

  assert.deepEqual(result, {
    ok: false,
    error: "邮件服务尚未配置完整",
    status: 500,
  });
});

test("sendContactEmail posts to Resend when payload and config are valid", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const result = await sendContactEmail(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "你好",
      message: "想认识一下。",
    },
    {
      apiKey: "test_key",
      from: "Da Mao <onboarding@example.com>",
      to: "owner@example.com",
      fetcher: async (url, init) => {
        calls.push({ url: String(url), init: init ?? {} });
        return new Response(JSON.stringify({ id: "email_123" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  );

  assert.deepEqual(result, { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(
    (calls[0].init.headers as Record<string, string>).Authorization,
    "Bearer test_key",
  );
});
