import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import FriendDetailsComponent from "../Components/FriendDetailsComponent";
import { getFriends } from "../../../API/Storage";
import { RefreshData } from "../../../API/Data";

class FriendsPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mes amis",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
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
    this.state = { scrolling: false, isFetching: false, friends: [] };
    this._onRefresh = this._onRefresh.bind(this);
    this.props.navigation.addListener("willFocus", () => {
      this._getFriends();
    });
  }
  async _getFriends() {
    this.setState({ isFetching: true });
    friends = await getFriends();
    await this.setState({
      friendsData: JSON.parse(friends),
      isFetching: false
    });
  }
  initializeScrolling() {
    if (
      (this.state.friendsData.length + 4) * 60 >
      Dimensions.get("screen").height
    ) {
      this.setState({ scrolling: true });
    }
  }
  async componentDidMount() {
    await this._getFriends();
    this.initializeScrolling();
  }
  async _onRefresh() {
    await RefreshData();
    let friends = await getFriends();
    await this.setState({
      friendsData: JSON.parse(friends)
    });
  }
  _displayFlatList() {
    return (
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          onRefresh={() => this._getFriends()}
          refreshing={this.state.isFetching}
          data={this.state.friendsData}
          extraData={this.state.friendsData}
          scrollEnabled={this.state.scrolling}
          ItemSeparatorComponent={this._displaySeparator}
          renderItem={({ item }) => (
            <FriendDetailsComponent
              refresh={this._onRefresh}
              name={item.nameAccount}
              surname={item.surnameAccount}
              idFriend={item.idAccount}
              style="delete"
            />
          )}
          keyExtractor={item => item.idAccount.toString()}
        />
      </View>
    );
  }
  _displaySeparator() {
    return (
      <View
        style={{ height: 0.4, backgroundColor: "black", width: "100%" }}
      ></View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.friendsContainer}>{this._displayFlatList()}</View>
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
  friendsContainer: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    fontSize: 25,
    marginLeft: 10
  },

  addImage: {
    width: 15,
    height: 15
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
  }
});

export default FriendsPage;
