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

  //  Attend la réponse de la requête pour pouvoir poursuivre la suite du code
  const login = await response.json();

  if (response.ok) {
    // Si la réponse est réussie (statut HTTP 200),
    // enregistre le token d'authentification dans le stockage local
    localStorage.setItem("token", login.token);
    alert("Connexion réussie !");
    // Redirige l'utilisateur vers la page "admin.html"
    window.location.href = "admin.html";
  } else {
    alert(`E-mail ou Mot de passe incorrect`);
    // Sinon, si la réponse n'est pas réussie,
    // affiche une alerte indiquant que l'e-mail ou le mot de passe est incorrect
  }
});
