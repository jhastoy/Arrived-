import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import DeletePlace from "../../../API/Places";
import { RefreshData } from "../../../API/Data";

class PlaceDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false };
  }

  _display() {
    if (this.props.idPlaceDetailled == this.props.idPlace) {
      return this._displayMaximized();
    } else return this._displayMinimized();
  }
  _changeDetailledState() {
    const action = { type: "DETAIL_PLACE", value: this.props.idPlace };
    this.props.dispatch(action);
  }
  _displayMinimized() {
    return (
      <View style={styles.placeContainer}>
        <Text style={styles.placeText}>{this.props.placeName}</Text>
        <TouchableOpacity
          onPress={() => this._changeDetailledState()}
          style={styles.arrowDown}
        >
          <Icon name="ios-arrow-dropdown" size={30} type="ionicon"></Icon>
        </TouchableOpacity>
      </View>
    );
  }
  async _deletePlace() {
    this.setState({ isFetching: true });
    await DeletePlace(this.props.idPlace);
    await this.props.refresh();
  }
  _displayDeleteLoading() {
    if (this.state.isFetching) {
      return <ActivityIndicator size="small" color="black" />;
    } else
      return (
        <Icon name="ios-close-circle-outline" size={30} type="ionicon"></Icon>
      );
  }
  _displayDeleteConfirmation() {
    Alert.alert(
      "Suppression",
      "Voulez-vous supprimer ce lieu ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this._deletePlace() }
      ],
      { cancelable: false }
    );
  }
  _displayMaximized() {
    return (
      <View style={styles.placeMaximizedContainer}>
        <View style={styles.headerPlaceContainer}>
          <View style={styles.placeTextContainer}>
            <Text style={styles.placeTextMaximized}>
              {this.props.placeName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this._displayDeleteConfirmation()}
            style={styles.delete}
          >
            {this._displayDeleteLoading()}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._changeDetailledState()}
            style={styles.arrowUp}
          >
            <Icon
              name="ios-arrow-dropup-circle"
              size={30}
              type="ionicon"
            ></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.adressTextContainer}>
          <Icon name="location-pin" type="entypo"></Icon>
          <Text style={styles.adressText}>1252 Route de Cazenave, Orx</Text>
        </View>
        <MapView
          style={styles.map}
          provider={null}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
          />
        </MapView>
      </View>
    );
  }
  render() {
    return <View>{this._display()}</View>;
  }
}

const styles = StyleSheet.create({
  placeContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center"
  },
  arrowDown: {
    marginRight: 20
  },
  arrowUp: {
    marginRight: 20,
    marginTop: 10
  },
  delete: {
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5
  },
  placeText: {
    fontSize: 25,
    marginLeft: 20
  },
  placeTextMaximized: {
    fontSize: 25
  },
  nextButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 60,
    width: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10
  },
  placeMaximizedContainer: {
    marginTop: 1,
    width: "100%",
    backgroundColor: "white",
    height: 250
  },
  placeTextContainer: {
    marginTop: 10,
    width: "70%",
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  adressTextContainer: {
    marginLeft: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  adressText: {
    fontSize: 15
  },
  headerPlaceContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  map: {
    marginTop: 5,
    flex: 1
  }
});
const mapStateToProps = state => {
  return {
    idPlaceDetailled: state.selectDetailledPlace.idPlaceDetailled
  };
};

export default connect(mapStateToProps)(PlaceDetailsComponent);
