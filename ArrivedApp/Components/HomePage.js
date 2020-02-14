import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  StatusBar,
  RefreshControl
} from "react-native";
import TravelComponent from "./TravelComponent";
import { Refresh } from "../API/Travels";
import { Header } from "react-native-elements";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { travelsData: "", isFetching: false };
  }

  _refreshTravels() {
    this.setState({ isFetching: true });
    Refresh().then(response => {
      console.log(response);
      this.setState({ travelsData: response, isFetching: false });
    });
  }
  componentDidMount() {
    console.log("COmponent did mount");
    this._refreshTravels();

    //setInterval(() => this.setState({ time: Date.now() }), 50000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          barStyle="dark-content"
          translucent={false}
          backgroundColor="white"
        />

        <FlatList
          onRefresh={() => this._refreshTravels()}
          refreshing={this.state.isFetching}
          style={{ flex: 1, width: Math.round(Dimensions.get("window").width) }}
          data={this.state.travelsData}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          renderItem={({ item }) => (
            <TravelComponent
              surname={item.surnameAccount}
              progression={item.travelAccount.progressionTravel}
              warnings={item.travelAccount.userWarningsTravel}
              startDate={item.travelAccount.startDateTravel}
              endDate={item.travelAccount.endDateTravel}
            />
          )}
          keyExtractor={item => item.idAccount.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  mapcontainer: {
    flex: 1,
    width: 400,
    height: 400
  }
});
export default HomePage;