"use client";

import { Language } from "@/lib/types";
import { saveLanguage, translations } from "@/lib/translations";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewChat: () => void;
}

export default function Header({ language, onLanguageChange, onNewChat }: HeaderProps) {
  const t = translations[language];

  const toggle = (lang: Language) => {
    saveLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-14 bg-[#0a0a0a] border-b border-[#1e1e1e]">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#1e1e1e] border border-[#2e2e2e] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[#999]"
          >
            <path d="M6.5 6.5h2v11h-2z" />
            <path d="M15.5 6.5h2v11h-2z" />
            <path d="M3 9h3.5M17.5 9H21M3 15h3.5M17.5 15H21M8.5 12h7" />
          </svg>
        </div>
        <span className="text-[#e8e8e8] font-semibold text-sm tracking-tight">
          {t.appName}
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* New Chat */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#aaa] transition-colors px-2.5 py-1.5 rounded-md hover:bg-[#161616]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t.newChat}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-[#161616] border border-[#2a2a2a] rounded-md overflow-hidden">
          {(["de", "en"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => toggle(lang)}
              className={`px-2.5 py-1 text-xs font-medium transition-all ${
                language === lang
                  ? "bg-[#2a2a2a] text-[#e8e8e8]"
                  : "text-[#555] hover:text-[#888]"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
