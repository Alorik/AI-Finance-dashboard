type Props = {
  label: "High" | "Medium" | "Low";
  reasons: string[];
};

export default function ConfidenceSection({ label, reasons }: Props) {
  const colorStyles =
    label === "High"
      ? "border-green-500/30 text-green-400"
      : label === "Medium"
        ? "border-yellow-500/30 text-yellow-400"
        : "border-red-500/30 text-red-400";

  return (
    <div className={`p-4 rounded-xl border ${colorStyles} bg-neutral-900`}>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label} confidence</p>
      </div>

      {/* REASONS */}
      <ul className="mt-2 text-xs text-neutral-400 list-disc list-inside space-y-1">
        {reasons.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
