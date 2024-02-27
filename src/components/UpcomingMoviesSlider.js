// UpcomingMoviesSlider.js
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const UpcomingMoviesSlider = ({ movies }) => {
    const CustomPrevArrow = (props) => (
        <button {...props} className="slick-prev"></button>
    );

    const CustomNextArrow = (props) => (
        <button {...props} className="slick-next"></button>
    );

    const FallbackImage = "../image_replacement.png";

    const movieSliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                },
            },

            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },

            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="slider-container">
            <Slider {...movieSliderSettings}>
                {movies.map((movie) => (
                    <div key={movie.id} className='slider'>
                        <Link to={`/movie/${movie.id}`}>
                            <div className="slider-item">
                                {movie.backdrop_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <img
                                        src={FallbackImage}
                                        alt={movie.title}
                                    />
                                )}
                                <div className="slider-overlay"></div>
                                <div className="hover-info">
                                    <h4 className='upcoming-movie-title'>{movie.title}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default UpcomingMoviesSlider;
