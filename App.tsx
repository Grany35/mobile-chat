import "react-native-gesture-handler";
import { StyleSheet,AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

//AsyncStorage.clear();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(()=>{
    console.log(appState)
  },[AppState.currentState])

  useEffect(() => {
   const subscription= AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
      }
      setAppState(nextAppState);
    }
  };

  console.log(appState)
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
