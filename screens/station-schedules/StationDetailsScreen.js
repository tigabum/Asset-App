import React from 'react'
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import MapView, { Polyline } from 'react-native-maps';
import { useIsFocused } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

const StationDetailsScreen = () => {
      const userLocation = useSelector((state) => state.userLocation);
       const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
     const latitude = userLocation.coords.latitude;
     const longitude = userLocation.coords.longitude;
    return (
        <View style={styles.container} >
            <Text style={{zIndex:100,marginTop:120, color:'red'}} >StationDetailsScreen</Text>
             <MapView style={styles.map} 
             region={{
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
            
          }}
           minZoomLevel={1}
          provider={null}
          loadingEnabled={true}
          mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
          customMapStyle={
            Platform.OS === "android" && colorScheme === "dark"
              ? customMap
              : null
          }
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          showsCompass={true}
          showsUserLocation={true}
             />
        </View>
    )
}

export default StationDetailsScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"center"
        
    },
     text:{
        color:"black",
        padding:5,
    },
    map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
