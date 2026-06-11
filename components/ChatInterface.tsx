"use client";

import { useEffect, useRef, useState } from "react";
import { Message, Language } from "@/lib/types";
import { translations } from "@/lib/translations";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import SuggestionCards from "./SuggestionCards";

interface ChatInterfaceProps {
  language: Language;
  sessionId: string;
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ChatInterface({
  language,
  sessionId,
  messages,
  onMessagesChange,
}: ChatInterfaceProps) {
  const t = translations[language];
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function autoResize() {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const updated = [...messages, userMessage];
    onMessagesChange(updated);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      const data = await res.json();
      const reply = res.ok
        ? (data.reply ?? t.errorMessage)
        : t.errorMessage;

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };

      onMessagesChange([...updated, aiMessage]);
    } catch {
      const errMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: t.errorMessage,
        timestamp: new Date(),
      };
      onMessagesChange([...updated, errMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message area */}
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="flex items-center justify-center min-h-full py-16 px-4">
            <SuggestionCards t={t} onSelect={(text) => sendMessage(text)} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} t={t} />
            ))}
            {isLoading && <TypingIndicator t={t} />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-2 bg-[#111] border border-[#222] rounded-2xl px-4 py-3 focus-within:border-[#333] transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
              disabled={isLoading}
              className="flex-1 bg-transparent text-[#d8d8d8] text-sm placeholder-[#3a3a3a] resize-none outline-none leading-relaxed min-h-[24px] disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#e8e8e8] flex items-center justify-center
                hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#0a0a0a]"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>

          <p className="text-center text-[#2e2e2e] text-xs mt-2.5">
            {t.poweredBy} · {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
