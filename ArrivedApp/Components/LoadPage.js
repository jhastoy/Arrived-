import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { deleteToken, getToken } from "../API/Token";

class LoadPage extends React.Component {
  constructor(props) {
    super(props);
  }
  _resetToken() {
    deleteToken();
  }

  _refresh() {
    getToken().then(token => {
      console.log(token);
      if (token != null) {
        console.log("not null");
        this.props.navigation.replace("HomePage");
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
