import { works } from "./loadWorks";
import { newElements } from "./newElements";

// Création des boutons filtre
const gallery = document.querySelector(".gallery");
const filter = document.getElementById("filter");

export function newFilters(category) {
  const btnFilter = document.createElement("button");
  btnFilter.innerText = category.name;
  btnFilter.dataset.id = category.id;
  // J'écris mon addEventListener ici pour ne pas redéclarer mon element "button" en dehors de cette fonction.
  btnFilter.addEventListener("click", function () {
    // Je crée ma constante worksFiltered qui signifie qu'elle va filtrer mes cards en fonction du bouton cliqué
    const worksFiltered = works.filter((work) => {
      // Autre façon pour la vérification ( transforme un nombre en string)
      // return `${work.categoryId}` === btnFilter.dataset.id;

      return work.categoryId === parseInt(btnFilter.dataset.id);
    });
    console.log(worksFiltered);
    gallery.innerHTML = "";

    for (const work of worksFiltered) {
      newElements(work);
    }
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
