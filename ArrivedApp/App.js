import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation/Navigation";
import deleteToken from "./API/Token";
import FollowComponent from "./Components/FollowComponent";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FollowComponent />
      </View>
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
