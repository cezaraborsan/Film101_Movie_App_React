import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieBlog = ({ apiKey }) => {
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
                );

                // Keep only the top 10 movies
                const top10Movies = response.data.results.slice(0, 10);

                // Format the rating to display only one decimal place
                const formattedMovies = top10Movies.map((movie) => ({
                    ...movie,
                    vote_average: movie.vote_average ? parseFloat(movie.vote_average).toFixed(1) : 'N/A',
                }));

                setTopRatedMovies(formattedMovies);
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };

        fetchTopRatedMovies();
    }, [apiKey]);


    const getYearFromDate = (dateString) => {
        return dateString ? new Date(dateString).getFullYear() : '';
    };

    return (
        <div className="movie-blog-wrapper">
            <h2 className='section-title'>Top Rated Movies</h2>
            <div className="movie-blog">
                {topRatedMovies.map((movie) => (
                    <div key={movie.id} className="blog-post">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.title}
                                className="blog-post-image"
                            />
                        </Link>
                        <div className="blog-post-content">
                            <Link to={`/movie/${movie.id}`}>
                                <h5 className="blog-post-title">{movie.title}</h5>
                            </Link>

                            <p className="blog-post-release-date">
                                {getYearFromDate(movie.release_date)}
                            </p>
                            <p className="blog-post-rating">
                                {movie.vote_average}/10
                            </p>
                            <p className={`blog-post-overview ${movie.overview.length > 200 ? 'expandable' : ''}`}>
                                {movie.overview.length > 200 ? `${movie.overview.slice(0, 200)}...` : movie.overview}
                            </p>
                            {movie.overview.length > 200 && (
                                <Link to={`/movie/${movie.id}`} className="read-more-link">
                                    Read More
                                </Link>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieBlog;
