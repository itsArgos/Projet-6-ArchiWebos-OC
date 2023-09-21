export let works = [];

export const loadWorks = async () => {
  // fetch("http://localhost:5678/api/works").then((response) => {
  //   response.json().then((works) => {

  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
};
