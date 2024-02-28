import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../MovieTrailers.css";  // You may need to adjust the CSS file path based on your project structure.

const TVShowTrailers = ({ apiKey }) => {
    const [trailers, setTrailers] = useState([]);
    const [onAirTVShows, setOnAirTVShows] = useState([]);

    useEffect(() => {
        const fetchOnAirTVShows = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/trending/tv/week',
                    {
                        params: {
                            api_key: apiKey,
                        },
                    }
                );

                const first8OnAirTVShows = response.data.results.slice(0, 8);
                setOnAirTVShows(first8OnAirTVShows);
            } catch (error) {
                console.error('Error fetching on air TV shows:', error);
            }
        };

        fetchOnAirTVShows();
    }, [apiKey]);

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const trailersPromises = onAirTVShows.map(async (tvShow) => {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/tv/${tvShow.id}/videos`,
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
    }, [apiKey, onAirTVShows]);

    return (
        <div className="tv-show-trailers">
            <h2 className='section-title'>Exclusive Clips</h2>
            <div className="trailers-list">
                {trailers.map((trailer) => (
                    <div key={trailer?.id} className="trailer">
                        <iframe
                            title={trailer?.name || 'Trailer'}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer?.key || ''}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TVShowTrailers;
