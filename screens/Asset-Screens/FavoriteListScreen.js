import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useColorScheme } from "react-native-appearance";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const FavoriteListScreen = (props) => {
  const navigation = useNavigation();

  const favourite = useSelector((state) => state.asset.favourite);
  // console.log("Favorite", favourite);
  // const listOfFavourites = useSelector(state => state.favouritelists)
  const [listOfFavourites, setListOfFavourites] = useState([]);
  const assetLists = useSelector((state) => state.assets.product);

  const dispatch = useDispatch();
  let flatlistItem = [];

  useEffect(() => {
    // console.log("use Effect running...");
    getFromLocalStorage();
    // console.log("favo from redux right", listOfFavourites)
    // filterFavouriteItem();
  }, [favourite, assetLists]);

  const colorScheme = useColorScheme();

  // const state = await AsyncStorage.getItem("key");

  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;
  const searchBarStyle =
    colorScheme === "dark" ? styles.darkSearchBar : styles.lightSearchBar;

  const getFromLocalStorage = async () => {
    const state = JSON.parse(await AsyncStorage.getItem("key")) ?? {};
    // console.log("the state => ", state)
    let onlyTrue = Object.values(state).filter((item) => item.isFavorite);
    dispatch({ type: "FAVOURITE_LISTS_SCREEN", payload: onlyTrue });
    setListOfFavourites(onlyTrue);
  };

  const setFavOnLocal = async (item) => {
    // console.log("irem", item.slug)
    // await AsyncStorage.removeItem("key");
    // return;
    const state = await AsyncStorage.getItem("key");
    let stateParsed = await JSON.parse(state);
    let storageExist = stateParsed ?? false;
    // console.log("Storage exists", storageExist);
    //if there is any element in the local storage
    if (storageExist) {
      stateParsed[item.slug] = item;
      stateParsed[item.slug].isFavorite = !stateParsed[item.slug]?.isFavorite;
      await AsyncStorage.setItem("key", JSON.stringify(stateParsed));
      // console.log("after update with jm", await AsyncStorage.getItem("key"));
    } else {
      // set "true" because there is no element inside storage
      // console.log("state in storage is empty");
      await AsyncStorage.setItem(
        "key",
        JSON.stringify({
          [item.slug]: {
            ...item,
            isFavorite: true,
          },
        })
      );
      // console.log(
      //   "after updating first item",
      //   await AsyncStorage.getItem("key")
      // );
    }
    dispatch({ type: "UPDATE_FROM_LOCAL", payload: stateParsed });
  };

  const handleFavourite = (item, e) => {
    // console.log("handleFavourite called");
    dispatch({ type: "CHANGE_FAVOURITE", payload: item.slug });
    setFavOnLocal(item);
  };

  // }
  if (listOfFavourites && listOfFavourites.length > 0) {
    return (
      <SafeAreaView>
        <View style={{ marginTop: 20 }}>
          {/* <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e6e8eb",
              padding: 5,
            }}
          >
            <Text style={{ fontSize: 18 }}>Favourite items</Text>
          </View> */}
          <FlatList
            style={{ width: "100%" }}
            // filter data by the query input
            data={listOfFavourites}
            initialNumToRender={15}
            renderItem={({ item }) => (
              <View style={[styles.mainContainer, styles.button]}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AssetDetails", {
                      id: item.id,
                      name: item.name,
                      price: item.metrics.market_data.price_usd,
                      item: item,
                    })
                  }
                >
                  <View style={{maxWidth:115}}>
                    <Text numberOfLines = {1} ellipsizeMode = 'tail'  style={[styles.assetsTitle]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.rightContainer}>
                  <View style={{width:'50%'}}>
                    <Text>
                      ${item.metrics.market_data.price_usd.toFixed(4)}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFavourite(item)}>
                      <Ionicons
                        name={
                          favourite[item.slug].isFavorite
                            ? "star"
                            : "star-outline"
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
            keyExtractor={(item) => item.id+item.slug}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={1}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>No favourite item</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  mainContainer: {
    // flex: 1,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  button: {
    height: 45,
    borderColor: "#DFE5E7",
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginTop: 8,
    borderRadius: 10,
  },
  assetsTitle: {
    fontSize: 20,
  },
  lightTitle: {
    color: "black",
  },
});
export default FavoriteListScreen;
