import { createSlice } from "@reduxjs/toolkit";

// Load journals from localStorage
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("journals");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to load journals from localStorage:", err);
    return [];
  }
};

const initialState = {
  journal: loadFromLocalStorage(),
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setJournal: (state, action) => {
      state.journal.push({
        id: Date.now(), // unique ID
        ...action.payload,
        createdAt: new Date().toISOString(),
      });

      // Update localStorage after pushing
      localStorage.setItem("journals", JSON.stringify(state.journal));
    },

    deleteJournal: (state, action) => {
      state.journal = state.journal.filter(
        (entry) => entry.id !== action.payload
      );
      localStorage.setItem("journals", JSON.stringify(state.journal));
    },

    updateJournal: (state, action) => {
      const updatedEntry = action.payload;
      const index = state.journal.findIndex(
        (entry) => entry.id === updatedEntry.id
      );
      if (index !== -1) {
        state.journal[index] = updatedEntry;
        localStorage.setItem("journals", JSON.stringify(state.journal));
      }
    },

    clearJournal: (state) => {
      state.journal = [];
      localStorage.removeItem("journals");
    },
  },
});

export default journalSlice.reducer;

export const { setJournal, deleteJournal, updateJournal, clearJournal } =
  journalSlice.actions;
