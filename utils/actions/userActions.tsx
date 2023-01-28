import axios from "axios";
import { useSelector } from "react-redux";
import backend from "../../constants/backend";
import { AuthResponse } from "../interfaces/AuthResponse";
import { UserModel } from "../interfaces/userModel";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUserData = async (userId: number) => {
  try {
    const result = (
      await axios.get(backend.apiAddress + `api/Users/getById/${userId}`)
    ).data as AuthResponse;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const searchUsers = async (queryText: string) => {
  try {
    const users = (
      await axios.get(
        backend.apiAddress + `api/Users/GetList?Keyword=${queryText}`
      )
    ).data as UserModel[];

    return users;
  } catch (error) {
    console.log(error);
  }
};
