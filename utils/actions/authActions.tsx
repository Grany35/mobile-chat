import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { authenticate } from "../../store/authSlice";
import { AuthResponse } from "../interfaces/AuthResponse";

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return async (dispatch) => {
    await axios
      .post("http://localhost:5146/api/Auth/Register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => console.log("res:", res))
      .catch((err) => {
        if (err !== null) {
          throw new Error(err.response.data.Message);
        }
      });
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch) => {
    try {
      const result = (await axios.post("http://localhost:5146/api/Auth/Login", {
        email,
        password,
      })).data as AuthResponse;
      dispatch(authenticate(result));
      saveDataToStorage(result);
    } catch (error) {
      if (error instanceof Error) {
        //TODO: display error message
        console.log(error.message);
      }
    }
    // .catch((err) => {
    //   if (err !== null) {
    //     throw new Error(err.response.data.Message);
    //   }
    // })
    // .finally(dispatch(authenticate(userData)));
  };
};

const saveDataToStorage = (userData: any) => {
  AsyncStorage.setItem("userData", JSON.stringify(userData));
}
