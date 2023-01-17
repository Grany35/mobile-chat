import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";
import { authenticate, setDidTryAutoLogin } from "../store/authSlice";
import { getUserData } from "../utils/actions/userActions";
import { AuthResponse } from "../utils/interfaces/AuthResponse";

const StartUpScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthData = await AsyncStorage.getItem("userData");
      if (!storedAuthData) {
        dispatch(setDidTryAutoLogin(true));
        return;
      }
      const parsedData = JSON.parse(storedAuthData) as AuthResponse;
      const expirtDate = parsedData.expiration
        ? new Date(parsedData.expiration)
        : null;
      if ((expirtDate && expirtDate <= new Date()) || !parsedData.accessToken) {
        dispatch(setDidTryAutoLogin(true));
        return;
      }
      const userData = parsedData.id ? await getUserData(parsedData.id) : null;
      dispatch(authenticate(userData as AuthResponse));
    };
    tryLogin();
  }, []);

  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  );
};

export default StartUpScreen;
