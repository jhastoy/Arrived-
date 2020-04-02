import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StopTravel } from "../../../API/Travels";
import { saveInTravel } from "../../../API/Storage";

class MyTravelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paused: false, isStopTravelFetching: false };
  }

  _display() {
    if (this.props.inTravel) {
      if (this.props.isFetching) {
        return this._displayGeneralLoading();
      }
      return this._displayInTravel();
    } else {
      return this._displayNotInTravel();
    }
  }

  _displayGeneralLoading() {
    return <ActivityIndicator size="small" color="black" />;
  }
  _displayPlayPauseText() {
    if (this.state.paused) {
      return "Continuer";
    } else return "Pause";
  }
  _playPauseTravel() {
    if (this.state.paused) {
      this.setState({ paused: false });
    } else {
      this.setState({ paused: true });
    }
  }
  _displayPlayPauseStyle() {
    if (this.state.paused) {
      return {
        backgroundColor: "#57E976",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: "50%"
      };
    } else {
      return {
        backgroundColor: "#4B6584",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: "50%"
      };
    }
  }
  _displayNotInTravel() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Je pars</Text>
        <View style={styles.startTravelContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TypeChoice")}
            style={styles.startTravelButton}
          >
            <Text style={styles.buttonText}>NOUVEAU TRAJET</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Assurer ma sécurité et rassurer mes amis pendant mon déplacement
        </Text>
      </View>
    );
  }
  _displayStartPauseIcon() {
    if (this.state.paused) {
      return "play-arrow";
    } else return "pause";
  }
  _displayEndHour() {
    let date = new Date(this.props.travel.endDateTravel);
    let hour = date.getHours() + "h" + date.getMinutes();
    return hour;
  }
  _displayStopButtonLoading() {
    if (this.state.isStopTravelFetching) {
      return <ActivityIndicator size="small" color="white" />;
    } else
      return <Icon name="stop" size={60} color="white" type="MaterialIcons" />;
  }
  _displayInTravel() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mon trajet</Text>
        <View style={styles.infoRowContainer}>
          <View style={styles.infoContainer}>
            <Text>Progression</Text>
            <View style={styles.info}>
              <Text style={styles.infoText}>
                {this.props.travel.progressionTravel} %
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text>Arrivée</Text>
            <View style={styles.info}>
              <Text style={styles.infoText}>{this._displayEndHour()}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}></View>
        </View>
        <View style={styles.buttonsRowContainer}>
          <View style={styles.buttonsInfosContainer}>
            <TouchableOpacity
              onPress={() => this._playPauseTravel()}
              style={this._displayPlayPauseStyle()}
            >
              <Icon
                name={this._displayStartPauseIcon()}
                size={60}
                color="white"
                type="MaterialIcons"
              />
            </TouchableOpacity>
            <Text>{this._displayPlayPauseText()}</Text>
          </View>
          <View style={styles.buttonsInfosContainer}>
            <TouchableOpacity
              onPress={() => this._alertStopLocation()}
              style={styles.button}
            >
              {this._displayStopButtonLoading()}
            </TouchableOpacity>
            <Text>Stop</Text>
          </View>
          <View style={styles.buttonsInfosContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon
                name="edit-location"
                size={50}
                color="white"
                type="MaterialIcons"
              />
            </TouchableOpacity>
            <Text>Modifier</Text>
          </View>
        </View>
      </View>
    );
  }
  async componentDidMount() {
    //this._startLocation();
  }
  async _startLocation() {
    if (this.props.inTravel) {
      console.log("startlocation");
      let taskRegistered = await TaskManager.isTaskRegisteredAsync(
        "SENDING_POSITION"
      );
      console.log(taskRegistered);
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
  }
  _alertStopLocation() {
    Alert.alert(
      "Trajet",
      "Voulez-vous stopper ce trajet ? Vos amis seront prévenus",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Oui", onPress: () => this._stopLocation() }
      ],
      { cancelable: false }
    );
  }
  async _stopLocation() {
    this.setState({ isStopTravelFetching: true });
    //await Location.stopLocationUpdatesAsync("SENDING_POSITION");
    await StopTravel();
    await saveInTravel(false);
    console.log(this.props.stopTravel);
    await this.props.stopTravel();
  }
  render() {
    return this._display();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "96%",
    height: "30%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500"
  },
  startTravelContainer: {
    width: "96%",
    height: "50%",
    marginTop: 5
  },
  startTravelButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#57E976",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  infoRowContainer: {
    marginTop: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-around"
  },
  infoContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    marginTop: 3,
    backgroundColor: "#57E976",
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  infoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#4B6584",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "50%"
  },
  buttonsRowContainer: {
    flexDirection: "row",
    justifyContent: "center",

    width: "100%",
    justifyContent: "space-around"
  },
  buttonsInfosContainer: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default MyTravelComponent;
