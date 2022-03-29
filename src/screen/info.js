import React  ,{ useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
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

import Data from '../components/data';

function Info({navigation,route}){
    var nid=route.params;
    function Helper(id){
        for (var i = 0; i < Data.length; i++) {
            if (Data[i].id === nid.id) {
              return i;
            }
        }
    };
    var m=Helper(nid);
    var ndata=Data[m].value;
    return(
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

    <Body style={{ alignSelf: "center", paddingTop: "40%" }}>
    
    <View style={styles.low}>
          <FlatList 
            keyExtractor={friend=> Math.random().toString()}
            data={Data[m].value}
            
            renderItem={({item})=>{
            return <View style={{marginBottom: 10, borderWidth: 2,borderColor:'black', padding: 6}}>
                <View>
                <Text style={{fontSize:20,color:'white'}}>Step - &gt; {item}</Text>

                    </View>
            </View>
        }}/>  
    </View>  
    
    <Text style={{color:"white",fontSize:16}}></Text>
    </Body>
    </ImageBackground>
    </Container>
    )
} 

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
    highlight: {
      fontWeight: '700',
      color: 'blue'
    },
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
  },
  low: {
      margin: 8
  }
  });

export default Info;