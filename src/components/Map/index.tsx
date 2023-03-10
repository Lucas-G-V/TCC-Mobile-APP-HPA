import React from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
export default class Map extends React.Component {
    constructor(props:any) {
        super(props);
         this.state = {
            latitude: 0,
            longitude: 0,
            coordinates: [],
         };
       }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}></MapView>
      </View>
    );
  }
}