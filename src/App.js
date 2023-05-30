import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import ActorDetailsPage from "./components/pages/ActorDetailsPage";
import TvShowDetailsPage from "./components/pages/TvShowDetailsPage";
import GenresPage from "./components/pages/GenresPage";
import Footer from "./components/Footer";
import RandomMovieGenerator from "./components/pages/RandomMovieGeneratorPage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/tvshows/:tvShowId" element={<TvShowDetailsPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/random-movie" element={<RandomMovieGenerator />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
