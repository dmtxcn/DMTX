import { NextResponse } from "next/server";

import { createCaptchaChallenge } from "../../../lib/contact";

export function GET() {
  const secret = process.env.CONTACT_CAPTCHA_SECRET ?? process.env.SMTP_PASS;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "验证码服务尚未配置完整" },
      { status: 500 },
    );
  }

  const challenge = createCaptchaChallenge(secret);

  return NextResponse.json({
    ok: true,
    question: challenge.question,
    token: challenge.token,
  });
}
