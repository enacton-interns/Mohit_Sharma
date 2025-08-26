// components/MoodChart.js
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function MoodChart({ entries, theme }) {
  const data = useMemo(() => {
    const moodCounts = ["anxious", "stressed", "neutral", "calm", "happy"].map(
      (mood) => ({
        mood,
        count: entries.filter((e) => e.mood?.mood === mood).length,
      })
    );
    return moodCounts;
  }, [entries]);

  // Theme-based styling
  const axisColor = theme === "dark" ? "#CBD5E1" : "#4B5563";
  const tooltipBg = theme === "dark" ? "#2D3748" : "#FFFFFF";
  const tooltipTxt = theme === "dark" ? "#E2E8F0" : "#1F2937";

  return (
    <ResponsiveContainer width="100%" height={550}>
      <BarChart
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
        <XAxis
          dataKey="mood"
          tick={{ fill: axisColor, fontSize: 18 }}
          textAnchor="middle"
        />
        <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 18 }} />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.1)" }}
          contentStyle={{ backgroundColor: tooltipBg, borderRadius: 6 }}
          labelStyle={{ color: tooltipTxt }}
          itemStyle={{ color: tooltipTxt }}
        />
        <Bar
          dataKey="count"
          fill={"#fb923c"}
          barSize={60}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
