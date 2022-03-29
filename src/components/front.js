import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {View, Text, Picker, StyleSheet, TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';

function Front({navigation}){
    const [state,setState]=useState({country: 'vn'});
    const [selectedValue, setSelectedValue] = useState("Covid");
    
    return (
      <View  style={{justifyContent: 'center'}}>
      <View style={{position: 'absolute', top: '-40%'}}>
      <Image
              source={require("../Images/aid.png")}
              style={{
                height: 200,
                width: 300,
                borderRadius: 5,
                justifyContent: "center",
                alignSelf: "center",
                marginRight: '45%',
                paddingTop: 10,
                marginTop: 15,
              }}
            ></Image>
            <Text style={{color:'white',marginTop:20, fontSize: 20,marginRight: 40}}>Chọn trường hợp cứu trợ</Text>
          </View>
        <View style={{position: 'relative',marginTop:'50%',height: 50, width: 230,marginLeft: '5%', justifyContent: 'center', alignItems: 'center', borderColor: '#27A5Ef', borderWidth: 2}}>
            <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150,color:'white' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Nhiễm covid" value="Covid" />
        <Picker.Item label="Rắn cắn" value="Snake" />
        <Picker.Item label="Tai nạn" value="Accident" />
        <Picker.Item label="Động đất" value="Earthquake" />
        <Picker.Item label="Lên cơn đau tim" value="Heart" />
        <Picker.Item label="Giật điện" value="Electric" />
        <Picker.Item label="Gãy xương" value="Fracture" />
        <Picker.Item label="Chó cắn" value="Dog" />
      </Picker>
      </View>
      <TouchableOpacity 
      style={{marginLeft: 0}}
    onPress={() => navigation.navigate('New',{id: selectedValue})}
    >
    <Text style={styles.textStyle}>Cách sơ cứu</Text>
    </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#27A5Ef",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    width: 155,
    alignSelf: 'center',
    marginTop: 25,
    // marginLeft: '40%'
    // paddingBottom: 20
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

export default Front;