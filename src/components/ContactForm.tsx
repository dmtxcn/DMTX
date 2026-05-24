"use client";

import { FormEvent, useState } from "react";

type FieldName = "name" | "email" | "subject" | "message";

type FormState = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "请填写你的名字";
  if (!form.email.trim()) {
    errors.email = "请填写邮箱地址";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "邮箱格式不正确";
  }
  if (!form.subject.trim()) errors.subject = "请填写邮件主题";
  if (!form.message.trim()) errors.message = "请写下想说的内容";
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function updateField(field: FieldName, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("请先补全表单内容。");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.fieldErrors ?? {});
        setStatus("error");
        setMessage(result.error ?? "邮件发送失败，请稍后再试。");
        return;
      }

      setForm(initialForm);
      setErrors({});
      setStatus("sent");
      setMessage("邮件已发送，我会尽快回复你。");
    } catch {
      setStatus("error");
      setMessage("网络暂时不稳定，请稍后再试。");
    }
  }

  const isSending = status === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <label>
          <span>你的名字</span>
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="比如：小林"
            value={form.name}
          />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>
        <label>
          <span>邮箱地址</span>
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
        <span>邮件主题</span>
        <input
          aria-invalid={Boolean(errors.subject)}
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="想聊聊一个页面、合作或普通交流"
          value={form.subject}
        />
        {errors.subject ? <small>{errors.subject}</small> : null}
      </label>
      <label>
        <span>内容</span>
        <textarea
          aria-invalid={Boolean(errors.message)}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="写下你想说的事，我会认真看。"
          rows={6}
          value={form.message}
        />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>
      <div className="form-footer">
        <button className="primary-button" disabled={isSending} type="submit">
          {isSending ? "发送中..." : "发送邮件"}
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
