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
