"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  steps: string[];
};

export default function ExplanationPanel({ steps }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 w-full"
      >
        {/* Icon box */}
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, rgba(20,184,166,0.3) 0%, rgba(6,182,212,0.15) 100%)"
              : "linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.06) 100%)",
            border: open
              ? "0.5px solid rgba(20,184,166,0.45)"
              : "0.5px solid rgba(20,184,166,0.2)",
          }}
        >
          <motion.svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
            }}
          >
            <path
              d="M2 4l3.5 3.5L9 4"
              stroke="rgba(94,234,212,0.85)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        <span
          className="text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
          style={{
            color: open ? "rgba(94,234,212,0.75)" : "rgba(255,255,255,0.35)",
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
          }}
        >
          {open ? "Hide explanation" : "How was this calculated?"}
        </span>

        {/* Step count badge */}
        <motion.span
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(20,184,166,0.1)",
            border: "0.5px solid rgba(20,184,166,0.2)",
            color: "rgba(94,234,212,0.5)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {steps.length} steps
        </motion.span>
      </button>

      {/* CONTENT */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-4 space-y-2.5">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3"
                >
                  {/* Step number */}
                  <span
                    className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-medium mt-0.5"
                    style={{
                      background: "rgba(20,184,166,0.1)",
                      border: "0.5px solid rgba(20,184,166,0.2)",
                      color: "rgba(94,234,212,0.6)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Step text */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
