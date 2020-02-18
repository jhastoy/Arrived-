import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { UpdateUserPosition } from "../API/Travels";

class MyTravel extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log("startlocation");
    await Location.startLocationUpdatesAsync("YO", {
      accuracy: Location.Accuracy.Highest,
      foregroundService: {
        notificationTitle: "Sécurité en cours",
        notificationBody: "tracking..."
      }
    });
  }

  _stopLocation() {
    Location.stopLocationUpdatesAsync("YO");
  }
  render() {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Text>Mon trajet en cours</Text>
        <TouchableOpacity onPress={() => this._stopLocation()}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    inTravel: state.inTravel.inTravel
  };
};

export default connect(mapStateToProps)(MyTravel);
let positions = new Array();

TaskManager.defineTask("YO", ({ data, error }) => {
  if (error) {
    console.log(error.message);
  }
  if (data) {
    const { locations } = data;
    positions = [
      ...positions,
      {
        latitudePosition: locations[0].coords.latitude.toString(),
        longitudePosition: locations[0].coords.longitude.toString(),
        dateTimePosition: new Date(locations[0].timestamp)
      }
    ];
    console.log(locations);
    if (positions.length == 10) {
      UpdateUserPosition(positions);
      positions = [];
    }
  }
});
