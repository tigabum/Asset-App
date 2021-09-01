
import { View, Text,StyleSheet} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native-appearance";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

import ClosestStationListScreen from "./ClosestStationListScreen";
import FavoriteListScreen from "./FavoriteListScreen";
import StationDetailsScreen from "./StationDetailsScreen";


const Stack = createStackNavigator();


const StationsNavigator = () => {
      const dispatch = useDispatch();
      const scheme = useColorScheme();
        const [favorite, setFavorite] = useState({});
       
        function updateFavoriteStatus(){
          

        }
      

    return (
        <Stack.Navigator
          initialRouteName="StationList"
      screenOptions={{
        gestureEnabled: false
      }}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18
        }
      }}
        
        >
            <Stack.Screen
        name="Closest Stations"
        component={ClosestStationListScreen}
        initialParams={{ displaySearchBar: false }}
        options={({ route, navigation }) => ({
          headerRight: () => (
            <MaterialIcons
              name="search"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginRight: 10 }}
              onPress={() =>
                dispatch({
                  type: "SHOW_SEARCH_BAR"
                })
              }
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name="heart-box"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate("Favorite Stations");
              }}
            />
          ),
          // set title to center for Android (default: left)
          headerTitleAlign: "center"
        })}
      />
           <Stack.Screen
        name="Favorite Stations"
        component={FavoriteListScreen}
        initialParams={{ displaySearchBar: false, favorites: favorite }}
        options={({ route, navigation }) => ({
          headerRight: () => (
            <MaterialIcons
              name="search"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginRight: 10 }}
              onPress={() =>
                dispatch({
                  type: "SHOW_SEARCH_BAR"
                })
              }
            />
          ),
          headerLeft: () => (
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate("Closest Stations");
              }}
            />
          ),
          // set title to center for Android (default: left)
          headerTitleAlign: "center"
        })}
      />
       <Stack.Screen
        name="StationDetails"
        component={StationDetailsScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
          // headerForceInset: { top: "never", bottom: "never" },
          headerLeft: () => (
            <Ionicons
              name="md-locate"
              size={32}
              color={scheme === "dark" ? "white" : "black"}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <MaterialIcons
              name={
                favorite[route.params.abbr] === "true"
                  ? "favorite"
                  : "favorite-border"
              }
              size={32}
              color="red"
              style={{ marginRight: 10 }}
              onPress={() => updateFavoriteStatus(route.params.abbr)}
            />
          ),
          headerTitleAlign: "center"
        })}
      />

        </Stack.Navigator>
    )
}

export default StationsNavigator
const styles = StyleSheet.create({
    container:{
        flex:1,
          backgroundColor:'#eee',
         padding:5,
          borderWidth:1,
    },
    text:{
        color:'black',
        padding:5,
    }
})
