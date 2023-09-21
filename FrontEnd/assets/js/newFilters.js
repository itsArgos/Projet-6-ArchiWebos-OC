const filter = document.getElementById("filter");

export function newFilters(category) {
  const btnFilter = document.createElement("button");
  btnFilter.innerText = category.name;
  // Comment ajouter l'id des catégories de l'API ?
  btnFilter.dataset.id = category.id;

  filter.appendChild(btnFilter);
}
