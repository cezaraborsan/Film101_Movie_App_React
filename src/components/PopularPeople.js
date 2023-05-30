import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "../PopularPeople.css";

const apiKey = process.env.REACT_APP_API_KEY;

function PopularPeople() {
  const [popularPeople, setPopularPeople] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchPopularPeople = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/person/popular",
          {
            params: {
              api_key: apiKey,
              language: "en-US",
              page: 1,
            },
          }
        );

        const popularPeopleData = response.data.results;
        setPopularPeople(popularPeopleData);
      } catch (error) {
        console.error("Error fetching popular people:", error);
      }
    };

    fetchPopularPeople();
  }, []);

  return (
    <div className="popular-people-list">
      <h2 className="section-title">Popular Actors This Week</h2>
      {popularPeople.length > 0 ? (
        <div className="manual-slider">
          <div className="slider-content" ref={sliderRef}>
            {popularPeople.map((person) => {
              const posterPath = person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "../image_replacement.png";

              return (
                <div key={person.id} className="slider-item">
                  <Link to={`/actors/${person.id}`}>
                    <img
                      src={posterPath}
                      className="profile-img"
                      alt={person.name}
                    />
                    <p className="people-name">{person.name}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading popular people...</p>
      )}
    </div>
  );
}

export default PopularPeople;
