"use client";

import { motion } from "framer-motion";

type Props = {
  label: "High" | "Medium" | "Low";
  reasons: string[];
};

const config = {
  High: {
    accent: "rgba(34,197,94,",
    text: "rgba(134,239,172,0.9)",
    muted: "rgba(134,239,172,0.45)",
    dim: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.25)",
    bar: "rgba(74,222,128,0.8)",
    icon: (
      <path
        d="M2.5 6.5L5 9l4-6"
        stroke="rgba(134,239,172,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    bars: 3,
  },
  Medium: {
    accent: "rgba(234,179,8,",
    text: "rgba(253,224,71,0.9)",
    muted: "rgba(253,224,71,0.45)",
    dim: "rgba(234,179,8,0.1)",
    border: "rgba(234,179,8,0.22)",
    bar: "rgba(250,204,21,0.8)",
    icon: (
      <path
        d="M2.5 5.5h6M2.5 7.5h4"
        stroke="rgba(253,224,71,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
    bars: 2,
  },
  Low: {
    accent: "rgba(239,68,68,",
    text: "rgba(252,165,165,0.9)",
    muted: "rgba(252,165,165,0.45)",
    dim: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.22)",
    bar: "rgba(248,113,113,0.8)",
    icon: (
      <path
        d="M5.5 2.5v4M5.5 8v1"
        stroke="rgba(252,165,165,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
    bars: 1,
  },
};

export default function ConfidenceSection({ label, reasons }: Props) {
  const c = config[label];

  return (
    <div className="space-y-3.5">
      {/* HEADER ROW */}
      <div className="flex items-center justify-between">
        {/* Label + icon */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${c.accent}0.2) 0%, ${c.accent}0.08) 100%)`,
              border: `0.5px solid ${c.border}`,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              {c.icon}
            </svg>
          </div>

          <span
            className="text-[11px] uppercase tracking-[0.15em]"
            style={{
              color: c.muted,
              fontFamily: "'DM Mono', 'Fira Mono', monospace",
            }}
          >
            Confidence
          </span>
        </div>

        {/* Signal bars */}
        <div className="flex items-end gap-0.5 h-4">
          {[1, 2, 3].map((tier) => (
            <motion.div
              key={tier}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: tier <= c.bars ? 1 : 1,
                opacity: tier <= c.bars ? 1 : 0.15,
              }}
              transition={{
                duration: 0.4,
                delay: tier * 0.08,
                ease: "easeOut",
              }}
              className="w-1.5 rounded-sm origin-bottom"
              style={{
                height: `${tier * 4 + 4}px`,
                background: tier <= c.bars ? c.bar : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* CONFIDENCE LABEL */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ color: c.text, fontFamily: "'DM Mono', monospace" }}
        >
          {label}
        </span>
        <span
          className="text-xs"
          style={{
            color: "rgba(255,255,255,0.25)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          confidence level
        </span>
      </div>

      {/* REASONS */}
      <div className="space-y-2">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, delay: i * 0.07, ease: "easeOut" }}
            className="flex items-start gap-2.5"
          >
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: c.muted }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {reason}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
