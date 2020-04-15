import { getToken } from "./Storage";

export async function UserAlert() {
  let token = await getToken();
  await fetch("https://arrivedapi.conveyor.cloud/api/Alert/UserAlert", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
export async function UpdateUserPositionAlert(position) {
  let token = await getToken();
  await fetch(
    "https://arrivedapi.conveyor.cloud/api/Alert/UpdateUserPositionAlert",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(position),
    }
  ).then((response) => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
export async function StopAlert() {
  const token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Alert/StopAlert", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    console.log(response.ok);
    if (response.ok) {
      return response;
    } else {
      if (response.status == 404) {
        throw new Error("Erreur réseau.");
      }
    }
  });
}
