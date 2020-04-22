import { getToken } from "./Storage";

export function Refresh() {
  return getToken().then((token) =>
    fetch("https://arrivedapi.conveyor.cloud/api/Travel/GetFollowedTravels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
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

export async function GetUserTravel() {
  let token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Travel/GetUserTravel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status == 404) {
        throw new Error("Erreur réseau.");
      }
    }
  });
}

export async function AddTravel(friendsIds, startPosition, EndPlaceId, type) {
  return getToken().then((token) =>
    fetch("https://arrivedapi.conveyor.cloud/api/Travel/AddTravel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        FollowerAccountsIds: friendsIds,
        StartPositionTravel: startPosition,
        EndPlaceId: EndPlaceId,
        TransportTypeTravel: parseInt(type),
      }),
    }).then((response) => {
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
export async function UpdateUserPosition(positions) {
  const token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Travel/UpdateUserPosition",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(positions),
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status == 404) {
        throw new Error("Erreur réseau.");
      }
    }
  });
}

export async function StopTravel() {
  const token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Travel/StopTravel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      if (response.status == 404) {
        throw new Error("Erreur réseau.");
      }
    }
  });
}

export async function PauseOrStartTravel() {
  const token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Travel/PauseOrStartTravel",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then((response) => {
    if (response.ok) {
      return response;
    } else {
      if (response.status == 404) {
        throw new Error("Erreur réseau.");
      }
    }
  });
}
