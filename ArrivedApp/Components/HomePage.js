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
import isTokenValid from "../API/Authentification";
import { getToken } from "../API/Token";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>HOMEPAGE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 100,
    backgroundColor: "#4B6584"
  }
});
export default HomePage;
