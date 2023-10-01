async function searchButton() {
  const apiKey = "98f43e48";

  const movieName = document.getElementById("movieName").value;
  const yearLaunched = document.getElementById("yearLaunched").value;

  if (!movieName) {
    alert("Please enter a movie name.");
    return;
  }

  if (!yearLaunched) {
    alert("Please enter a movie Year.");
    return;
  }

  let url = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.style.display = "block";

      const movieList = document.getElementById("movieList");
      movieList.innerHTML = "";

      let moviesToShow = data.Search;

      if (yearLaunched) {
        moviesToShow = moviesToShow.filter(
          (movie) => movie.Year >= yearLaunched
        );
      }

      let movieItems = moviesToShow.map((movie) => {
        const li = document.createElement("li");
        li.classList.add("movie-item");
        li.innerHTML = `
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
        return li;
      });

      movieList.append(...movieItems);
    } else {
      displayErrorPopup("No movies found!");
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    displayErrorPopup("Error fetching movie data. Please try again later.");
  }
}

function displayErrorPopup(message) {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => {
    popupContainer.remove();
  });

  const errorMessage = document.createElement("p");
  errorMessage.innerText = message;

  popup.appendChild(errorMessage);
  popup.appendChild(closeButton);
  popupContainer.appendChild(popup);
  document.body.appendChild(popupContainer);
}
