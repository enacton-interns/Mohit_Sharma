import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import TagsInput from "./TagsInput";
import { setJournal } from "../../../features/journal/journal_slice";
import { clearMood } from "../../../features/journal/mood_slice";

const JournalEditor = () => {
  const [entry, setEntry] = useState("");

  const theme = useSelector((state) => state.theme.theme);
  const moodState = useSelector((state) => state.mood.mood); // { mood, note }
  const isLight = theme === "light";

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!moodState || !moodState.mood) {
      toast.warning("Please select your mood before saving.");
      return;
    }

    if (!entry.trim()) {
      toast.error("Journal entry cannot be empty.");
      return;
    }

    dispatch(setJournal({ entry, mood: moodState }));
    dispatch(clearMood());
    toast.success("Journal entry saved!");
    setEntry("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Journal</h2>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here..."
        rows={10}
        className={clsx(
          "w-full mb-4 p-4 rounded-md text-base resize-y shadow-sm border transition outline-orange-400",
          isLight
            ? "bg-white text-gray-800 border-gray-300 placeholder-gray-500"
            : "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
        )}
        autoFocus
      />

      <div className="mb-4">
        <TagsInput />
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer px-4 py-2 rounded-md transition"
        >
          <Save className="w-4 h-4" />
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default JournalEditor;
