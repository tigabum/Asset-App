import React, { useState, useLayoutEffect, useEffect } from "react";
import { View,Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useColorScheme } from "react-native-appearance";
import { useNavigation } from '@react-navigation/native';

import AssetList from "../components/AssetList";



const AssetLIstsScreen = (props) => {
  const navigation = useNavigation();
  
  const dispatch = useDispatch();
     const colorScheme = useColorScheme();
 
  const assets = useSelector(state => state.assets);
  const assetLists = useSelector(state => state.assets.product)
  const favourite = useSelector(state => state.asset.favourite)
  
  const pageNumber = useSelector(state => state.assets.page)


  useEffect(() => {
    fetchAssets();
  }, [pageNumber]);




  const fetchAssets = ( ) => {

    fetch(`https://data.messari.io/api/v1/assets?page=${pageNumber}`)
    .then(res => res.json())
    .then(json => {
      // console.log("ASsets list is:", json.data.map((item)=>item.name))
      // let asAsetData = json.data
      let totalArray ;
      if(pageNumber === 1 ){
        totalArray = json.data;
      }else {
        totalArray = [...assets.product, ...json.data];
      }
      dispatch({type:"ADD_ASSETS", payload: totalArray})
 // console.log("name data", json.data.length)
    })
    .catch(err => console.log("error fetching assts", err));
  }

    // styling for light / dark mode
  const containerStyle =
    colorScheme === "dark" ? styles.darkContainer : styles.lightContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.listContainer}>
        
        <AssetList
        navigate={props.navigation.navigate}
        loadMoreCallback={()=>fetchAssets()}
        assetLists={assetLists}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  lightContainer: {
    backgroundColor: "white"
  },
  darkContainer: {
    backgroundColor: "black"
  },
 
});


export default AssetLIstsScreen
