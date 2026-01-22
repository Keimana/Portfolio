import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from './assets/portfolio.png';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ripple] = useState({ active: false, x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);



  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Ronan Baje</h1>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        </ul>
        <div id="hamburger" className={menuOpen ? 'open' : ''} onClick={toggleMenu}>

        </div>
      </nav>

    {/* Hero */}
    <header className="hero">
    <div className={`hero-content ${heroVisible ? 'visible' : ''}`}>
        <div className="profile-pic-container">
          
        {/* Ink splat behind profile pic */}
        <div className="ink-splat"></div>
        <img src={profilePic} alt="Ronan Baje" className="profile-pic" />
        </div>
        <div className="hero-text">
        <h2>Hello! I'm Ronan</h2>
        <button className="cta-btn" onClick={() => navigate('/projects')}>
            View My Work
        </button>

        <button className="cta-btn" onClick={() => navigate('/projects')}>
            Download my Resume
        </button>
        </div>
    </div>
    </header>


      {/* Ripple Effect */}
      {ripple.active && (
        <div
          className="ripple-circle"
          style={{ left: ripple.x, top: ripple.y }}
        ></div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Ronan Baje. All rights reserved.</p>
      </footer>
    </div>
  );
}
