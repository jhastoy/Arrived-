import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import React from "react";
import HomePage from "../Domain/Home/Pages/HomePage";
import TravelPage from "../Domain/Travel/Pages/TravelPage";
import TypeChoicePage from "../Domain/CreateTravel/Pages/TypeChoicePage";
import FriendChoicePage from "../Domain/CreateTravel/Pages/FriendChoicePage";
import PlaceChoicePage from "../Domain/CreateTravel/Pages/PlaceChoicePage";
import ProfilPage from "../Domain/Profil/Pages/ProfilPage";
import { createStackNavigator } from "react-navigation-stack";
import TravelConfirmationPage from "../Domain/CreateTravel/Pages/TravelConfirmationPage";
import MyTravel from "../Domain/MyTravel";
import PlacesPage from "../Domain/Profil/Pages/PlacesPage";
import AddPlacePage from "../Domain/Profil/Pages/AddPlacePage";
import FriendsPage from "../Domain/Profil/Pages/FriendsPage";
import AddFriendPage from "../Domain/Profil/Pages/AddFriendPage";

const travelStackNavigator = createStackNavigator(
  {
    Travel: {
      screen: TravelPage
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
    },
    AddPlaces: {
      screen: AddPlacePage
    },
    Friends: {
      screen: FriendsPage
    },
    AddFriends: {
      screen: AddFriendPage
    }
  },
  {
    initialRouteName: "ProfilPage",
    defaultNavigationOptions: {
      title: "Mon compte",
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      )
    }
  }
);
const homeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
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
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      )
    }
  }
);

homeStackNavigator.navigationOptions = ({ navigation }) => {
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
    Travel: {
      screen: travelStackNavigator
    },
    Home: {
      screen: homeStackNavigator
    },
    Profil: {
      screen: profilStackNavigator
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        }
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      )
    }
  }
);

export default createAppContainer(bottomTabNavigator);
