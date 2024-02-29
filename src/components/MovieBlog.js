// MovieBlog.js

import React from 'react';
import '../MovieBlog.css';
import { Link } from 'react-router-dom';

const MovieBlog = ({ movies, numberOfMovies }) => {

    const limitedMovies = movies.slice(0, numberOfMovies);

    const getYearFromDate = (dateString) => {
        return dateString ? new Date(dateString).getFullYear() : '';
    };

    return (
        <div className="movie-blog-wrapper">
            <div className="movie-blog">
                {limitedMovies.map((movie) => {
                    return (
                        <div key={movie.id} className={`blog-post`}>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="blog-post-image"
                                />
                            </Link>
                            <div className="blog-post-content">
                                <Link to={`/movie/${movie.id}`} className='known-for-movie-card'>
                                    <h5 className="blog-post-title">{movie.title}</h5>
                                </Link>
                                <p>
                                    <span className="blog-post-release-date">
                                        {getYearFromDate(movie.release_date)}
                                    </span>
                                    <span className="blog-post-rating">
                                        {typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'}/10
                                    </span>
                                </p>
                                <p className="blog-post-overview">
                                    {`${movie.overview.slice(0, 200)}`}
                                    {movie.overview.length > 200 && '...'}
                                </p>
                                {movie.overview.length > 200 && (
                                    <Link to={`/movie/${movie.id}`} className="read-more-link">
                                        {'Read More'}
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MovieBlog;
