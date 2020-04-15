import { AsyncStorage } from "react-native";

export async function saveToken(token) {
  try {
    AsyncStorage.setItem("token", token);
  } catch (e) {
    console.log(e.message);
  }
}
export async function deleteToken(token) {
  try {
    AsyncStorage.removeItem("token");
  } catch (e) {
    console.log(e.message);
  }
}
export async function getToken() {
  try {
    token = AsyncStorage.getItem("token");
  } catch (e) {
    console.log(e.message);
  }
  return token;
}
export async function saveFriends(friends) {
  try {
    AsyncStorage.setItem("friends", JSON.stringify(friends));
  } catch (e) {
    console.log(e.message);
  }
}
export async function getFriends() {
  try {
    friends = AsyncStorage.getItem("friends");
  } catch (e) {
    console.log(e.message);
  }
  return friends;
}
export async function getPlaces() {
  try {
    places = AsyncStorage.getItem("places");
  } catch (e) {
    console.log(e.message);
  }
  return places;
}
export async function savePlaces(places) {
  try {
    console.log(places);
    AsyncStorage.setItem("places", JSON.stringify(places));
  } catch (e) {
    console.log(e.message);
  }
}
export async function getInTravel() {
  try {
    places = await AsyncStorage.getItem("inTravel");
  } catch (e) {
    console.log(e.message);
  }
  return places;
}
export async function saveInTravel(inTravel) {
  try {
    AsyncStorage.setItem("inTravel", JSON.stringify(inTravel));
  } catch (e) {
    console.log(e.message);
  }
}
export async function getInDanger() {
  try {
    inDanger = await AsyncStorage.getItem("inDanger");
  } catch (e) {
    console.log(e.message);
  }
  return inDanger;
}
export async function saveInDanger(inDanger) {
  try {
    AsyncStorage.setItem("inDanger", JSON.stringify(inDanger));
  } catch (e) {
    console.log(e.message);
  }
}
