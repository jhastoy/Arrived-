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
