import { searchMovies } from "./services/api.js";
import { renderMovies } from "./components/movieCard.js";


document.getElementById("searchButton").addEventListener("click", () => {
  const inputSearch = document.getElementById("searchInput").value;

  let allMovies = []

  searchMovies(inputSearch).then((movies) => {
    allMovies = movies;
    console.log(allMovies)
    renderMovies(allMovies, 1);
    
  });
});
