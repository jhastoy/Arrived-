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

class FriendComponent extends React.Component {
  constructor(props) {
    super(props);

    if (
      this.props.idsSelected.findIndex(item => item === this.props.idAccount) !=
      -1
    ) {
      this.state = { checked: true };
    } else {
      this.state = { checked: false };
    }
  }

  _selectItem() {
    if (this.state.checked) this.setState({ checked: false });
    else this.setState({ checked: true });
    const action = { type: "SELECT_ACCOUNT", value: this.props.idAccount };
    this.props.dispatch(action);
  }

  _containerStyle() {
    if (this.state.checked == false)
      return {
        marginTop: 1,
        width: Dimensions.get("screen").width,
        backgroundColor: "#F9F9F9",
        height: 80,
        justifyContent: "center"
      };
    else
      return {
        marginTop: 1,
        width: Dimensions.get("screen").width,
        backgroundColor: "#4B6584",
        height: 80,
        justifyContent: "center"
      };
  }

  _textStyle() {
    if (this.state.checked == false)
      return {
        fontSize: 25
      };
    else
      return {
        fontSize: 25,
        color: "white"
      };
  }

  _tick() {
    if (this.state.checked == true)
      return (
        <Image
          style={styles.tick}
          source={require("../Includes/tick.png")}
        ></Image>
      );
  }

  _imageStyle() {
    if (this.state.checked == false)
      return {
        resizeMode: "cover",
        width: 60,
        height: 60,
        borderRadius: 75,
        marginLeft: 25
      };
    else
      return {
        resizeMode: "cover",
        width: 60,
        height: 60,
        borderRadius: 75,
        marginLeft: 25,
        borderColor: "white",
        borderWidth: 2
      };
  }

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity
        onPress={() => this._selectItem()}
        style={this._containerStyle()}
      >
        <View style={styles.rowContainer}>
          <Image
            style={this._imageStyle()}
            source={require("../Includes/profil_test.jpg")}
          ></Image>
          <View style={styles.textContainer}>
            <Text style={this._textStyle()}>
              {this.props.surname} {this.props.name}
            </Text>
          </View>
          {this._tick()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    backgroundColor: "white",
    height: 80,
    justifyContent: "center"
  },
  containerChecked: {
    width: Dimensions.get("screen").width,
    backgroundColor: "#F9F9F9",
    height: 80,
    justifyContent: "center"
  },
  profilImage: {
    resizeMode: "cover",
    width: 60,
    height: 60,
    borderRadius: 75,
    marginLeft: 25,
    borderColor: "white",
    borderWidth: 2
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    justifyContent: "center",
    width: 250,
    height: 60,
    marginLeft: 20
  },
  text: {
    fontSize: 25
  },
  tick: {
    width: 30,
    height: 30
  }
});
// Components/FilmDetail.js

//...

const mapStateToProps = state => {
  return {
    idsSelected: state.selectFriend.idsSelected
  };
};

export default connect(mapStateToProps)(FriendComponent);
