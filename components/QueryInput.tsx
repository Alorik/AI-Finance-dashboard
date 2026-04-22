"use client";

import { KeyboardEvent } from "react";

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
  // 🔥 Handle Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-xl flex items-center gap-2">
      {/* INPUT */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your company finances..."
        disabled={isLoading}
        className="
          flex-1
          px-4 py-3
          rounded-xl
          bg-neutral-900
          border border-neutral-800
          text-sm
          text-white
          placeholder:text-neutral-500
          outline-none
          focus:border-neutral-600
          transition
          disabled:opacity-50
        "
      />

      {/* BUTTON */}
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className={`
          px-4 py-3
          rounded-xl
          text-sm font-medium
          transition
          ${
            isLoading || !value.trim()
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          }
        `}
      >
        {isLoading ? "Analyzing..." : "Ask"}
      </button>
    </div>
  );
}
