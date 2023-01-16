import { createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../utils/interfaces/AuthResponse";

const initialState: AuthResponse = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  accessToken: null,
  expiration: null,
  userOperationClaims: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.expiration = payload.expiration;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.id = payload.id;
      state.userOperationClaims = payload.userOperationClaims;
      console.log("state:", state);
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export default authSlice.reducer;
