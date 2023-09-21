// Fetch
import { categories, loadCategories } from "./loadCategories.js";
import { loadWorks, works } from "./loadWorks.js";
import { newElements } from "./newElements.js";
import { newFilters } from "./newFilters.js";

await Promise.all([loadWorks(), loadCategories()]);

// Création de la boucle for pour faire apparaitre chaques images aves les titres correspondant
for (let work of works) newElements(work);

// ***************** FILTRE *******************

// for (let category of categories) newFilters(category);
categories.forEach(newFilters);
