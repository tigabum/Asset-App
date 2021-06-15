import React from 'react';
import {  StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-navigation";
import rootReducer from "./reducers/rootReducer";
import Navigation from "./Navigation";
import { useColorScheme } from "react-native-appearance";

export default function App() {
    const store = createStore(rootReducer);
      const colorScheme = useColorScheme();
      const statusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
  const darkThemeContainer =
    colorScheme === "dark" ? styles.darkThemeContainer : null;
    let user = null;
   
       return (
      <Provider store={store}>
        <StatusBar barStyle={statusBarStyle} />
  
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    
      
    </Provider>
  );

  //   }else{
  //     return (
  //     <Provider store={store}>
  //       {/* <StatusBar barStyle={statusBarStyle} />
  
  //     <SafeAreaView style={styles.container}>
  //       <Navigation />
  //     </SafeAreaView> */}
  //     <View><Text>Login </Text></View>
    
      
  //   </Provider>
  // );
  //   }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
