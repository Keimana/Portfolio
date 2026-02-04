import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 
import resumePDF from './assets/Baje_Resume.pdf';

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

    {/* Social Icons */}
    <div style={{
      position: 'fixed',
      bottom: 'clamp(15px, 3vw, 30px)', 
      right: 'clamp(20px, 5vw, 50px)',  
      display: 'flex',
      gap: 'clamp(10px, 2vw, 20px)',   
      zIndex: 1000
    }}>
      <a
        href="https://www.linkedin.com/in/ronan-baje-57879b25b/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#0F1628',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
          transition: 'transform 0.2s, color 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.color = '#0077B5'; 
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.color = '#0F1628';
        }}
      >
        <FaLinkedin />
      </a>

      <a
        href="https://github.com/Keimana"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#0F1628',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          transition: 'transform 0.2s, color 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.color = '#333'; 
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.color = '#0F1628';
        }}
      >
        <FaGithub />
      </a>
    </div>


    </div>
  );
}
