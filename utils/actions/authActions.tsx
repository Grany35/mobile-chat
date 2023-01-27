import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { authenticate, logout } from "../../store/authSlice";
import { AuthResponse } from "../interfaces/AuthResponse";
import { UserUpdateModel } from "../interfaces/userUpdateModel";
import { createHubConnection } from "./hubActions";

let timer;

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const result = axios.post("http://localhost:5146/api/Auth/Register", {
      firstName,
      lastName,
      email,
      password,
    });
    console.log(result);
    console.log(password, email, firstName, lastName);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (email: string, password: string) => {
  return async (dispatch) => {
    try {
      const result = (
        await axios.post("http://localhost:5146/api/Auth/Login", {
          email,
          password,
        })
      ).data as AuthResponse;

      createHubConnection(result.accessToken)

      //* Calculate time until token expires
      const expiryDate = result.expiration
        ? new Date(result.expiration).getTime()
        : new Date().getTime();
      const timeNow = new Date().getTime();
      const miliSecUntilExpiry = expiryDate - timeNow;

      //* Auto logout after token expires
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, miliSecUntilExpiry);

      dispatch(authenticate(result));
      saveDataToStorage(result);
    } catch (error) {
      if (error instanceof Error) {
        //TODO: display error message
        console.log(error.message);
      }
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout(false));
  };
};

export const updateSignedInUserData = async (
  userId: number,
  model: UserUpdateModel
) => {
  model.id = userId;
  const url = "http://localhost:5146/api/Users/update-usersettings";
  await axios.post(url, model);
};

const saveDataToStorage = (userData: any) => {
  AsyncStorage.setItem("userData", JSON.stringify(userData));
};
