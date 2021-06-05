import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

const LiveMapScreen = () => {
     const userLocation = useSelector((state) => state.userLocation);

     const latitude = userLocation.coords.latitude;
     const longitude = userLocation.coords.longitude;
     
    return (
        <View style={styles.container} >
            <Text style={styles.text} >{latitude} degree </Text>
            <Text style={styles.text} >{longitude} degree </Text>
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
    }
})
