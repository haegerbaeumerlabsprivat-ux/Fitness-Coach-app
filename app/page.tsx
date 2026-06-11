"use client";

import { useEffect, useState } from "react";
import { Language } from "@/lib/types";
import { Message } from "@/lib/types";
import { detectLanguage } from "@/lib/translations";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

function generateSessionId() {
  return "fc-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const SESSION_KEY = "fc-session-id";
const MESSAGES_KEY = "fc-messages";

export default function Home() {
  const [language, setLanguage] = useState<Language>("de");
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Language detection
    setLanguage(detectLanguage());

    // Session ID
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);

    // Restore messages from sessionStorage
    try {
      const stored = sessionStorage.getItem(MESSAGES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        // Re-hydrate timestamps
        setMessages(
          parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );
      }
    } catch {
      /* ignore */
    }

    setMounted(true);
  }, []);

  function handleMessagesChange(updated: Message[]) {
    setMessages(updated);
    try {
      sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    } catch {
      /* ignore */
    }
  }

  function handleNewChat() {
    const newSid = generateSessionId();
    setMessages([]);
    setSessionId(newSid);
    sessionStorage.setItem(SESSION_KEY, newSid);
    sessionStorage.removeItem(MESSAGES_KEY);
  }

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="w-5 h-5 rounded-full border-2 border-[#2a2a2a] border-t-[#555] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onNewChat={handleNewChat}
      />
      <main className="flex-1 overflow-hidden pt-14">
        <ChatInterface
          language={language}
          sessionId={sessionId}
          messages={messages}
          onMessagesChange={handleMessagesChange}
        />
      </main>
    </div>
  );
}
