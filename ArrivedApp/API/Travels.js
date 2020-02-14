import { getToken } from "./Storage";

export function Refresh() {
  return getToken().then(token =>
    fetch("https://arrivedapi.conveyor.cloud/api/Travel/GetFollowedTravels", {
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

export function AddTravel(friendsIds, startPosition, EndPlaceId, type) {
  console.log(
    JSON.stringify({
      FollowerAccountsIds: friendsIds,
      StartPositionTravel: startPosition,
      EndPlaceId: EndPlaceId,
      TransportTypeTravel: type
    })
  );
  return getToken().then(token =>
    fetch("https://arrivedapi.conveyor.cloud/api/Travel/AddTravel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        FollowerAccountsIds: friendsIds,
        StartPositionTravel: startPosition,
        EndPlaceId: EndPlaceId,
        TransportTypeTravel: parseInt(type)
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status == 400) {
          throw new Error("Identifiant ou mot de passe incorrect.");
        } else {
          if (response.status == 404) {
            throw new Error("Erreur réseau.");
          }
        }
      }
    })
  );
}
