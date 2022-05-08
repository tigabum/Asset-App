import React, {useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const URl = "https://data.messari.io/api/v1/assets/{assetKey}/metrics"

const AssetDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const singleAssetData = useSelector(state => state.asset)


  useEffect(() => {
    fetchSingleAsset()
  }, [props.route.params.id])
  // useEffect(() => {
  //   console.log("singleAsset dispatched", singleAssetData)
  // }, [singleAssetData])

  const fetchSingleAsset = () => {
    fetch(`https://data.messari.io/api/v1/assets/${props.route.params.id}/metrics`)
    .then(res => res.json())
    .then(json => {
      // console.log("rightSingleAsset", json.data)
      dispatch({type:"ADD_ASSET", payload: json.data})
    })
    .catch(err => console.log("error in single fetch", err));
  }
  return (
    <View style={styles.mainContainer}>
       <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text>
            {props.route.params.name}
            {"\n"} 
          </Text>
        </View>
        <Text>
          ${props.route.params.price.toFixed(4)}
        </Text>
      </View>
      <Text>
        {/* {props.route.params.id}
        {"\n"}  */}
        {/* {singleAssetData && singleAssetData.asset._internal_temp_agora_id } */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: '60%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 36,
  },
})

export default AssetDetailsScreen;