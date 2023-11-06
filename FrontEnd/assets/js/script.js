// Fetch
import { categories, loadCategories } from "./loadCategories.js";
import { loadWorks, works } from "./loadWorks.js";
import { fillModal } from "./modal.js";
import { newElements } from "./newElements.js";
import { newFilters } from "./newFilters.js";

await Promise.all([loadWorks(), loadCategories()]);

// Création de la boucle for pour faire apparaitre chaques images aves les titres correspondant.
for (const work of works) newElements(work);

// ***************** FILTRE *******************

// Création de la boucle for.Each pour faire apparaitre les boutons filtres.
// for (let category of categories) newFilters(category);
categories.forEach(newFilters);

// for (const workModal of works) modalExecute(workModal);
// workModal.forEach(modalExecute);
fillModal(works);
