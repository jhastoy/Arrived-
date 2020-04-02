import { getToken } from "./Storage";

export function GetFriends() {
  return getToken().then(token =>
    fetch("https://arrivedapi.conveyor.cloud/api/Friend/GetFriendAccount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status == 404) {
          throw new Error("Erreur réseau.");
        }
      }
    })
  );
}

export async function DeleteFriend(idFriend) {
  console.log("UPDATE TOKEN");
  let token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Friend/DeleteFriendAccount",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        idAccount: idFriend
      })
    }
  ).then(response => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
export async function GetFriendByPhoneNumber(phoneNumber) {
  console.log("UPDATE TOKEN");
  let token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Friend/GetAccountByPhoneNumber",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        phoneNumberAccount: phoneNumber
      })
    }
  ).then(response => {
    if (!response.ok) throw new Error("Erreur réseau");
    else {
      let responseJson = response.json();
      return responseJson;
    }
  });
}
export async function AddFriend(phoneNumber) {
  console.log(phoneNumber);
  console.log("UPDATE TOKEN");
  let token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Friend/AddFriendAccount",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        phoneNumberAccount: phoneNumber
      })
    }
  ).then(response => {
    if (!response.ok) throw new Error("Erreur réseau");
    else {
      let responseJson = response.json();
      return responseJson;
    }
  });
}
