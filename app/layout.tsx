import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Coach — Dein KI-Coach",
  description:
    "Dein persönlicher KI-Fitness-Coach. Trainingsplanung, Ernährung, Motivation — jederzeit verfügbar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-[#e8e8e8] antialiased h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
