import React from "react";
import { StyleSheet, View } from "react-native";
import MyTravelComponent from "../Components/MyTravelComponent";
import { getInTravel, getInDanger, saveInTravel } from "../../../API/Storage";
import { GetUserTravel } from "../../../API/Travels";
import AlertComponent from "../Components/AlertComponent";
import * as TaskManager from "expo-task-manager";
import { ThemeConsumer } from "react-native-elements";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { travel: {}, isFetching: false, inTravel: false };
    this.props.navigation.addListener("willFocus", async () => {
      let inTravel = (await getInTravel()) == "true";
      let inDanger = (await getInDanger()) == "true";
      if (inDanger) {
        this.props.navigation.replace("Alert");
      }
      if (inTravel) {
        console.log("prout");
        this.setState({ isFetching: true, inTravel: true });
        let travel = await this._getTravel();
        if (travel == null) {
          await saveInTravel(false);
          this.setState({ isFetching: false, inTravel: false });
        } else {
          this.setState({ isFetching: false, travel: travel });
        }
      }
    });
    this._stopTravel = this._stopTravel.bind(this);
  }
  _stopTravel() {
    this.setState({ inTravel: false });
  }
  async _getTravel() {
    let travel = await GetUserTravel();
    return travel;
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTravelComponent
          stopTravel={this._stopTravel}
          travel={this.state.travel}
          navigation={this.props.navigation}
          isFetching={this.state.isFetching}
          inTravel={this.state.inTravel}
        />
        <AlertComponent
          navigation={this.props.navigation}
          inTravel={this.state.inTravel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
export default HomePage;
