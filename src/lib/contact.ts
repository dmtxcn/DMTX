import { createHmac, timingSafeEqual } from "node:crypto";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken?: string;
  captchaAnswer?: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; fieldErrors: ContactFieldErrors };

export type ContactEmailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
};

type CaptchaOptions = {
  captchaSecret?: string;
  now?: () => number;
};

type SendConfig = CaptchaOptions & {
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  pass?: string;
  fromName?: string;
  fromAddress?: string;
  to?: string;
  sendMail?: (message: ContactEmailMessage) => Promise<unknown>;
  onBackgroundError?: (error: unknown) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAPTCHA_TTL_MS = 10 * 60_000;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function signCaptchaPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createCaptchaChallenge(
  secret: string,
  options: { now?: () => number; random?: () => number } = {},
) {
  const now = options.now?.() ?? Date.now();
  const random = options.random ?? Math.random;
  const left = 2 + Math.floor(random() * 8);
  const right = 2 + Math.floor(random() * 8);
  const expiresAt = now + CAPTCHA_TTL_MS;
  const payload = `${left}:${right}:${expiresAt}`;
  const signature = signCaptchaPayload(payload, secret);

  return {
    question: `${left} + ${right} = ?`,
    token: `${payload}:${signature}`,
    expiresAt,
  };
}

export function validateCaptcha(
  answer: unknown,
  token: unknown,
  secret: string | undefined,
  now = Date.now(),
): { ok: true } | { ok: false; error: string } {
  const answerText = readString(answer);
  const tokenText = readString(token);

  if (!secret || !tokenText || !answerText) {
    return { ok: false, error: "请先完成验证码" };
  }

  const parts = tokenText.split(":");
  if (parts.length !== 4) {
    return { ok: false, error: "验证码不正确，请刷新后重试" };
  }

  const [leftText, rightText, expiresText, signature] = parts;
  const payload = `${leftText}:${rightText}:${expiresText}`;
  const expectedSignature = signCaptchaPayload(payload, secret);
  if (!safeEqual(signature, expectedSignature)) {
    return { ok: false, error: "验证码不正确，请刷新后重试" };
  }

  const expiresAt = Number(expiresText);
  if (!Number.isFinite(expiresAt) || expiresAt < now) {
    return { ok: false, error: "验证码已过期，请刷新后重试" };
  }

  const expectedAnswer = Number(leftText) + Number(rightText);
  if (String(expectedAnswer) !== answerText) {
    return { ok: false, error: "验证码不正确，请重新计算" };
  }

  return { ok: true };
}

export function validateContactPayload(
  input: unknown,
  options: CaptchaOptions = {},
): ValidationResult {
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  const data: ContactPayload = {
    name: readString(source.name),
    email: readString(source.email),
    subject: readString(source.subject),
    message: readString(source.message),
    captchaToken: readString(source.captchaToken),
    captchaAnswer: readString(source.captchaAnswer),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!data.name) fieldErrors.name = "请填写你的名字";
  if (!data.email) {
    fieldErrors.email = "请填写邮箱地址";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fieldErrors.email = "邮箱格式不正确";
  }
  if (!data.subject) fieldErrors.subject = "请填写邮件主题";
  if (!data.message) fieldErrors.message = "请写下想说的内容";

  if (options.captchaSecret) {
    const captcha = validateCaptcha(
      data.captchaAnswer,
      data.captchaToken,
      options.captchaSecret,
      options.now?.(),
    );
    if (!captcha.ok) fieldErrors.captchaAnswer = captcha.error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data };
}

export function createContactEmail(
  data: ContactPayload,
  config: { from: string; to: string },
): ContactEmailMessage {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

  return {
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `来自大毛同学页面：${data.subject}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1f2933;">
        <h2 style="margin: 0 0 16px; color: #111827;">新的联系消息</h2>
        <p><strong>姓名：</strong>${safeName}</p>
        <p><strong>邮箱：</strong>${safeEmail}</p>
        <p><strong>主题：</strong>${safeSubject}</p>
        <div style="margin-top: 18px; padding: 16px; border: 1px solid #d6e4ef; border-radius: 8px; background: #f7fbff;">
          ${safeMessage}
        </div>
      </div>
    `,
  };
}

export function createAutoReplyEmail(
  data: ContactPayload,
  config: { from: string },
): ContactEmailMessage {
  const safeName = escapeHtml(data.name);
  const safeSubject = escapeHtml(data.subject);

  return {
    from: config.from,
    to: data.email,
    subject: "已收到你的来信｜大毛同学",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1f2933;">
        <h2 style="margin: 0 0 16px; color: #0f2b46;">已收到你的来信</h2>
        <p>${safeName}，你好：</p>
        <p>你关于「${safeSubject}」的消息已经送达大毛同学。正常情况下，我会在 3 小时内查看并回复。</p>
        <p>为了避免信息重复，请勿重复来信；如果有新的补充内容，可以在后续回复中继续说明。</p>
        <p style="margin-top: 20px;">大毛同学</p>
      </div>
    `,
  };
}

export async function sendContactEmail(
  input: unknown,
  config: SendConfig,
): Promise<
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors; status: number }
> {
  const validated = validateContactPayload(input, {
    captchaSecret: config.captchaSecret,
    now: config.now,
  });
  if (!validated.ok) {
    return {
      ok: false,
      error: "请检查表单内容",
      fieldErrors: validated.fieldErrors,
      status: 400,
    };
  }

  if (
    !config.host ||
    !config.port ||
    !config.user ||
    !config.pass ||
    !config.fromAddress ||
    !config.to ||
    !config.sendMail
  ) {
    return {
      ok: false,
      error: "邮件服务尚未配置完整",
      status: 500,
    };
  }

  const from = `${config.fromName ?? "大毛同学"} <${config.fromAddress}>`;
  const messages = [
    createContactEmail(validated.data, { from, to: config.to }),
    createAutoReplyEmail(validated.data, { from }),
  ];

  void Promise.all(messages.map((message) => config.sendMail?.(message))).catch(
    (error) => {
      config.onBackgroundError?.(error);
    },
  );

  return { ok: true };
}
