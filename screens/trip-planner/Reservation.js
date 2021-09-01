import React from 'react'
import { View, Text,TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Reservation = (props) => {
    const [text, onChangeText] = React.useState();
  const [number, onChangeNumber] = React.useState();
  const[values, setValues] = React.useState({
    plus:1,
    child:0
  })
   const {
    stations: { station }
  } = require("../../TrainData/stations");

  const handleSubmit = ()=>{
      alert("Reservation completed");
      props.navigation.navigate("TripPlanner Home")
  
    }
  
  const handleAdult = (name)=>(event)=>{
    const value = name==='plus'? (values.plus+1):(values.plus-1)
    setValues({...values,plus:value})
  }
  const handleChild = (name)=>(event)=>{
    const value = name ==='plus'?(values.child+1):(values.child-1)
    setValues({...values,child:value})

  }
    let {route:{params:{trip}}} = props

  // let unknown = trip? (trip.leg.map((item,i)=>{
  //   console.log(item)
  //   return  <View key={i} >
  //     <Text>{item["@origin"]} </Text>
  //   </View>
  // }
   
  // )):("false")
    return (
        <KeyboardAvoidingView style={styles.container} >
          <View style={{
            display:'flex',
            flexDirection:'column',
            backgroundColor:'#edebe6',
            borderWidth:1,
            margin:5,
            borderColor:'lightgray'
          }} >
          
             <View style={{display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        margin:20
                        }}  >
                          <View>
                             <Text>
                From: {
                  station.find(item => item.abbr === trip.leg[0]["@origin"])["name"]
                 }
               </Text>
                </View>
                    <View>
                      <Text>
                To: {
                  station.find(item => item.abbr === trip.leg[0]["@destination"])["name"]
                 }
               </Text>
               </View>
             </View>
              <View style={{display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                       marginLeft:20,
                       marginRight:20
                        }}  >
            <View  >
            <Text> {trip["@origTimeMin"]}</Text>
            </View>
             <View >
             <Text> {trip["@destTimeMin"]}</Text>
             </View>
             </View>

             <View style={{marginLeft:150}} >
               <Text>
                 Duration {trip["@tripTime"]} mins
               </Text>
             </View>
          </View>
          <View 
          style={{
            display:'flex',
            flexDirection:'column',
            backgroundColor:'#edebe6',
            borderWidth:1,
            margin:5,
            borderColor:'lightgray'
            }} >
            <View 
            style={{
              margin:5, 
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between'
              }} >
              <Text>Adult(16+)</Text>
              <View 
              style={{
                display:'flex', 
                flexDirection:'row',
                alignItems:'center'}}>
                 <View>
                    <Text 
                    style={{fontSize:25,marginRight:5}}>
                      {values.plus<0?(0)
                      :(values.plus>10
                      ?(Math.min(10,values.plus))
                      :(values.plus))}</Text>
                  </View>
              <View 
              style={{
                display:'flex',
                flexDirection:'row',
               
                padding:5,
                borderRadius:10

                }}>
                  
                  <TouchableOpacity onPress={handleAdult('minus') } style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
                    <AntDesign name="minus" size={20} color="black" />

                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAdult('plus') } style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
                      <AntDesign name="plus" size={20} color="black" />

                  </TouchableOpacity>
                
                
                   </View>

              </View>
            
            </View>
            <View 
            style={{
              margin:5,
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between'
            }}
            
            >
              <Text>Child(5-15)</Text>
              <View 
              style={{
                display:'flex', 
                flexDirection:'row',
                alignItems:'center'}}>
                 <View>
                    <Text style={{fontSize:25,marginRight:5}} >{values.child <0 ? (0):(values.child)} </Text>
                  </View>
              <View 
              style={{
                display:'flex',
                flexDirection:'row',
                padding:5,
                borderRadius:10

                }}>
                  
                  <TouchableOpacity onPress={handleChild("minus")}  style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
                    <AntDesign name="minus" size={20} color="black" />

                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleChild('plus')} style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
                      <AntDesign name="plus" size={20} color="black" />

                  </TouchableOpacity>
                
                
                   </View>

              </View>
             
              
            </View>
          </View>
           
       <View style={{marginBottom:50}} >
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
            <Text style={{color:'black'}} >Submit</Text>
        </TouchableOpacity>

       

      </View>

       </View>
         
         
       </KeyboardAvoidingView>
        
    )
}

export default Reservation

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center'
        flexDirection:'column',
        display:'flex',
        
    },
    submit:{
        backgroundColor:'#edebe6',
        alignItems:'center',
        padding:5,
         width:80,
         borderRadius:5
        
    },
    submitcontainer:{
        alignItems:'center'
    },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding:5,
    borderColor:'lightgray'
  },
  topText:{
    display:'flex'
  }
})
