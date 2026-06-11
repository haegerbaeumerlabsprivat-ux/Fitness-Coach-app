import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, sessionId } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const n8nResponse = await fetch(webhookUrl, {
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
