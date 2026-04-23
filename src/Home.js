import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 
import resumePDF from './assets/Baje_Resume.pdf';
import { createPortal } from 'react-dom';
import 'devicon/devicon.min.css';
import { useRef } from 'react';
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();
  const modalRoot = document.getElementById('modal-root');
  const editorRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 250); 
  };

  const [activeFormats, setActiveFormats] = useState({
  bold: false,
  italic: false,
  underline: false,
});

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const iconStyle = {
  width: 'clamp(28px, 5vw, 40px)',
  height: 'auto',
  objectFit: 'contain',
  transition: 'transform 0.2s',
  background: 'transparent',
  filter: 'none',
};

  const updateFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };
    const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey)) {
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        document.execCommand('bold');
        updateFormats();
      }
      if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        document.execCommand('italic');
        updateFormats();
      }
      if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        document.execCommand('underline');
        updateFormats();
      }
    }
  };

  editor.addEventListener('keyup', updateFormats);
  editor.addEventListener('mouseup', updateFormats);
  editor.addEventListener('keydown', handleKeyDown);

  return () => {
    editor.removeEventListener('keyup', updateFormats);
    editor.removeEventListener('mouseup', updateFormats);
    editor.removeEventListener('keydown', handleKeyDown);
  };


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
                <button                
                  className="btn tertiary"
                  onClick={() => setShowModal(true)}
                >
                  Message Me
                </button>
            </div>
          </div>
        </div>
          {showModal && modalRoot &&
          createPortal(
            <div
              className={`modal-overlay ${closing ? 'closing' : ''}`}
              onClick={handleClose}
            >
              <div
                className={`modal ${closing ? 'closing' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Message</h3>
                </div>

                <div className="modal-body">
                  <input type="email" placeholder="Your Email" className="input" />
                  <input type="text" placeholder="Subject" className="input" />

                <div className="toolbar">
                  <button
                    className={activeFormats.bold ? "active" : ""}
                    onClick={() => {
                      document.execCommand('bold');
                      setActiveFormats(prev => ({ ...prev, bold: !prev.bold }));
                    }}
                  >
                    <b>B</b>
                  </button>

                  <button
                    className={activeFormats.italic ? "active" : ""}
                    onClick={() => {
                      document.execCommand('italic');
                      setActiveFormats(prev => ({ ...prev, italic: !prev.italic }));
                    }}
                  >
                    <i>I</i>
                  </button>

                  <button
                    className={activeFormats.underline ? "active" : ""}
                    onClick={() => {
                      document.execCommand('underline');
                      setActiveFormats(prev => ({ ...prev, underline: !prev.underline }));
                    }}
                  >
                    <u>U</u>
                  </button>
                </div>

                <div
                  className="editor"
                  contentEditable
                  tabIndex={0}
                  ref={editorRef}
                />                
                </div>

                <div className="modal-footer">
                  <button className="btn primary">Send</button>
                </div>
              </div>
            </div>,
            modalRoot
          )
        }
      </header>





{/* Tech Stack Icons */}
<div style={{
  position: 'fixed',
  bottom: 'clamp(15px, 3vw, 30px)',
  left: 'clamp(20px, 5vw, 50px)',
  display: 'flex',
  gap: '18px',
  zIndex: 1000,
  alignItems: 'center',
  fontSize: '32px',
  color: '#0F1628'
}}>

  {[
    "devicon-figma-plain",
    "devicon-flutter-plain",
    "devicon-javascript-plain",
    "devicon-firebase-plain",
    "devicon-vscode-plain",
    "devicon-python-plain"
  ].map((icon, i) => (
    <i
      key={i}
      className={icon}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s, opacity 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        e.currentTarget.style.opacity = '1';
        e.currentTarget.classList.add('colored');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.opacity = '0.8';
        e.currentTarget.classList.remove('colored');
      }}
    />
  ))}

</div>


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
