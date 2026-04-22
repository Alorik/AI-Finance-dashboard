"use client";

import { useState } from "react";
import QueryInput from "@/components/QueryInput";
import ResponseCard from "@/components/ResponseCard";
import { getMockResponse, AIResponse } from "@/lib/mockData"; // ✅ fixed name

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

    // simulate partial
    setTimeout(() => {
      setStatus("partial");
    }, 800);

    // simulate final
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
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center px-6 py-10">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-8">
        AI Finance Insights Dashboard
      </h1>

      {/* INPUT */}
      <QueryInput
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        isLoading={status === "loading" || status === "partial"}
      />

      {/* RESPONSE */}
      <div className="w-full max-w-xl mt-8">
        <ResponseCard status={status} response={response} />
      </div>
    </main>
  );
}
