import {
  saveFriends,
  saveToken,
  savePlaces,
  saveInTravel,
  saveInDanger,
  saveSurnameAccount,
} from "./Storage";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import UpdateExpoToken, { IsTokenValid } from "./Authentification";
import { RefreshDataUser } from "./Authentification";
import Constants from "expo-constants";

export default async function initData(response) {
  await saveToken(response.token);
  await saveFriends(response.friendsAccount);
  await savePlaces(response.placesAccount);
  await saveInTravel(response.inTravel);
  await saveInDanger(response.inDanger);
  await saveSurnameAccount(response.surnameAccount);

  await registerForPushNotificationsAsync();
}

export async function RefreshData() {
  let isTokenValid = await IsTokenValid();
  if (!isTokenValid) {
    return false;
  }
  let response = await RefreshDataUser();
  await saveFriends(response.friendsAccount);
  await savePlaces(response.placesAccount);
  await saveInTravel(response.inTravel);
  await saveSurnameAccount(response.surnameAccount);
  return true;
}

export async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    await UpdateExpoToken(token);
  }
}
