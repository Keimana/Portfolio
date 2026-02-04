import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import resumePDF from './assets/Baje_Resume.pdf';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="App">

      {/* Hero */}
      <header className="hero">
        <div className={`hero-content ${heroVisible ? 'visible' : ''}`}>
          <div className="hero-inner">
            <div className="hero-intro">Hello, I’m</div>
            <div className="hero-name">Ronan</div>
            <div className="hero-description">
              I am a recent computer science graduate with a strong passion for coding, problem-solving, and exploring emerging AI technologies.
            </div>
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => navigate('/projects')}>
                View my work
              </button>
              <a className="btn secondary" href={resumePDF} download>
                Download my Resume
              </a>
            </div>
          </div>
        </div>
      </header>

    </div>
  );
}
