import React from 'react'
import { View, Text,TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'

const Reservation = (props) => {
    const [text, onChangeText] = React.useState();
  const [number, onChangeNumber] = React.useState();
  const handleSubmit = ()=>{
      alert("Reservation completed");
      props.navigation.navigate("TripPlanner Home")
  }
    return (
        <KeyboardAvoidingView style={styles.container} >
          <TextInput
          placeholder="Full Name"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        
      />
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Phone Number"
        keyboardType="numeric"
      />
      <View style={styles.submitcontainer}>
          <TouchableOpacity onPress={handleSubmit}  style={styles.submit} >
            <Text>Submit</Text>
        </TouchableOpacity>

       

      </View>
       </KeyboardAvoidingView>
        
    )
}

export default Reservation

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    submit:{
        backgroundColor:'lightblue',
        alignItems:'center',
        padding:5,
         width:50,
        
    },
    submitcontainer:{
        alignItems:'center'
    },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding:5,
  },
})
