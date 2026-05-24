export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; fieldErrors: ContactFieldErrors };

export type ResendEmailPayload = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
};

type SendConfig = {
  apiKey?: string;
  from?: string;
  to?: string;
  fetcher?: typeof fetch;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validateContactPayload(input: unknown): ValidationResult {
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  const data: ContactPayload = {
    name: readString(source.name),
    email: readString(source.email),
    subject: readString(source.subject),
    message: readString(source.message),
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

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data };
}

export function createContactEmail(
  data: ContactPayload,
  config: { from: string; to: string },
): ResendEmailPayload {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

  return {
    from: config.from,
    to: [config.to],
    reply_to: data.email,
    subject: `来自大毛同学页面：${data.subject}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1f2933;">
        <h2 style="margin: 0 0 16px; color: #111827;">新的联系消息</h2>
        <p><strong>姓名：</strong>${safeName}</p>
        <p><strong>邮箱：</strong>${safeEmail}</p>
        <p><strong>主题：</strong>${safeSubject}</p>
        <div style="margin-top: 18px; padding: 16px; border: 1px solid #e5e1d8; border-radius: 8px; background: #fffaf2;">
          ${safeMessage}
        </div>
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
  const validated = validateContactPayload(input);
  if (!validated.ok) {
    return {
      ok: false,
      error: "请检查表单内容",
      fieldErrors: validated.fieldErrors,
      status: 400,
    };
  }

  if (!config.apiKey || !config.from || !config.to) {
    return {
      ok: false,
      error: "邮件服务尚未配置完整",
      status: 500,
    };
  }

  const fetcher = config.fetcher ?? fetch;
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      createContactEmail(validated.data, {
        from: config.from,
        to: config.to,
      }),
    ),
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "邮件发送失败，请稍后再试",
      status: response.status,
    };
  }

  return { ok: true };
}
