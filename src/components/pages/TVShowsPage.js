// TVShowsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../MoviesPage.css";

import Loader from '../Loader';
import TVShowBlog from '../TVShowsBlog';
import TVShowTrailers from '../TVShowsTrailers';
import TVShowSlider from '../TVShowSlider';

const TVShowsPage = () => {
    const [tvShows, setTVShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(10759);
    const [genreTVShows, setGenreTVShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiKey = process.env.REACT_APP_API_KEY;
    // const FallbackImage = "../image_replacement.png";

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/trending/tv/week',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                setTVShows(response.data.results);
            } catch (error) {
                console.error('Error fetching TV shows:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/tv/list',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching TV show genres:', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };

        fetchTVShows();
        fetchGenres();
    }, [apiKey]);

    useEffect(() => {
        const fetchGenreTVShows = async () => {
            if (selectedGenreId) {
                try {
                    const response = await axios.get(
                        'https://api.themoviedb.org/3/discover/tv',
                        {
                            params: {
                                api_key: apiKey,
                                with_genres: selectedGenreId,
                            },
                        }
                    );

                    setGenreTVShows(response.data.results);
                } catch (error) {
                    console.error('Error fetching genre TV shows:', error);
                }
            }
        };

        fetchGenreTVShows();
    }, [selectedGenreId, apiKey]);


    // const handleGenreClick = (genreId) => {
    //     setSelectedGenreId(genreId);
    // };

    // const maxVisibleGenres = 3;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="movies-page">
            <div className="hero-content">
                <h1 className='page-title'>TV Shows</h1>
            </div>

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
            <TVShowSlider title="Drama TV Shows" shows={selectedGenreId ? genreTVShows : tvShows} />
            <TVShowSlider title="Popular TV Shows" shows={tvShows} />
            <TVShowBlog apiKey={apiKey} />
            <TVShowSlider title="Discover TV Shows" shows={tvShows} />
            <TVShowTrailers apiKey={apiKey} />
        </div>
    );
};

export default TVShowsPage;
