const text = document.getElementById('text');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const movie = document.getElementById('movie');
const exit = document.querySelector('.exit');
const box = document.querySelector('.box');

// getDAta funktsiyasini boshqarish
function getDAta() {
  fetch(`http://www.omdbapi.com/?t=${text.value}&apikey=ab5bc292`)
    .then(data => data.json())
    .then(item => {
      console.log(item);
      movie.innerHTML = `
        <img src="${item.Poster}" class="moviePoster">
        <div class="movie__info">
          <h2>Name:  ${item.Title}</h2>
          <div>
            <span class="info">Rating:</span>
            <i class="fa-solid fa-star"></i>
            <span>${item.imdbRating}</span>
          </div>
          <div>
            <span class="info">Genre:</span>
            <span class='genre'>${item.Genre}</span>
          </div>
          <div>
            <span class="info">Language:</span>
            <span> ${item.Language}</span>
          </div>
          <div>
            <span class="info">Plot:</span>
            <span>${item.Plot}</span>
          </div>
          <div>
            <span class="info">Released:</span>
            <span> ${item.Released}</span>
          </div>
          <div>
            <span class="info">Actors:</span>
            <span> ${item.Actors}</span>
          </div>
          <div>
            <span class="info">Director:</span>
            <span>${item.Director}</span>
          </div>
          <button class="view">View</button>
        </div>
      `;
    })
    .catch(error => {
      console.log(error);
    });
}

btn.addEventListener('click', (el) => {
  el.preventDefault();
  getDAta();
  text.value = '';
  result.classList.remove('hidden');
});

exit.addEventListener('click', () => {
  result.classList.add('hidden');
});



// Random sahifadan ma'lumot olish
let pages = Math.trunc(Math.random() * 100);
function fetchData() {
  box.innerHTML = '';
  fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${pages}`)
    .then(data => data.json())
    .then(response => {
      if (response.results) {
        response.results.forEach(element => {
          const baseURL = 'https://image.tmdb.org/t/p/w500/';
          box.innerHTML += `
            <div class="wrapper__movie" data-id="${element.id}">
              <img src=${baseURL + element.backdrop_path} class="box__img">
              <h3 class="movieTitle">${element.original_title}</h3>
              <p class="movieRating"> Rating: ${element.vote_average}</p>
              <button class="more">See Details</button>
            </div>
          `;
        });
      } else {
        console.log("error");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

window.addEventListener('load', () => {
  fetchData();
});

// Modal oynani hosil qilish va malumotlarni uni ichida chiqarish
function showModal(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`)
      .then(data => data.json())
      .then(movieDetails => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const img = 'https://image.tmdb.org/t/p/w500/';
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <img src=${img+movieDetails.backdrop_path}>
            <div>
            <span class=info>Title:</span>
            <span>${movieDetails.original_title}</span>
            </div>

           <div>
           <span class='info'>Overview:</span>
           <span>${movieDetails.overview}</span>
           </div>

            <div>
            <span class='info'>Released:</span>
            <span>${movieDetails.release_date}</span>
            </div>

            <div>
            <span class="info">Runtime:</span>
            <span>${movieDetails.runtime} minutes</span>
            </div>
            
            <div>
            <span class="info">Genres:</span>
            <span> ${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
            </div>
            
            <div>
            <span class="info">Vote Average:</span>
            <span> ${movieDetails.vote_average}</span>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
  
        const closeModalButton = modal.querySelector('.close');
        closeModalButton.addEventListener('click', () => {
          modal.style.display = 'none';
          document.body.removeChild(modal);
        });
  
        modal.style.display = 'flex';
      })
      .catch(error => {
        console.log(error);
      });
  }
  
 
  box.addEventListener('click', (event) => {
    if (event.target.classList.contains('more')) {
      const movieId = event.target.closest('.wrapper__movie').dataset.id;
      showModal(movieId);
    }
  });