import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './screens/ChatListScreen';
import ChatSettingsScreen from './screens/ChatSettingsScreen';


const Stack = createStackNavigator();

export default function App() {


  return (
    <SafeAreaProvider style={styles.container}>

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen name="Home" component={ChatListScreen} />
          <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
