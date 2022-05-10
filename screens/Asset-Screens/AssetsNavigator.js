import { View, Text, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native-appearance";
import { useDispatch } from "react-redux";

import AssetLIstsScreen from "./AssetLIstsScreen";
import FavoriteListScreen from "./FavoriteListScreen";
import AssetDetailsScreen from "./AssetDetailsScreen";

const Stack = createStackNavigator();

const AssetsNavigator = () => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Assets Lists"
      screenOptions={{
        gestureEnabled: false,
      }}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Assets Lists"
        component={AssetLIstsScreen}
        // initialParams={{ displaySearchBar: false }}
        options={({ route, navigation }) => ({
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Favorite Assets"
        component={FavoriteListScreen}
        options={({ route, navigation }) => ({
          title: "Favour",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="AssetDetails"
        component={AssetDetailsScreen}
        options={({ route, navigation }) => ({
          title: "Asset Details",
          headerLeft: () => (
            <Ionicons
              name="list-circle-outline"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 5,
    borderWidth: 1,
  },
  text: {
    color: "black",
    padding: 5,
  },
});

export default AssetsNavigator;
