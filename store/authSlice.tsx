import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthResponse,
  UserOperationClaim,
} from "../utils/interfaces/AuthResponse";

const initialState: AuthResponse = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  accessToken: null,
  expiration: null,
  userOperationClaims: null,
};

interface AuthenticatePayload {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  accessToken: string | null;
  expiration: Date | null;
  userOperationClaims: UserOperationClaim[] | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state: any, action: PayloadAction<AuthenticatePayload>) => {
      const { payload } = action;
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.expiration = payload.expiration;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.id = payload.id;
      state.userOperationClaims = payload.userOperationClaims;
      console.log("state:", state)
    },
    setDidTryAutoLogin: (state,action) => {
      state.didTryAutoLogin = action.payload;
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export default authSlice.reducer;
