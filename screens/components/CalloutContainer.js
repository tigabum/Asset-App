import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, useColorScheme, Alert } from "react-native";
import MapView from "react-native-maps";

const CalloutContainer = props => {
  const { stationName, stationAbbr } = props;
  // const dispatch = useDispatch(); //

  const [stationData, setStationData] = useState([]);
  const colorScheme = useColorScheme();
 const backgroundStyle = colorScheme === "dark" ? styles.darkThemeContainer : null;
  const textStyle = colorScheme === "dark" ? styles.darkThemeText : null;

  return (
    <MapView.Callout
      key={stationAbbr}
      tooltip={true}
      style={[styles.calloutContainer, backgroundStyle]}
    >
      <View style={styles.calloutHeader}>
        <Text style={[styles.stationName, textStyle]}>{stationName}</Text>
      </View>
    </MapView.Callout>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "#ffffff",
    borderColor: "gray",
    borderRadius: 15,
    padding: 5,
    flex: 1
  },
  darkThemeContainer: {
    backgroundColor: '#000000'
  },
  darkThemeText: {
    color: '#ffffff'
  },
  calloutHeader: {
    marginHorizontal: 5,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#c4c1b9",
    flex: 1
  },
  calloutContent: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 8,
    flex: 1
  },
  stationName: {
    fontWeight: "bold"
  }
});

export default CalloutContainer;
