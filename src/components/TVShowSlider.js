// TVShowSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const TVShowSlider = ({ title, shows }) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <h2 className='section-title'>{title}</h2>
            <Slider {...settings}>
                {shows.map((show) => (
                    <div key={show.id} className="slider">
                        <Link to={`/tv/${show.id}`}>
                            <MovieCard movie={show} mediaType="tv" />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TVShowSlider;
