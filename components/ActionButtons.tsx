type Action = {
  label: string;
  type: "primary" | "secondary";
};

type Props = {
  actions: Action[];
};

export default function ActionButtons({ actions }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            action.type === "primary"
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
          }`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
