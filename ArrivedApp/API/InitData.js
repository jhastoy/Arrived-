import { saveFriends, saveToken, savePlaces } from "../API/Storage";

export default function initData(response) {
  saveToken(response.token);
  saveFriends(response.friendsAccount);
  savePlaces(response.placesAccount);
}
