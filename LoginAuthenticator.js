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

import { useDispatch, useSelector } from "react-redux";

export default function LoginAuthenticator() {
  const colorScheme = useColorScheme();
  const statusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
  const darkThemeContainer =
    colorScheme === "dark" ? styles.darkThemeContainer : null;
  let user = null;

  const [email, onEmailChanges] = React.useState();
  const [password, onPasswordChanges] = React.useState();


    const dispatch = useDispatch();
        const userLocation = useSelector((state) => state.userLocation);
        const userSession = useSelector((state) => state.userSession);
          useEffect(() => {
    receiveUserLocation();
    getUserSession();
  }, []);
  const receiveUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        // set user location to embarcadero if user doesn't grant location permission
        payload: { latitude: 8.93190, longitude: 38.687726 },
       
      });
    } else {
      let location = await Location.getCurrentPositionAsync({
        accuracy:
          Platform.OS === "android"
            ? Location.Accuracy.Lowest
            : Location.Accuracy.Lowest,
      });

      // dispatch to redux store
      // will be used to show closest stations and to center the live map.
      dispatch({
        type: "RECEIVE_USER_LOCATION",
        payload: location.coords,
      });

      // add to firestore
      // await db.collection('locations').add({latitude: location.coords.latitude, longitude: location.coords.longitude, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
    }
  };

  const _storeUserSession = async (loggingOff) => {
    try {
      dispatch({
        type: "UPDATE_USER",
        payload: loggingOff ? '' : `${Date.now()}`,
      });
      await AsyncStorage.setItem(
        'userSession', loggingOff ? '' : `${Date.now()}`
      );
    } catch (error) {
      console.log(error)
      // Error saving data
      console.log("Something went wrong while saving user session")
    }
  };

  const _retrieveUserSession = async () => {
  try {
    const value = await AsyncStorage.getItem('userSession');
    if (value !== null) {
      // We have data!!
      console.log("WOW, we have user session ", value);
      return value;
    } else {
      console.log("There is no user another  session")
      return null;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Something went wrong fetching user session");
    return null;
  }
};

  const setUserSession = async () => {
    console.log('setUserSession called')
    await _storeUserSession();
  }

  const logOff = async () => {
    await _storeUserSession(true);
  }

  const getUserSession = async () => {
      console.log('getUserSession called')
    const a = await _retrieveUserSession();;
    console.log('userSession', a);
    
    dispatch({
    type: "UPDATE_USER",
    payload: a,
    });
    
    // return a;
  }

  console.log('userSession ', userSession.user);
  if (userLocation.coords.latitude == null) { 
  return (
      <ImageBackground
        source={require("./assets/splash.png")}
        style={styles.imageBackground}
      ></ImageBackground>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        { userSession.user && (<Navigation />) }
        { !userSession.user && (
        <SafeAreaView>
          <TextInput
            style={{
                padding:5,
              height: 40,
              margin: 12,
              borderWidth: 1,
            }}
            onChangeText={onEmailChanges}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding:5,
            }}
            onChangeText={onPasswordChanges}
            value={password}
            placeholder="password"
            secureTextEntry
          />
          <View style={styles.button} >
              <View style={styles.buttonone} >
                  <Button
            
              title="Log In"
              onPress={setUserSession}
            />

              </View>

              {/* <View style={styles.buttontwo} >
                  <Button
              title="Log out"
              onPress={logOff}
            />
              </View> */}
              
          

          </View>
           
            </SafeAreaView>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },

  buttonone:{
      padding:5,
    
  },
   buttontwo:{
      padding:5,
  },
  
  
  imageBackground: {
    width: "100%",
    height: "100%",
  },
});
