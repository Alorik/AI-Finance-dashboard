"use client";

import QueryInput from "@/components/QueryInput";
import { getMockResponse, AIResponse } from "@/lib/mockedData";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "partial" | "success" | "error"
  >("idle");

  const [response, setResponse] = useState<AIResponse | null>(null);

  // 🔥 Handle query submit
  const handleSubmit = () => {
    if (!query.trim()) return;

    setStatus("loading");
    setResponse(null);

    // simulate partial response
    setTimeout(() => {
      setStatus("partial");
    }, 800);

    // simulate final response
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
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">
        AI Finance Insights Dashboard
      </h1>

      {/* INPUT */}
      <div className="w-full max-w-xl flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your finances..."
          className="flex-1 p-3 rounded-lg bg-neutral-800 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
        >
          Ask
        </button>
      </div>

      {/* RESPONSE AREA */}
      <div className="w-full max-w-xl">
        {/* 💤 Idle */}
        {status === "idle" && (
          <div className="text-neutral-400">
            Ask a question like:
            <ul className="mt-2 list-disc list-inside text-sm">
              <li>Why did profit drop?</li>
              <li>Why are expenses increasing?</li>
            </ul>
          </div>
        )}

        <QueryInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          isLoading={status === "loading" || status === "partial"}
        />

        {/* ⚡ Partial */}
        {status === "partial" && (
          <div className="p-4 bg-neutral-800 rounded-lg">
            <p className="text-yellow-400">
              Initial trends detected... refining insights
            </p>
          </div>
        )}

        {/* ❌ Error */}
        {status === "error" && (
          <div className="p-4 bg-red-900/40 rounded-lg">
            <p>Could not generate insights. Try another query.</p>
          </div>
        )}

        {/* ✅ Success */}
        {status === "success" && response && (
          <div className="p-5 bg-neutral-900 rounded-xl space-y-4">
            {/* INSIGHT */}
            <div>
              <h2 className="text-lg font-semibold mb-1">Insight</h2>
              <p className="text-neutral-300">{response.insight.summary}</p>
            </div>

            {/* METRICS */}
            <div className="flex gap-4">
              {response.insight.metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-neutral-800 px-3 py-2 rounded-lg text-sm"
                >
                  <p className="text-neutral-400">{m.label}</p>
                  <p className="font-medium">{m.value}</p>
                </div>
              ))}
            </div>

            {/* CONFIDENCE */}
            <div>
              <h3 className="font-medium">
                Confidence: {response.confidence.label}
              </h3>
              <ul className="text-sm text-neutral-400 list-disc list-inside">
                {response.confidence.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* EXPLANATION */}
            <div>
              <h3 className="font-medium mb-1">How this was calculated</h3>
              <ul className="text-sm text-neutral-400 list-disc list-inside">
                {response.explanation.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              {response.actions.map((a, i) => (
                <button
                  key={i}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    a.type === "primary"
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-neutral-700 hover:bg-neutral-600"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
