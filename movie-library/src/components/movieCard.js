import { getMovieDetails } from "../services/api";

export function updatePagination(allMovies, totalMovies, currentPage, moviesPerPage){
  const totalPages = Math.ceil(totalMovies / moviesPerPage)
  const pagination = document.getElementById("pagination")
  pagination.innerHTML = ""

  if(currentPage > 1) {    
    const prevButton = document.createElement("button")
    prevButton.textContent = "Anterior"
    prevButton.className = "btn btn-outline-dark me-2"
    prevButton.addEventListener("click", () => {
      renderMovies(allMovies, currentPage -1, moviesPerPage)
    })
    pagination.appendChild(prevButton)
  }

  if(currentPage < totalPages) {
    const nextButton = document.createElement("button")
    nextButton.textContent = "Próximo"
    nextButton.className = "btn btn-outline-dark"
    nextButton.addEventListener("click", () => {
      renderMovies(allMovies, currentPage + 1, moviesPerPage)
    })
    pagination.appendChild(nextButton)
  }
}


export function renderMovies(allMovies, currentPage = 1, moviesPerPage = 4) {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = ""; // Limpa o conteúdo anterior da lista de filmes

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesShow = allMovies.slice(startIndex, endIndex); // Pega os filmes da página atual

  moviesShow.forEach((movie) => {
    const movieCard = createMovieCard(movie); // Cria o cartão de cada filme
    moviesList.appendChild(movieCard); // Adiciona o cartão ao DOM
  });

  updatePagination(allMovies, allMovies.length, currentPage, moviesPerPage); // Atualiza os botões de paginação
}


export function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.className = "col-md-3 mb-4 movie-card";
  movieCard.innerHTML = ` <div class="card"> <img src="${
    movie.poster
  }" class="card-img-top" alt="${
    movie.title
  }"> <div class="card-body"> <h5 class="card-title">${movie.title.slice(
    0,
    15
  )}...</h5> <p class="card-text">${movie.year}</p> </div> </div> `;

  movieCard.addEventListener("click", async () => {
    const movieModal = new bootstrap.Modal(document.getElementById("movieModal"));
    const movieDetails = await getMovieDetails(movie.id)
    console.log(movieDetails)
    if(movieDetails) {
      createModalMovie(movieDetails)
      movieModal.show()
    }else {
      console.error("nenhum detalhe encontrado")
    }
  })
  
  return movieCard;
}

export function createModalMovie(movieDetails) {
  document.getElementById("movieModalLabel").textContent = movieDetails.Title || 'Título indisponível';
  document.getElementById("moviePlot").textContent = movieDetails.Plot || 'Descrição indisponível'
  document.getElementById("movieYear").textContent = `Ano: ${movieDetails.Year || 'Ano indisponível'}`;
  document.getElementById("movieDirector").textContent = `Diretor: ${movieDetails.Director || 'Diretor Indisponível'}`;
  document.getElementById("movieGenre").textContent = `Gênero: ${movieDetails.Genre || 'Gênero Indisponível'}`;
  
}



