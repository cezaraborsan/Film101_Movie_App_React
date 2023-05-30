import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import MovieSearch from "./MovieSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className={`nav-container ${sidebarOpen ? "open" : ""}`}>
        <Link to="/">
          <h1 className="logo">
            Film<span>101</span>
          </h1>
        </Link>

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li className="close-icon" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/genres" className="nav-link" onClick={closeSidebar}>
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/random-movie"
                className="nav-link"
                onClick={closeSidebar}
              >
                Random Movie
              </Link>
            </li>
          </ul>
        </div>
        <div className="menu-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <MovieSearch />
    </nav>
  );
}

export default Navbar;
