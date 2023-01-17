import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/AuthScreen";
import { useSelector } from "react-redux";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector(
    (state: any) =>
      state.auth.accessToken !== null &&
      state.auth.accessToken !== "" &&
      new Date(state.auth.expiration) > new Date()
  );
  const didTryAutoLogin = useSelector(
    (state: any) => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />} 
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
