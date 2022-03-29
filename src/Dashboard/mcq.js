import React,{useState} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function Mcq({navigation: {navigate}}){
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        {
          label: 'Data 5'
         },
         {
          label: 'Data 6'
         },
         {
          label: 'Data 7'
         },
         {
          label: 'Data 8'
         }
        ];
    return (
        <View>
            <Image source={require('../Images/check1.webp')} />
            <RadioButtonRN
                data={data}
                selectedBtn={(e) => setModalVisible(e.label)
                }
            />
            <TouchableOpacity onPress={() => {
                if(modalVisible==null){
                    navigate('Mcq')
                }else if(modalVisible=="Data 7"){
                    navigate('Show Number')
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

export default Mcq;