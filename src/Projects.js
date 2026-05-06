import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Projects.css';
import { projects } from './ProjectsData';

export default function Projects() {
  const [showOverlay, setShowOverlay] = useState(true);

  const [cursorPos, setCursorPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const navigate = useNavigate();

  const [activeProject, setActiveProject] = useState(null);
  const [cardRect, setCardRect] = useState(null);

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

  /* =======================
     INTRO OVERLAY
  ======================= */
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* =======================
     CURSOR TRACKING
  ======================= */
  useEffect(() => {
    const handleMouseMove = (e) =>
      setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* =======================
     SCROLL LOCK (MODAL)
  ======================= */
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

  /* =======================
     OPEN MODAL ANIMATION
  ======================= */
  useEffect(() => {
    if (!cardRect || !overlayRef.current) return;

    const overlay = overlayRef.current;

    requestAnimationFrame(() => {
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.width = '80vw';
      overlay.style.height = '80vh';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.borderRadius = '8px';
    });
  }, [cardRect]);

  /* =======================
     OPEN PROJECT
  ======================= */
  const handleCardClick = (project, e) => {
    setCardRect(e.currentTarget.getBoundingClientRect());
    setActiveProject(project);
  };

  /* =======================
     CLOSE PROJECT
  ======================= */
  const handleClose = () => {
    if (!overlayRef.current || !cardRect) {
      setActiveProject(null);
      return;
    }

    const overlay = overlayRef.current;

    overlay.style.top = `${cardRect.top}px`;
    overlay.style.left = `${cardRect.left}px`;
    overlay.style.width = `${cardRect.width}px`;
    overlay.style.height = `${cardRect.height}px`;
    overlay.style.transform = 'translate(0, 0)';
    overlay.style.borderRadius = '20px';

    setTimeout(() => {
      setActiveProject(null);
      setCardRect(null);
    }, 500);
  };

  const handleOverlayClick = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      handleClose();
    }
  };

  const ActiveComponent = activeProject?.component;

  return (
    <div className="App">

      {/* Overlay intro */}
      {showOverlay && (
        <div
          className="overlay"
          style={{
            '--cursor-x': `${cursorPos.x}px`,
            '--cursor-y': `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/')}>
        &lt;
      </button>

      {/* Projects */}
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

      {/* Modal */}
      {activeProject && cardRect && (
        <>
          <div className="modal-bg" />

          <div
            className="fullscreen-container"
            onClick={handleOverlayClick}
          >
            <div
              className="fullscreen"
              ref={overlayRef}
              style={{
                top: cardRect.top,
                left: cardRect.left,
                width: cardRect.width,
                height: cardRect.height,
              }}
            >
              <div
                className="fullscreen-content"
                ref={modalContentRef}
              >
                <div className="modal-header">
                  {activeProject.image && (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="modal-image"
                    />
                  )}

                  <div>
                    <h1>{activeProject.title}</h1>
                    <p className="modal-desc">
                      {activeProject.desc}
                    </p>

                    {activeProject.info && (
                      <p className="modal-info">
                        {activeProject.info}
                      </p>
                    )}
                  </div>
                </div>

                {ActiveComponent && (
                  <ActiveComponent
                    projectTitle={activeProject.title}
                    code={activeProject.sampleCode}
                    outputState={
                      outputState[activeProject.title]
                    }
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
    </div>
  );
}