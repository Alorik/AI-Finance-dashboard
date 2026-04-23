"use client";

import { motion } from "framer-motion";

type Metric = {
  label: string;
  value: string;
};

type Props = {
  summary: string;
  metrics: Metric[];
};

export default function InsightSection({ summary, metrics }: Props) {
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2.5">
        <p
          className="text-[11px] uppercase tracking-[0.15em] font-medium"
          style={{
            color: "rgba(147,197,253,0.6)",
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
          }}
        >
          Insight
        </p>
      </div>

      {/* SUMMARY */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.01em" }}
      >
        {summary}
      </p>

      {/* METRICS */}
      <div className="flex flex-wrap gap-2.5 pt-1">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
            className="relative min-w-[110px] px-4 py-3 rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: "0.5px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <p
              className="text-[10px] uppercase tracking-[0.12em] mb-1"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {metric.label}
            </p>
            <p
              className="text-sm font-medium tabular-nums"
              style={{
                color: "rgba(186,230,253,0.92)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
