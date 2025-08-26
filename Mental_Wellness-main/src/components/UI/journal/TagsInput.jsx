import { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const theme = useSelector((state) => state.theme.theme);

  const addTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      const newTag = input.trim().replace(/,$/, "");
      if (!tags.includes(newTag.toLowerCase())) {
        setTags([...tags, newTag.toLowerCase()]);
      }
      setInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full mx-auto">
      <label className="block mb-2 text-sm font-semibold">Add Tags</label>

      <div
        className={clsx(
          "flex flex-wrap gap-2 px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 ring-orange-400",
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
        )}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-orange-500 hover:text-orange-700"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          type="text"
          placeholder="Add tag here and press Enter..."
          className={clsx(
            "flex-1 font-lg min-w-[120px] bg-transparent outline-none",
            theme === "dark"
              ? "text-white placeholder:text-gray-200"
              : "text-gray-800"
          )}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
        />
      </div>
    </div>
  );
};

export default TagsInput;
