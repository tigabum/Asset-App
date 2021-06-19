import React, { useEffect } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-navigation";
import rootReducer from "./reducers/rootReducer";
import Navigation from "./Navigation";
import { useColorScheme } from "react-native-appearance";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import LoginAuthenticator from "./LoginAuthenticator";

import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const store = createStore(rootReducer);
  const colorScheme = useColorScheme();
  const statusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
  const darkThemeContainer =
    colorScheme === "dark" ? styles.darkThemeContainer : null;
  

  return (
    <Provider store={store}>
      <LoginAuthenticator />
    </Provider>
  );

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
