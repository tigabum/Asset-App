import React, { useState } from "react";
import MapView from "react-native-maps";
import station_ios from "../../assets/station_ios.png";
import station_android from "../../assets/station_android.png";
import { Platform,View,Text } from "react-native";
import { useColorScheme } from "react-native-appearance";


export default function Markers() {
  const {
    stations: { station }
  } = require("../../TrainData/stations");

  const [clickedMarkerRef, setClickedMarkerRef] = useState({});

    return (
        <MapView.Marker
        key={1}
        coordinate={{
            latitude:9.019319505745512, 
            longitude: 38.80223829742719
        }}
        image={Platform.OS === "ios" ? station_ios : station_android}
         zIndex={100}
        tracksInfoWindowChanges={true}
        title="new text"
        
        >

        </MapView.Marker> 
    //   <MapView.Marker
    //     key={trainStation.abbr}
    //     coordinate={{
    //       latitude: parseFloat(trainStation.gtfs_latitude),
    //       longitude: parseFloat(trainStation.gtfs_longitude)
    //     }}
    //     image={Platform.OS === "ios" ? station_ios : station_android}
    //     zIndex={100}
    //     tracksInfoWindowChanges={true}
    //     onPress={() => setClickedMarkerRef(index)}
    //   >
       
    //   </MapView.Marker>
   
    );
  
}
