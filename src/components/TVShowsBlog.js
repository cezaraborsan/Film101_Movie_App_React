import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../MovieBlog.css";


const TVShowsBlog = ({ apiKey }) => {
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);

    const getYearFromDate = (dateString) => {
        return dateString ? new Date(dateString).getFullYear() : '';
    };

    useEffect(() => {
        const fetchTopRatedTVShows = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
                );

                // Keep only the top 10 TV shows
                const top10TVShows = response.data.results.slice(0, 10);

                // Format the rating to display only one decimal place
                const formattedTVShows = top10TVShows.map((tvShow) => ({
                    ...tvShow,
                    vote_average: typeof tvShow.vote_average === 'number' ? tvShow.vote_average.toFixed(1) : 'N/A',
                }));

                setTopRatedTVShows(formattedTVShows);
            } catch (error) {
                console.error('Error fetching top-rated TV shows:', error);
            }
        };

        fetchTopRatedTVShows();
    }, [apiKey]);

    return (
        <>
            <h2>Top Rated TV Shows</h2>
            <div className="movie-blog">
                {topRatedTVShows.map((tvShow) => (
                    <div key={tvShow.id} className="blog-post">
                        <Link to={`/tvshow/${tvShow.id}`} >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${tvShow.backdrop_path}`}
                                alt={tvShow.name}
                                className="blog-post-image"
                            />
                        </Link>
                        <div className="blog-post-content">
                            <Link to={`/tvshow/${tvShow.id}`} >
                                <h5 className="blog-post-title">{tvShow.title}</h5>
                            </Link>

                            <p>
                                <span className="blog-post-release-date">
                                    {tvShow.first_air_date ? getYearFromDate(tvShow.first_air_date) : 'N/A'}
                                </span>
                                <span className="blog-post-rating">
                                    {tvShow.vote_average}/10
                                </span>
                            </p>

                            <p className={`blog-post-overview ${tvShow.overview.length > 200 ? 'expandable' : ''}`}>
                                {tvShow.overview.length > 200 ? `${tvShow.overview.slice(0, 200)}...` : tvShow.overview}
                            </p>

                            {tvShow.overview.length > 200 && (
                                <Link to={`/tvshow/${tvShow.id}`} className="read-more-link">
                                    Read More
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TVShowsBlog;
