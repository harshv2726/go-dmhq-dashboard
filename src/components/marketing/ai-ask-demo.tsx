"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";

// A looping, fake "ask DMHQ a question" chat exchange — purely decorative,
// illustrates the AI capabilities listed in plain text right below it on
// the landing page, so it's marked aria-hidden rather than read as live
// chat content.
const EXCHANGES = [
  {
    question: "How did I do this week?",
    answer: "₹18,400 in sales, up 22% from last week. Saturday was your best day — 6 orders.",
  },
  {
    question: "What's low on stock?",
    answer: "Rose Gold Hoops — 2 left. You're selling about 5 a week, so restock in the next couple of days.",
  },
  {
    question: "Draft a reply about delivery time",
    answer: "Ships in 2–3 days, fully tracked — you'll get updates straight on WhatsApp!",
  },
  {
    question: "Who ordered again this month?",
    answer: "8 repeat customers this month — @studio.aanya leads with 3 orders.",
  },
] as const;

type Phase = "question" | "typing" | "answer";

const QUESTION_MS = 600;
const TYPING_MS = 900;
const HOLD_MS = 3200;

export function AIAskDemo() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");

  useEffect(() => {
    if (reduceMotion) {
      // Skip the typing beat — jump straight to the full exchange and just
      // hold it longer before cross-fading to the next one.
      setPhase("answer");
      const toNext = setTimeout(
        () => setStep((s) => (s + 1) % EXCHANGES.length),
        QUESTION_MS + TYPING_MS + HOLD_MS,
      );
      return () => clearTimeout(toNext);
    }

    setPhase("question");
    const toTyping = setTimeout(() => setPhase("typing"), QUESTION_MS);
    const toAnswer = setTimeout(() => setPhase("answer"), QUESTION_MS + TYPING_MS);
    const toNext = setTimeout(
      () => setStep((s) => (s + 1) % EXCHANGES.length),
      QUESTION_MS + TYPING_MS + HOLD_MS,
    );

    return () => {
      clearTimeout(toTyping);
      clearTimeout(toAnswer);
      clearTimeout(toNext);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- step drives the cycle intentionally
  }, [step, reduceMotion]);

  const current = EXCHANGES[step];

  return (
    <div className="glow-border rounded-2xl" aria-hidden="true">
      <div className="rounded-2xl bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 border-b border-border pb-4">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="font-heading text-sm font-semibold">Ask DMHQ</span>
          <Sparkles className="ml-auto size-4 text-muted-foreground" />
        </div>

        <div className="mt-4 flex min-h-40 flex-col justify-end gap-3 sm:min-h-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                  {current.question}
                </div>
              </div>

              {phase === "typing" ? (
                <div className="flex w-fit items-center gap-1 rounded-lg rounded-bl-sm bg-muted px-3 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              ) : phase === "answer" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-[90%] rounded-lg rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground"
                >
                  {current.answer}
                </motion.div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
