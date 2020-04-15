import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import { UpdateUserPositionAlert } from "./API/Alerts";
import { UpdateUserPosition } from "./API/Travels";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
let positions = new Array();

TaskManager.defineTask("SENDING_POSITION", async ({ data, error }) => {
  let travel;
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
        dateTimePosition: new Date(locations[0].timestamp),
      },
    ];
    console.log("new position travel");
    if (positions.length == 3) {
      travel = await UpdateUserPosition(positions);
      positions = [];
      console.log("TRAVEL :");
      console.log(travel);
      if (travel.isFinished) {
        Location.stopLocationUpdatesAsync("SENDING_POSITION");
      }
    }
  }
});
TaskManager.defineTask("SENDING_POSITION_ALERT", ({ data, error }) => {
  if (error) {
    console.log(error.message);
  }
  if (data) {
    const { locations } = data;
    position = {
      latitudePosition: locations[0].coords.latitude.toString(),
      longitudePosition: locations[0].coords.longitude.toString(),
      dateTimePosition: new Date(locations[0].timestamp),
    };
    console.log("new position travel alert");
    UpdateUserPositionAlert(position);
  }
});
