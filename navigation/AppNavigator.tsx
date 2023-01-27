import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/AuthScreen";
import { useSelector } from "react-redux";
import StartUpScreen from "../screens/StartUpScreen";
import { AppState } from "react-native";
import { useHubConnection } from "../utils/actions/hubActions";

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

  const [appState, setAppState] = useState(AppState.currentState);
  const userData = useSelector((state: any) => state.auth);

  const { createHubConnection, stopHubConnection } = useHubConnection(
    userData.accessToken
  );

  useEffect(() => {
    if (appState === "active" && userData !== null) {
      createHubConnection();
    }
    if(appState === "background"||appState === "inactive" && userData !== null) {
      stopHubConnection();
    }
    
    console.log(appState);
  }, [appState]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />} 
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
