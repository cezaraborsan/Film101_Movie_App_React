// TrendingMoviesSlider.js
import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const TrendingMoviesSlider = ({ movies }) => {
    // const FallbackImage = "../image_replacement.png";

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplaySpeed: 300,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <h2 className='section-title'>Trending Movies</h2>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className='slider'>
                        <Link to={`/movie/${movie.id}`}>
                            <MovieCard movie={movie} mediaType="movie" />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TrendingMoviesSlider;
