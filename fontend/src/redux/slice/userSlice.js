import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../middlewares/userMiddlewares";
const initialState = {
  profile: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = {};
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const { clearProfile, setProfile } = userSlice.actions;
