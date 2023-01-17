import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthResponse } from "../interfaces/AuthResponse";

export const getUserData = async (userId: number) => {
  try {
    const result = (await axios.get(
      `http://localhost:5146/api/Users/getById/${userId}`
    )).data as AuthResponse;
    return result;
  } catch (error) {
    console.log(error);
  }
};
