import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";

const AssetDetailsScreen = (props) => {
  const favourite = useSelector((state) => state.asset.favourite);

  const dispatch = useDispatch();
  const singleAssetData = useSelector((state) => state.asset);

  useEffect(() => {
    fetchSingleAsset();
  }, [props.route.params.id]);

  const fetchSingleAsset = () => {
    fetch(
      `https://data.messari.io/api/v1/assets/${props.route.params.id}/metrics`
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "ADD_ASSET", payload: json.data });
      })
      .catch((err) => console.log("error in single fetch", err));
  };

  const handleFavourite = () => {
    const slug = props.route.params.item.slug;
    dispatch({ type: "CHANGE_FAVOURITE", payload: slug });
    setFavOnLocal(slug);
  };

  const setFavOnLocal = async (slug) => {
    // console.log("irem", item.slug)
    // await AsyncStorage.removeItem("key");
    // return;
    const state = await AsyncStorage.getItem("key");
    let stateParsed = await JSON.parse(state);

    let storageExist = stateParsed ?? false;
    if (storageExist) {
      stateParsed[slug] = !stateParsed[slug];
      await AsyncStorage.setItem("key", JSON.stringify(stateParsed));
    } else {
      await AsyncStorage.setItem("key", JSON.stringify({ [slug]: true }));
    }
    dispatch({ type: "UPDATE_FROM_LOCAL", payload: stateParsed });
  };

  const slug = props.route.params.item.slug;
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.namePrice}>
          <Text>
            {props.route.params.name}
            {"\n"}
          </Text>

          <Text>${props.route.params.price.toFixed(4)}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleFavourite()}>
            <MaterialIcons
              name={
                favourite && favourite[slug] === true
                  ? "favorite"
                  : "favorite-border"
              }
              size={32}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["Jun", "May", "Apr", "Mar", "Feb", "Jan"], //Array of labels [Jun 21,May 21,Apr 21,Mar 21,Feb 21,Jan 21]
          datasets: [
            {
              data: [4.3, 4.8, 5, 5, 4.9, 4.8], //Array of values
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2, // optional
            },
          ],
        }}
        width={8* 10 + 350}
        height={320}
        verticalLabelRotation={70}
        withInnerLines={false}
        chartConfig={{
          backgroundGradientFrom: 0,
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // optional, default 3
        }}
        bezier // type of line chart
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  namePrice: {},
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: "60%",
    marginVertical: 10,
    
    justifyContent: "space-between",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 36,
  },
});

export default AssetDetailsScreen;
