document.getElementById("submitBtn").addEventListener("click", function () {
  var movieName = document.getElementById("movieName").value;
  var yearLaunched = document.getElementById("yearLaunched").value;

  var apiKey = "98f43e48";
  var apiUrl = `https://www.omdbapi.com/?s=${movieName}&y=${yearLaunched}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var resultContainer = document.getElementById("resultContainer");
      var movieList = document.getElementById("movieList");

      if (data.Response === "True") {
        resultContainer.style.display = "block";
        movieList.innerHTML = "";

        data.Search.forEach(function (movie) {
          var li = document.createElement("li");
          li.textContent = `Title: ${movie.Title}, Year: ${movie.Year}`;
          movieList.appendChild(li);
        });
      } else {
        alert("Movies not found. Please check the information.");
      }
    })
    .catch((error) => console.error("Error:", error));
});
