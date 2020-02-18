import React from "react";
import { StyleSheet, View } from "react-native";
import TypeChoiceComponent from "./TypeChoiceComponent";
import { connect } from "react-redux";

class TypeChoicePage extends React.Component {
  static navigationOptions = {
    title: "Comment te déplaces-tu ?"
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("componentdimount");
    console.log(this.props);
    console.log(this.props.inTravel);
    if (this.props.inTravel) {
      this.props.navigation.replace("MyTravel");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="1"
          ></TypeChoiceComponent>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="2"
          ></TypeChoiceComponent>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="3"
          ></TypeChoiceComponent>
        </View>
        <View style={styles.rowContainer}>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="4"
          ></TypeChoiceComponent>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="2"
          ></TypeChoiceComponent>
          <TypeChoiceComponent
            navigation={this.props.navigation}
            transportType="3"
          ></TypeChoiceComponent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  rowContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
const mapStateToProps = state => {
  return {
    inTravel: state.inTravel.inTravel
  };
};

export default connect(mapStateToProps)(TypeChoicePage);
