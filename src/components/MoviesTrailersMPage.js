import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../MovieTrailers.css";

const MovieTrailers = ({ apiKey }) => {
    const [trailers, setTrailers] = useState([]);
    const [inTheatersMovies, setInTheatersMovies] = useState([]);

    useEffect(() => {
        const fetchInTheatersMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/now_playing',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                const first8InTheatersMovies = response.data.results.slice(0, 8);
                setInTheatersMovies(first8InTheatersMovies);
            } catch (error) {
                console.error('Error fetching in theaters movies:', error);
            }
        };

        fetchInTheatersMovies();
    }, [apiKey]);

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const trailersPromises = inTheatersMovies.map(async (movie) => {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
                        {
                            params: {
                                api_key: apiKey,
                            },
                        }
                    );

                    const trailer = response.data.results[0]; // Get the first trailer only

                    return trailer;
                });

                const allTrailers = await Promise.all(trailersPromises);

                setTrailers(allTrailers);
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };

        fetchTrailers();
    }, [apiKey, inTheatersMovies]);

    return (
        <div className="movie-trailers">
            <h2 className='section-title'>In Theaters Now</h2>
            <div className="trailers-list">
                {trailers.map((trailer) => (
                    <div key={trailer.id} className="trailer">
                        <iframe
                            title={trailer.name}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieTrailers;
