import React from 'react'
import {View, Text,StyleSheet} from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg';

function Simple() {
  return <SvgQRCode value="https://console.firebase.google.com/project/secondnativeapp/firestore/data/~2Fpassengers~2F44wu854cZHqh4LLwR4P3" />;
}

export default function QrGenerator() {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',  
            flex:1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Simple />
        {/* The logo doesn't display on Expo Web */}
        
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        paddingTop: 5,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});