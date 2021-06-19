import React from 'react'
import { View, Text,StyleSheet, Button, AsyncStorage } from 'react-native'
import { useDispatch, useSelector } from "react-redux";


const MoreScreenNavigator = () => {


    const dispatch = useDispatch();

    const _storeUserSessionAsEmpty = async () => {
    try {

      dispatch({
        type: "UPDATE_USER",
        payload:""
      });

      await AsyncStorage.setItem(
        'userSession', "")
    } catch (error) {
      console.log(error)
      console.log("Something went wrong while saving user session")
    }
  };



  const logOut = async () => {
      console.log('loggin out')
      await _storeUserSessionAsEmpty()
  }



    return (
        <View style={styles.container} >
            
                <Button
                
                title="Log out"
              onPress={logOut}
            />
        </View>
    )
}

export default MoreScreenNavigator

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
