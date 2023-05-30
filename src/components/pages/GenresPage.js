import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard";

const apiKey = process.env.REACT_APP_API_KEY;

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
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

        const genresData = response.data.genres;
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = async (genreId) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: apiKey,
            language: "en-US",
            with_genres: genreId,
          },
        }
      );

      const moviesData = response.data.results;
      setMovies(moviesData);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  return (
    <>
      <div className="search-results">
        <h2>Select a Genre</h2>
        <ul className="genres">
          {genres.map((genre) => (
            <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
              {genre.name}
            </li>
          ))}
        </ul>
        <h2>
          <span>Movies by Genre </span>
          {selectedGenre &&
            genres.find((genre) => genre.id === selectedGenre)?.name}
        </h2>
        <ul className="movie-card">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GenresPage;
