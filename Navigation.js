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
      const userLocation = useSelector((state) => state.userLocation);
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
