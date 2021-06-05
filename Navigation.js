import React,{useEffect} from 'react'
import { View, Text,ImageBackground, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

import LiveMapScreen from "./screens/LiveMapScreen";
import StationsNavigator from "./screens/station-schedules/StationsNavigator";
import TripPlannerNavigator from "./screens/trip-planner/TripPlannerNavigator";
import AdvisoryNavigator from "./screens/advisories/AdvisoryNavigator";
import MoreScreenNavigator from "./screens/more/MoreScreenNavigator";
import { useDispatch, useSelector } from "react-redux";

export default function Navigation() {
  // let user = "name";

     const Tab = createBottomTabNavigator();
     const scheme = useColorScheme();
     const iconColor = scheme === "dark" ? "white" : "gray";
      const dispatch = useDispatch();
        const userLocation = useSelector((state) => state.userLocation);
          useEffect(() => {
    receiveUserLocation();
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
  // if(user){
  //   return <View><Text>Login</Text></View>
  // }
     if (userLocation.coords.latitude !== null) {
        return (
         <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme} >
        <Tab.Navigator initialRouteName="Station List">
          <Tab.Screen
            name="Station List"
            component={StationsNavigator}
            options={{
              tabBarIcon: () => (
                <Ionicons
                  name="md-list"
                  size={28}
                color={iconColor}
                  style={styles.tabIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Live Map"
            component={LiveMapScreen}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="google-maps"
                  size={28}
                  color={iconColor}
                  style={styles.tabIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Trip Planner"
            component={TripPlannerNavigator}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="transit-transfer"
                  size={28}
                 color={iconColor}
                  style={styles.tabIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Advisories"
            component={AdvisoryNavigator}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="bell-alert"
                  size={28}
                  color={iconColor}
                  style={styles.tabIcon}
                />
              ),
            }}
          />
          <Tab.Screen
            name="More"
            component={MoreScreenNavigator}
            options={{
              tabBarIcon: () => (
                <Ionicons
                  name="md-list"
                  color={iconColor}
                  style={styles.tabIcon}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )

    }else {
    return (
      <ImageBackground
        source={require("./assets/splash.png")}
        style={styles.imageBackground}
      ></ImageBackground>
    );
  }
    
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  tabIcon: {
    marginTop: 5,
  },
});
