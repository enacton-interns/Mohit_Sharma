import { createSlice } from "@reduxjs/toolkit";

const moodState = {
  mood: {},
};

const moodSlice = createSlice({
  name: "mood",
  initialState: moodState,
  reducers: {
    setMood(state, action) {
      state.mood = action.payload;
    },
    clearMood(state) {
      state.mood = {};
    },
  },
});

export const { setMood, clearMood } = moodSlice.actions;
export default moodSlice.reducer;
