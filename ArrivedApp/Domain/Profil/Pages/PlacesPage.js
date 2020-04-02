import React from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import { RefreshData } from "../../../API/Data";

import { connect } from "react-redux";
import PlaceDetailsComponent from "../Components/PlaceDetailsComponent";

import { getPlaces } from "../../../API/Storage";

class PlacesPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mes lieux d'intêret",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPlaces")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 15
          }}
        >
          <Icon name="ios-add" size={35} type="ionicon" />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = { isFetching: false, placesData: [] };
    this._onRefresh = this._onRefresh.bind(this);
    this.props.navigation.addListener("willFocus", () => {
      this._getPlaces();
    });
  }
  async _getPlaces() {
    this.setState({ isFetching: true });
    places = await getPlaces();
    await this.setState({ isFetching: false, placesData: JSON.parse(places) });
  }
  async _onRefresh() {
    await RefreshData();
    let places = await getPlaces();
    await this.setState({
      placesData: JSON.parse(places)
    });
  }
  _displaySeparator() {
    return (
      <View
        style={{ height: 0.4, backgroundColor: "black", width: "100%" }}
      ></View>
    );
  }

  _displayFlatList() {
    return (
      <View style={styles.flatListContainer}>
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={() => this._getPlaces()}
          extraData={this.state.placesData}
          style={styles.flatList}
          data={this.state.placesData}
          ItemSeparatorComponent={this._displaySeparator}
          renderItem={({ item }) => (
            <PlaceDetailsComponent
              refresh={this._onRefresh}
              key={item.namePlace}
              idPlace={item.idPlace}
              latitude={parseFloat(item.positionPlace.latitudePosition)}
              longitude={parseFloat(item.positionPlace.longitudePosition)}
              placeName={item.namePlace}
            />
          )}
          keyExtractor={item => item.namePlace.toString()}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placesContainer}>{this._displayFlatList()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center"
  },
  placesContainer: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    backgroundColor: "white"
  },
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
  flatList: {
    width: "96%",
    borderRadius: 10,
    flexGrow: 0
  },
  flatListContainer: {
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1
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

const mapStateToProps = state => {
  return {
    idPlaceDetailled: state.selectDetailledPlace.idPlaceDetailled
  };
};

export default connect(mapStateToProps)(PlacesPage);
