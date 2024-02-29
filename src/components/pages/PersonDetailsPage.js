import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../PersonDetailsPage.css';
import MovieCard from '../MovieCard';
import Loader from '../Loader';

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const [personDetails, setPersonDetails] = useState(null);
    const [showFullBiography, setShowFullBiography] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US&append_to_response=movie_credits`);
                setPersonDetails(response.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching person details:', error);
            }
        };

        fetchPersonDetails();
    }, [personId]);

    const toggleBiography = () => {
        setShowFullBiography(!showFullBiography);
    };

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                },
            },
        ],
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="person-details">
            {personDetails && (
                <>
                    <div className="person-info">
                        <h2 className="person-name">{personDetails.name}</h2>
                        <div className='person-overview'>
                            <img className="person-bio-img" src={`https://image.tmdb.org/t/p/w300/${personDetails.profile_path}`} alt={personDetails.name} />
                            <p className="person-bio">
                                {personDetails.biography && (
                                    <>
                                        {showFullBiography ? personDetails.biography : `${personDetails.biography.slice(0, 300)}...`}
                                        <span className="read-more" onClick={toggleBiography}>
                                            {showFullBiography ? ' Read Less' : ' Read More'}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    {personDetails.movie_credits && personDetails.movie_credits.cast && (
                        <div className="person-movies">
                            <h3 className='known-for-title'>Known for:</h3>
                            <Slider {...sliderSettings}>
                                {personDetails.movie_credits.cast.slice(0, 15).map((movie) => (
                                    <Link to={`/movie/${movie.id}`} className='known-for-movie-card' key={movie.id}>
                                        <MovieCard movie={movie} />
                                    </Link>
                                ))}
                            </Slider>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PersonDetailsPage;
