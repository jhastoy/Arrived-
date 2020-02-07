import { saveFriends, saveToken } from "../API/Storage";

export default function initData(response) {
  saveToken(response.token);
  saveFriends(response.friendsAccount);
}
