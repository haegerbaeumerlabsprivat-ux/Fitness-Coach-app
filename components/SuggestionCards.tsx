"use client";

import { Translations } from "@/lib/translations";

interface SuggestionCardsProps {
  t: Translations;
  onSelect: (text: string) => void;
}

const icons = [
  // Dumbbell
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M6.5 6.5h2v11h-2z" /><path d="M15.5 6.5h2v11h-2z" />
    <path d="M3 9h3.5M17.5 9H21M3 15h3.5M17.5 15H21M8.5 12h7" />
  </svg>,
  // Leaf / nutrition
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M2 21c0 0 4-4 9-4s9-3 9-9c0 0-7 0-10 3S2 21 2 21z" />
    <path d="M12 12L6 18" />
  </svg>,
  // Activity / chart
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
  // Clock / recovery
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>,
];

export default function SuggestionCards({ t, onSelect }: SuggestionCardsProps) {
  return (
    <div className="w-full max-w-2xl px-4 animate-fadeUp">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#161616] border border-[#252525] mb-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-[#777]"
          >
            <path d="M6.5 6.5h2v11h-2z" />
            <path d="M15.5 6.5h2v11h-2z" />
            <path d="M3 9h3.5M17.5 9H21M3 15h3.5M17.5 15H21M8.5 12h7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          {t.tagline}
        </h1>
        <p className="text-[#666] text-sm max-w-sm mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Suggestion label */}
      <p className="text-xs text-[#444] uppercase tracking-widest mb-3 text-center">
        {t.welcomeLabel}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {t.suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSelect(suggestion.text)}
            className="group flex items-start gap-3 p-4 bg-[#111] border border-[#1e1e1e] rounded-xl text-left
              hover:border-[#2e2e2e] hover:bg-[#161616] transition-all duration-200"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#252525] flex items-center justify-center text-[#666] group-hover:text-[#888] transition-colors mt-0.5">
              {icons[i]}
            </span>
            <div>
              <p className="text-[#aaa] text-xs font-medium mb-0.5 group-hover:text-[#ccc] transition-colors">
                {suggestion.title}
              </p>
              <p className="text-[#555] text-xs leading-snug group-hover:text-[#666] transition-colors">
                {suggestion.text}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
