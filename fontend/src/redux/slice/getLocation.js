import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  recipient_info: {
    recipient_name: "",
    recipient_email: "",
    recipient_phone: "",
    shipping_address: "",
    notes: "",
  },
};
export const getLocation = createSlice({
  name: "getLocation",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.recipient_info.recipient_name = action.payload.name;
      state.recipient_info.recipient_email = action.payload.email;
      state.recipient_info.recipient_phone = action.payload.phone;
      state.recipient_info.shipping_address = action.payload.address;
      state.recipient_info.notes = action.payload.notes;
    },
  },
});
export const { getInfo } = getLocation.actions;
