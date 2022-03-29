import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import Front from "../components/front";
import {
  Container,
  Body,
  Content,
  Header,
  FooterTab,
  Icon,
  Title,
  Left,
  Button,
} from "native-base";
import ApiKeys from "../../constants";
var firebase = require("firebase");
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import * as SMS from "expo-sms";
import AsyncStorage from "@react-native-async-storage/async-storage";
function First({ navigation }) {
  const [isans, setAns] = useState("");
  const [isans1, setAns1] = useState("");
  const [isans2, setAns2] = useState("");
  const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location.coords.latitude);
      const userData = await AsyncStorage.getItem("userInfo");

      const transformedData = JSON.parse(userData);
      const { t, email, name, one, two, three } = transformedData;
      console.log(userData);
    })();
  }, []);

  let phone_numbers = [];

  const _SOS = async () => {
    const userData = await AsyncStorage.getItem("userInfo");

    const transformedData = JSON.parse(userData);
    const { t, email, name, one, two, three } = transformedData;
    const one_ = new Date(one);
    const two_ = new Date(two);
    const three_ = new Date(three);

    console.log(
      "000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    );

    console.log(one, two, three);

    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [one, two, three],
        `SOS need help please:
      location:
      https://www.google.co.in/maps/@${location.coords.latitude},${location.coords.longitude},12z
          
      coordinates:
      latitude=>${location.coords.latitude},longitude=>${location.coords.longitude} `,
        {}
      );
    } else {
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("../Images/bg1.jpg")}
        style={styles.image}
      >
        <View style={styles.component}>
          <Icon
            name="menu"
            onPress={() => navigation.openDrawer()}
            style={{ fontSize: 40, marginTop: 24, marginLeft: "3%" }}
          ></Icon>
          <Image
            source={require("../Images/doot2.png")}
            style={{
              height: 40,
              width: 150,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 26,
              marginLeft: "20%",
              marginTop: 70,
            }}
          ></Image>
        </View>

        <Body style={{ alignSelf: "center", paddingTop: "40%" }}>
          <Front navigation={navigation} />

          <TouchableOpacity
            onPress={() => _SOS()}
            style={{ position: "absolute", bottom: 0 }}
          >
            <Image
              source={require("../Images/icons8-sos-96.png")}
              style={{
                height: 200,
                width: 200,
                justifyContent: "center",
                alignSelf: "center",
                paddingTop: 10,
                marginTop: 15,
              }}
            ></Image>
          </TouchableOpacity>

          <Text style={{ color: "white", fontSize: 16 }}></Text>
        </Body>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
    color: "blue",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  component: {
    backgroundColor: "#3a3b3d",
    alignItems: "center",
    height: 75,
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    elevation: 12,
    position: "relative",
    flexDirection: "row",
  },
});

export default First;
