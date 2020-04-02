import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { UpdateUserPosition, StopTravel } from "../API/Travels";
import { Refresh } from "../API/Authentification";
import { RefreshData } from "../API/Data";
import { saveInTravel } from "../API/Storage";

class MyTravel extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log("startlocation");
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    console.log(status);
    if (status === "granted") {
      await Location.startLocationUpdatesAsync("SENDING_POSITION", {
        accuracy: Location.Accuracy.Highest,
        foregroundService: {
          notificationTitle: "Sécurité en cours",
          notificationBody: "tracking..."
        }
      });
    }
  }
  async _refresh() {
    let yo = await RefreshData();
    console.log(yo);
  }
  async _stopLocation() {
    await Location.stopLocationUpdatesAsync("SENDING_POSITION");
    await StopTravel();
    await saveInTravel(false);
    this.props.navigation.replace("TypeChoice");
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
        <TouchableOpacity onPress={() => this._refresh()}>
          <Text>resfres</Text>
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

TaskManager.defineTask("SENDING_POSITION", ({ data, error }) => {
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
