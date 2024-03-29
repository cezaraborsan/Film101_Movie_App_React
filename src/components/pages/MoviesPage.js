// MoviesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../MoviesPage.css";

import MoviePageBlog from '../MoviePageBlog';
import MovieTrailersMPage from '../MoviesTrailersMPage';
import MovieSlider from '../MoviesSlider';
import Loader from '../Loader';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(28); // Default to Action genre
    const [genreMovies, setGenreMovies] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchUpcomingMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/upcoming',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                setUpcomingMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        fetchUpcomingMovies();
        fetchGenres();
    }, [apiKey]);

    useEffect(() => {
        const fetchGenreMovies = async () => {
            if (selectedGenreId) {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/discover/movie`,
                        {
                            params: {
                                api_key: apiKey,
                                with_genres: selectedGenreId,
                            },
                        }
                    );

                    setGenreMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching genre movies:', error);
                }
            }
        };

        fetchGenreMovies();
    }, [selectedGenreId, apiKey]);

    // const maxVisibleGenres = 3;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="movies-page">
            <div className="hero-content">
                <h1 className='page-title'>MOVIES</h1>
            </div>

            {/* Genres Section - Dropdown on smaller screens */}
            <div className="genres-section">
                <div className="genre-list">
                    <div className="select-wrapper">
                        <select
                            className="custom-select"
                            value={selectedGenreId}
                            onChange={(e) => setSelectedGenreId(parseInt(e.target.value))}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <div className="select-arrow">&#9662;</div>
                    </div>
                </div>
            </div>
            <MovieSlider
                title={selectedGenreId ? genres.find((genre) => genre.id === selectedGenreId)?.name : 'Action Movies'}
                movies={selectedGenreId ? genreMovies : movies}
            />
            <MovieSlider title="Popular Movies" movies={movies} />
            <MovieTrailersMPage apiKey={apiKey} />
            <MoviePageBlog apiKey={apiKey} />
            <MovieSlider title="Upcoming Movies" movies={upcomingMovies} />
        </div>
    );
};

export default MoviesPage;
