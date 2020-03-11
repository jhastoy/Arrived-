import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

import { connect } from "react-redux";
import PlaceComponent from "./PlaceComponent";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { getPlaces } from "../API/Storage";

class PlaceChoicePage extends React.Component {
  static navigationOptions = {
    title: "Mes lieux d'intêret",
    headerRight: (
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15
        }}
      >
        <Icon name="ios-add" size={50} type="ionicon" />
      </TouchableOpacity>
    )
  };
  constructor(props) {
    super(props);
    this.state = { placesData: [], isFetching: false };
  }
  _getPlaces() {
    this.setState({ isFetching: true });
    getPlaces()
      .then(req => JSON.parse(req))
      .then(json => {
        console.log("Places:");
        console.log(json);
        this.setState({ placesData: json, isFetching: false });
      });
  }
  componentDidMount() {
    console.log("COmponent did mount");
    this._getPlaces();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placesContainer}>
          <FlatList
            data={this.state.placesData}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.placeContainer}>
                <Text style={styles.placeText}>{item.namePlace}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.idPlace.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  placesContainer: { marginTop: 10, backgroundColor: "white", flex: 2 },
  text: {
    fontSize: 25,
    marginLeft: 10
  },
  addPlaceText: {
    color: "#4B6584",
    fontSize: 20,
    marginLeft: 5
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  addPlaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5
  },
  addImage: {
    width: 15,
    height: 15
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttons: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopWidth: 1,
    borderTopColor: "white",
    height: 60,
    width: "40%",
    margin: 20,
    backgroundColor: "#4B6584",
    justifyContent: "center",
    alignItems: "center"
  },

  placeContainer: {
    marginTop: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "#F9F9F9",
    height: 60,
    justifyContent: "center"
  },
  placeText: {
    fontSize: 25,
    marginLeft: 20
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
  }
});

export default PlaceChoicePage;
