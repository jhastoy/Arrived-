import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import { TouchableOpacity, Image } from "react-native";
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
import AlertPage from "../Domain/Home/Pages/AlertPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const travelStackNavigator = createStackNavigator(
  {
    Travel: {
      screen: TravelPage,
    },
  },
  {
    defaultNavigationOptions: {
      title: "Trajets en cours",
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      ),
    },
  }
);
const profilStackNavigator = createStackNavigator(
  {
    ProfilPage: {
      screen: ProfilPage,
    },
    Places: {
      screen: PlacesPage,
    },
    AddPlaces: {
      screen: AddPlacePage,
    },
    Friends: {
      screen: FriendsPage,
    },
    AddFriends: {
      screen: AddFriendPage,
    },
  },
  {
    initialRouteName: "ProfilPage",
    defaultNavigationOptions: {
      title: "Mon compte",
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      ),
    },
  }
);
const homeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    TypeChoice: {
      screen: TypeChoicePage,
    },
    FriendChoice: {
      screen: FriendChoicePage,
    },
    PlaceChoice: {
      screen: PlaceChoicePage,
    },
    TravelConfirmation: {
      screen: TravelConfirmationPage,
    },
    MyTravel: {
      screen: MyTravel,
    },
    Alert: {
      screen: AlertPage,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        borderRadius: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFriends")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
          }}
        >
          <Icon name="ios-arrow-back" size={35} type="ionicon" />
        </TouchableOpacity>
      ),
    },
  }
);

homeStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
profilStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const bottomTabNavigator = createBottomTabNavigator(
  {
    Travel: {
      screen: travelStackNavigator,
      navigationOptions: {
        tabBarLabel: "Trajets",
        tabBarIcon: ({ tintColor }) => {
          if (tintColor == "black")
            return (
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../Includes/distance.png")}
              />
            );
          else
            return (
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../Includes/distance_selected.png")}
              />
            );
        },
      },
    },
    Home: {
      screen: homeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="chevron-double-up"
            size={40}
            color={tintColor}
          />
        ),
      },
    },
    Profil: {
      screen: profilStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{
              resizeMode: "cover",
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: tintColor == "black" ? "white" : tintColor,
              borderWidth: 2,
            }}
            source={require("../Includes/profil_test.jpg")}
          ></Image>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#4B6584",
      inactiveTintColor: "black",
    },
    initialRouteName: "Home",
  }
);

export default createAppContainer(bottomTabNavigator);
