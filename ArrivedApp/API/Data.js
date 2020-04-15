import {
  saveFriends,
  saveToken,
  savePlaces,
  saveInTravel,
  saveInDanger,
} from "./Storage";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import UpdateExpoToken, { IsTokenValid } from "./Authentification";
import { RefreshDataUser } from "./Authentification";

export default async function initData(response) {
  await saveToken(response.token);
  await saveFriends(response.friendsAccount);
  await savePlaces(response.placesAccount);
  console.log("Intravel :" + response.inTravel);
  await saveInTravel(response.inTravel);
  await saveInDanger(response.inDanger);
  //await registerForPushNotificationsAsync();
}

export async function RefreshData() {
  let isTokenValid = await IsTokenValid();
  if (!isTokenValid) {
    console.log("token not valid");
    return false;
  }
  let response = await RefreshDataUser();
  console.log(response);
  await saveFriends(response.friendsAccount);
  await savePlaces(response.placesAccount);
  await saveInTravel(response.inTravel);
  return true;
}

export async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  await UpdateExpoToken(token);
}
