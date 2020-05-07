fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=48cb631a848d6fe61082677d12aca120&language=en-US`)
  .then(data => {
    if (data.ok) {
      return data.json();
    } else {
      throw new Error(`Fail to get data.`);
    }
  })
  .then(genreList => {
    getMovieList(genreList.genres);
  })

function getMovieList(list) {
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=48cb631a848d6fe61082677d12aca120`)
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error(`Fail to get data.`);
      }
    })
    .then(movieList => {
      list.forEach(genre => {
        genre.movie = [];
        movieList.results.forEach(movie => {
          const foundMovie = movie.genre_ids.find(id => id === genre.id);
          if (foundMovie != undefined) {
            genre.movie.push(movie);
          } 
        })
      });
      console.log(list);
    })
}