import {
  saveFriends,
  saveToken,
  savePlaces,
  saveInTravel
} from "../API/Storage";

export default function initData(response) {
  saveToken(response.token);
  saveFriends(response.friendsAccount);
  savePlaces(response.placesAccount);
  saveInTravel(response.inTravel);
}
