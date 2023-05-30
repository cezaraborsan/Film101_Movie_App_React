import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../ActorDetailsPage.css";

const apiKey = process.env.REACT_APP_API_KEY;

const ActorDetailsPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const imageReplacement = "../image_replacement.png";

  useEffect(() => {
    fetchActorDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchActorDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      const actorData = response.data;
      setActor(actorData);
    } catch (error) {
      console.error("Error fetching actor details:", error);
    }
  };

  return (
    <div className="actor-details">
      {actor ? (
        <>
          <h2 className="actor-name">{actor.name}</h2>
          <div className="actor-image-container">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : imageReplacement
              }
              alt={actor.name}
              className="actor-image"
            />
            <div className="actor-info">
              <p className="actor-bio">
                <span>Biography:</span> {actor.biography}
              </p>
              <p className="actor-birthday">
                <span>Birthday:</span> {actor.birthday}
              </p>
              <p className="actor-place-of-birth">
                <span>Place of Birth:</span> {actor.place_of_birth}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading actor details...</p>
      )}
    </div>
  );
};

export default ActorDetailsPage;
