import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Projects.css';
import { projects } from './ProjectsData';

export default function Projects() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [cursorPos, setCursorPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [activeProject, setActiveProject] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [closing, setClosing] = useState(false);

  const overlayRef = useRef(null);
  const modalContentRef = useRef(null);

  const [outputState, setOutputState] = useState({
    'DEDOS Compiler': { stage: '', output: '' },
  });

  const handleSetOutputState = (projectTitle, stage, output) => {
    setOutputState((prev) => ({
      ...prev,
      [projectTitle]: { stage, output },
    }));
  };

  // Overlay intro animation
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lock scrolling when modal is open
  useEffect(() => {
    if (activeProject) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      const scrollY = -parseInt(document.body.style.top || '0');
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
    };
  }, [activeProject]);

  // Animate overlay to center
  useEffect(() => {
    if (!cardRect || !overlayRef.current) return;
    const overlay = overlayRef.current;
    requestAnimationFrame(() => {
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.width = '90vw';
      overlay.style.maxWidth = '90%';
      overlay.style.height = '90vw';
      overlay.style.maxHeight = '90%';
      overlay.style.borderRadius = '8px';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.objectFit = 'contain';
    });
  }, [cardRect]);

  const handleOverlayClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleCardClick = (project, e) => {
    setCardRect(e.currentTarget.getBoundingClientRect());
    setActiveProject(project);
  };

  const handleClose = () => {
    if (!overlayRef.current || !cardRect) {
      setActiveProject(null);
      return;
    }
    setClosing(true);
    const overlay = overlayRef.current;

    overlay.style.top = `${cardRect.top}px`;
    overlay.style.left = `${cardRect.left}px`;
    overlay.style.width = `${cardRect.width}px`;
    overlay.style.height = `${cardRect.height}px`;
    overlay.style.borderRadius = '20px';
    overlay.style.transform = 'translate(0, 0)';

    setTimeout(() => {
      setClosing(false);
      setActiveProject(null);
      setCardRect(null);
    }, 500);
  };

  const ActiveComponent = activeProject?.component;

  return (
    <div className="App">
      {showOverlay && (
        <div
          className="overlay"
          style={{
            '--cursor-x': `${cursorPos.x}px`,
            '--cursor-y': `${cursorPos.y}px`,
          }}
        />
      )}

      <nav className="navbar">
        <h1 className="logo">Ronan Baje</h1>
        <ul className="nav-links">
          <li>
            <Link to="/" className="home-btn">Home</Link>
          </li>
        </ul>
      </nav>

      <section className="projects-section">
        <h2>Projects</h2>

        <div className="project-cards">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card shine"
              style={{ backgroundColor: project.bgColor }}
              onClick={(e) => handleCardClick(project, e)}
            >
              {project.title !== 'Go Trike' && (
                <div className="diagonal-text">Thesis</div>
              )}

              {project.title ===
                'Adaptive Approach Applied in Text Summarization' && (
                <div className="diagonal-text-2">
                  Peer-Reviewed Article
                </div>
              )}

              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {activeProject && cardRect && (
        <>
          {/* Overlay background */}
          <div className="modal-bg" />

          {/* Fixed container */}
          <div
            className="fullscreen-container"
            onClick={handleOverlayClick}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div
              className="fullscreen"
              ref={overlayRef}
              style={{
                position: 'absolute',
                top: cardRect.top,
                left: cardRect.left,
                width: cardRect.width,
                height: cardRect.height,
                maxWidth: '95vw',         // responsive width
                maxHeight: '95vh',        // responsive height
                borderRadius: '12px',
                transition: 'all 0.5s ease-in-out',
                backgroundColor: '#fff',
                overflow: 'auto',         // allow internal wrapping instead of scroll on viewport shrink
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                padding: '16px',
              }}
            >
              <div className="fullscreen-content" ref={modalContentRef}>
                
                <div className="modal-header">
                  {activeProject.image && (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      style={{
                        width: '13%',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        marginBottom: '12px', // space between image and text
                      }}
                    />
                  )}
                  <div>
                    <h1>{activeProject.title}</h1>
                    <p style={{ fontSize: '0.95rem', color: '#555', margin: '6px 0' }}>
                      {activeProject.desc}
                    </p>
                    {/* New info field */}
                    {activeProject.info && (
                      <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.4, marginTop: '8px' }}>
                        {activeProject.info}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dynamic component rendering */}
                {ActiveComponent && (
                  <ActiveComponent
                    projectTitle={activeProject.title}
                    code={activeProject.sampleCode}
                    outputState={outputState[activeProject.title]}
                    setOutputState={handleSetOutputState}
                  />
                )}

                {activeProject.codeLink && (
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="code-link"
                  >
                    Link here
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <footer className="footer">
        <p>&copy; 2026 Ronan Baje.</p>
      </footer>
    </div>
  );
}
