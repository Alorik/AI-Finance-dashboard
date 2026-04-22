"use client";

import { useState } from "react";

type Props = {
  steps: string[];
};

export default function ExplanationPanel({ steps }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-neutral-800 pt-4">
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-blue-400 hover:text-blue-300 transition"
      >
        {open ? "Hide explanation" : "How was this calculated?"}
      </button>

      {/* CONTENT */}
      {open && (
        <div className="mt-3 pl-4 border-l border-neutral-700 space-y-2 text-sm text-neutral-400">
          {steps.map((step, i) => (
            <p key={i}>• {step}</p>
          ))}
        </div>
      )}
    </div>
  );
}
