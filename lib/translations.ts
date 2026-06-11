import { Language } from "./types";

export const translations = {
  de: {
    appName: "Fitness Coach",
    tagline: "Dein persönlicher KI-Fitness-Coach",
    subtitle:
      "Trainingsplanung, Ernährung, Motivation & mehr — theoretisch fundiert, jederzeit verfügbar.",
    inputPlaceholder: "Stelle deine Frage ...",
    send: "Senden",
    thinking: "Denkt nach",
    poweredBy: "Powered by OpenAI via n8n",
    errorMessage:
      "Entschuldigung, ein Fehler ist aufgetreten. Bitte versuche es erneut.",
    suggestions: [
      {
        title: "Trainingsplan",
        text: "Erstelle mir einen Trainingsplan für 3 Tage pro Woche als Anfänger.",
      },
      {
        title: "Muskelaufbau",
        text: "Was soll ich essen, um effektiv Muskeln aufzubauen?",
      },
      {
        title: "Cardio & Kraft",
        text: "Was ist der Unterschied zwischen Kraft- und Ausdauertraining?",
      },
      {
        title: "Regeneration",
        text: "Wie lange sollte ich zwischen Trainingseinheiten pausieren?",
      },
    ],
    welcomeLabel: "Wie kann ich dir helfen?",
    you: "Du",
    coach: "Coach",
    newChat: "Neuer Chat",
    languageLabel: "Sprache",
    disclaimer:
      "Dieser Coach kann keine physische Übungskorrektur vornehmen und ersetzt keinen Arzt.",
  },
  en: {
    appName: "Fitness Coach",
    tagline: "Your personal AI fitness coach",
    subtitle:
      "Workout planning, nutrition, motivation & more — evidence-based, available anytime.",
    inputPlaceholder: "Ask your question ...",
    send: "Send",
    thinking: "Thinking",
    poweredBy: "Powered by OpenAI via n8n",
    errorMessage: "Sorry, something went wrong. Please try again.",
    suggestions: [
      {
        title: "Workout Plan",
        text: "Create a workout plan for me for 3 days per week as a beginner.",
      },
      {
        title: "Muscle Building",
        text: "What should I eat to build muscle effectively?",
      },
      {
        title: "Cardio & Strength",
        text: "What is the difference between strength and endurance training?",
      },
      {
        title: "Recovery",
        text: "How long should I rest between training sessions?",
      },
    ],
    welcomeLabel: "How can I help you?",
    you: "You",
    coach: "Coach",
    newChat: "New Chat",
    languageLabel: "Language",
    disclaimer:
      "This coach cannot correct physical form in person and does not replace a doctor.",
  },
} as const satisfies Record<Language, object>;

export type Translations = (typeof translations)[Language];

export function detectLanguage(): Language {
  if (typeof window === "undefined") return "de";
  const stored = localStorage.getItem("fc-language") as Language | null;
  if (stored === "de" || stored === "en") return stored;
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("en") ? "en" : "de";
}

export function saveLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem("fc-language", lang);
  }
}
