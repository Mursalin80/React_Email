import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUser = createAsyncThunk("users/fetchByIdStatus", async () => {
  const user = await axios.get("/api/current_user");

  return user.data;
});

export const fetchStripeToken = createAsyncThunk(
  "users/stripeToken",
  async (token) => {
    const stripeToken = await axios.post("/api/stripe", token);

    console.log({ stripeTokenRes: stripeToken });

    return stripeToken.data;
  }
);

const initialState = {
  user: null,
  loading: "idle",
  credits: 0,
};

// Then, handle actions in your reducers:
export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload;
    });
    builder.addCase(fetchStripeToken.fulfilled, (state, action) => {
      console.log({ stripePaymentPayload: action });
      state.user = { ...state.user, ...action.payload };
    });
  },
});

export const authReducer = authSlice.reducer;
