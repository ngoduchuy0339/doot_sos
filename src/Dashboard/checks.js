import React, { useState, Component, useEffect } from "react";
import RadioButtonRN from 'radio-buttons-react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import * as Font from 'expo-font';

function Check({navigation: {navigate}}){

    useEffect(() => {
        (async () => await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        }))();
         }, []);
    const [modalVisible, setModalVisible] = useState(null);
    const data = [
        {
          label: 'Data 1'
        },
        {
          label: 'Data 2'
        },
        {
          label: 'Data 3'
        },
        {
          label: 'Data 4'
        }
    ];
    return (
        <View>
        <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
            <Image source={require('../Images/check1.webp')} />
            <RadioButtonRN
                data={data}
                selectedBtn={(e) => setModalVisible(e.label)
                }
            />
            <TouchableOpacity onPress={() => {
                if(modalVisible==null){
                    navigate('check')
                }else if(modalVisible=="Data 1"){
                    navigate('Mcq')
                }
                else{
                    console.log(modalVisible);
                    navigate("Show Number")
                }
            }}>
            <Text style={styles.textStyle}>Start Testing</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 20,
      elevation: 2,
      width: 155,
      alignSelf: 'center',
      marginTop: 25
    },

});

export default Check;