import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import backend from "../constants/backend";
import {
  AuthResponse,
  UserOperationClaim,
} from "../utils/interfaces/AuthResponse";

const initialStateRes: AuthResponse = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  accessToken: null,
  expiration: null,
  userOperationClaims: null,
  profileImage: null,
  about:null
};

interface AuthenticatePayload {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  accessToken: string | null;
  expiration: Date | null;
  userOperationClaims: UserOperationClaim[] | null;
  profileImage: string | null;
  about:string | null
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
      state.didTryAutoLogin = true;
      state.profileImage=payload.profileImage?backend.apiAddress + payload.profileImage:payload.profileImage;
      state.about = payload.about;
    },
    setDidTryAutoLogin: (state, action) => {
      state.didTryAutoLogin = action.payload;
    },
    logout: (state: any, action) => {
      state.accessToken = null;
      state.email = null;
      state.expiration = null;
      state.firstName = null;
      state.lastName = null;
      state.id = null;
      state.userOperationClaims = null;
      state.didTryAutoLogin = action.payload;
    },
    updateLoggedInUserData: (state: any, action) => {
      state = { ...state, ...action.payload.newData };
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export const logout = authSlice.actions.logout;
export const updateLoggedInUserData = authSlice.actions.updateLoggedInUserData;
export default authSlice.reducer;
