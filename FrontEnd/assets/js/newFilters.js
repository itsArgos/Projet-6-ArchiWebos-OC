import { works } from "./loadWorks";
import { newElement } from "./newElements";

// Création des boutons filtre
const gallery = document.querySelector(".gallery");
const filter = document.getElementById("filter");

// Fonction qui crée les boutons de filtre via l'API
export function newFilters(category) {
  const btnFilter = document.createElement("button");
  btnFilter.innerText = category.name;
  btnFilter.dataset.id = category.id;

  // Écouteur d'évenement au clic sur les bouttons de filtre
  btnFilter.addEventListener("click", function () {
    // Création de la constante worksFiltered qui signifie qu'elle va filtrer mes cards en fonction du bouton cliqué
    const worksFiltered = works.filter((work) => {
      // Autre façon pour la vérification ( transformer un nombre (categoryId) en string)
      // return `${work.categoryId}` === btnFilter.dataset.id;
      return work.categoryId === parseInt(btnFilter.dataset.id);
    });
    gallery.innerHTML = "";

    for (const work of worksFiltered) {
      newElement(work);
    }
  });

  document.getElementById("all")?.addEventListener("click", function () {
    gallery.innerHTML = "";

    for (const work of works) newElement(work);
  });

  /** Vérification de ma conditons pour vérifier que les filtres existe */
  if (filter !== null) {
    filter.appendChild(btnFilter);
  }

  // //  Equivalent à la conditon ci-dessus. Si filter = null équivalent à false
  // if (filter) {
  //   filter.appendChild(btnFilter);
  // }

  filter?.appendChild(btnFilter);
}

// Affichage des filtres en fonction des boutons

// Autre solution pour ajouter un addEventListener sur les boutons
// const buttons = document.querySelectorAll("#filter button");
// [...buttons];
