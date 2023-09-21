/**
 * Création de la fonction newElements avec le paramètre (e) qui servira à effectuer des opérations pour la liaison avec mon API
 * @typedef Work
 * @type {object}
 * @property {number} id
 * @property {string} imageUrl
 * @property {string} title
 *
 * @param {Work} e
 */
export function newElements(work) {
  // Création du HTML en JS
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const imgGallery = document.createElement("img");
  imgGallery.src = work.imageUrl;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = work.title;
  // Attribution des enfants à chaques parents via appendChild
  gallery.appendChild(figure);
  figure.appendChild(imgGallery);
  figure.appendChild(figcaption);
}
