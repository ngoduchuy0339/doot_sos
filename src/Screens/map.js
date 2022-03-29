import React ,{useState}from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { Location, Permissions } from "expo";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps'

const latitudeDelta = 0.9;
const longitudeDelta = 0.04;

export default class MapScreen extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      searchPosition: {
        latitude: 0,
        longitude: 0
      },
      address: "",
      region: "",
      myLat: 0,
      myLon: 0,
      error: ""
    };
    //sử dụng từ bên trong chức năng
    this.onClickfetchData = this.onClickfetchData.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  //nhận đầu vào chuỗi n đặt tọa độ của nó thành trạng thái
  onClickfetchData() {
    const apiKey = "AIzaSyBtVK6Z91Qagn4U7-h6x7ofxy9to-pOJRA";
    let address = this.state.address;
    const urlPath = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
      .then(response => {
        console.log(urlPath);
        const data = response.data.results[0];
        console.log(data)
        this.setState({ data });

        let searchPosition = {
          latitude: data.geometry.location.latitude,
          longitude: data.geometry.location.longitude
        };
      })
      .catch(error => {
        console.log(error);
      });

  }

  //Đặt tọa độ GPS từ người dùng sang trạng thái
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        //thay đổi txt thành số thực
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        };

        this.setState({
          initialPosition: initialRegion,
          //Luôn theo dõi điểm đánh dấu
          markerPosition: initialRegion
        });
        console.log("myLocation set");
      },
      error => Alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );

  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    //Bản đồ tùy chỉnh tối
    const mapStyle = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8ec3b9"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1a3646"
          }
        ]
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#64779e"
          }
        ]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#334e87"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#283d6a"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6f9ba5"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3C7680"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#304a7d"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#2c6675"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#255763"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#b0d5ce"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#023e58"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#283d6a"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#3a4762"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0e1626"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#4e6d70"
          }
        ]
      }
    ];
    //test
   
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log(this.state.initialPosition.latitude);
   
    return (
      <View style={styles.container}>
                
        <TextInput
          style={styles.txtPosition}
          onChangeText={address => this.setState({ address })}
        />
        <Button color={"red"} title="Search" onPress={this.onClickfetchData} />
        <Button title="Find me" onPress={this.getLocation} />

        <MapView
          showsUserLocation={true}
          userLocationAnnotationTitle={"me"}
          followsUserLocation={true}
          provider={"google"}
          showsIndoorLevelPicker={true}
          customMapStyle={mapStyle}
          //Loader
          loadingEnabled={true}
          loadingIndicatorColor={"#606060"}
          //css
          style={{
            flex: 1
          }}
          region={this.state.initialPosition}          
        >       
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  txtPosition: {
    paddingTop: 40
  },
  component: {
    backgroundColor: '#F0F0FF',  
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