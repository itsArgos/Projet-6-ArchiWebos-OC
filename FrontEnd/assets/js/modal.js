/** ********************CONSTANTE*************** **/

import { works } from "./loadWorks";
import { newElement } from "./newElements";

const modal = document.querySelector(".modal");
const modalTwo = document.querySelector(".modal_2");
const btnAdd = document.querySelector(".button-file");
const faImage = document.querySelector(".fa-image");
const formatImage = document.querySelector(".format-image");
const gridGallery = document.querySelector(".grid-gallery");
const submitModal = document.querySelector(".submit-modal");

const token = localStorage.getItem("token");
const inputFile = document.querySelector(".modal_2 input[type=file]");
const inputText = document.getElementById("title");
const inputCategory = document.getElementById("category");
const form = document.querySelector("form");

// *******************MODAL*****************
// Ajoute un écouteur d'événements au clic sur l'icone modifier
document
  .querySelector(".icon-modify button")
  ?.addEventListener("click", function () {
    modal.showModal();
  });

document.querySelector(".modal")?.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.close();
  }
});

// Ajoute un écouteur d'événements au clic sur la croix pour fermer la modal
document.querySelector(".fa-x")?.addEventListener("click", function () {
  // modal.style.display = "none";
  modal.close();
});

function newElementModal(work) {
  const galleryContent = document.createElement("div");
  galleryContent.classList.add("gallery-content");
  galleryContent.dataset.id = work.id;

  const imgGallery = document.createElement("img");
  imgGallery.src = work.imageUrl;

  const btnGarbage = document.createElement("button");
  btnGarbage.classList.add("garbage");
  const garbageIcon = document.createElement("i");
  garbageIcon.setAttribute("class", "fa-solid fa-trash-can");

  gridGallery?.appendChild(galleryContent);
  galleryContent.appendChild(imgGallery);
  btnGarbage.appendChild(garbageIcon);
  galleryContent.appendChild(btnGarbage);

  // ******************* Remove Item ****************
  // Ajoute un écouteur d'événements au clic sur l'icone de corbeille
  garbageIcon.addEventListener("click", async function () {
    // Fait une requête DELETE à l'adresse correspondant à l'ID de work
    const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    // Si la réponse est réussie (statut HTTP 200)
    if (response.ok === true) {
      // Supprime le contenu de la galerie avec l'ID correspondant au work
      document.querySelector(`.gallery-content[data-id="${work.id}"]`).remove();
      // Supprime la figure avec l'ID correspondant au work
      document.querySelector(`figure[data-id="${work.id}"]`).remove();
    }
  });
}

// Cette fonction permet de remplir la première modal (image & poubelle)
export function fillModal(works) {
  for (const work of works) {
    newElementModal(work);
  }
}

// ************************** MODAL 2 ********************

document.querySelector(".add-picture")?.addEventListener("click", function () {
  modalTwo.showModal();
});

document.querySelector(".modal_2")?.addEventListener("click", function (event) {
  if (event.target === modalTwo) {
    modalTwo.close();
  }
});

// Ajoute un écouteur d'événements au clic sur la fleche permettant le retour en arriere
document
  .querySelector(".fa-arrow-left")
  ?.addEventListener("click", function () {
    modalTwo.close();
  });

// Ajoute un écouteur d'événements au clic sur la croix permettant de fermer toutes les fenêtre de modal
document.querySelector("#closed")?.addEventListener("click", function () {
  modal.close();
  modalTwo.close();
});

// Ajoute un écouteur d'événements au clic sur le boutton permettant d'ajouter une photo
document.querySelector(".button-file")?.addEventListener("click", function () {
  inputFile.click();
});

let imgUpload = null;

// Ajoute un écouteur d'événements pour l'événement "change" sur l'élément inputFile
inputFile?.addEventListener("change", async function (data) {
  // Masque le bouton "Ajouter", l'icône d'image Font Awesome, et les informations sur le format de l'image
  btnAdd.style.display = "none";
  faImage.style.display = "none";
  formatImage.style.display = "none";

  let reader = new FileReader();
  reader.onload = (e) => {
    const img = document.createElement("img");
    img.src = e.target.result;
    // console.log(img);
    const addContent = document.querySelector(".add-content");

    addContent.append(img);
  };
  imgUpload = data.target.files[0];
  reader.readAsDataURL(data.target.files[0]);
  // console.log(inputFile.files[0]);
});

// Cette fonction vérifie les valeurs de inputFile,inputText,inputCategory. Si elles sont vraies alors le bouton "Valider" est vert. Sinon le bouton "Valider" est grisé.
function verifSubmitModal() {
  if (inputFile.value && inputText.value && inputCategory.value) {
    submitModal.classList.remove("submit-modal");
    submitModal.classList.add("verif-modal");
    submitModal.removeAttribute("disabled");
  } else {
    submitModal.classList.remove("verif-modal");
    submitModal.classList.add("submit-modal");
    submitModal.setAttribute("disabled", true);
  }
}
// Applique le changement si la vérification est correcte
form.addEventListener("change", verifSubmitModal);

// Ajoute un écouteur d'événements pour l'événement "click" sur l'élément "submit-modal ( bouton Valider )"
document
  .querySelector(".submit-modal")
  ?.addEventListener("click", async function () {
    // Récupère les données du formulaire dans un objet FormData
    const formData = new FormData(form);
    // Effectue une requête asynchrone POST vers l'API à l'URL
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    // Vérifie si la réponse de la requête est réussie (status 200 OK)
    if (response.ok) {
      const newWork = await response.json();
      // Ajoute le nouveau travail au tableau works
      works.push(newWork);

      // Appel de la fonction newElementModal pour ajouter à la 1ère modal le nouvel élément
      newElementModal(newWork);
      // Appel de la fonction newElement pour ajouter à la page d'accueil le nouvel élément
      newElement(newWork);
      // Réinitialise les valeurs des champs du formulaire
      inputText.value = "";
      inputFile.value = "";
      inputCategory.value = "";

      btnAdd.style.display = "inline-block";
      faImage.style.display = "inline-block";
      formatImage.style.display = "block";

      // Supprime l'image
      document.querySelector(".add-content img").remove();
      // Appelle de la fonction pour vérifier si le champs est rempli ou non
      verifSubmitModal();
    }
  });
