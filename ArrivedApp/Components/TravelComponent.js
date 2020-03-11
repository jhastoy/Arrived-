import React from "react";
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

class TravelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.surname = this.props.surname;
    this.progression = Math.round(this.props.progression);
    this.warnings = this.props.warnings;
    this.arrived = this.props.arrived;
    this.danger = this.props.danger;
    (this.sDate = new Date(this.props.startDate)),
      (this.eDate = new Date(this.props.endDate));
    this.startDate = this.sDate.getHours() + ":" + this.sDate.getMinutes();
    this.endDate = this.eDate.getHours() + ":" + this.eDate.getMinutes();
    this.componentStyle = this.props.style;
    this.lastPosition = this.props.lastPosition;
  }
  containerHeight = 100;

  _displayMap() {
    if (this.danger)
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: Number.parseFloat(this.lastPosition.latitudePosition),
              longitude: Number.parseFloat(this.lastPosition.longitudePosition),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{
                latitude: Number.parseFloat(this.lastPosition.latitudePosition),
                longitude: Number.parseFloat(
                  this.lastPosition.longitudePosition
                )
              }}
            />
          </MapView>
        </View>
      );
  }
  _warningContainerStyle() {
    return {
      flexDirection: "row"
    };
  }
  _startDateStyle() {
    return {
      position: "absolute",
      justifyContent: "space-between",
      bottom: 3,
      left: 4,
      color: "black",
      fontSize: 12
    };
  }
  _endDateStyle() {
    return {
      position: "absolute",
      justifyContent: "space-between",
      bottom: 3,
      right: 4,
      color: "black",
      fontSize: 12,
      fontWeight: "bold"
    };
  }
  _displayContact() {
    if (this.danger) {
      return (
        <View style={this._contactContainerStyle()}>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Appeler</Text>
          </TouchableOpacity>
          <View style={styles.separateBar}></View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Itinéraire</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  _displayWarnings() {
    return this.warnings.map(element => (
      <View key={element.id} style={this._warningContainerStyle()}>
        <View style={styles.imageWarning}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../Includes/danger.png")}
          />
        </View>
        <View style={styles.textWarning}>
          <Text style={{ color: "black" }}>{element.messageWarning}</Text>
        </View>
      </View>
    ));
  }
  _updateContainerHeight() {
    if (this.componentStyle == 1) {
      this.containerHeight = 100;
    } else this.containerHeight = 78;
    if (this.danger) {
      this.containerHeight += 185 + 30 * this.warnings.length + 5;
    } else this.containerHeight += 30 * this.warnings.length;
  }
  _containerStyle() {
    if (this.danger) {
      return {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        marginTop: 20,
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        width: 0.95 * Math.round(Dimensions.get("window").width),
        height: this.containerHeight,
        backgroundColor: "#EB3B5A",
        borderRadius: 10
      };
    } else {
      return {
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        width: 0.9 * Math.round(Dimensions.get("window").width),
        height: this.containerHeight,
        backgroundColor: "white",
        borderRadius: 10
      };
    }
  }
  _contactContainerStyle() {
    if (this.componentStyle == 0) {
      return {
        flexDirection: "row",
        height: 54,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#D8D8D8",
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        marginTop: 5
      };
    } else
      return {
        flexDirection: "row",
        height: 52,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#D8D8D8",
        borderBottomWidth: 0.2,
        borderBottomColor: "white",
        marginTop: 5
      };
  }
  _progressBarActiveStyle() {
    if (this.danger) {
      return {
        position: "absolute",
        top: this.containerHeight - 23,
        width:
          (this.progression / 100) *
          0.95 *
          Math.round(Dimensions.get("window").width),
        height: 23,
        backgroundColor: "#EB3B5A",
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      };
    } else {
      return {
        position: "absolute",
        top: this.containerHeight - 23,
        width:
          (this.progression / 100) *
          0.95 *
          Math.round(Dimensions.get("window").width),
        height: 23,
        backgroundColor: "#57E976",
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      };
    }
  }
  _progressBarInactiveStyle() {
    if (this.props.warnings != null) {
      return {
        width: "100%",
        height: 23,
        position: "absolute",
        top: this.containerHeight - 23,
        backgroundColor: "#D8D8D8",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      };
    } else {
      return {
        width: "100%",
        height: 23,
        position: "absolute",
        top: this.containerHeight - 23,
        backgroundColor: "#D8D8D8",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
      };
    }
  }
  _componentStyle() {
    if (this.componentStyle == 1) {
      return (
        <>
          <View style={this._progressBarInactiveStyle()}></View>
          <View style={this._progressBarActiveStyle()}></View>
          <Text style={this._startDateStyle()}>{this.startDate}</Text>
          <Text style={this._endDateStyle()}>{this.endDate}</Text>
        </>
      );
    }
  }
  render() {
    this._updateContainerHeight();
    return (
      <View style={this._containerStyle()}>
        <View style={styles.rowContainer}>
          <View style={styles.circle}>
            <Image
              style={styles.profilImage}
              source={require("../Includes/profil_test.jpg")}
            ></Image>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.surname}</Text>
          </View>
        </View>
        {this._displayMap()}
        {this._displayWarnings()}
        {this._displayContact()}
        {this._componentStyle()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 100,
    backgroundColor: "#4B6584",
    borderRadius: 10
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "white"
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5
  },
  textContainer: {
    marginLeft: 10,
    borderRadius: 1,
    borderBottomWidth: 0.2,
    borderStyle: "dotted",
    borderBottomColor: "black",
    height: 40,
    width: 200
  },
  text: {
    fontSize: 25,
    color: "black"
  },
  progressBarInactive: {
    width: 350,
    height: 23,
    marginTop: 17,
    backgroundColor: "#D8D8D8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  progressBarActive: {
    position: "absolute",
    top: 60,
    width: 50,
    height: 23,
    marginTop: 17,
    backgroundColor: "#57E976",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  profilImage: {
    resizeMode: "cover",
    width: 50,
    height: 50,
    borderRadius: 75
  },
  imageWarning: {
    margin: 5,
    marginLeft: 10
  },
  textWarning: {
    margin: 5
  },
  mapContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 5
  },
  map: {
    flex: 1
  },
  iconesContainer: {
    flexDirection: "row"
  },
  contactImage: {
    width: 40,
    marginLeft: 8,
    height: 40
  },
  contactContainer: {
    flexDirection: "row",
    height: 53,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#D8D8D8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    marginTop: 5
  },
  contactButton: {
    flex: 1,
    height: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  contactText: {
    fontSize: 20
  },
  separateBar: {
    height: "80%",
    backgroundColor: "black",
    width: 1
  }
});
export default TravelComponent;
