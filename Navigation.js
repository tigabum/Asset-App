import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

import AssetsNavigator from "./screens/Asset-Screens/AssetsNavigator";
import FavoriteListScreen from "./screens/Asset-Screens/FavoriteListScreen";

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? "white" : "gray";

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Assets Lists">
        <Tab.Screen
          name="Home"
          component={AssetsNavigator}
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
          name="Favourite"
          component={FavoriteListScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
            

          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
