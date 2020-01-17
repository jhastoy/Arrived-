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
import { Register } from "../API/Authentification";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

class RegisterPage extends React.Component {
  email = "";
  password = "";
  phoneNumber = "";
  name = "";
  surname = "";
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  _isLoading() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  }
  _connect() {
    this.setState({ isLoading: true });
    Register(
      this.name,
      this.surname,
      this.email,
      this.password,
      this.phoneNumber
    )
      .then(response => {
        showMessage({
          message:
            "Merci " + response.surnameAccount + " ! Ton compte est créé.",
          type: "success"
        });
        this.props.navigation.navigate("LoginPage", {
          email: response.emailAccount
        });
      })

      .catch(error => {
        showMessage({
          message: error.message,
          type: "danger"
        });
        this.props.navigation.navigate("LoginPage", {
          email: this.email
        });
      });
  }

  _onEmailChanged(text) {
    this.email = text;
  }
  _onPasswordChanged(text) {
    this.password = text;
  }
  _onPhoneNumerChanged(text) {
    this.phoneNumber = text;
  }
  _onNameChanged(text) {
    this.name = text;
  }
  _onSurnameChanged(text) {
    this.surname = text;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View style={styles.inputTiny}>
            <View style={styles.imageInput}>
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: "https://img.icons8.com/nolan/64/email.png"
                }}
              />
            </View>

            <View style={styles.textInputTiny}>
              <TextInput
                style={{ width: 200 }}
                onChangeText={text => this._onNameChanged(text)}
                type="username"
                placeholder="Nom"
              ></TextInput>
            </View>
          </View>

          <View style={styles.inputTiny}>
            <View style={styles.imageInput}>
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: "https://img.icons8.com/nolan/64/email.png"
                }}
              />
            </View>
            <View style={styles.textInputTiny}>
              <TextInput
                style={{ width: 200 }}
                onChangeText={text => this._onSurnameChanged(text)}
                type="username"
                placeholder="Prenom"
              ></TextInput>
            </View>
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
              onChangeText={text => this._onEmailChanged(text)}
              type="password"
              placeholder="Email"
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
              onChangeText={text => this._onPhoneNumerChanged(text)}
              type="number"
              keyboardType={"numeric"}
              placeholder="Numero de téléphone"
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity
          style={{ ...styles.button, ...styles.registerButton }}
          onPress={() => this._connect()}
        >
          <Text style={{ color: "white" }}>S'inscrire</Text>
        </TouchableOpacity>

        {this._isLoading()}
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  inputTiny: {
    margin: 5,
    marginBottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    height: 50,
    width: 145,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 30
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textInputTiny: {
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    height: 50,
    width: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 30
  },
  imageInput: {
    marginLeft: 20,
    marginRight: 15
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
export default RegisterPage;
