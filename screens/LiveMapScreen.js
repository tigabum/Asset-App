import React from 'react'
import { View, Text, StyleSheet,Dimensions } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import MapView, { Polyline } from 'react-native-maps';
import { useIsFocused } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";


const LiveMapScreen = () => {
     const userLocation = useSelector((state) => state.userLocation);
       const isFocused = useIsFocused();
  const colorScheme = useColorScheme();
  const {
    routes: { route }
  } = require("../TrainData/coordinates");

     const latitude = userLocation.coords.latitude;
     const longitude = userLocation.coords.longitude;

     
    return (
        <View style={styles.container} >
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
              <MapView.Marker
        key={1}
        coordinate={{
            latitude:9.019319505745512, 
            longitude: 38.80223829742719
        }}
        // image={Platform.OS === "ios" ? station_ios : station_android}
         zIndex={100}
        tracksInfoWindowChanges={true}
        title="new text"
        
        >

        </MapView.Marker>
              
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
