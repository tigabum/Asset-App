import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import React from "react";
import Reservation from "./Reservation";
import QRGenerator from "./QrGenerator";

import TripPlannerHomeScreen from "./TripPlannerHomeScreen";
import TripPlannerResultsNavigator from "./TripPlannerResultsNavigator";

const Stack = createStackNavigator();

export default function TripPlannerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="TripPlanner Home"
      screenOptions={{
        gestureEnabled: false,
        headerTitleStyle: { fontSize: 18 }
      }}
    >
      <Stack.Screen
        name="TripPlanner Home"
        component={TripPlannerHomeScreen}
        options={{ title: "Trip Planner", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="TripPlanner Results Navigator"
        component={TripPlannerResultsNavigator}
        options={{ title: "Results", headerTitleAlign: "center" }}
      />
      <Stack.Screen
      name="reservation"
      component={Reservation}
      options={{title:'Reservation', headerTitleAlign:'center'}}
      />
      <Stack.Screen
      name="QRCodeGenerator"
      component={QRGenerator}
      options={{title:'QRCode', headerTitleAlign:'center'}}
      />
    </Stack.Navigator>
  ); 
}
