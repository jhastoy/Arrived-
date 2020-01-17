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
import { withOrientation } from "react-navigation";

class FollowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.circle}>
            <Image
              style={styles.profilImage}
              source={require("../Includes/profil_test.jpg")}
            ></Image>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Nom</Text>
          </View>
        </View>
        <View style={styles.progressBarInactive}></View>
        <View style={styles.progressBarActive}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 100,
    backgroundColor: "#4B6584",
    borderRadius: 10
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "white"
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10
  },
  textContainer: {
    marginLeft: 10,
    borderRadius: 1,
    borderLeftWidth: 1,
    borderStyle: "dotted",
    borderLeftColor: "white",
    height: 40
  },
  text: {
    marginLeft: 5,
    fontSize: 25,
    color: "white"
  },
  progressBarInactive: {
    width: 350,
    height: 23,
    marginTop: 17,
    backgroundColor: "#D8D8D8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  progressBarActive: {
    position: "absolute",
    top: 60,
    width: 50,
    height: 23,
    marginTop: 17,
    backgroundColor: "#57E976",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  profilImage: {
    resizeMode: "cover",
    width: 50,
    height: 50,
    borderRadius: 75
  }
});
export default FollowComponent;
