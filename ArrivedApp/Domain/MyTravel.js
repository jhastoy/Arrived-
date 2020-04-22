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
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );

    if (status === "granted") {
      await Location.startLocationUpdatesAsync("SENDING_POSITION", {
        accuracy: Location.Accuracy.Highest,
        foregroundService: {
          notificationTitle: "Sécurité en cours",
          notificationBody: "tracking...",
        },
      });
    }
  }
  async _refresh() {
    let yo = await RefreshData();
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

const mapStateToProps = (state) => {
  return {
    inTravel: state.inTravel.inTravel,
  };
};

export default connect(mapStateToProps)(MyTravel);
let positions = new Array();
