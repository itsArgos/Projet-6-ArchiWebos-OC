/** ********************CONSTANTE*************** **/

import { works } from "./loadWorks";

const modal = document.querySelector(".modal");
const modalTwo = document.querySelector(".modal_2");
const btnAdd = document.querySelector(".button-add");
const faImage = document.querySelector(".fa-image");
const formatImage = document.querySelector(".format-image");

const token = localStorage.getItem("token");
const inputFile = document.querySelector(".modal_2 input[type=file]");
const inputText = document.getElementById("title");
const inputCategory = document.getElementById("category");

// *******************MODAL*****************
document
  .querySelector(".icon-modify button")
  ?.addEventListener("click", function () {
    modal.style.display = "flex";
  });

document.querySelector(".fa-x")?.addEventListener("click", function () {
  modal.style.display = "none";
});

export function fillModal(works) {
  const gridGallery = document.querySelector(".grid-gallery");

  for (const work of works) {
    const galleryContent = document.createElement("div");
    galleryContent.classList.add("gallery-content");
    galleryContent.dataset.id = work.id;

    const imgGallery = document.createElement("img");
    imgGallery.src = work.imageUrl;

    const btnGarbage = document.createElement("button");
    btnGarbage.classList.add("garbage");
    // btnGarbage.dataset.id = work.id; <= pour stocker une valeur dans un élément HTML
    const garbageIcon = document.createElement("i");
    garbageIcon.setAttribute("class", "fa-solid fa-trash-can");

    gridGallery?.appendChild(galleryContent);
    galleryContent.appendChild(imgGallery);
    btnGarbage.appendChild(garbageIcon);
    galleryContent.appendChild(btnGarbage);

    // ******************* Remove Item ****************

    garbageIcon.addEventListener("click", async function () {
      const response = await fetch(
        `http://localhost:5678/api/works/${work.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok === true) {
        document
          .querySelector(`.gallery-content[data-id="${work.id}"]`)
          .remove();
        document.querySelector(`figure[data-id="${work.id}"]`).remove();
      }
    });
  }
}

// ************************** MODAL 2 ********************

document.querySelector(".add-picture")?.addEventListener("click", function () {
  modalTwo.style.display = "flex";

  // const modalIn = document.createElement("div");
  // modalIn.classList.add("modal_in");

  // const modalIcon = document.createElement("div");
  // modalIcon.classList.add("modal_2_icon");
  // const arrowLeft = document.createElement("i");
  // const xClose = document.createElement("i");
  // arrowLeft.classList.add("fa-solid");
  // arrowLeft.classList.add("fa-arrow-left");
  // xClose.classList.add("fa-solid");
  // xClose.classList.add("fa-x");

  // const addPhoto = document.createElement("h4");
  // addPhoto.innerText = "Ajout Photo";
  // addPhoto.classList.add("modal_in_h4");

  // const modalContent = document.createElement("div");
  // modalContent.classList.add("modal2-content");

  // const pictureContainer = document.createElement("div");
  // pictureContainer.classList.add("picture-container");

  // const addContent = document.createElement("div");
  // addContent.classList.add("add-content");
  // const divIcon = document.createElement("div");
  // const iconImage = document.createElement("i");
  // iconImage.classList.add("fa-regular");
  // iconImage.classList.add("fa-image");
  // const btnAdd = document.createElement("button");
  // btnAdd.innerText = "Ajouter photo";
  // const imageAutorized = document.createElement("p");
  // imageAutorized.innerText = "jpg, png : 4mo max";

  // const title = document.createElement("h3");
  // title.innerText = "Titre";
  // const inputText = document.createElement("input");
  // inputText.innerText = "";

  // const categorie = document.createElement("h3");
  // categorie.innerText = "Catégorie";
  // const select = document.createElement("select");
  // const optionSelect = document.createElement("option");
  // optionSelect.innerText = "";
  // const optionSelect1 = document.createElement("option");
  // optionSelect1.innerText = "Objets";
  // const optionSelect2 = document.createElement("option");
  // optionSelect2.innerText = "Appartements";
  // const optionSelect3 = document.createElement("option");
  // optionSelect3.innerText = "Hôtels & Restaurants";

  // const hr = document.createElement("hr");
  // hr.classList.add("modal_in_hr");

  // const submitModal = document.createElement("button");
  // submitModal.classList.add("submit-modal");
  // submitModal.innerText = "Valider";

  // modalTwo.appendChild(modalIn);
  // modalIn.appendChild(modalIcon);
  // modalIcon.appendChild(arrowLeft);
  // modalIcon.appendChild(xClose);
  // modalIn.appendChild(addPhoto);
  // modalIn.appendChild(modalContent);
  // modalContent.appendChild(pictureContainer);
  // pictureContainer.appendChild(addContent);
  // addContent.appendChild(divIcon);
  // divIcon.appendChild(iconImage);
  // addContent.appendChild(btnAdd);
  // addContent.appendChild(imageAutorized);
  // modalContent.appendChild(title);
  // modalContent.appendChild(inputText);
  // modalContent.appendChild(categorie);
  // modalContent.appendChild(select);
  // select.appendChild(optionSelect);
  // select.appendChild(optionSelect1);
  // select.appendChild(optionSelect2);
  // select.appendChild(optionSelect3);
  // modalContent.appendChild(hr);
  // modalContent.appendChild(submitModal);
});

document
  .querySelector(".fa-arrow-left")
  ?.addEventListener("click", function () {
    modalTwo.style.display = "none";
  });

document.querySelector("#closed")?.addEventListener("click", function () {
  modal.style.display = "none";
  modalTwo.style.display = "none";
});

document.querySelector(".button-add")?.addEventListener("click", function () {
  inputFile.click();
});

let imgUpload = null;

inputFile?.addEventListener("change", async function (data) {
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
  console.log(inputFile.files[0]);
});

document
  .querySelector(".submit-modal")
  ?.addEventListener("click", async function () {
    // Pour envoyer les données avec une image passer par un formData

    const form = document.querySelector("form");
    const formData = new FormData(form);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (response.ok) {
      const work = await response.json();
      works.push(work);
    }
  });

const submitModal = document.querySelector(".submit-modal");

function verifForm() {
  if (
    (inputFile !== null || undefined,
    (inputText.value !== "" && undefined) || null,
    inputCategory.selected === true)
  )
    submitModal.classList.add("verif-modal");
  else {
    alert("Veuillez remplir tous les champs.");
  }
}

/** Pour le bouton Valider */
/** 1. récuperer l'élement input type file, celui de type text & le select
     * 
     * 2. création de la fonction pour la vérification du formulaire
     * 3. dedans vérifier si inputFile.files !== null ou undefined, inputText.value !== '' et undefined ou null et le select a une option selected
     * 4. si ok ajouter le bgc sur le bouton
    
     */
