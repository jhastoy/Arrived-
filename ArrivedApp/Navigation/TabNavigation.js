import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import HomePage from "../Components/HomePage";
import TypeChoicePage from "../Components/TypeChoicePage";
import FriendChoicePage from "../Components/FriendChoicePage";
import PlaceChoicePage from "../Components/PlaceChoicePage";
import ProfilPage from "../Components/ProfilPage";
import { createStackNavigator } from "react-navigation-stack";
import TravelConfirmationPage from "../Components/TravelConfirmationPage";
import MyTravel from "../Components/MyTravel";
import { fromRight } from "react-navigation-transitions";
import PlacesPage from "../Components/PlacesPage";

const homeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage
    }
  },
  {
    defaultNavigationOptions: {
      title: "Trajets en cours"
    }
  }
);
const profilStackNavigator = createStackNavigator(
  {
    ProfilPage: {
      screen: ProfilPage
    },
    Places: {
      screen: PlacesPage
    }
  },
  {
    initialRouteName: "ProfilPage",
    defaultNavigationOptions: {
      title: "Mon compte"
    },
    transitionConfig: () => fromRight()
  }
);
const goStackNavigator = createStackNavigator(
  {
    TypeChoice: {
      screen: TypeChoicePage
    },
    FriendChoice: {
      screen: FriendChoicePage
    },
    PlaceChoice: {
      screen: PlaceChoicePage
    },
    TravelConfirmation: {
      screen: TravelConfirmationPage
    },
    MyTravel: {
      screen: MyTravel
    }
  },
  {
    initialRouteName: "TypeChoice"
  }
);

goStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
profilStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};
const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: homeStackNavigator
    },
    Go: {
      screen: goStackNavigator
    },
    Profil: {
      screen: profilStackNavigator
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(bottomTabNavigator);
