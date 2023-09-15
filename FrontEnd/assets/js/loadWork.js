export const loadWork = async () => {
  // console.log("start");

  fetch("http://localhost:5678/api/works").then((response) => {
    response.json().then((works) => {
      // console.log(works);
    });

    // console.log(response);
  });

  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  // console.log(works);

  // console.log(response);

  // console.log("end");
};
