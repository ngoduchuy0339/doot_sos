
import React, { useState, useEffect } from 'react';
import { Text, View,ImageBackground,StyleSheet } from 'react-native';

export default function HomeScreen() {
  
  return ( 
    
      <ImageBackground  source={require("./bg.jpg")} style={styles.image}>
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           <View style={styles.container}>
      <Text style={styles.paragraph}>Hello</Text>
    </View>
        
      </View>
      </ImageBackground>
    );
}
const styles = StyleSheet.create({

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

}
)
