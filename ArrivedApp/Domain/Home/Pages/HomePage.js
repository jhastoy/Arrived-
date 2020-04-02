import React from "react";
import { StyleSheet, View } from "react-native";
import MyTravelComponent from "../Components/MyTravelComponent";
import { getInTravel } from "../../../API/Storage";
import { GetUserTravel } from "../../../API/Travels";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { travel: {}, isFetching: false, inTravel: false };
    this.props.navigation.addListener("willFocus", async () => {
      let inTravel = (await getInTravel()) == "true";

      if (inTravel) {
        console.log("prout");
        this.setState({ isFetching: true, inTravel: true });
        let travel = await this._getTravel();
        this.setState({ isFetching: false, travel: travel });
      }
    });
    this._stopTravel = this._stopTravel.bind(this);
  }
  _stopTravel() {
    this.setState({ inTravel: false });
  }
  async _getTravel() {
    let travel = await GetUserTravel();
    console.log(travel);
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
export default HomePage;
