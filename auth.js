import React ,{useState, useEffect}from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {Text,ScrollView,Image,TextInput, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator,ImageBackground,Alert} from 'react-native';
import { Content } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiKeys from './constants';
var firebase = require("firebase");
export default function AuthScreen (props){
	const [isEmailText, setIsEmailText]  = useState('')
  const [isName, setIsName]  = useState('')
  const [isOne, setIsOne]  = useState('')
  const [isTwo, setIsTwo]  = useState('')
  const [isThree, setIsThree]  = useState('')

	const [isPassText, setIsPassText]  = useState('') 
	const [isValid, setIsValid] = useState(false)
	const [isLogin,setIsLogin] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
    const x = true
	const signUpHandler =  async(email, password,name,one,two,three) =>{
    setIsLoading(true)
    const response  =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyDXjHZ73gcni1Ry2KtrDv67GnArl_w2YeM",{
      method :'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password,
        name,
        one,
        two,
        three,
        returnSecureToken:true
      })
   })
  const response2  =  await fetch("https://sosdoot-default-rtdb.firebaseio.com//users.json",{
    method :'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      email,
      name,
      one,
      two,
      three
    })
  })

  const resData2 = await response2.json()
  if (!firebase.apps.length){
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }
  var t=resData2.name;

  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
  console.log(one)
  console.log("resData2");
  console.log(resData2.name);
  console.log("=============================================")

  setIsLoading(false)

    const resData = await response.json()
    console.log("resData");
    const key=await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    console.log("66666666666666");
    console.log(key);
    console.log(resData);
    const saveDataToStorage = (t,email,name,one,two,three) => {
      AsyncStorage.setItem(
        'userInfo',JSON.stringify({
          d_name:t,
          emailId:email,
          name:name,
          one:one,
          two:two,
          three:three,
        }))
    }
    saveDataToStorage(t,email,name,one,two,three)
    console.log("data saved")
  }
    
	const loginHandler =   async (email, password,name,one,two,three) =>{
    
    
        setIsLoading(true)
        const response  =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDXjHZ73gcni1Ry2KtrDv67GnArl_w2YeM",{
			method :'POST',
			headers:{
				'Content-Type':'application/json'
      },
      
			body:JSON.stringify({
				email,
				password,
        name,
        one,
        two,
        three,
				returnSecureToken:true
			})
        
    })
    const key=await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    console.log("66666666666666");
    console.log(key);

        setIsLoading(false)
        
        


        const resData = await response.json()
        if(resData.registered){
          console.log("auth");

          const emailInfo={
            id:email
          }
     
          const saveDataToStorage = (token,userId,expirationDate,email,name,one,two,three) =>{
            AsyncStorage.setItem(
              'userData',JSON.stringify({
                token:token,
                userId:userId,
                expiryDate: expirationDate.toISOString(),
                emailId:email,
                name:name,
                one:one,
                two:two,
                three:three,
                
              }))
          }
      
    
          
          props.navigation.navigate('Home',{data:email});
        
          
          const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000 )
          saveDataToStorage(resData.idToken,resData.localId, expirationDate,email,name,one,two,three)
          
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
          console.log(resData.idToken,resData.localId,email);
          console.log(expirationDate);
          console.log(emailInfo.id);
      
        
        
        }


        
	}

  
return (
  <ImageBackground source={require("./src/Images/bg1.jpg")} style={styles.image}>
	<KeyboardAvoidingView>
  <Image
                source={require("./src/Images/logo.png")}
                style={{
                  height: 200,
                  width: 200,
                  justifyContent: "center",
                  alignSelf: "center",
                  
                  marginTop:70,
                }}
              >

              </Image>
    <View>
    <Image
                source={require("./src/Images/doot2.png")}
                style={{
                  height: 40,
                  width: 150,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 26,
                  marginTop:40
                }}
              >

              </Image>
    </View>

	<ScrollView>
	<View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={isEmailText}
            onChangeText={text =>  setIsEmailText(text)}
            keyboardType = 'email-address' 
            
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={isPassText}
            onChangeText={text =>  setIsPassText(text)}
           	secureTextEntry = {x}
            
          />
          <Text style={styles.label}>Name</Text>
                    <TextInput
            style={styles.input}
            value={isName}
            onChangeText={text =>  setIsName(text)}
            keyboardType = 'email-address' 
            
          />
          <Text style={styles.label}>Phone Number-1</Text>
                    <TextInput
            style={styles.input}
            value={isOne}
            onChangeText={text =>  setIsOne(text)}
            keyboardType = 'email-address' 
            
          />
          <Text style={styles.label}>Phone Number-2</Text>
                    <TextInput
            style={styles.input}
            value={isTwo}
            onChangeText={text =>  setIsTwo(text)}
            keyboardType = 'email-address' 
            
          /><Text style={styles.label}>Phone Number-3</Text>
                    <TextInput
            style={styles.input}
            value={isThree}
            onChangeText={text =>  setIsThree(text)}
            keyboardType = 'email-address' 
            
          />
          <View>
          	{isLoading ? <ActivityIndicator size = 'small' color = "black"/>:<Button title = {isLogin ? "Login" :'Sign Up'} onPress = {() =>{isLogin ? loginHandler(isEmailText,isPassText,isName,isOne,isTwo,isThree):signUpHandler(isEmailText,isPassText,isName,isOne,isTwo,isThree)}} color = "#27a5ef"/>}

          	<Button  title = {isLogin ? "Switch to SignUp" :"Switch to Login"} onPress = {() =>{setIsLogin(prevState => !prevState)}} color = "black"/>
          </View>
        </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
	)
};
const styles = StyleSheet.create({
    form: {
      margin: 50,
      marginTop:0,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    formControl: {
      width: '100%'
    },
    label: {
      color:"white",
      marginVertical: 2
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      color:"white"
    },
    loader:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
 
  }
  );