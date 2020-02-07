import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";
import LoadPage from "../Components/LoadPage";
import NavigationPage from "../Components/NavigationPage";
const AuthentificationStackNavigator = createStackNavigator(
  {
    LoadPage: {
      screen: LoadPage,
      navigationOptions: {
        title: "Load"
      }
    },
    HomePage: {
      screen: NavigationPage,
      navigationOptions: {
        title: "Home"
      }
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        title: "Connexion"
      }
    },
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: {
        title: "Inscription"
      }
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthentificationStackNavigator);
