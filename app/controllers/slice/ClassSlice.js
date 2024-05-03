import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: "", 
};

// actions
const actions = {
  updateState(state, action) {
    Object.assign(state, action.payload);
  },
};

const ClassSlice = createSlice({
  name: "slice/ClassSlice",
  initialState: initialState,
  reducers: actions,
  //   extraReducers: {},
});

export default ClassSlice.reducer;
export const ClassAction = ClassSlice.actions;
