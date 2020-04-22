import { AsyncStorage } from "react-native";

export async function saveToken(token) {
  try {
    AsyncStorage.setItem("token", token);
  } catch (e) {}
}
export async function deleteToken(token) {
  try {
    AsyncStorage.removeItem("token");
  } catch (e) {}
}
export async function getToken() {
  try {
    token = AsyncStorage.getItem("token");
  } catch (e) {}
  return token;
}
export async function saveFriends(friends) {
  try {
    AsyncStorage.setItem("friends", JSON.stringify(friends));
  } catch (e) {}
}
export async function getFriends() {
  try {
    friends = AsyncStorage.getItem("friends");
  } catch (e) {}
  return friends;
}
export async function getPlaces() {
  try {
    places = AsyncStorage.getItem("places");
  } catch (e) {}
  return places;
}
export async function savePlaces(places) {
  try {
    AsyncStorage.setItem("places", JSON.stringify(places));
  } catch (e) {}
}
export async function getInTravel() {
  try {
    places = await AsyncStorage.getItem("inTravel");
  } catch (e) {}
  return places;
}
export async function saveInTravel(inTravel) {
  try {
    AsyncStorage.setItem("inTravel", JSON.stringify(inTravel));
  } catch (e) {}
}
export async function getInDanger() {
  try {
    inDanger = await AsyncStorage.getItem("inDanger");
  } catch (e) {}
  return inDanger;
}
export async function saveInDanger(inDanger) {
  try {
    AsyncStorage.setItem("inDanger", JSON.stringify(inDanger));
  } catch (e) {}
}
export async function getSurnameAccount() {
  try {
    surname = await AsyncStorage.getItem("surname");
  } catch (e) {}
  return surname;
}
export async function saveSurnameAccount(surname) {
  try {
    AsyncStorage.setItem("surname", surname);
  } catch (e) {}
}
