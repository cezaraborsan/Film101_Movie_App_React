// PopularPeopleSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const PopularPeopleSlider = ({ people }) => {
    const FallbackImage = "../image_replacement.png";


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        autoplaySpeed: 300,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },

            {
                breakpoint: 760,
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
        <div className="popular-people-slider">
            <h2 className='section-title'>Most Popular Celebs</h2>
            <Slider {...settings}>
                {people.map((person) => (
                    <div key={person.id} className="slider">
                        <Link to={`/person/${person.id}`}>
                            {person.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280/${person.profile_path}`}
                                    alt={person.name}
                                />
                            ) : (
                                <img src={FallbackImage} alt={person.name} />
                            )}
                            <h5 className="m-card-title">{person.name}</h5>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PopularPeopleSlider;
