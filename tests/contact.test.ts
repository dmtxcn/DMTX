import assert from "node:assert/strict";
import test from "node:test";

import {
  createAutoReplyEmail,
  createCaptchaChallenge,
  createContactEmail,
  sendContactEmail,
  validateCaptcha,
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

test("validateContactPayload requires a valid signed captcha when configured", () => {
  const challenge = createCaptchaChallenge("secret", {
    now: () => 1_700_000_000_000,
    random: () => 0,
  });

  const wrong = validateContactPayload(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "页面合作",
      message: "想聊聊页面改版。",
      captchaToken: challenge.token,
      captchaAnswer: "9",
    },
    { captchaSecret: "secret", now: () => 1_700_000_000_000 },
  );

  assert.equal(wrong.ok, false);
  if (!wrong.ok) {
    assert.equal(wrong.fieldErrors.captchaAnswer, "验证码不正确，请重新计算");
  }

  const valid = validateContactPayload(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "页面合作",
      message: "想聊聊页面改版。",
      captchaToken: challenge.token,
      captchaAnswer: "4",
    },
    { captchaSecret: "secret", now: () => 1_700_000_000_000 },
  );

  assert.equal(valid.ok, true);
});

test("validateCaptcha rejects expired signed challenges", () => {
  const challenge = createCaptchaChallenge("secret", {
    now: () => 1_700_000_000_000,
    random: () => 0,
  });

  assert.deepEqual(
    validateCaptcha("4", challenge.token, "secret", 1_700_000_000_000 + 11 * 60_000),
    { ok: false, error: "验证码已过期，请刷新后重试" },
  );
});

test("createContactEmail builds an SMTP message without leaking raw html", () => {
  const email = createContactEmail(
    {
      name: "<大毛>",
      email: "hello@example.com",
      subject: "页面合作",
      message: "我想了解 <script>alert(1)</script>。",
      captchaToken: "token",
      captchaAnswer: "4",
    },
    {
      from: "大毛同学 <noreply@dmtx.cn>",
      to: "owner@example.com",
    },
  );

  assert.equal(email.from, "大毛同学 <noreply@dmtx.cn>");
  assert.equal(email.to, "owner@example.com");
  assert.equal(email.replyTo, "hello@example.com");
  assert.equal(email.subject, "来自大毛同学页面：页面合作");
  assert.match(email.html, /&lt;大毛&gt;/);
  assert.match(email.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("createAutoReplyEmail tells the customer not to resend within 3 hours", () => {
  const email = createAutoReplyEmail(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "页面合作",
      message: "想聊聊页面改版。",
      captchaToken: "token",
      captchaAnswer: "4",
    },
    {
      from: "大毛同学 <noreply@dmtx.cn>",
    },
  );

  assert.equal(email.to, "hello@example.com");
  assert.equal(email.subject, "已收到你的来信｜大毛同学");
  assert.match(email.html, /3 小时内/);
  assert.match(email.html, /请勿重复来信/);
});

test("sendContactEmail reports missing server configuration", async () => {
  const challenge = createCaptchaChallenge("secret", {
    now: () => 1_700_000_000_000,
    random: () => 0,
  });
  const result = await sendContactEmail(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "你好",
      message: "想认识一下。",
      captchaToken: challenge.token,
      captchaAnswer: "4",
    },
    {
      host: "",
      port: 465,
      user: "",
      pass: "",
      fromAddress: "",
      to: "",
      captchaSecret: "secret",
      now: () => 1_700_000_000_000,
      sendMail: async () => undefined,
    },
  );

  assert.deepEqual(result, {
    ok: false,
    error: "邮件服务尚未配置完整",
    status: 500,
  });
});

test("sendContactEmail returns quickly and queues owner email plus auto reply", async () => {
  const challenge = createCaptchaChallenge("secret", {
    now: () => 1_700_000_000_000,
    random: () => 0,
  });
  const messages: unknown[] = [];
  const result = await sendContactEmail(
    {
      name: "大毛",
      email: "hello@example.com",
      subject: "你好",
      message: "想认识一下。",
      captchaToken: challenge.token,
      captchaAnswer: "4",
    },
    {
      host: "mail.spacemail.com",
      port: 465,
      secure: true,
      user: "noreply@dmtx.cn",
      pass: "smtp_password",
      fromName: "大毛同学",
      fromAddress: "noreply@dmtx.cn",
      to: "owner@example.com",
      captchaSecret: "secret",
      now: () => 1_700_000_000_000,
      sendMail: async (message) => {
        messages.push(message);
      },
    },
  );

  assert.deepEqual(result, { ok: true });
  assert.equal(messages.length, 2);

  const ownerMessage = messages[0] as { from: string; to: string; replyTo: string; subject: string; html: string };
  assert.equal(ownerMessage.from, "大毛同学 <noreply@dmtx.cn>");
  assert.equal(ownerMessage.to, "owner@example.com");
  assert.equal(ownerMessage.replyTo, "hello@example.com");
  assert.equal(ownerMessage.subject, "来自大毛同学页面：你好");
  assert.match(ownerMessage.html, /想认识一下。/);

  const autoReply = messages[1] as { from: string; to: string; subject: string };
  assert.equal(autoReply.from, "大毛同学 <noreply@dmtx.cn>");
  assert.equal(autoReply.to, "hello@example.com");
  assert.equal(autoReply.subject, "已收到你的来信｜大毛同学");
});
