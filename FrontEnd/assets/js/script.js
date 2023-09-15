import { loadWork } from "./loadWork.js";
await loadWork();

function newElements(element) {
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const imgGallery = document.createElement("img");

  const titleElement = document.createElement("figcaption");

  gallery.appendChild(figure);
  figure.appendChild(imgGallery);
  imgGallery.appendChild(titleElement);
}

newElements();
