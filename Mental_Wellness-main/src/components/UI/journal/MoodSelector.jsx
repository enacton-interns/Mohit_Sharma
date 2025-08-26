import { useState, useEffect } from "react";
import { Smile, Meh, Frown, Angry, Laugh } from "lucide-react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../../../features/journal/mood_slice";

const moods = [
  { id: "happy", icon: <Laugh />, label: "Happy" },
  { id: "calm", icon: <Smile />, label: "Calm" },
  { id: "neutral", icon: <Meh />, label: "Neutral" },
  { id: "sad", icon: <Frown />, label: "Sad" },
  { id: "angry", icon: <Angry />, label: "Angry" },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMood && note.trim() !== "") {
      dispatch(setMood({ mood: selectedMood, note }));
    }
  }, [dispatch, selectedMood, note]);

  return (
    <div className="w-full flex flex-col items-center lg:px-4 sm:px-0">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          How are you feeling today?
        </h2>

        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-4">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={clsx(
                "flex flex-col items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 transition cursor-pointer hover:scale-105 hover:border-orange-600",
                selectedMood === m.id
                  ? "bg-orange-500 text-white border-orange-600"
                  : isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              )}
            >
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                {m.icon}
              </div>
              <span className="hidden sm:inline text-xs font-semibold mt-1">
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mt-3 text-left">
            <label
              className={clsx(
                "block mb-1 text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-700"
              )}
            >
              Write a quick note!
            </label>
            <textarea
              rows="3"
              className={clsx(
                "w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-orange-400 resize-none",
                isDark
                  ? "bg-gray-700 text-gray-100 placeholder:text-gray-400"
                  : "bg-white text-gray-800 placeholder:text-gray-500"
              )}
              placeholder="I'm feeling this way because..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;
