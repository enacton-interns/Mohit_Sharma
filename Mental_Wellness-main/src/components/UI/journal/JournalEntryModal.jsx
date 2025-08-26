import { useState } from "react";
import { X, Edit, Trash2, Save } from "lucide-react";
import clsx from "clsx";

const JournalEntryModal = ({ entry, onClose, onDelete, onUpdate, isDark }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(entry.entry);

  const handleSave = () => {
    onUpdate({ ...entry, entry: text });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={clsx(
          "rounded-lg shadow-lg w-[90%] sm:w-3/4 lg:w-1/2 p-6 relative",
          isDark ? "text-gray-100 bg-gray-800" : "text-gray-900 bg-white"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={clsx(
            "absolute top-4 right-4 p-1 rounded transition cursor-pointer",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
          )}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-semibold mb-2">Journal Entry</h3>
        <p className="text-sm font-semibold text-gray-500 mb-4">
          {new Date(entry.createdAt).toLocaleString()}
        </p>

        {/* Content or Editor */}
        {isEditing ? (
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={clsx(
              "w-full border rounded p-2 mb-4 resize-none focus:outline-orange-400",
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-gray-100 border-gray-300 text-gray-900"
            )}
          />
        ) : (
          <p className="whitespace-pre-wrap mb-4">{entry.entry}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this entry?")
              ) {
                onDelete(entry.id);
              }
            }}
            className="flex items-center space-x-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryModal;
