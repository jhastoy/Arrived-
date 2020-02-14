import React from "react";
import initData from "../API/InitData";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { Login } from "../API/Authentification";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

class LoginPage extends React.Component {
  password = "";
  email = "";
  constructor(props) {
    super(props);
    this.state = { isLoading: false, isAccountCreated: props.isAccountCreated };
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator color="#27ae60" size="large" />
        </View>
      );
    }
  }

  _navigate() {
    this.props.navigation.navigate("RegisterPage");
  }
  _connect() {
    this.setState({ isLoading: true });
    Login("mateo@ensc.fr", "Crunch")
      .then(response => {
        initData(response);
        this.setState({ isLoading: false });
        console.log(response);
        this.props.navigation.replace("HomePage");
      })
      .catch(error => {
        this.setState({ isLoading: false });
        showMessage({
          message: error.message,
          type: "danger"
        });
      });
  }

  _onEmailChanged(text) {
    this.email = text;
  }
  _onPasswordChanged(text) {
    this.password = text;
  }
  render() {
    this.email = this.props.navigation.getParam("email", "");
    return (
      <View style={styles.container}>
        <Image
          style={{ aspectRatio: 0.7, resizeMode: "contain", marginBottom: 0 }}
          source={require("../Includes/logo.png")}
        />
        <View style={styles.input}>
          <View style={styles.imageInput}>
            <Image
              style={{ width: 25, height: 25 }}
              source={{
                uri: "https://img.icons8.com/nolan/64/email.png"
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={{ width: 200 }}
              onChangeText={text => this._onEmailChanged(text)}
              type="username"
              placeholder="Email"
              defaultValue={this.props.navigation.getParam("email", "")}
            ></TextInput>
          </View>
        </View>
        <View style={styles.input}>
          <View style={styles.imageInput}>
            <Image
              style={{ width: 25, height: 25 }}
              source={{
                uri: "https://img.icons8.com/nolan/64/password.png"
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={{ width: 200 }}
              secureTextEntry={true}
              onChangeText={text => this._onPasswordChanged(text)}
              type="password"
              placeholder="Mot de passe"
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.loginButton }}
          onPress={() => {
            this._connect();
          }}
        >
          <Text style={{ color: "white" }}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.registerButton }}
          onPress={() => this._navigate()}
        >
          <Text style={{ color: "white" }}>S'inscrire</Text>
        </TouchableOpacity>
        {this._displayLoading()}
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
    height: 50,
    width: 300,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 30
  },
  textInput: {},
  imageInput: {
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    margin: 10,
    backgroundColor: "#0a3d62",
    color: "white",
    height: 50,
    width: 300,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    margin: 0,
    marginTop: 30,
    backgroundColor: "#6cb3de"
  },
  registerButton: {
    margin: 20
  }
});
export default LoginPage;
