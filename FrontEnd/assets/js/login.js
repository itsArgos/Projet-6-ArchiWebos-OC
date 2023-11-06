// Création de la fonction loginRequest qui écoute l'événement submit du formulaire. Empechement du rechargement de la page grace à preventDefault
const form = document.querySelector(".form-request");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Récupération des éléments du formulaire HTML ( login.html )
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Création des constantes email & password (.value signifie la valeur saisie par l'utilisateur sur la page web)
  const email = emailInput.value;
  const password = passwordInput.value;

  // Créeation de mon objet pour l'envoi des données
  const value = {
    email: email,
    password: password,
  };

  // Envoie de la requête POST à L'API pour la connexion
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });

  const login = await response.json();
  localStorage.setItem("token", login.token);

  window.location.href = "admin.html";
});

// ici je veux récupérer le token
//const myToken = localStorage.getItem("token");

// Exemple de l'utilisation d'un JWT
// const createWork = async () => {
//   const response = await fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer monToken",
//     },
//     body: JSON.stringify(value),
//   });
// };
