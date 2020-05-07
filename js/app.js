fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=48cb631a848d6fe61082677d12aca120&language=en-US`)
  .then(data => {
    if (data.ok) {
      return data.json();
    } else {
      throw new Error(`Fail to get data.`);
    }
  })
  .then(result => {
    getMovieList(result.genres);
  })

function getMovieList(genreList) {
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=48cb631a848d6fe61082677d12aca120`)
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error(`Fail to get data.`);
      }
    })
    .then(movieList => {
      genreList.forEach(genre => {
        genre.movie = [];

        movieList.results.forEach(movie => {
          const foundMovie = movie.genre_ids.find(id => id === genre.id);

          if (foundMovie != undefined) {
            genre.movie.push(movie);
          }
        })
      });

      return genreList.filter(genre => genre.movie.length !== 0);
    })
    .then(list => {
      insertContent(list);
    })
}

function insertContent(list) {
  const page = document.querySelector(`#root`);
  let strHTML = ``;

  list.forEach(genre => {
    strHTML += `
    <div class="titleList">
      <div class="title">
        <h1>${genre.name}</h1>
        <div class="titles-wrapper">`;

    genre.movie.forEach(movie => {
      strHTML += `
      <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}"/>
        <div class="overlay">
          <div class="title">${movie.title}</div>
          <div class="rating">${movie.vote_average}/10</div>
          <div class="plot">${movie.overview}</div>
          <div class="listToggle">
            <div>
              <i class="fa fa-fw fa-plus"></i>
              <i class="fa fa-fw fa-check"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    })

    strHTML += `
          </div>
        </div>
      </div>
    `;
  })

  page.insertAdjacentHTML(`beforeend`, strHTML);
}