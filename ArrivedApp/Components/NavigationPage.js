import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "../Navigation/TabNavigation";

export default class NavigationPage extends React.Component {
  render() {
    return <TabNavigation />;
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
