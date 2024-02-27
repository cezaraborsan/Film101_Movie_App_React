// TrendingMoviesSlider.js
import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const TrendingMoviesSlider = ({ movies }) => {
    const CustomPrevArrow = (props) => (
        <button {...props} className="slick-prev"></button>
    );

    const CustomNextArrow = (props) => (
        <button {...props} className="slick-next"></button>
    );

    // const FallbackImage = "../image_replacement.png";

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,


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
                    slidesToShow: 1,
                    slidesToScroll: 1,

                },
            },
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="slider-container">
            <h2>Trending Movies</h2>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className='slider'>
                        <Link to={`/movie/${movie.id}`}>
                            <MovieCard movie={movie} />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TrendingMoviesSlider;