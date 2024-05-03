import { createSlice } from "@reduxjs/toolkit";
//import config from '../../shared/const/Config';

const initialState = {
  env: "dev", // dev/prod
};

// actions
const actions = {
  updateState(state, action) {
    Object.assign(state, action.payload);
  },
};

const AppSlice = createSlice({
  name: "slice/AppSlice",
  initialState: initialState,
  reducers: actions,
  // extraReducers: {},
});

export default AppSlice.reducer;
// export const {} = AppSlice.actions;
