export let categories = [];

export async function loadCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  categories = await response.json();
}
