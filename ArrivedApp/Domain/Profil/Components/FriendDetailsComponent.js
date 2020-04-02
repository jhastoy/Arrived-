import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import { DeleteFriend } from "../../../API/Friends";
import { ActivityIndicator } from "react-native-paper";

class FriendsDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false };
  }

  _displayDeleteConfirmation() {
    Alert.alert(
      "Suppression",
      "Voulez-vous supprimer cet ami ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this._deleteFriend() }
      ],
      { cancelable: false }
    );
  }
  async _deleteFriend() {
    this.setState({ isFetching: true });
    await DeleteFriend(this.props.idFriend);
    await this.props.refresh();
  }
  _displayDeleteLoading() {
    if (this.state.isFetching)
      return <ActivityIndicator size="small" color="black" />;
    else {
      if (this.props.style == "delete")
        return (
          <TouchableOpacity onPress={() => this._displayDeleteConfirmation()}>
            <Icon
              name="ios-close-circle-outline"
              size={30}
              type="ionicon"
            ></Icon>
          </TouchableOpacity>
        );
    }
  }
  _changeContainerStyle() {
    if (this.props.style == "details") {
      return styles.containerStyleDetails;
    } else return styles.containerStyle;
  }
  render() {
    return (
      <View style={this._changeContainerStyle()}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.profilImage}
            source={require("../../../Includes/profil_test.jpg")}
          ></Image>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {this.props.surname} {this.props.name}
            </Text>
          </View>
          {this._displayDeleteLoading()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  containerStyleDetails: {
    width: "100%",
    backgroundColor: "white",
    height: 80,
    justifyContent: "center",
    borderRadius: 10
  },
  containerStyle: {
    width: "100%",
    backgroundColor: "white",
    height: 80,
    justifyContent: "center"
  }
});

export default FriendsDetailsComponent;
