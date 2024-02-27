// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../HomePage.css';
import UpcomingMoviesSlider from '../UpcomingMoviesSlider';
import TrendingMoviesSlider from '../TrendingMoviesSlider';
import TrendingTVShowsSlider from '../TrendingTVShowsSlider';
import PopularPeopleSlider from '../PopularPeopleSlider';
import MovieBlog from '../MovieBlog';
// import GenreSection from '../GenreHomePageSection';
import MovieTrailers from '../MovieTrailers';
import Loader from '../Loader';

const HomePage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcomingResponse, moviesResponse, tvShowsResponse, peopleResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`),
          axios.get('https://api.themoviedb.org/3/movie/popular', { params: { api_key: apiKey } }),
          axios.get('https://api.themoviedb.org/3/trending/tv/week', { params: { api_key: apiKey } }),
          axios.get('https://api.themoviedb.org/3/person/popular', { params: { api_key: apiKey } }),
        ]);

        setUpcomingMovies(upcomingResponse.data.results);
        setMovies(moviesResponse.data.results);
        setPopularTVShows(tvShowsResponse.data.results);
        setPopularPeople(peopleResponse.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <UpcomingMoviesSlider movies={upcomingMovies} />
      <TrendingMoviesSlider movies={movies} />
      <TrendingTVShowsSlider tvShows={popularTVShows} />
      {/* <GenreSection /> */}
      <PopularPeopleSlider people={popularPeople} />
      <MovieBlog movies={upcomingMovies} numberOfMovies={8} />
      <MovieTrailers apiKey={apiKey} />
    </div>
  );
};

export default HomePage;
