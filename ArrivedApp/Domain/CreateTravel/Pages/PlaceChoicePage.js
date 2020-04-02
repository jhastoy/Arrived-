import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import PlaceComponent from "../Components/PlaceComponent";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { getPlaces } from "../../../API/Storage";

class PlaceChoicePage extends React.Component {
  static navigationOptions = {
    title: "Où-vas-tu ?"
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
  _navigate() {
    this.props.navigation.navigate("TravelConfirmation");
  }
  _displayButton() {
    console.log(this.state.placesData);
    if (
      this.props.idSelected.length != 0 &&
      this.state.placesData.length != 0
    ) {
      const position = this.state.placesData.find(
        e => e.idPlace == this.props.idSelected
      ).positionPlace;
      return (
        <View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={null}
              region={{
                latitude: Number.parseFloat(position.latitudePosition),
                longitude: Number.parseFloat(position.longitudePosition),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number.parseFloat(position.latitudePosition),
                  longitude: Number.parseFloat(position.longitudePosition)
                }}
              />
            </MapView>
          </View>
          <TouchableOpacity
            onPress={() => this._navigate()}
            style={styles.nextButton}
          >
            <Text style={styles.nextText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Mes lieux</Text>
            <View style={styles.addPlaceContainer}>
              <Text style={styles.addPlaceText}>Ajouter un lieu</Text>
            </View>
          </View>

          <FlatList
            data={this.state.placesData}
            renderItem={({ item }) => (
              <PlaceComponent
                name={item.namePlace}
                idPlace={item.idPlace}
              ></PlaceComponent>
            )}
            keyExtractor={item => item.idPlace.toString()}
          />
        </View>

        {this._displayButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  placeContainer: { marginTop: 10, backgroundColor: "white", flex: 2 },
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
  nextButton: {
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
    width: Dimensions.get("screen").width,
    backgroundColor: "#4B6584",
    justifyContent: "center",
    alignItems: "center"
  },
  nextText: {
    color: "white",
    fontSize: 25
  },
  mapContainer: {
    backgroundColor: "#4B6584",
    height: Dimensions.get("screen").height / 4,
    width: Dimensions.get("screen").width,
    alignItems: "center"
  },
  map: {
    marginTop: 10,
    marginBottom: 10,

    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "black"
  }
});
const mapStateToProps = state => {
  return {
    idSelected: state.selectPlace.idSelected
  };
};

export default connect(mapStateToProps)(PlaceChoicePage);
