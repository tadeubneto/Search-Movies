import axios from "axios"

const API_KEY = "trilogy"
const BASE_URL = "https://www.omdbapi.com"
const loading = document.getElementById("loading");

function showLoading(){
  loading.classList.remove("d-none")  
}
function hideLoading(){
  loading.classList.add("d-none")  
}

export async function searchMovies(query) {
  
  try {  
    showLoading() 
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: "movie",
      },
    })

    hideLoading()

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Nenhum filme encontrado")
    }
    
    return response.data.Search.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster:
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=Sem+Poster",
      type: movie.Type,      
      
    }))
  } catch (error) {
    console.error("Erro ao buscar filmes:", error)
    throw error
  }
}

export async function getMovieDetails(imdbId) {
  try {
    showLoading()
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbId,
        plot: "full",
      },
    });
    // console.log(response, response.data);
hideLoading()
    if(response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data;
    
  }catch (error) {
    console.error('Error ao buscar detalhes', error)
    throw error
  }
  
}

