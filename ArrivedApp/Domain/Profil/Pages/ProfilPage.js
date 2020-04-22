import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { getSurnameAccount } from "../../../API/Storage";

class ProfilPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { surname: "" };
  }
  _navigateToPlaces() {
    this.props.navigation.navigate("Places");
  }
  _navigateToFriends() {
    this.props.navigation.navigate("Friends");
  }
  async componentDidMount() {
    let surname = await getSurnameAccount();
    this.setState({ surname: surname });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Image
            style={styles.profilImage}
            source={require("../../../Includes/profil_test.jpg")}
          ></Image>
        </View>
        <Text style={styles.welcomeText}>Bonjour, {this.state.surname}</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity
            onPress={() => this._navigateToFriends()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Mes amis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._navigateToPlaces()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Mes lieux</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  circle: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profilImage: {
    resizeMode: "cover",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  welcomeText: {
    fontSize: 20,
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    height: 70,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: "100%",
    width: "30%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});
export default ProfilPage;
