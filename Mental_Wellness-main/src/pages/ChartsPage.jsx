// pages/ChartsPage.js
import { useSelector } from "react-redux";
import MoodChart from "../components/UI/chart/MoodChart";

export default function ChartsPage() {
  const entries = useSelector((state) => state.journal.journal);
  const theme = useSelector((state) => state.theme.theme);

  // Theme-based styles
  const pageBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "#E2E8F0" : "#1F2937";

  const hasEnoughData = entries.length >= 5;

  return (
    <div className={`px-6 py-20 min-h-screen ${pageBg}`}>
      <div
        className={`max-w-6xl min-h-[400px] mx-auto p-8 rounded-lg shadow-2xl ${cardBg}`}
      >
        <h2 className="text-4xl font-bold mb-8" style={{ color: textColor }}>
          Mood Overview
        </h2>

        {hasEnoughData ? (
          <MoodChart entries={entries} theme={theme} />
        ) : (
          <p
            className="text-xl text-center font-medium"
            style={{ color: textColor }}
          >
            ✍️ Write at least five journal entries to display the graph.
          </p>
        )}
      </div>
    </div>
  );
}
