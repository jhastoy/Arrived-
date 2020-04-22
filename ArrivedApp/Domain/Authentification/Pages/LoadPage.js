import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { deleteToken, getToken } from "../../../API/Storage";
import isTokenValid from "../../../API/Authentification";
class LoadPage extends React.Component {
  constructor(props) {
    super(props);
  }
  _resetToken() {
    deleteToken();
  }

  _refresh() {
    getToken().then((token) => {
      if (token != null) {
        response = isTokenValid();
        if (response) {
          this.props.navigation.replace("HomePage");
        } else {
          this.props.navigation.replace("LoginPage");
        }
      } else {
        this.props.navigation.replace("LoginPage");
      }
    });
  }

  render() {
    this._resetToken();
    return <View>{this._refresh()}</View>;
  }
}

const styles = StyleSheet.create({});
export default LoadPage;
