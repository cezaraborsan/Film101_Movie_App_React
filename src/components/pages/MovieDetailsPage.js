import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../MovieDetailsPage.css';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  const FallbackImage = "../image_replacement.png";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`
        );
        setMovie(response.data);

        const videos = response.data.videos.results;
        const trailer = videos.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, apiKey]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, release_date, vote_average, overview, poster_path, credits, runtime, first_air_date } = movie;

  // Extracting the year from the release date
  const year = release_date ? new Date(release_date).getFullYear() : '';

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  const isReleased =
    (release_date && new Date(release_date) <= new Date()) ||
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

  return (
    <div className="movie-details">
      <div className="details-header">
        <div className="movie-info">
          <div className='title-wrapper'>
            <h2>{`${title} (${year})`}</h2>
            <span className={`m-card-rating rating-label ${ratingClass}`}>{ratingText}</span>
          </div>

          <p>
            <span className='year-label label'> {year}</span>
            <span className='runtime-label label'>{runtime} min</span>
          </p>
        </div>
        <div className="image-container">
          <div className='poster-wrapper'>
            <img className="poster" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} onError={(e) => e.target.src = FallbackImage} />
            <p className='movie-details-overview-hide'>{overview}</p>
          </div>
          {trailerKey && (
            <iframe
              title={`${title} Trailer`}
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
          <h2 className='movie-details-title'>Overview</h2>
          <p className='movie-details-overview'>{overview}</p>
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              alt={movie.title}
            />
          ) : (
            <img
              src={FallbackImage}
              alt={movie.title}
            />
          )}
        </div>

        <h2>Cast</h2>
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

export default MovieDetailsPage;
