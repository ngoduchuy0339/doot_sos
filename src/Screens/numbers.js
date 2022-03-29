import React  ,{ useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,TouchableOpacity,Image
} from 'react-native';
import * as Location from 'expo-location';
import Front from '../components/front';
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
import ApiKeys from '../../constants';
var firebase = require("firebase");
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

function change(props){
    const [isans, setAns] = useState('');
    const [isans1, setAns1] = useState('');
    const [isans2, setAns2] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    if (!firebase.apps.length){
        firebase.initializeApp(ApiKeys.FirebaseConfig);
        
    }
    const _up = async (a,b,c) => {
        setIsLoading(true)

          const userData = await AsyncStorage.getItem('userInfo')
          const transformedData = JSON.parse(userData)
          const { d_name,email,name,one,two,three} = transformedData

          console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
          console.log(d_name,a,b,c)
          firebase.database().ref(`users/${d_name}`).set({
            one:a,
            two:b,
            three:c
          }
        )
        setIsLoading(false)
    }
  return(
    <Container>

        <ImageBackground source={require("../Images/bg1.jpg")} style={styles.image}>
        <View style={styles.component}>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} style={{fontSize:40, marginTop: 27, marginLeft: '3%'}}></Icon>
          <Text style={{fontSize: 25, marginTop: 27, marginLeft: '10%',color:'white'}}>ĐỔI SỐ ĐIỆN THOẠI</Text>
        </View>
        
        <Body style={{ alignSelf: "center", paddingTop: "40%" }}>

          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 2, marginTop: 10,paddingLeft: 10}}
            placeholder="Type Phone number1!"
            mode='outlined'
            onChangeText={text => setAns(text)}
            value={isans}
          />

          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 2, marginTop: 10,paddingLeft: 10}}
            placeholder="Type Phone number2!"
            onChangeText={text => setAns1(text)}
            value={isans1}
          />

          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 2, marginTop: 10,paddingLeft: 10}}
            placeholder="Type Phone number3!"
            onChangeText={text => setAns2(text)}
            value={isans2}
          />
  
          <TouchableOpacity 
              style={{marginLeft: 0}}
              onPress={() => _up(isans,isans1,isans2)}
            >
              <Text style={styles.textStyle}>ĐẶT LẠI SỐ ĐIỆN THOẠI</Text>
          </TouchableOpacity>
   
          <Text style={{color:"white",fontSize:16}}></Text>
        </Body>
      </ImageBackground>
    </Container>
  )}

  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    rowContainer: {
      flexDirection: "row",
    },
    textInput: {
      flex: 1,
      backgroundColor: 'white', 
      borderColor: 'black',
    },
    text: {
      flex: 1
    },
    highlight: {
      fontWeight: '700',
      color: 'blue'
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#27A5Ef",
      borderRadius: 20,
      padding: 20,
      elevation: 2,
      width: 225,
      alignSelf: 'center',
      marginTop: 25
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    component: {
      backgroundColor: '#3a3b3d', 
      alignItems: 'center', 
      height: 68,
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
  
export default change;