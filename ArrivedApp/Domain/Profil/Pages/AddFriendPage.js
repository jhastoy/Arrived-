import React from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Alert
} from "react-native";
import { RefreshData } from "../../../API/Data";
import { GetFriendByPhoneNumber, AddFriend } from "../../../API/Friends";
import FriendsDetailsComponent from "../Components/FriendDetailsComponent";

class AddFriendPage extends React.Component {
  static navigationOptions = {
    title: "Ajouter un ami"
  };
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      nameAccount: "",
      idAccount: 0,
      surnameAccount: "",
      phoneNumberFriend: "",
      isButtonFetching: false
    };
  }

  async _searchFriend() {
    let account = await GetFriendByPhoneNumber(this.state.phoneNumberFriend);
    this.setState({
      ...this.state,
      nameAccount: account.nameAccount,
      idAccount: account.idAccount,
      surnameAccount: account.surnameAccount,
      phoneNumberFriend: account.phoneNumberAccount,
      isFetching: false
    });
  }
  async _addFriend() {
    this.setState({ ...this.state, isButtonFetching: true });
    await AddFriend(this.state.phoneNumberFriend);
    await RefreshData();
    this.setState({ ...this.state, isButtonFetching: false });
    this.props.navigation.goBack();
  }
  _displayAccountDetails() {
    if (this.state.nameAccount != "") {
      console.log("account details");
      if (this.state.nameAccount == null) {
        Alert.alert(
          "Ajout d'un ami",
          "Ce numéro n'est associé à aucun compte.",
          [
            {
              text: "Ok",
              onPress: () =>
                this.setState({ nameAccount: "", phoneNumberFriend: "" }),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      } else {
        return (
          <View style={styles.friendDetailContainer}>
            <FriendsDetailsComponent
              style="details"
              name={this.state.nameAccount}
              surname={this.state.surnameAccount}
            />
          </View>
        );
      }
    }
  }
  async _phoneNumberUpdate(text) {
    if (text.length == 10) {
      Keyboard.dismiss();
      await this.setState({
        ...this.state,
        phoneNumberFriend: text,
        isFetching: true
      });
      await this._searchFriend();
    } else {
      this.setState({ ...this.state, phoneNumberFriend: text });
    }
  }
  _displayButton() {
    if (this.state.nameAccount != null && this.state.nameAccount != "") {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this._addFriend()}
            style={styles.button}
          >
            {this._displayLoadingButton()}
          </TouchableOpacity>
        </View>
      );
    }
  }
  _displayLoadingButton() {
    if (this.state.isButtonFetching) {
      return <ActivityIndicator size="small" color="#ffffff" />;
    } else {
      return <Text style={styles.buttonText}>Ajouter</Text>;
    }
  }
  _displayLoadingSearch() {
    if (this.state.isFetching)
      return (
        <ActivityIndicator
          style={styles.searchLoading}
          size="small"
          color="black"
        />
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHeader}>
          <TextInput
            onFocus={() => this.setState({ text: "" })}
            value={this.state.phoneNumberFriend}
            maxLength={10}
            keyboardType="numeric"
            onChangeText={text => {
              this._phoneNumberUpdate(text);
            }}
            style={styles.placeNameInput}
            placeholder="Téléphone"
          />
        </View>
        {this._displayLoadingSearch()}
        {this._displayAccountDetails()}
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
  searchLoading: {
    marginTop: 40
  },
  friendDetailContainer: {
    marginTop: 40,
    width: "96%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 10,
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
    width: "50%",
    fontSize: 25,
    borderBottomWidth: 1
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1
  },
  map: {
    marginTop: 5,
    height: "100%",
    width: "100%"
  }
});

export default AddFriendPage;
