"use client";

import { motion } from "framer-motion";

type Action = {
  label: string;
  type: "primary" | "secondary";
};

type Props = {
  actions: Action[];
};

export default function ActionButtons({ actions }: Props) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span
          className="text-[11px] uppercase tracking-[0.15em]"
          style={{
            color: "rgba(255,255,255,0.28)",
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
          }}
        >
          Actions
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2.5">
        {actions.map((action, i) => {
          const isPrimary = action.type === "primary";

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide overflow-hidden"
              style={{
                fontFamily: "'DM Mono', 'Fira Mono', monospace",
                background: isPrimary
                  ? "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: isPrimary
                  ? "0.5px solid rgba(56,189,248,0.35)"
                  : "0.5px solid rgba(255,255,255,0.08)",
                color: isPrimary
                  ? "rgba(186,230,253,0.92)"
                  : "rgba(255,255,255,0.45)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Shimmer on hover */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.45 }}
              />

              {/* Top shimmer line */}
              <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* Arrow for primary */}
              {isPrimary && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M1 5h8M6 2l3 3-3 3"
                    stroke="rgba(186,230,253,0.7)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <span className="relative z-10">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
