"use client";

import { useState } from "react";
import { AIResponse } from "@/lib/mockedData";

type Props = {
  status: "idle" | "loading" | "partial" | "success" | "error";
  response: AIResponse | null;
};

export default function ResponseCard({ status, response }: Props) {
  const [showExplanation, setShowExplanation] = useState(false);

  // 💤 Idle
  if (status === "idle") {
    return (
      <div className="text-neutral-500 text-sm">
        Ask a question to get financial insights.
      </div>
    );
  }

  // ⏳ Loading
  if (status === "loading") {
    return (
      <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
        <p className="animate-pulse text-neutral-400">
          Analyzing financial data...
        </p>
      </div>
    );
  }

  // ⚡ Partial
  if (status === "partial") {
    return (
      <div className="p-5 rounded-xl bg-neutral-900 border border-yellow-700/40">
        <p className="text-yellow-400 text-sm">
          Initial trends detected… refining insights
        </p>
      </div>
    );
  }

  // ❌ Error
  if (status === "error") {
    return (
      <div className="p-5 rounded-xl bg-red-900/30 border border-red-700/40">
        <p className="text-red-300 text-sm">
          Could not generate insights. Try another query.
        </p>
      </div>
    );
  }

  // ✅ Success
  if (status === "success" && response) {
    const confidenceColor =
      response.confidence.label === "High"
        ? "text-green-400 border-green-500/30"
        : response.confidence.label === "Medium"
          ? "text-yellow-400 border-yellow-500/30"
          : "text-red-400 border-red-500/30";

    return (
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
        {/* 🧠 Insight */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Insight</h2>
          <p className="text-neutral-300 leading-relaxed">
            {response.insight.summary}
          </p>
        </div>

        {/* 📊 Metrics */}
        <div className="flex flex-wrap gap-3">
          {response.insight.metrics.map((m, i) => (
            <div
              key={i}
              className="bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800"
            >
              <p className="text-xs text-neutral-500">{m.label}</p>
              <p className="text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>

        {/* ⚠️ Confidence */}
        <div
          className={`p-4 rounded-xl border ${confidenceColor} bg-neutral-900`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {response.confidence.label} confidence
            </p>
          </div>

          <ul className="mt-2 text-xs text-neutral-400 list-disc list-inside space-y-1">
            {response.confidence.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* 🔍 Explanation (collapsible) */}
        <div>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            {showExplanation ? "Hide details" : "How was this calculated?"}
          </button>

          {showExplanation && (
            <div className="mt-3 text-sm text-neutral-400 border-l border-neutral-700 pl-4 space-y-1">
              {response.explanation.steps.map((step: string, i: number) => (
              <p key={i}>• {step}</p>
              ))}
            </div>
          )}
        </div>

        {/* ⚡ Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
            {response.actions.map((a: { type: "primary" | "secondary"; label: string }, i: number) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm transition ${
              a.type === "primary"
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              }`}
            >
              {a.label}
            </button>
            ))}
        </div>
      </div>
    );
  }

  return null;
}
