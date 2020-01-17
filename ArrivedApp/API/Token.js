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
