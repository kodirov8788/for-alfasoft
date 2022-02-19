import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
const initialStateValue = "";

export const themeSlice = createSlice({

  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    changeColor: (state, action) => {
      state.value = action.payload;
    },
  },
});

const kodirov__box = JSON.parse(
  localStorage.getItem("kodirov__box")
);





export const { changeColor } = themeSlice.actions;

export default themeSlice.reducer;
