import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchIconRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
    setNavOpen(false);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    try {
      const apiKey = process.env.REACT_APP_API_KEY;

      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1`
      );

      const data = response.data;
      const searchItems = data.results.slice(0, 25);

      setSearchQuery('');

      if (searchItems.length > 0) {
        navigate('/search', { state: { searchResults: searchItems } });
      } else {
        console.log('No search results found.');
      }
    } catch (error) {
      console.error('Error searching movies and TV shows:', error);
    }
  };

  const handleLinkClick = () => {
    // Close the navigation menu on link click for small screens
    if (window.innerWidth <= 768) {
      closeNav();
    }
  };

  return (
    <nav className='navbar-wrapper'>
      <div className={`nav ${isNavOpen ? 'openNav' : ''} ${isSearchOpen ? 'openSearch' : ''}`}>
        <i className="uil uil-bars navOpenBtn" onClick={toggleNav}></i>
        <Link to="/" className="logo">
          FilmSphere
        </Link>

        <ul className="nav-links">
          <i className="uil uil-times navCloseBtn" onClick={closeNav}></i>
          <li>
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="nav-link" onClick={handleLinkClick}>
              Movies
            </Link>
          </li>
          <li>
            <Link to="/tvshows" className="nav-link" onClick={handleLinkClick}>
              TV Shows
            </Link>
          </li>
        </ul>

        <i
          className={`uil uil-search search-icon ${isSearchOpen ? 'uil-times' : 'uil-search'}`}
          id="searchIcon"
          onClick={toggleSearch}
          ref={searchIconRef}
          tabIndex="0" // Ensure the element is focusable
        ></i>
        <div className={`search-box ${isSearchOpen ? 'openSearch' : ''}`}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={isSearchOpen ? 'active' : ''}
              ref={searchInputRef}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
