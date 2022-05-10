import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const AssetDetailsScreen = (props) => {
  const favourite = useSelector((state) => state.asset.favourite);

  const dispatch = useDispatch();
  const singleAssetPriceTimeSeries = useSelector(
    (state) => state.asset.priceTimeSeries
  );

  useEffect(() => {
    fetchSingleAsset();
    fetchAssetTimeSeries();
  }, [props.route.params.id]);

  const fetchAssetTimeSeries = () => {
    const now = Date.now();
    const start = now - 9 * 24 * 60 * 60 * 1000;

    fetch(
      `https://data.messari.io/api/v1/assets/${props.route.params.id}/metrics/price/time-series?interval=1d&end=${now}&start=${start}`
    )
      .then((res) => res.json())
      .then((json) => {
        const changes = [];
        let [yesterday] = json.data.values;

        json.data.values.slice(1).forEach((day) => {
          let localChange = [day[0]];
          for (let i = 1; i < day.length; i++) {
            localChange[i] = day[i] - yesterday[i];
          }
          yesterday = day;
          changes.push(localChange);
        });
        dispatch({
          type: "ADD_ASSET_PRICE_TIME_SERIES",
          payload: changes,
        });
      })
      .catch((err) => console.log("error in fetchAssetTimeSeries", err));
  };

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
    const item = props.route.params.item;
    // console.log("handleFavourite called");
    dispatch({ type: "CHANGE_FAVOURITE", payload: item.slug });
    setFavOnLocal(item);
  };

  const setFavOnLocal = async (item) => {
    // console.log("irem", item.slug)
    // await AsyncStorage.removeItem("key");
    // return;
    const state = await AsyncStorage.getItem("key");
    let stateParsed = await JSON.parse(state);
    let storageExist = stateParsed ?? false;
    // console.log("Storage exists", storageExist);
    if (storageExist) {
      // console.log("inverted value", !stateParsed[item.slug]);
      stateParsed[item.slug] = item;
      stateParsed[item.slug].isFavorite = !stateParsed[item.slug].isFavorite;
      await AsyncStorage.setItem("key", JSON.stringify(stateParsed));
    } else {
      await AsyncStorage.setItem(
        "key",
        JSON.stringify({
          [item.slug]: {
            ...item,
            isFavorite: true,
          },
        })
      );
    }
    dispatch({ type: "UPDATE_FROM_LOCAL", payload: stateParsed });
  };

  const slug = props.route.params.item.slug;
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={{ maxWidth: 125 }}>
          <Text>
            {props.route.params.name}
            {"\n"}
          </Text>

          <Text>${props.route.params.price.toFixed(3)}</Text>
        </View>
        <View>
          <Ionicons
            onPress={() => handleFavourite()}
            name={
              favourite[slug] && favourite[slug]?.isFavorite === true
                ? "star"
                : "star-outline"
            }
            size={32}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
      {singleAssetPriceTimeSeries.length > 0 ? (
        <View>
          <LineChart
            data={{
              labels: singleAssetPriceTimeSeries.map(
                (each) => new Date(each[0]).getDate()
              ),
              legend: ["open", "high", "low", "close"],
              datasets: [
                {
                  data: singleAssetPriceTimeSeries.map((each) => each[1]), //Array of values
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                  strokeWidth: 2,// optional
                },
                {
                  data: singleAssetPriceTimeSeries.map((each) => each[2]), //Array of values
                  color: (opacity = 1) => `rgba(65,134, 244, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
                {
                  data: singleAssetPriceTimeSeries.map((each) => each[3]), //Array of values
                  color: (opacity = 1) => `rgba(244,134, 65, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
                {
                  data: singleAssetPriceTimeSeries.map((each) => each[4]), //Array of values
                  color: (opacity = 1) => `rgba(134, 244, 65, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
              ],
            }}
            // width={4* 10 + 350}
            width={Dimensions.get("window").width}
            height={450}

            verticalLabelRotation={20}
            // withInnerLines={false}
            chartConfig={{
              // backgroundGradientFrom: 0,
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              backgroundGradientFromOpacity: 0,
              // backgroundGradientTo: 0,
              backgroundGradientToOpacity: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              // backgroundColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2, // optional, default 3
            }}
            // bezier // type of line chart
          />
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#294754" />
        </View>
      )}
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
    justifyContent: "flex-start",
  },
  loading: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 170,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: "60%",
    marginVertical: 10,
    marginLeft: 20,
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
