"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AIResponse } from "@/lib/mockData";
import InsightSection from "@/components/InsightSection";
import ConfidenceSection from "@/components/ConfidenceSection";
import ExplanationPanel from "@/components/ExplanationPanel";
import ActionButtons from "./ActionButtons";

type Props = {
  status: "idle" | "loading" | "partial" | "success" | "error";
  response: AIResponse | null;
};

const fadeUp = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

const sectionInitial = { opacity: 0, y: 20, scale: 0.98 as number };

function sectionAnimate(i: number) {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  };
}

export default function ResponseCard({ status, response }: Props) {
  return (
    <AnimatePresence mode="wait">
      {/* 💤 Idle */}
      {status === "idle" && (
        <motion.div
          key="idle"
          {...fadeUp}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white/40 text-sm font-light tracking-wide"
        >
          Ask a question to get financial insights.
        </motion.div>
      )}

      {/* ⏳ Loading */}
      {status === "loading" && (
        <motion.div
          key="loading"
          {...fadeUp}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5 pointer-events-none" />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
          />

          <div className="flex items-center gap-3 relative z-10">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-sky-400/70 block"
                  animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-white/50 text-sm font-light tracking-wide">
              Analyzing financial data...
            </p>
          </div>
        </motion.div>
      )}

      {/* ⚡ Partial */}
      {status === "partial" && (
        <motion.div
          key="partial"
          {...fadeUp}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-amber-500/5 backdrop-blur-xl p-5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2.5 relative z-10">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-amber-400/60"
                animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400/90" />
            </span>
            <p className="text-amber-300/80 text-sm font-light tracking-wide">
              Initial trends detected — refining insights
            </p>
          </div>
        </motion.div>
      )}

      {/* ❌ Error */}
      {status === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-red-400/20 bg-red-500/5 backdrop-blur-xl p-5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2.5 relative z-10">
            <motion.span
              className="w-2 h-2 rounded-full bg-red-400/80 block shrink-0"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            />
            <p className="text-red-300/80 text-sm font-light tracking-wide">
              Could not generate insights. Try another query.
            </p>
          </div>
        </motion.div>
      )}

      {/* ✅ Success */}
      {status === "success" && response && (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#0d0f1f] to-[#070810]"
        >
          {/* Ambient orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {[
              {
                cn: "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-500/8 blur-[120px]",
                delay: 0,
              },
              {
                cn: "absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-teal-500/6 blur-[120px]",
                delay: 0.2,
              },
              {
                cn: "absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/6 blur-[100px]",
                delay: 0.4,
              },
            ].map(({ cn, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay, ease: "easeOut" }}
                className={cn}
              />
            ))}
          </div>

          {/* Card */}
          <div className="relative z-10 mx-auto max-w-2xl p-6">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
              }}
              className="rounded-3xl border border-white/[0.07] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                boxShadow:
                  "0 0 0 0.5px rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Top shimmer line */}
              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              />

              <div className="p-7 space-y-5">
                {/* 🧠 Insight */}
                <motion.div
                  initial={sectionInitial}
                  animate={sectionAnimate(0)}
                  whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 border border-white/[0.06] cursor-default"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.09) 0%, rgba(20,184,166,0.04) 100%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <InsightSection
                    summary={response.insight.summary}
                    metrics={response.insight.metrics}
                  />
                </motion.div>

                {/* ⚠️ Confidence */}
                <motion.div
                  initial={sectionInitial}
                  animate={sectionAnimate(1)}
                  whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 border border-white/[0.06] cursor-default"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <ConfidenceSection
                    label={response.confidence.label}
                    reasons={response.confidence.reasons}
                  />
                </motion.div>

                {/* 🔍 Explanation */}
                <motion.div
                  initial={sectionInitial}
                  animate={sectionAnimate(2)}
                  whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-5 border border-white/[0.06] cursor-default"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20,184,166,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <ExplanationPanel steps={response.explanation.steps} />
                </motion.div>

                {/* ⚡ Actions */}
                <motion.div
                  initial={sectionInitial}
                  animate={sectionAnimate(3)}
                  className="rounded-2xl p-5 border border-white/[0.06]"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <ActionButtons actions={response.actions} />
                </motion.div>
              </div>

              {/* Bottom shimmer */}
              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
