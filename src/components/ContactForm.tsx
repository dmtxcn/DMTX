"use client";

import { FormEvent, useEffect, useState } from "react";

import { DEFAULT_LOCALE, pageTranslations } from "../lib/i18n";

type FieldName = "name" | "email" | "subject" | "message" | "captchaAnswer";

type FormState = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;
type ContactFormCopy =
  (typeof pageTranslations)[typeof DEFAULT_LOCALE]["contact"]["form"];

type ContactFormProps = {
  copy?: ContactFormCopy;
};

const formHints = {
  name: "大毛",
  subject: "请简要写明项目类型或需求重点",
  message: "请留下背景、目标、时间节点，以及你希望我协助判断或落地的部分。",
  sent: "已收到来信，我会在 3 小时内回复。请勿重复来信，避免信息被覆盖。",
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  captchaAnswer: "",
};

function validateForm(form: FormState, copy: ContactFormCopy): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = copy.requiredName;
  if (!form.email.trim()) {
    errors.email = copy.requiredEmail;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = copy.invalidEmail;
  }
  if (!form.subject.trim()) errors.subject = copy.requiredSubject;
  if (!form.message.trim()) errors.message = copy.requiredMessage;
  if (!form.captchaAnswer.trim()) {
    errors.captchaAnswer = copy.requiredCaptcha ?? "请填写验证码";
  }
  return errors;
}

export function ContactForm({
  copy = pageTranslations[DEFAULT_LOCALE].contact.form,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState<{
    question: string;
    token: string;
  } | null>(null);

  async function refreshCaptcha() {
    try {
      const response = await fetch("/api/captcha", { cache: "no-store" });
      const result = (await response.json()) as {
        ok: boolean;
        question?: string;
        token?: string;
      };
      if (response.ok && result.ok && result.question && result.token) {
        setCaptcha({ question: result.question, token: result.token });
      }
    } catch {
      setCaptcha(null);
    }
  }

  useEffect(() => {
    void refreshCaptcha();
  }, []);

  function updateField(field: FieldName, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form, copy);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage(copy.completeForm);
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken: captcha?.token ?? "",
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.fieldErrors ?? {});
        setStatus("error");
        setMessage(result.error ?? copy.sendFailed);
        if (result.fieldErrors?.captchaAnswer) {
          void refreshCaptcha();
          setForm((current) => ({ ...current, captchaAnswer: "" }));
        }
        return;
      }

      setForm(initialForm);
      setErrors({});
      setStatus("sent");
      setMessage(formHints.sent);
      void refreshCaptcha();
    } catch {
      setStatus("error");
      setMessage(copy.networkError);
    }
  }

  const isSending = status === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label>
          <span>{copy.name}</span>
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={formHints.name}
            value={form.name}
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>
        <label>
          <span>{copy.email}</span>
          <input
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            inputMode="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={form.email}
          />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>
      </div>
      <label>
        <span>{copy.subject}</span>
        <input
          aria-invalid={Boolean(errors.subject)}
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder={formHints.subject}
          value={form.subject}
        />
        {errors.subject ? <small>{errors.subject}</small> : null}
      </label>
      <label>
        <span>{copy.message}</span>
        <textarea
          aria-invalid={Boolean(errors.message)}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={formHints.message}
          rows={6}
          value={form.message}
        />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>
      <div className="captcha-row">
        <label>
          <span>{copy.captcha ?? "验证码"}</span>
          <input
            aria-invalid={Boolean(errors.captchaAnswer)}
            inputMode="numeric"
            name="captchaAnswer"
            onChange={(event) =>
              updateField("captchaAnswer", event.target.value)
            }
            placeholder={copy.captchaPlaceholder ?? "请输入计算结果"}
            value={form.captchaAnswer}
          />
          {errors.captchaAnswer ? <small>{errors.captchaAnswer}</small> : null}
        </label>
        <button
          className="captcha-card"
          onClick={() => {
            setForm((current) => ({ ...current, captchaAnswer: "" }));
            void refreshCaptcha();
          }}
          type="button"
        >
          <span>{copy.captchaQuestion ?? "请计算"}</span>
          <strong>{captcha?.question ?? "加载中"}</strong>
        </button>
      </div>
      <div className="form-footer">
        <button className="primary-button" disabled={isSending} type="submit">
          {isSending ? copy.submitSending : copy.submitIdle}
        </button>
        {message ? (
          <p className={`form-message ${status === "sent" ? "success" : ""}`}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
