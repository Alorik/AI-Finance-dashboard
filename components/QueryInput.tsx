"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type QueryInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export default function QueryInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: QueryInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && value.trim()) {
      onSubmit();
    }
  };

  const canSubmit = !isLoading && !!value.trim();

  return (
    <div className="w-full max-w-xl">
      {/* Outer glow wrapper */}
      <motion.div
        animate={{
          boxShadow: focused
            ? "0 0 0 1px rgba(56,189,248,0.25), 0 0 32px rgba(56,189,248,0.08)"
            : "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.3 }}
        className="relative flex items-center rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Search icon */}
        <div className="pl-4 pr-2 shrink-0">
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            animate={{ opacity: focused ? 0.7 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <circle
              cx="6.5"
              cy="6.5"
              r="4.5"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M10 10L14 14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask about your company finances..."
          disabled={isLoading}
          className="
            flex-1 min-w-0
            px-2 py-3.5
            bg-transparent
            text-sm text-white/90
            placeholder:text-white/25
            outline-none
            disabled:opacity-40
            tracking-wide
          "
          style={{
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
            fontSize: "13px",
          }}
        />

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 shrink-0 mx-1" />

        {/* Submit button */}
        <div className="pr-2 pl-1 shrink-0">
          <motion.button
            onClick={onSubmit}
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.04 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            animate={{
              opacity: canSubmit ? 1 : 0.35,
            }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium tracking-widest uppercase overflow-hidden"
            style={{
              background: canSubmit
                ? "linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(14,165,233,0.15) 100%)"
                : "rgba(255,255,255,0.04)",
              border: canSubmit
                ? "0.5px solid rgba(56,189,248,0.35)"
                : "0.5px solid rgba(255,255,255,0.08)",
              color: canSubmit
                ? "rgba(186,230,253,0.95)"
                : "rgba(255,255,255,0.25)",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {/* Button shimmer on hover */}
            <AnimatePresence>
              {canSubmit && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-sky-300/70 block"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.span>
              ) : (
                <motion.span
                  key="ask"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 relative z-10"
                >
                  Ask
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 5h8M6 2l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Hint text */}
      <AnimatePresence>
        {focused && value.trim() && !isLoading && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 ml-1 text-[11px] text-white/25 tracking-wide"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            ↵ press enter to submit
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
