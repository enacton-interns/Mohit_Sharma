import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import themeReducer from "../features/theme/theme_slice.js";
import journalReducer from "../features/journal/journal_slice.js";
import moodReducer from "../features/journal/mood_slice.js";

const logger = createLogger();

const store = configureStore({
  reducer: {
    theme: themeReducer,
    journal: journalReducer,
    mood: moodReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
