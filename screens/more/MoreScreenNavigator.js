import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const MoreScreenNavigator = () => {
    return (
        <View style={styles.container} >
            <Text>More</Text>
              <Text>More</Text>
                <Text>More</Text>
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
