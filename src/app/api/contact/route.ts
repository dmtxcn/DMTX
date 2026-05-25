import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { sendContactEmail } from "../../../lib/contact";

function readSmtpSecure() {
  const value = (process.env.SMTP_SECURE ?? "ssl").toLowerCase();
  return value === "ssl" || value === "true" || value === "1";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求内容不是有效的 JSON" },
      { status: 400 },
    );
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = readSmtpSecure();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const result = await sendContactEmail(payload, {
    host: process.env.SMTP_HOST,
    port,
    secure,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromName: process.env.SMTP_FROM_NAME ?? "大毛同学",
    fromAddress: process.env.SMTP_FROM_ADDRESS ?? process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    captchaSecret: process.env.CONTACT_CAPTCHA_SECRET ?? process.env.SMTP_PASS,
    sendMail: (message) => transporter.sendMail(message),
    onBackgroundError: (error) => {
      console.error("Failed to send contact email", error);
    },
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
