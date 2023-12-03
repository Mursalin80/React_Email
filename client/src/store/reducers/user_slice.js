import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUser = createAsyncThunk("users/fetchByIdStatus", async () => {
  const user = await axios.get("/api/current_user");
  // .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
  console.log({ Fetch_user_Res: user });

  // const response = await userAPI.fetchById(userId);
  return user.data;
  // return response.data;
});

export const fetchStripeToken = createAsyncThunk(
  "users/stripeToken",
  async (token) => {
    const stripeToken = await axios.post("/api/stripe", token);
    // .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
    console.log({ stripeToken });

    return stripeToken.data;
    // return response.data;
  }
);

const initialState = {
  user: null,
  loading: "idle",
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
      // Add user to the state array
      state.user = { ...state.user, ...action.payload };
    });
  },
});

export const authReducer = authSlice.reducer;
