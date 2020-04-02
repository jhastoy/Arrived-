import { getToken } from "./Storage";

export default async function DeletePlace(idPlace) {
  console.log("UPDATE TOKEN");
  let token = await getToken();
  return fetch(
    "https://arrivedapi.conveyor.cloud/api/Place/DeletePlaceAccount",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        idPlace: idPlace
      })
    }
  ).then(response => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
export async function AddPlace(place) {
  let token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Place/AddPlaceAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(place)
  }).then(response => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
