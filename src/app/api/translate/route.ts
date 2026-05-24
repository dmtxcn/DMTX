import { NextRequest, NextResponse } from "next/server";

import { getLocale, LOCALES } from "../../../lib/i18n";

export async function POST(request: NextRequest) {
  const translatorKey = process.env.MICROSOFT_TRANSLATOR_KEY;
  const translatorRegion = process.env.MICROSOFT_TRANSLATOR_REGION;
  const translatorEndpoint =
    process.env.MICROSOFT_TRANSLATOR_ENDPOINT ??
    "https://api.cognitive.microsofttranslator.com";

  if (!translatorKey || !translatorRegion) {
    return NextResponse.json(
      { error: "Microsoft Translator is not configured." },
      { status: 501 },
    );
  }

  const body = (await request.json()) as { text?: string; to?: string };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const locale = getLocale(typeof body.to === "string" ? body.to : "");
  const target = LOCALES.find((item) => item.code === locale)?.microsoftCode;

  if (!text || !target) {
    return NextResponse.json(
      { error: "Text and target language are required." },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${translatorEndpoint}/translate?api-version=3.0&to=${target}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Ocp-Apim-Subscription-Region": translatorRegion,
      },
      body: JSON.stringify([{ text }]),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Translation request failed." },
      { status: response.status },
    );
  }

  const result = (await response.json()) as Array<{
    translations?: Array<{ text?: string }>;
  }>;
  const translatedText = result[0]?.translations?.[0]?.text;

  return NextResponse.json({ text: translatedText ?? text });
}
