import React from 'react'
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import MapView, { Polyline } from 'react-native-maps';
import { useIsFocused } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
import Markers from './components/Marker';


const LiveMapScreen = () => {
     const userLocation = useSelector((state) => state.userLocation);
       const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const {
    routes: { route }
  } = require("../TrainData/coordinates");

     const latitude = userLocation.coords.latitude;
     const longitude = userLocation.coords.longitude;

     const setMapRegion = ()=>{
       return{
         latitude:parseFloat(latitude),
         longitude:parseFloat(longitude)
       }
     }
       return (
        <View style={styles.container} >
             <MapView style={styles.map} 
             region={{
               ...setMapRegion(),
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
             >
          <Markers/>
             </MapView>      
        </View>
    )

     
    
}

export default LiveMapScreen

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
