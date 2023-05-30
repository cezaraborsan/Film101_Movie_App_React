import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../MovieDetailsPage.css";

const apiKey = process.env.REACT_APP_API_KEY;

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const imageReplacement = "../image_replacement.png";

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      const movieData = response.data;
      setMovie(movieData);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      const castData = response.data.cast;
      setCast(castData);
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    }
  };

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <h2 className="movie-title">{movie.title}</h2>
          <div className="genre-list">
            {movie.genres.slice(0, 3).map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="poster-container">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : imageReplacement
              }
              alt={movie.title}
              className="poster-image"
            />

            <div className="summary">
              <p>{movie.overview}</p>

              <p className="release-date">
                <span>Release Date: </span> {movie.release_date}
              </p>
              <p
                className={`rating ${
                  (movie.release_date || movie.first_air_date) &&
                  ((new Date(movie.release_date) <= new Date() &&
                    movie.vote_average) ||
                    (new Date(movie.first_air_date) <= new Date() &&
                      movie.vote_average))
                }`}
              >
                <span>Rating: </span>
                {(movie.release_date || movie.first_air_date) &&
                ((new Date(movie.release_date) <= new Date() &&
                  movie.vote_average) ||
                  (new Date(movie.first_air_date) <= new Date() &&
                    movie.vote_average))
                  ? `${movie.vote_average.toFixed(1)}/10`
                  : "N/A"}
              </p>
            </div>
          </div>

          <h3 className="cast-heading">Cast and Crew</h3>

          {cast.length > 0 ? (
            <ul className="cast-list">
              {cast.slice(0, 10).map((person) => (
                <Link to={`/actors/${person.id}`} key={person.id}>
                  <li className="actor-container">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : imageReplacement
                      }
                      alt={person.name}
                      className="cast-image"
                    />
                    <div className="cast-details">
                      <p className="cast-name">{person.name}</p>
                      <p className="cast-character">({person.character})</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="no-cast">No cast information available.</p>
          )}
        </>
      ) : (
        <p className="loading">Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
