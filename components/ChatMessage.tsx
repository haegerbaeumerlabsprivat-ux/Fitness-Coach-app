"use client";

import { Message } from "@/lib/types";
import { Translations } from "@/lib/translations";

interface ChatMessageProps {
  message: Message;
  t: Translations;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 h-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#555] animate-blink"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </span>
  );
}

export function TypingIndicator({ t }: { t: Translations }) {
  return (
    <div className="flex items-start gap-3 animate-fadeUp">
      <Avatar isAI />
      <div className="bg-[#161616] border border-[#222] rounded-2xl rounded-tl-sm px-4 py-3">
        <TypingDots />
      </div>
    </div>
  );
}

function Avatar({ isAI }: { isAI: boolean }) {
  if (isAI) {
    return (
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center mt-0.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 text-[#888]"
        >
          <path d="M6.5 6.5h2v11h-2z" />
          <path d="M15.5 6.5h2v11h-2z" />
          <path d="M3 9h3.5M17.5 9H21M3 15h3.5M17.5 15H21M8.5 12h7" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center mt-0.5">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5 text-[#777]"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

export default function ChatMessage({ message, t }: ChatMessageProps) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="flex items-start gap-3 flex-row-reverse animate-fadeUp">
        <Avatar isAI={false} />
        <div className="flex flex-col items-end gap-1 max-w-[78%]">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl rounded-tr-sm px-4 py-3 text-[#d8d8d8] text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          <span className="text-[#3a3a3a] text-xs pr-1">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 animate-fadeUp">
      <Avatar isAI />
      <div className="flex flex-col gap-1 max-w-[78%]">
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl rounded-tl-sm px-4 py-3 text-[#cccccc] text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
        <span className="text-[#3a3a3a] text-xs pl-1">{time}</span>
      </div>
    </div>
  );
}
