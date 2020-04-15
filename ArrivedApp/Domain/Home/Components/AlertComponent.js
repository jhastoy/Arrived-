import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { saveInDanger } from "../../../API/Storage";
import { Icon } from "react-native-elements";
import { UserAlert } from "../../../API/Alerts";
import { PauseOrStartTravel } from "../../../API/Travels";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
class AlertComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdown: 3, alertLauched: false };
  }

  _sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async _launchAlert() {
    if (!this.state.alertLauched) {
      this.setState({ alertLauched: true, countdown: 3 });
      for (let i = 3; i > 0; i--) {
        this.setState({ countdown: i });
        await this._sleep(1000);
      }
      if (this.state.alertLauched) {
        this._alert();
      }
    } else this.setState({ alertLauched: false, countdown: 3 });
  }

  async _alert() {
    this.props.navigation.replace("Alert");
    await saveInDanger(true);

    await UserAlert();
    await this._startLocation();
  }
  async _startLocation() {
    if (this.props.inTravel) {
      await Location.stopLocationUpdatesAsync("SENDING_POSITION");
    }
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
      await Location.startLocationUpdatesAsync("SENDING_POSITION_ALERT", {
        accuracy: Location.Accuracy.Highest,
        foregroundService: {
          notificationTitle: "Alerte en cours",
          notificationBody: "Tracking...",
        },
      });
    }
  }

  _displayCountDown() {
    if (!this.state.alertLauched) {
      return (
        <>
          <Text style={styles.buttonText}>LANCER UNE ALERTE</Text>
          <Icon name="ios-warning" size={70} color="white" type="ionicon" />
        </>
      );
    } else {
      return (
        <View style={styles.alertLauchedContainer}>
          <Text style={styles.buttonText}>Envoi dans :</Text>
          <Text style={styles.buttonText}>{this.state.countdown}</Text>
          <Text>Rappuyer pour annuler</Text>
        </View>
      );
    }
  }
  _display() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Je suis en danger</Text>
        <View style={styles.lauchAlertContainer}>
          <TouchableOpacity
            onPress={() => this._launchAlert()}
            style={styles.lauchAlertButton}
          >
            {this._displayCountDown()}
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Choisir à qui je veux envoyer des alertes.
        </Text>
      </View>
    );
  }

  render() {
    return this._display();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "96%",
    height: "50%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  lauchAlertContainer: {
    width: "96%",
    height: "70%",
    marginTop: 5,
  },
  lauchAlertButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EB3B5A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  alertLauchedContainer: {
    alignItems: "center",
  },
});
export default AlertComponent;
