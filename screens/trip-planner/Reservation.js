import React,{useEffect} from 'react'
import { View, Text,TextInput, StyleSheet, Dimensions ,KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import MapView,{Polyline} from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import db from './../../firebase'
import formValidation from './services/formValidation';

 function Map(props) {
   let locationOne = props.station.find(item => item.abbr === props.trip.leg[0]["@origin"])
   let locationTwo =  props.station.find(item => item.abbr === props.trip.leg[0]["@destination"])
   useEffect(() => {
      console.log(locationOne, locationTwo)
   }, [])
  return (
    <View>
      <MapView
       style={styles.map} 
       initialRegion={{
                    "latitude": 9.017796,
                    "latitudeDelta": 0.0922,
                    "longitude": 38.815969,
                    "longitudeDelta": 0.0421,
                }}
       >
         <Polyline
		coordinates={[
			{ latitude: 9.017796, longitude: 38.815969 },
			{ latitude: 8.9806034, longitude: 38.75776050000002 },
		
		]}
		strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
    onPress={()=>console.log("name")}
		strokeWidth={3}
	/>
       </MapView>
    </View>
  );
}

const Reservation = (props) => {
    // const [text, onChangeText] = React.useState();
    const [name, onChangeName] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const[values, setValues] = React.useState({
    adult:1,
    child:0,
  })
  const[seats,setSeats] = React.useState([])
  const[passengers,setPassengers] = React.useState([])
  const[nameerror,setError] = React.useState(false)
     useEffect(() => {
      db.collection('seats').onSnapshot((snapshot)=>
      setSeats(snapshot.docs.map((doc)=>({seat:doc.data()}))));
      
    }, [])
     useEffect(() => {
      db.collection('passengers')
      .onSnapshot((snapshot)=>{
        setPassengers(snapshot.docs.map((doc)=>doc.data()))
      })
       console.log(passengers.length)
      
    }, [])

  const {
    stations: { station }
  } = require("../../TrainData/stations");

  // const handleNameChange = ()=>{
  //   // setError(false)
  //   onChangeText()
  // }
  // const handleNumberChange = ()=>{
  //   // setError(false)
  //   onChangeNumber()
  // }
  const handleSubmit = ()=>{
    const formValues = getFormValues();
    console.log(formValues)
    const validationResult = formValidation(formValues)
    console.log(validationResult.result)
    console.log(validationResult.isValid)
     
    if(validationResult.isValid){
         db.collection('passengers').add(formValues)
      onChangePhone("")
      onChangeName("")
      setValues({adult:1,child:0})
      setError(false)
       alert("Reservation completed");
       props.navigation.navigate("QRCodeGenerator")

    }else{
     setError(true)
    }
    }
 
  const getFormValues = ()=>{
    return{
      name:name,
      phone:phone,
      adult:values.adult,
      child:values.child
    }
  }
  const handleAdult = (name)=>(event)=>{
    const value = name==='adult'? (values.adult+1):(values.adult-1)
    setValues({...values,adult:value})
  }
  const handleChild = (name)=>(event)=>{
    const value = name ==='adult'?(values.child+1):(values.child-1)
    setValues({...values,child:value})

  }
 
    let {route:{params:{trip}}} = props

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
                      {values.adult<0?(0)
                      :(values.adult>10
                      ?(Math.min(10,values.adult))
                      :(values.adult))}</Text>
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
                  <TouchableOpacity onPress={handleAdult('adult') } style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
                      <AntDesign name="plus" size={20} color="black"/>
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
                  <TouchableOpacity onPress={handleChild('adult')} style={{padding:5,borderWidth:1,width:50,alignItems:'center'}} >
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
        onChangeText={(name)=> onChangeName(name) }
        value={name}
      />
      
      <TextInput
        style={[styles.input]}
        onChangeText={(phone)=>onChangePhone(phone) }
        value={phone}
        placeholder="XXXX-XXX-XXX"
        keyboardType="numeric"
      />
      <View style={styles.errorcontainer} >
        <Text style={styles.errorcontainer} >
          {
            nameerror && "Please fill right values"
          }
        </Text>
      </View>
      <View style={styles.mapContainer} >
        <Map station={station} trip={trip} />
        </View>
     
      <View style={styles.submitcontainer}>
          <TouchableOpacity onPress={handleSubmit}  style={styles.submit} >
            <Text style={{color:'white',fontWeight:'bold',textTransform:'uppercase'}} >Submit</Text>
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
    // mapContainer:{
    //   width:100,
    //   height:100,
    //   display:'flex',
    //   flex:1,

    // },
    errorName:{
          borderColor:'red'
    },
    submit:{
        backgroundColor:'green',

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
  },
  errorcontainer:{
    alignItems:'center',
    color:'red',
    fontSize:20,
  },
    map: {
    width: '100%',
    height: 300,
  },
})
