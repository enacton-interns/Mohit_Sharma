import { createSlice } from "@reduxjs/toolkit";

const themeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
