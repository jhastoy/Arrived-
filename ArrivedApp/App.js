import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import * as TaskManager from "expo-task-manager";

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
    borderRadius: 10
  }
});
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
