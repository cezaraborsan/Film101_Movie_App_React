// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";

import Footer from "./components/Footer";
import MoviesPage from "./components/pages/MoviesPage";
import TVShowsPage from "./components/pages/TVShowsPage";

import React from 'react';

import MovieDetailsPage from './components/pages/MovieDetailsPage';
import TvShowDetailsPage from './components/pages/TvShowDetailsPage';
import PersonDetailsPage from './components/pages/PersonDetailsPage';


const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv/:id" element={<TvShowDetailsPage />} />
            <Route exact path="/movies" element={<MoviesPage />} />
            <Route exact path="/tvshows" element={<TVShowsPage />} />
            <Route exact path="/search" element={<SearchResultsPage />} />
            <Route path="/person/:personId" element={<PersonDetailsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
