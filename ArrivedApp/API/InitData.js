import {
  saveFriends,
  saveToken,
  savePlaces,
  saveInTravel
} from "../API/Storage";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import UpdateExpoToken from "../API/Authentification";

export default async function initData(response) {
  await saveToken(response.token);
  await saveFriends(response.friendsAccount);
  await savePlaces(response.placesAccount);
  await saveInTravel(response.inTravel);
  await registerForPushNotificationsAsync();
}

export async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("No notification permissions!");
    return;
  }
  //let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  //await UpdateExpoToken(token);
}
