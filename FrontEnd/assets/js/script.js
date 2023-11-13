// Fetch
import { categories, loadCategories } from "./loadCategories.js";
import { loadWorks, works } from "./loadWorks.js";
import { fillModal } from "./modal.js";
import { newElement } from "./newElements.js";
import { newFilters } from "./newFilters.js";

await Promise.all([loadWorks(), loadCategories()]);

// Création de la boucle for pour faire apparaitre chaques images aves les titres correspondant.
for (const work of works) newElement(work);

// ***************** FILTRE *******************

// Création de la boucle for.Each pour faire apparaitre les boutons filtres.
categories.forEach(newFilters);

// La fonction est appelée pour afficher le contenu à l'intérieur de le modale.
fillModal(works);
