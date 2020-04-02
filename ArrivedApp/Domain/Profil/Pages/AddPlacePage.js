import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { AddPlace } from "../../../API/Places";
import { connect } from "react-redux";
import { RefreshData } from "../../../API/Data";
import { ThemeProvider } from "react-native-paper";

class AddPlacePage extends React.Component {
  static navigationOptions = {
    title: "Ajouter un lieu"
  };
  constructor(props) {
    super(props);
    this.namePlace = "";
    this.state = { isFetching: false, adress: "", latitude: 0, longitude: 0 };
  }
  _displayMap() {
    if (this.state.adress != "") {
      return (
        <MapView
          style={styles.map}
          provider={null}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
        </MapView>
      );
    }
  }
  async _addPlace() {
    this.setState({ isFetching: true });
    let place = {
      namePlace: this.namePlace,
      adressePlace: this.state.adress,
      positionPlace: {
        latitudePosition: this.state.latitude.toString(),
        longitudePosition: this.state.longitude.toString()
      }
    };
    await AddPlace(place);
    await RefreshData();
    this.props.navigation.goBack();
    this.setState({ isFetching: false });
  }

  _displayLoadingButton() {
    if (this.state.isFetching) {
      return <ActivityIndicator size="small" color="#ffffff" />;
    } else {
      return <Text style={styles.buttonText}>Ajouter</Text>;
    }
  }
  _displayButton() {
    if (this.state.adress != "" && this.namePlace != "") {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this._addPlace()}
            style={styles.button}
          >
            {this._displayLoadingButton()}
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHeader}>
          <TextInput
            onEndEditing={text => {
              this.namePlace = text.nativeEvent.text;
            }}
            style={styles.placeNameInput}
            placeholder="Maison de campagne"
          />
          <GooglePlacesAutocomplete
            placeholder="8 Avenue des Champs Elysées"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              this.setState({
                adress: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              });
            }}
            getDefaultValue={() => ""}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyAxS27KCAmfu2v3TAvQmCIek9HA2efvu7I",
              language: "fr", // language of the results
              types: "geocode" // default: 'geocode'
            }}
            styles={{
              container: {
                width: "100%",
                marginTop: 20,
                marginBottom: 20
              },
              textInputContainer: {
                width: "100%",
                justifyContent: "center"
              },

              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
              type: "cafe"
            }}
            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: "geometry"
            }}
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
        </View>

        {this._displayMap()}
        {this._displayButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0
  },
  button: {
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
  buttonText: {
    color: "white",
    fontSize: 25
  },
  placeNameInput: {
    marginTop: 20,
    marginBottom: 10,
    width: "70%",
    fontSize: 25,
    borderBottomWidth: 1
  },
  placeHeader: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  map: {
    marginTop: 5,
    height: "100%",
    width: "100%"
  }
});

export default AddPlacePage;
