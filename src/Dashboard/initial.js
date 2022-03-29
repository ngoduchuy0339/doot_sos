import React, { useState, Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

const Modal1 = ({navigation: {navigate}}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
    <Image style={styles.logo} source={require('../Images/check1.webp')} />
    <Text style={{padding: '8%'}}>This is a Online Testing app to test your eyes to a certain extents.</Text>
    <TouchableOpacity 
    onPress={() => navigate('check')}
    >
    <Text style={styles.textStyle}>Start Testing</Text>
    </TouchableOpacity>
    </View>
  );
};

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
  logo: {
    width: '75%',
    height: '50%',
    borderRadius: 20,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 80
  }
});

export default Modal1;