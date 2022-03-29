import React, {useEffect} from 'react'

import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StartScreen = (props) =>{
  
useEffect(() =>{
    tryLogin = async () =>{
      const userData = await AsyncStorage.getItem('userData')
      
      if(!userData){
        props.navigation.navigate('Auth')
        return
      }
      const transformedData = JSON.parse(userData)
      const { token, userId, expiryDate,emailId} = transformedData
      const expirationDate = new Date(expiryDate)
    

      //if(expirationDate<=new Date() || !token || !userId){
      //  props.navigation.navigate('Auth')
      //  return
      //}
      
        
      
      const emailInfo={
        id:emailId
      }

      console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
      console.log(emailInfo.id);
      

   
      props.navigation.navigate('Home',{data:emailId});
      
      
      
    }
    tryLogin()

  })
  return(
    <View style = {styles.screen}>
        <ActivityIndicator size = 'large' />
    </View>
    )
};
const styles = StyleSheet.create({
	screen:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default StartScreen