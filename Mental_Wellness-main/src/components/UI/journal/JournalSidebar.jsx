import { useState, useEffect } from "react";
import { CalendarDays, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  deleteJournal,
  updateJournal,
} from "../../../features/journal/journal_slice";
import JournalEntryModal from "../journal/JournalEntryModal.jsx";

const INITIAL_ENTRIES_TO_SHOW = 5;

const JournalSidebar = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [modalEntry, setModalEntry] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(search), 700);
    return () => clearTimeout(delay);
  }, [search]);

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const allEntries = useSelector((state) => state.journal.journal);

  const sortedEntries = [...allEntries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let entriesToDisplay = sortedEntries;
  if (selectedDate) {
    entriesToDisplay = sortedEntries.filter(
      (e) => new Date(e.createdAt).toISOString().slice(0, 10) === selectedDate
    );
  } else if (debouncedSearch) {
    entriesToDisplay = sortedEntries.filter((e) => {
      const dateStr = e.createdAt;
      return (
        e.entry.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        dateStr.includes(debouncedSearch)
      );
    });
  } else {
    entriesToDisplay = sortedEntries.slice(0, INITIAL_ENTRIES_TO_SHOW);
  }

  const handleDelete = (id) => {
    dispatch(deleteJournal(id));
    setModalEntry(null);
  };

  const handleUpdate = (updated) => {
    dispatch(updateJournal(updated));
    setModalEntry(updated);
  };

  return (
    <div
      className={clsx(
        "h-full p-4 flex flex-col",
        isDark ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
      )}
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" /> My Journal
      </h2>

      {/* Date picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSearch("");
        }}
        className={clsx(
          "w-full mb-4 px-3 py-2 rounded-md border focus:outline-orange-500",
          isDark
            ? "bg-gray-600 border-gray-500 text-gray-100"
            : "bg-gray-100 border-gray-300 text-gray-800"
        )}
      />

      {/* Search field */}
      <input
        type="text"
        placeholder="Search all entries..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedDate("");
        }}
        className={clsx(
          "w-full mb-4 px-3 py-2 rounded-md border focus:outline-orange-500",
          isDark
            ? "bg-gray-600 border-gray-500 text-gray-100"
            : "bg-gray-100 border-gray-300 text-gray-800"
        )}
      />

      {/* Entries list */}
      <div className="overflow-y-auto flex-1 pr-2">
        {entriesToDisplay.length > 0 ? (
          entriesToDisplay.map((entry) => {
            const entryDateOnly = new Date(entry.createdAt)
              .toISOString()
              .slice(0, 10);
            const isActive = selectedDate === entryDateOnly;

            return (
              <div
                key={entry.id}
                onClick={() => setModalEntry(entry)}
                className={clsx(
                  "p-3 mb-2 rounded-md cursor-pointer transition-shadow",
                  isDark
                    ? isActive
                      ? "bg-gray-600"
                      : "bg-gray-800 hover:bg-gray-700 shadow-inner"
                    : isActive
                    ? "bg-orange-200"
                    : "bg-gray-100 hover:bg-orange-100 shadow-sm"
                )}
              >
                <p className="flex items-center gap-2 font-medium">
                  <FileText
                    className={clsx(
                      "w-4 h-4",
                      isDark ? "text-orange-300" : "text-orange-500"
                    )}
                  />
                  {entry.entry.substring(0, 100)}
                  {entry.entry.length > 100 && "…"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-center text-gray-500">No entries found.</p>
        )}
      </div>

      {/* Modal */}
      {modalEntry && (
        <JournalEntryModal
          entry={modalEntry}
          onClose={() => setModalEntry(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          isDark={isDark}
        />
      )}
    </div>
  );
};

export default JournalSidebar;
