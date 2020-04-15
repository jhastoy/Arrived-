import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { saveInDanger } from "../../../API/Storage";
import { StopAlert } from "../../../API/Alerts";
import * as Location from "expo-location";

class AlertPage extends React.Component {
  static navigationOptions = {
    title: "Qui veux-tu prévenir ?",
    headerStyle: {
      backgroundColor: "#EB3B5A",
      borderRadius: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
    },
  };
  constructor(props) {
    super(props);
  }

  async _stopAlert() {
    Location.stopLocationUpdatesAsync("SENDING_POSITION_ALERT");
    await saveInDanger(false);
    this.props.navigation.replace("Home");
    await StopAlert();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Une alerte a été lancée</Text>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => this._stopAlert()}
        >
          <Text>Terminer alerte</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EB3B5A",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  stopButton: {
    height: 40,
    width: 100,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AlertPage;
