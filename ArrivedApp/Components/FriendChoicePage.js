import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from "react-native";
import { getFriends } from "../API/Storage";
import FriendComponent from "./FriendComponent";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

class FriendChoicePage extends React.Component {
  static navigationOptions = {
    title: "Qui veux-tu prévenir ?"
  };
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { friendsData: "", isFetching: false, idsSelected: [] };
  }
  _getFriends() {
    this.setState({ isFetching: true });
    getFriends()
      .then(req => JSON.parse(req))
      .then(json => {
        console.log(json);
        this.setState({ friendsData: json, isFetching: false });
      });
  }
  componentDidMount() {
    console.log("COmponent did mount");
    this._getFriends();
  }
  _displayButton() {
    if (this.props.idsSelected.length != 0) {
      return (
        <TouchableOpacity
          onPress={() => this._navigate()}
          style={styles.nextButton}
        >
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
      );
    }
  }
  _navigate() {
    this.props.navigation.navigate("PlaceChoice");
  }
  DATA = [
    { idAccount: 1, surnameAccount: "Jean", nameAccount: "Hastoy" },
    { idAccount: 2, surnameAccount: "Matéo", nameAccount: "Fournié" },
    { idAccount: 3, surnameAccount: "Solène", nameAccount: "Hanrio" }
  ];
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.friendContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Mes amis</Text>
            <View style={styles.addFriendContainer}>
              <Image
                style={styles.addImage}
                source={require("../Includes/plus.png")}
              ></Image>
              <Text style={styles.addFriendText}>Ajouter un ami</Text>
            </View>
          </View>
          <FlatList
            data={this.state.friendsData}
            renderItem={({ item }) => (
              <FriendComponent
                name={item.nameAccount}
                surname={item.surnameAccount}
                idAccount={item.idAccount}
              ></FriendComponent>
            )}
            keyExtractor={item => item.idAccount.toString()}
          />
        </View>
        {this._displayButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  friendContainer: { marginTop: 10, backgroundColor: "white", flex: 1 },
  text: {
    fontSize: 25,
    marginLeft: 10
  },
  addFriendText: {
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
  addFriendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5
  },
  addImage: {
    width: 15,
    height: 15
  },
  nextButton: {
    height: 60,
    width: Dimensions.get("screen").width,
    backgroundColor: "#4B6584",
    justifyContent: "center",
    alignItems: "center"
  },
  nextText: {
    color: "white",
    fontSize: 25
  }
});
const mapStateToProps = state => {
  return {
    idsSelected: state.selectFriend.idsSelected
  };
};

export default connect(mapStateToProps)(FriendChoicePage);
