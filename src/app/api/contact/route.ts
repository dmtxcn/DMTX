import { NextResponse } from "next/server";

import { sendContactEmail } from "../../../lib/contact";

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

  const result = await sendContactEmail(payload, {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
