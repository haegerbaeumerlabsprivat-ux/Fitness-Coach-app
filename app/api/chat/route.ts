import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://nicklaurin.app.n8n.cloud/webhook/fitness-coach";

export async function POST(req: NextRequest) {
  const { message, sessionId } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const n8nResponse = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendMessage",
      chatInput: message.trim(),
      sessionId: sessionId ?? "default-session",
    }),
  });

  if (!n8nResponse.ok) {
    return NextResponse.json(
      { error: "Upstream error" },
      { status: n8nResponse.status }
    );
  }

  const data = await n8nResponse.json();
  const reply = data?.output ?? data?.text ?? data?.message ?? "";

  return NextResponse.json({ reply });
}
