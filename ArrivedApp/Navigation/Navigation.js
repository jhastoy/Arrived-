import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginPage from "../Domain/Authentification/Pages/LoginPage";
import RegisterPage from "../Domain/Authentification/Pages/RegisterPage";
import LoadPage from "../Domain/Authentification/Pages/LoadPage";
import NavigationPage from "../Domain/Authentification/Pages/NavigationPage";
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
