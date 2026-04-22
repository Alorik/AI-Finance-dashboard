// /lib/mockData.ts

export type AIResponse = {
  status: "success" | "low_confidence";

  insight: {
    summary: string;
    metrics: {
      label: string;
      value: string;
    }[];
  };

  confidence: {
    label: "High" | "Medium" | "Low";
    reasons: string[];
  };

  explanation: {
    steps: string[];
  };

  actions: {
    label: string;
    type: "primary" | "secondary";
  }[];
};

// ---- MOCK RESPONSES ---- //

const responses: Record<string, AIResponse> = {
  profit: {
    status: "low_confidence",
    insight: {
      summary:
        "Profit dropped by 48% mainly due to increased marketing spend and reduced conversion rate.",
      metrics: [
        { label: "Profit", value: "-48%" },
        { label: "Marketing Spend", value: "+40%" },
        { label: "Conversion Rate", value: "-12%" },
      ],
    },
    confidence: {
      label: "Medium",
      reasons: [
        "Conversion data partially missing",
        "Recent campaign data incomplete",
      ],
    },
    explanation: {
      steps: [
        "Compared current vs previous month profit",
        "Analyzed expense categories",
        "Evaluated conversion trends",
      ],
    },
    actions: [
      { label: "Review marketing campaigns", type: "primary" },
      { label: "Optimize conversion funnel", type: "secondary" },
    ],
  },

  revenue: {
    status: "success",
    insight: {
      summary:
        "Revenue declined by 18% due to a drop in mobile traffic over the past 7 days.",
      metrics: [
        { label: "Revenue", value: "-18%" },
        { label: "Mobile Traffic", value: "-25%" },
      ],
    },
    confidence: {
      label: "High",
      reasons: [
        "Consistent 7-day trend observed",
        "Data complete across all channels",
      ],
    },
    explanation: {
      steps: [
        "Analyzed revenue trend over last 7 days",
        "Segmented traffic by device",
        "Compared with previous week",
      ],
    },
    actions: [
      { label: "Investigate mobile performance", type: "primary" },
      { label: "Run marketing campaign for mobile users", type: "secondary" },
    ],
  },

  expenses: {
    status: "success",
    insight: {
      summary:
        "Expenses increased by 22% primarily due to higher operational and logistics costs.",
      metrics: [
        { label: "Expenses", value: "+22%" },
        { label: "Logistics", value: "+15%" },
      ],
    },
    confidence: {
      label: "High",
      reasons: ["Stable expense tracking data", "No anomalies detected"],
    },
    explanation: {
      steps: [
        "Compared monthly expense breakdown",
        "Identified cost-heavy categories",
      ],
    },
    actions: [
      { label: "Optimize logistics costs", type: "primary" },
      { label: "Audit operational expenses", type: "secondary" },
    ],
  },
};

// ---- QUERY MATCHER ---- //

export function getMockResponse(query: string): AIResponse | null {
  const q = query.toLowerCase();

  if (q.includes("profit")) return responses.profit;
  if (q.includes("revenue")) return responses.revenue;
  if (q.includes("expense")) return responses.expenses;

  return null;
}
