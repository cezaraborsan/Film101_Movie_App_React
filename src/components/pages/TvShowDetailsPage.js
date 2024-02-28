import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../MovieDetailsPage.css';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const TVShowDetailsPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  const FallbackImage = "../image_replacement.png";


  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos,credits`
        );
        setTVShow(response.data);

        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching TV show genres:', error);
      }
    };

    fetchTVShowDetails();
    fetchGenres();
  }, [id, apiKey]);

  if (loading) {
    return <Loader />;
  }

  if (!tvShow) {
    return <p>Loading...</p>;
  }

  const { name, first_air_date, vote_average, overview, poster_path, credits, episode_run_time } = tvShow;

  const year = first_air_date ? new Date(first_air_date).getFullYear() : '';

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      // ... (slider settings)
    ],
  };

  const isReleased =
    (first_air_date && new Date(first_air_date) <= new Date());

  const ratingClass =
    isReleased && vote_average
      ? vote_average <= 5
        ? "red"
        : vote_average < 7.5
          ? "yellow"
          : "green"
      : "gray";

  const ratingText =
    isReleased && vote_average ? vote_average.toFixed(1) : "N/A";

  const tvShowGenres = tvShow.genres.map((genre) => genre.name);

  const limitedGenres = tvShowGenres.slice(0, 2);

  return (
    <div className="movie-details">
      <div className="details-header">
        <div className="movie-info">
          <div className='title-wrapper'>
            <h2>{`${name} (${year})`}</h2>
            <span className={`m-card-rating rating-label ${ratingClass}`}>{ratingText}</span>
          </div>
          <p>
            <span className='year-label label'> {year}</span>
            <span className='runtime-label label'>{episode_run_time && episode_run_time.length > 0 ? `${episode_run_time[0]} min` : 'N/A'}</span>
          </p>
        </div>
        <div className="image-container">
          <div className="poster-wrapper">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={name}
              onError={(e) => (e.target.src = FallbackImage)}
            />

            {genres.length > 0 && (
              <p className="movie-genres">{limitedGenres.join(" | ")}</p>
            )}
            <p className="movie-details-overview-hide">{overview}</p>
          </div>
          {trailerKey && (
            <iframe
              title={`${name} Trailer`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      <div className="details-content">
        <div className='overview-section'>
          <h2>Overview</h2>
          <p>{overview}</p>
        </div>

        <h2 className='m-cast-title'>Cast</h2>
        <Slider {...sliderSettings}>
          {credits.cast.map((person) => (
            <div key={person.id} className="cast-item">
              <Link to={`/person/${person.id}`}>
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${person.profile_path}`}
                    alt={person.name}
                  />
                ) : (
                  <img src={FallbackImage} alt={person.name} />
                )}
                <h4 className="p-card-title">{person.name}</h4>
                {person.character && (
                  <p className="character-name">{`as ${person.character}`}</p>
                )}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TVShowDetailsPage;
