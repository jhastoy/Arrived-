import React from "react";
import { Text, StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { connect } from "react-redux";
import { AddTravel } from "../API/Travels";
import {
  StackActions,
  NavigationActions,
  CommonActions
} from "react-navigation";

class MyTravel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Text>Mon trajet en cours</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default MyTravel;
