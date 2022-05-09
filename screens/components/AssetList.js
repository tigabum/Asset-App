import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useColorScheme } from "react-native-appearance";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const AssetList = (props) => {
  const favourite = useSelector((state) => state.asset.favourite);
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.assets.page);
  const assetLists = useSelector((state) => state.assets.product);
  const colorScheme = useColorScheme();
  const refreshing = useSelector((state) => state.assets.refereshing);

  useEffect(() => {
    getFavouriteItem();
  }, []);

  const handleLoadMore = () => {
    Alert.alert("You are reached end of the page");
    dispatch({
      type: "INCREMENT_PAGE",
    });
  };

  const setFavOnLocal = async (item) => {
      // console.log("irem", item.slug)
      // await AsyncStorage.removeItem("key");
      // return;
      const state = await AsyncStorage.getItem("key");
      let stateParsed = await JSON.parse(state);
      // console.log("local", stateParsed);
      // console.log("storage state before anything", stateParsed)
  
      let storageExist = stateParsed ?? false;
      console.log("Storage exists", storageExist);
      if (storageExist) {
        console.log("myinvertedval", item.slug);
        // stateParsed[item.slug] = !stateParsed[item.slug];
        const prevFavoriteValue = stateParsed[item.slug] && stateParsed[item.slug].isFavorite;
        stateParsed[item.slug] = item;
        stateParsed[item.slug].isFavorite = !prevFavoriteValue;
        
        await AsyncStorage.setItem("key", JSON.stringify(stateParsed));
        // console.log("after update with jm", await AsyncStorage.getItem("key"));
      } else {
        // set "true" because there is no element inside storage
        // console.log("state in storage is empty");
        await AsyncStorage.setItem("key", JSON.stringify({ [item.slug]: {
          ...item, isFavorite: true,
        } }));
        // console.log(
        //   "after updating first item",
        //   await AsyncStorage.getItem("key")
        // );
      }
      dispatch({ type: "UPDATE_FROM_LOCAL", payload: stateParsed });
    };

  const onRefresh = () => {
    // refreshindicator
    dispatch({ type: "SET_REFRESH", payload: true });
    // setRefreshing(true);
    wait(1000).then(() => {
      dispatch({ type: "REFRESH_FIRST_PAGE" });
      dispatch({ type: "SET_REFRESH", payload: false });
      //   setRefreshing(false);
    });
    if (pageNumber === 1) {
      props.loadMoreCallback();
    }
  };

  const getFavouriteItem = async () => {
    const state = AsyncStorage.getItem("key");
    // console.log("state => ", state);
    state.then((data) => {
      // console.log("promise data => ", data);
      let stateParsed = JSON.parse(data);
      dispatch({ type: "UPDATE_FROM_LOCAL", payload: stateParsed });
    });
  };

  const handleFavourite = (item, e) => {
    dispatch({ type: "CHANGE_FAVOURITE", payload: item.slug });
    // console.log(item.slug)
    setFavOnLocal(item);

    // console.log("item after dispatching", favourite)

    // setOnLocalStorage(item.slug);
  };

  const titleText =
    colorScheme === "dark" ? styles.darkTitle : styles.lightTitle;
  const distanceText =
    colorScheme === "dark" ? styles.darkDistance : styles.lightDistance;
  const borderColor = colorScheme === "dark" ? "#2E2A2A" : "#DFE5E7";

  if (props.assetLists.length > 0) {
    return (
      <FlatList
        style={{ width: "100%" }}
        // filter data by the query input
        data={props.assetLists}
        initialNumToRender={15}
        renderItem={({ item }) => (
          <View style={[styles.mainContainer, styles.button]}>
            <TouchableOpacity
              onPress={() =>
                props.navigate("AssetDetails", {
                  id: item.id,
                  name: item.name,
                  price: item.metrics.market_data.price_usd,
                  item: item,
                })
              }
            >
              <View>
                <Text style={[styles.stationTitle, titleText]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.rightContainer}>
              <View>
                <Text>${item.metrics?.market_data?.price_usd?.toFixed(4)}</Text>
              </View>
              <TouchableOpacity>
                <TouchableOpacity onPress={() => handleFavourite(item)}>
                  <MaterialIcons
                    name={
                      favourite && favourite[item.slug]?.isFavorite
                        ? "favorite"
                        : "favorite-border"
                    }
                    size={32}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  } else {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 45,
    borderColor: "#DFE5E7",
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginTop: 8,
    borderRadius: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stationTitle: {
    fontSize: 20,
  },
  lightTitle: {
    color: "black",
  },
  darkTitle: {
    color: "white",
  },
  lightDistance: {
    color: "black",
  },
  darkDistance: {
    color: "white",
  },
  stationDistance: {
    fontSize: 12,
  },
});

export default AssetList;
