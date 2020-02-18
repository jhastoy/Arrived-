import React from "react";
import { Text, StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { connect } from "react-redux";
import { AddTravel } from "../API/Travels";

import { StackActions, NavigationActions } from "react-navigation";

class TravelConfirmationPage extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  constructor(props) {
    super(props);
    this.state = { startPosition: null, isLoading: true };
    console.log(props);
  }
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator color="#27ae60" size="large" />
        </View>
      );
    }
  }
  _navigate() {
    this.props.navigation.navigate("HomeScreen");
  }
  _travelConfirmed() {
    if (this.state.isLoading == false) {
      this.sleep(1500).then(() => {
        const action = { type: "CHANGE_TRAVEL_MODE", value: true };
        this.props.dispatch(action);
        const navigateAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "TypeChoice" })]
        });
        this.props.navigation.dispatch(navigateAction);
      });

      return (
        <View
          style={{
            backgroundColor: "#57E976",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={styles.tick}
            source={require("../Includes/tick.png")}
          ></Image>
          <Text style={{ color: "white" }}>
            Trajet lancé, Arrived! assure votre sécurité
          </Text>
        </View>
      );
    }
  }

  _getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const startPosition = {
          latitudePosition: position.coords.latitude.toString(),
          longitudePosition: position.coords.longitude.toString()
        };

        AddTravel(
          this.props.friendsSelected,
          startPosition,
          this.props.placeSelected,
          parseInt(this.props.type)
        ).then(response => {
          this.setState({ isLoading: false });
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this._getLocation();
  }
  render() {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        {this._displayLoading()}
        {this._travelConfirmed()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
const mapStateToProps = state => {
  return {
    type: state.selectType.type,
    friendsSelected: state.selectFriend.idsSelected,
    placeSelected: state.selectPlace.idSelected
  };
};

export default connect(mapStateToProps)(TravelConfirmationPage);
