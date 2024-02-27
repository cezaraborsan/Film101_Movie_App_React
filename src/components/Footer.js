import React from "react";

const Footer = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="footer-svg">
        <path fill="#1f2747" fill-opacity="1" d="M0,224L60,224C120,224,240,224,360,197.3C480,171,600,117,720,128C840,139,960,213,1080,208C1200,203,1320,117,1380,74.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Discover a world of entertainment with Film101. Your go-to destination for the latest movies and TV shows.</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@film101.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>

          <div className="footer-section">

            <h4>Follow Us</h4>
            <p>Stay connected for updates and behind-the-scenes fun!</p>
            <div className="social-icons">
              <a href="https://facebook.com/film101" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://twitter.com/film101" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a href="https://instagram.com/film101" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram-square"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2023 Film101. All rights reserved. | Designed by YourName</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
