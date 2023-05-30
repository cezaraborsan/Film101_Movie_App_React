import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../MovieDetailsPage.css";

const apiKey = process.env.REACT_APP_API_KEY;

const TvShowDetailsPage = () => {
  const { tvShowId } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [cast, setCast] = useState([]);
  const imageReplacement = "../image_replacement.png";

  useEffect(() => {
    fetchTvShowDetails();
    fetchTvShowCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTvShowDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      const tvShowData = response.data;
      setTvShow(tvShowData);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchTvShowCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/credits`,
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
      {tvShow ? (
        <>
          <h2 className="movie-title">{tvShow.name}</h2>
          <div className="genre-list">
            {tvShow.genres.slice(0, 3).map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="poster-container">
            <img
              src={
                tvShow.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                  : imageReplacement
              }
              alt={tvShow.title}
              className="poster-image"
            />
            <div className="summary">
              <p>{tvShow.overview}</p>

              <p className="release-date">
                Release Date: {tvShow.first_air_date}
              </p>
              <p
                className={`rating ${
                  (tvShow.release_date || tvShow.first_air_date) &&
                  ((new Date(tvShow.release_date) <= new Date() &&
                    tvShow.vote_average) ||
                    (new Date(tvShow.first_air_date) <= new Date() &&
                      tvShow.vote_average))
                }`}
              >
                <span>Rating: </span>
                {(tvShow.release_date || tvShow.first_air_date) &&
                ((new Date(tvShow.release_date) <= new Date() &&
                  tvShow.vote_average) ||
                  (new Date(tvShow.first_air_date) <= new Date() &&
                    tvShow.vote_average))
                  ? `${tvShow.vote_average.toFixed(1)}/10`
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
        <p className="loading">Loading tvShow details...</p>
      )}
    </div>
  );
};

export default TvShowDetailsPage;
