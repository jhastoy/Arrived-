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
import TravelComponent from "../Components/TravelComponent";
import { Refresh } from "../../../API/Travels";
import { Header } from "react-native-elements";

class TravelPage extends React.Component {
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
          renderItem={({ item }) => {
            if (item.travelAccount == null)
              return (
                <TravelComponent
                  key={item.idAccount}
                  surname={item.surnameAccount}
                  warnings={item.warningsAccount}
                  style={0}
                  lastPosition={item.lastPositionAccount}
                  danger={item.inDanger}
                />
              );
            else
              return (
                <TravelComponent
                  key={item.idAccount}
                  surname={item.surnameAccount}
                  progression={item.travelAccount.progressionTravel}
                  warnings={item.warningsAccount}
                  startDate={item.travelAccount.startDateTravel}
                  endDate={item.travelAccount.endDateTravel}
                  danger={item.inDanger}
                  lastPosition={item.lastPositionAccount}
                  style={1}
                />
              );
          }}
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
export default TravelPage;
