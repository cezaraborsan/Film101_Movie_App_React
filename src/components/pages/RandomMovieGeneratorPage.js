import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../RandomMovieGenerator.css";

const apiKey = process.env.REACT_APP_API_KEY;

const RandomMovieGenerator = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: apiKey,
            language: "en-US",
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchRandomMovie = async () => {
    if (genres.length === 0) {
      return;
    }

    const randomGenre = genres[Math.floor(Math.random() * genres.length)];

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: apiKey,
            include_adult: false,
            include_video: false,
            with_genres: randomGenre.id,
          },
        }
      );

      const movies = response.data.results.filter(
        (movie) => movie.poster_path !== null
      );

      if (movies.length === 0) {
        // No movies found with valid poster images
        setRandomMovie(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * movies.length);
      const selectedMovie = movies[randomIndex];

      setRandomMovie(selectedMovie);
    } catch (error) {
      console.error("Error fetching random movie:", error);
    }
  };

  const handleGenerateClick = () => {
    fetchRandomMovie();
  };

  const getGenreNames = () => {
    const genreNames = randomMovie.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : "";
    });
    return genreNames.join(", ");
  };

  return (
    <div className="random-movie-generator">
      <h2>Random Movie Generator</h2>
      <div className="movie-generator">
        <button className="generate-movie-button" onClick={handleGenerateClick}>
          Generate Random Movie
        </button>
        {randomMovie && randomMovie.poster_path ? (
          <div className="movie-details">
            <h3 className="generator-movie-title">{randomMovie.title}</h3>

            <div className="movie-details-flex">
              <img
                src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
                alt={randomMovie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <p className="movie-genre">{getGenreNames()}</p>
                <p className="movie-overview">{randomMovie.overview}</p>
                <p className="movie-release-date">
                  <span>Release Date:</span> {randomMovie.release_date}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default RandomMovieGenerator;
