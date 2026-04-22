"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QueryInput from "@/components/QueryInput";
import ResponseCard from "@/components/ResponseCard";
import { getMockResponse, AIResponse } from "@/lib/mockData";

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "partial" | "success" | "error"
  >("idle");
  const [response, setResponse] = useState<AIResponse | null>(null);

  const handleSubmit = () => {
    if (!query.trim()) return;

    setStatus("loading");
    setResponse(null);

    setTimeout(() => setStatus("partial"), 800);

    setTimeout(() => {
      const res = getMockResponse(query);
      if (!res) {
        setStatus("error");
        return;
      }
      setResponse(res);
      setStatus("success");
    }, 1500);
  };

  return (
    <main
      className="relative min-h-screen text-white flex flex-col items-center px-6 py-14 overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg, #080b14 0%, #090d18 50%, #070910 100%)",
      }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-60 -left-40 w-[700px] h-[700px] rounded-full bg-sky-500/5 blur-[140px]" />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full bg-teal-500/4 blur-[130px]" />
        <div className="absolute -bottom-60 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/4 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.7,
          ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
        }}
        className="flex flex-col items-center gap-3 mb-12"
      >
        {/* Eyebrow badge */}
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "0.5px solid rgba(56,189,248,0.2)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 block" />
          <span
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{
              color: "rgba(147,213,250,0.7)",
              fontFamily: "'DM Mono', 'Fira Mono', monospace",
            }}
          >
            AI-Powered
          </span>
        </div>

        <h1
          className="text-3xl font-semibold tracking-tight text-center"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          Finance Insights
        </h1>

        <p
          className="text-sm text-center max-w-xs"
          style={{
            color: "rgba(255,255,255,0.28)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            lineHeight: "1.7",
          }}
        >
          Ask anything about your company&apos;s financial data and get instant
          AI-generated insights.
        </p>
      </motion.div>

      {/* ── Query input ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <QueryInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          isLoading={status === "loading" || status === "partial"}
        />
      </motion.div>

      {/* ── Response ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="w-full max-w-xl mt-6"
      >
        <ResponseCard status={status} response={response} />
      </motion.div>
    </main>
  );
}
