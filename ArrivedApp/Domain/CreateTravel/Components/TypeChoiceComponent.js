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
import { connect } from "react-redux";

class TypeChoiceComponent extends React.Component {
  constructor(props) {
    super(props);
    switch (this.props.transportType) {
      case "1": {
        this.image = require("../../../Includes/TravelType/car.png");
        this.text = "Voiture";
        break;
      }
      case "2": {
        this.image = require("../../../Includes/TravelType/bike.png");
        this.text = "Vélo";
        break;
      }
      case "3": {
        this.image = require("../../../Includes/TravelType/scooter.png");
        this.text = "2 roues";
        break;
      }
      case "4": {
        this.image = require("../../../Includes/TravelType/walk.png");
        this.text = "Marche";
        break;
      }
    }
  }

  _navigate() {
    const action = { type: "SELECT_TYPE", value: this.props.transportType };
    this.props.dispatch(action);
    this.props.navigation.navigate("FriendChoice");
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._navigate()}
          style={styles.circle}
        >
          <Image style={{ width: 45, height: 45 }} source={this.image}></Image>
        </TouchableOpacity>
        <Text style={styles.text}>{this.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#4B6584",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center"
  }
});
const mapStateToProps = state => {
  return {
    type: state.selectType.type
  };
};

export default connect(mapStateToProps)(TypeChoiceComponent);
