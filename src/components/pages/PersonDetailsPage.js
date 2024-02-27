// PersonDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../PersonDetailsPage.css';
import MovieCard from '../MovieCard';

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const [personDetails, setPersonDetails] = useState(null);
    const [showFullBiography, setShowFullBiography] = useState(false);

    const FallbackImage = "../image_replacement.png";


    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US&append_to_response=movie_credits`);
                setPersonDetails(response.data);
            } catch (error) {
                console.error('Error fetching person details:', error);
            }
        };

        fetchPersonDetails();
    }, [personId]);

    const toggleBiography = () => {
        setShowFullBiography(!showFullBiography);
    };

    return (
        <div className="person-details">
            {personDetails && (
                <>
                    <div className="person-info">
                        <h2 className="person-name">{personDetails.name}</h2>
                        <div className='person-overview'>
                            <img src={`https://image.tmdb.org/t/p/w300/${personDetails.profile_path}`} alt={personDetails.name} />
                            <p className="person-bio">
                                {showFullBiography ? personDetails.biography : `${personDetails.biography.slice(0, 300)}...`}
                                <span className="read-more" onClick={toggleBiography}>
                                    {showFullBiography ? ' Read Less' : ' Read More'}
                                </span>
                            </p>
                        </div>
                    </div>
                    {personDetails.movie_credits && personDetails.movie_credits.cast && (
                        <div className="person-movies">
                            <h3>Known for:</h3>
                            <ul className="movies-list">
                                {personDetails.movie_credits.cast.slice(0, 10).map((movie) => (
                                    <Link to={`/movie/${movie.id}`} className='known-for-movie-card'>
                                        <MovieCard movie={movie} />
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PersonDetailsPage;
