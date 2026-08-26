"use client";

import { QuizProvider } from "@/context/QuizContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      {children}
    </QuizProvider>
  );
}
