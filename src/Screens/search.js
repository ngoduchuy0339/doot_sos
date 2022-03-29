
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps'
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';
import {
  Container,
  Body,
  Content,
  Header,
  FooterTab,
  Icon,
  Title,
  Left,
  Button
} from "native-base";

export default function SearchScreen({navigation}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location.coords.latitude)
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location); 
    }
    
      
    const [result, setResult] = useState(null);

    const _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(`https://www.google.co.in/maps/search/hospital/@${location.coords.latitude},${location.coords.longitude},13z/data=!3m1!4b1?hl=en&authuser=0`);
      setResult(result);
    };
    const _1handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(`https://www.google.co.in/maps/search/hotel/@${location.coords.latitude},${location.coords.longitude},13z/data=!3m1!4b1?hl=en&authuser=0`);
      setResult(result);
    };
    const _2handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(`https://www.google.co.in/maps/search/police/@${location.coords.latitude},${location.coords.longitude},13z/data=!3m1!4b1?hl=en&authuser=0`);
      setResult(result);
    };
  
    return (

    <Container>
      <ImageBackground source={require("../Images/bg1.jpg")} style={styles.image}>
        <View style={styles.component}>
          <Icon name="menu" onPress={() => navigation.openDrawer()} style={{fontSize:40, marginTop: 27, marginLeft: '3%'}}></Icon>
          <Image
            source={require("../Images/doot2.png")}
            style={{
              height: 40,
              width: 150,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 26, marginLeft: '20%',
              marginTop:70,
            }}
          >
          </Image>
        </View>
    
        <Body style={{ alignSelf: "center", paddingTop: "25%",  }}>
          <View style={{width: 220, height: 49, borderRadius: 5, marginTop: '10%', borderColor: '#27A5Ef', borderWidth: 2, paddingLeft: 5}}>
            <Button hasText transparent  onPress={() => _handlePressButtonAsync()} ><Text style={{color:'white',fontWeight:"bold",fontSize:20}}>Bệnh viện gần nhất</Text></Button>
          </View>
          <View style={{width: 220, height: 49, borderRadius: 5, marginTop: '10%', borderColor: '#27A5Ef', borderWidth: 2, paddingLeft: 5}}>
          <Button hasText transparent  onPress={() => _1handlePressButtonAsync()} ><Text style={{color:'white',fontWeight:"bold",fontSize:20}}>Khách sạn gần nhất</Text></Button></View>
          <View style={{width: 220, height: 49, marginTop: '10%', borderRadius: 5, borderColor: '#27A5Ef', borderWidth: 2, paddingLeft: 5}}>
          <Button hasText transparent  onPress={() => _2handlePressButtonAsync()} ><Text style={{color:'white',fontWeight:"bold",fontSize:20}}>Công an gần nhất</Text></Button></View>
        </Body>
      </ImageBackground>
    </Container>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  component: {
    backgroundColor: '#3a3b3d', 
    alignItems: 'center', 
    height: 75,
    shadowColor: '#FFFFFF',
    shadowOffset: {
        width: 0,
        height: 12
    },
    shadowOpacity: 0.2,
    elevation: 12,
    position: 'relative',
    flexDirection: 'row'
}
});
