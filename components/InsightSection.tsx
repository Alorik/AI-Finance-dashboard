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
      <div>
        <h2 className="text-lg font-semibold mb-1">Insight</h2>
        <p className="text-neutral-300 leading-relaxed">{summary}</p>
      </div>

      {/* METRICS */}
      <div className="flex flex-wrap gap-3">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 min-w-[120px]"
          >
            <p className="text-xs text-neutral-500">{metric.label}</p>
            <p className="text-sm font-medium text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
