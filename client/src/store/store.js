import { configureStore } from "@reduxjs/toolkit";
import counterReducre from "./reducers/counter_slice";
import { authReducer } from "./reducers/user_slice";

export default configureStore({
  reducer: {
    counter: counterReducre,
    auth: authReducer,
  },
});
