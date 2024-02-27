// TVShowsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../MoviesPage.css";

import Loader from '../Loader';
import TVShowBlog from '../TVShowsBlog';
import TVShowTrailers from '../TVShowsTrailers';
import TVShowSlider from '../TVShowSlider'; // Import the TVShowSlider component

const TVShowsPage = () => {
    const [tvShows, setTVShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(10759);
    const [genreTVShows, setGenreTVShows] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
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

    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     initialSlide: 0,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: true,
    //                 dots: true
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //                 initialSlide: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]
    // };
    const handleGenreClick = (genreId) => {
        setSelectedGenreId(genreId);
    };

    const maxVisibleGenres = 4;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="movies-page">
            <div className="hero-content">
                <h1>TV Shows</h1>
                <p className="hero-description">
                    Get ready for some TV show magic! Our lineup of the latest blockbuster series is here to sweep you off your feet. From thrilling dramas to hilarious comedies, we've got the perfect show for your every mood. Grab your snacks, hit play, and let the TV show marathon begin!
                </p>
            </div>

            <div className="genres-section">
                <div className="genre-list">
                    {genres.slice(0, maxVisibleGenres).map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id)}
                            className={`genre-button ${selectedGenreId === genre.id ? 'active' : ''}`}
                        >
                            {genre.name}
                        </button>
                    ))}
                    <select
                        value={selectedGenreId}
                        onChange={(e) => handleGenreClick(parseInt(e.target.value))}
                    >
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Use TVShowSlider for each section */}
            <TVShowSlider title="Drama TV Shows" shows={selectedGenreId ? genreTVShows : tvShows} />

            <TVShowSlider title="Popular TV Shows" shows={tvShows} />

            <TVShowBlog apiKey={apiKey} />

            <TVShowSlider title="Discover TV Shows" shows={tvShows} />

            <TVShowTrailers apiKey={apiKey} />
        </div>
    );
};

export default TVShowsPage;
