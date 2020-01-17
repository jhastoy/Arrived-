import { getToken, saveToken } from "./Token";
export function Login(email, password) {
  console.log(email);
  console.log(password);
  return fetch("https://arrivedapi.conveyor.cloud/api/Auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      EmailAccount: email,
      PasswordAccount: password
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
  });
}

export function Register(name, surname, email, password, phoneNumber) {
  return fetch("https://arrivedapi.conveyor.cloud/api/Auth/Register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      PasswordAccount: password,
      EmailAccount: email,
      NameAccount: name,
      SurnameAccount: surname,
      PhoneNumberAccount: phoneNumber
    })
  }).then(response => {
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
