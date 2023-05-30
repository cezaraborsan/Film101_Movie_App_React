import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../MovieCard";
import MovieList from "../MovieList";
import PopularPeople from "../PopularPeople";
import TVShowsList from "../TVShowsList";
import Loader from "../Loader";

const apiKey = process.env.REACT_APP_API_KEY;

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topTVShows, setTopTVShows] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Simulating a delay to show the loader
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await axios.get(url, {
          params: {
            api_key: apiKey,
            language: "en-US",
            page: 1,
          },
        });

        const data = response.data.results;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(
      "https://api.themoviedb.org/3/trending/movie/week",
      setTrendingMovies
    );
    fetchData("https://api.themoviedb.org/3/movie/top_rated", (movies) => {
      const topMovies = movies.slice(0, 10);
      setTopMovies(topMovies);
    });
    fetchData(
      "https://api.themoviedb.org/3/trending/tv/week",
      setTrendingTVShows
    );
    fetchData("https://api.themoviedb.org/3/tv/top_rated", (tvShows) => {
      const topTvShows = tvShows.slice(0, 10);
      setTopTVShows(topTvShows);
    });
    fetchData("https://api.themoviedb.org/3/movie/upcoming", (movies) => {
      const upcoming = movies.slice(0, 10);
      setUpcomingMovies(upcoming);
    });
    fetchData("https://api.themoviedb.org/3/tv/on_the_air", (onAir) => {
      const tvOnAir = onAir.slice(0, 10);
      setOnAir(tvOnAir);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-page-layout">
          <div>
            <h2 className="section-title">This Week's Trending Movies</h2>
            {trendingMovies.length > 0 ? (
              <div className="manual-slider">
                <div className="slider-content" ref={sliderRef}>
                  {trendingMovies.map((movie) => (
                    <div key={movie.id} className="slider-item">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading trending movies...</p>
            )}
          </div>
          <div>
            <h2 className="section-title">This Week's Trending TV Shows</h2>
            {trendingTVShows.length > 0 ? (
              <div className="manual-slider">
                <div className="slider-content" ref={sliderRef}>
                  {trendingTVShows.map((tvShow) => (
                    <div key={tvShow.id} className="slider-item">
                      <MovieCard movie={tvShow} isTVShow={true} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading trending movies...</p>
            )}
          </div>
          <div className="top-lists">
            <div>
              <h2 className="section-title">Top Rated Movies</h2>
              {topMovies.length > 0 ? (
                <MovieList movies={topMovies} />
              ) : (
                <p>Loading top rated movies...</p>
              )}
            </div>
            <div>
              <h2 className="section-title">Top Rated TV Shows</h2>
              {topTVShows.length > 0 ? (
                <TVShowsList tvshows={topTVShows} />
              ) : (
                <p>Loading top rated TV shows...</p>
              )}
            </div>
            <div>
              <h2 className="section-title">TV Shows On Air</h2>
              {onAir.length > 0 ? (
                <TVShowsList tvshows={onAir} />
              ) : (
                <p>Loading TV shows on air...</p>
              )}
            </div>
          </div>
          <div>
            <PopularPeople />
          </div>
          <div>
            <h2 className="section-title">Upcoming Movies</h2>
            {upcomingMovies.length > 0 ? (
              <div className="manual-slider">
                <div className="slider-content" ref={sliderRef}>
                  {upcomingMovies.map((movie) => (
                    <div key={movie.id} className="slider-item">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading trending movies...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
