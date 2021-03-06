import { getToken, saveToken } from "./Storage";
export function Login(email, password) {
  return fetch("https://arrivedapi.conveyor.cloud/api/Auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      EmailAccount: email,
      PasswordAccount: password,
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
  });
}

export function Register(name, surname, email, password, phoneNumber) {
  return fetch("https://arrivedapi.conveyor.cloud/api/Auth/Register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      PasswordAccount: password,
      EmailAccount: email,
      NameAccount: name,
      SurnameAccount: surname,
      PhoneNumberAccount: phoneNumber,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status == 400) {
        throw new Error("Ce compte existe déjà. Veuillez vous connecter.");
      } else {
        if (response.status == 404) {
          throw new Error("Erreur réseau.");
        }
      }
    }
  });
}
export async function RefreshDataUser() {
  let token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Auth/Refresh", {
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
export async function IsTokenValid() {
  let token = await getToken();
  return fetch("https://arrivedapi.conveyor.cloud/api/Token/IsTokenValid", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  });
}

export default async function UpdateExpoToken(expoToken) {
  let token = await getToken();
  await fetch("https://arrivedapi.conveyor.cloud/api/Token/UpdateExpoToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      expoToken: expoToken,
    }),
  }).then((response) => {
    if (!response.ok) throw new Error("Erreur réseau");
  });
}
